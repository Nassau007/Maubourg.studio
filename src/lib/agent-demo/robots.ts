// Which AI bots the site's robots.txt lets read the submitted page.
//
// robots.txt is one file per host, so this is a fact about the visitor's site,
// not about one page: the copy says "your site" for that reason. It is fetched
// in parallel with the page, under the same timeout and byte cap, and it never
// throws. A file we could not read is reported as unread, never as a block:
// telling a store owner their site turns ChatGPT away on the strength of a
// timeout would be the one claim in the demo that is both wrong and alarming.
//
// Matching follows RFC 9309:
// - the group whose user-agent names the bot wins over the * group, and every
//   group naming the same bot is merged;
// - inside the chosen group the longest matching rule decides, and Allow wins
//   a tie with Disallow;
// - no matching rule, or no matching group, means allowed;
// - a 404 or 410 means there is no file to obey: everything is allowed.
//
// Two places where we report less than the RFC lets a crawler assume, because
// we only ever state what we actually read:
// - a 5xx or an unreachable server is reported as unreadable, not as the full
//   disallow a crawler would assume;
// - any other 4xx (401, 403, 429) is reported as unreadable too, not as "no
//   file". The RFC lets a crawler treat it as allow-all, but in practice it is
//   a bot shield refusing our request while the file exists: La Redoute, Fnac
//   and Darty all answered 403 when this was written. Telling those stores
//   they have no robots.txt would be false.

import { FETCH_TIMEOUT_MS } from './config';
import { safeGet } from './fetchProduct';
import type { BotKind, BotVerdict, RobotsCheck } from './types';

/**
 * The bots checked, in the order they are shown. Training crawlers feed a
 * model's next version; blocking them does not stop a page being cited. The
 * answer-time ones fetch a page to answer a question now; blocking those is
 * what keeps a page out of the answer.
 */
export const AI_BOTS: { bot: string; kind: BotKind }[] = [
  { bot: 'OAI-SearchBot', kind: 'answer' },
  { bot: 'ChatGPT-User', kind: 'answer' },
  { bot: 'Claude-SearchBot', kind: 'answer' },
  { bot: 'PerplexityBot', kind: 'answer' },
  { bot: 'GPTBot', kind: 'training' },
  { bot: 'ClaudeBot', kind: 'training' },
];

type Rule = { allow: boolean; pattern: string; raw: string };
type Group = { agents: string[]; rules: Rule[] };

/* ------------------------------------------------------------------ */
/* Parsing                                                             */
/* ------------------------------------------------------------------ */

/** The product token of a user-agent line: "GPTBot/1.1" and "gptbot" both give "gptbot". */
function agentToken(value: string): string {
  const v = value.trim();
  if (v === '*') return '*';
  const m = v.match(/^[A-Za-z_-]+/);
  return m ? m[0].toLowerCase() : '';
}

/** Same percent-encoding on both sides, so "/caf%c3%a9" and "/café" compare equal. */
function normalizePath(path: string): string {
  let out = '';
  // Array.from splits by code point. The repo targets ES5, where a for..of
  // over a string would split an emoji into halves that cannot be encoded.
  Array.from(path).forEach((ch) => {
    const code = ch.codePointAt(0) ?? 0;
    if (code > 126 || code < 33) {
      try {
        out += encodeURIComponent(ch);
      } catch {
        out += ch;
      }
    } else {
      out += ch;
    }
  });
  return out.replace(/%[0-9a-f]{2}/gi, (m) => m.toUpperCase());
}

export function parseRobots(text: string): Group[] {
  const groups: Group[] = [];
  let current: Group | null = null;
  // A user-agent line that follows a rule opens a new group; consecutive
  // user-agent lines share one.
  let lastWasAgent = false;

  for (const rawLine of text.split(/\r\n|\r|\n/)) {
    const line = rawLine.replace(/#.*$/, '').trim();
    if (!line) continue;
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim().toLowerCase();
    const value = line.slice(colon + 1).trim();

    if (key === 'user-agent') {
      if (!current || !lastWasAgent) {
        current = { agents: [], rules: [] };
        groups.push(current);
      }
      const token = agentToken(value);
      if (token) current.agents.push(token);
      lastWasAgent = true;
      continue;
    }

    if (key === 'allow' || key === 'disallow') {
      lastWasAgent = false;
      // Rules before any user-agent line belong to no group.
      if (!current) continue;
      // An empty Disallow matches nothing, so it is no rule at all.
      if (!value) continue;
      const pattern = normalizePath(value.startsWith('/') || value.startsWith('*') ? value : `/${value}`);
      current.rules.push({
        allow: key === 'allow',
        pattern,
        raw: `${key === 'allow' ? 'Allow' : 'Disallow'}: ${value}`,
      });
      continue;
    }

    // Sitemap, crawl-delay and the rest neither open nor close a group.
  }

  return groups;
}

/* ------------------------------------------------------------------ */
/* Matching                                                            */
/* ------------------------------------------------------------------ */

function ruleMatches(pattern: string, path: string): boolean {
  const anchored = pattern.endsWith('$');
  const body = anchored ? pattern.slice(0, -1) : pattern;
  const regex = body
    .split('*')
    .map((part) => part.replace(/[.+?^${}()|[\]\\]/g, '\\$&'))
    .join('.*');
  return new RegExp(`^${regex}${anchored ? '$' : ''}`).test(path);
}

/** Pure, so it can be checked against the RFC's own examples without a network. */
export function verdictFor(groups: Group[], bot: string, kind: BotKind, path: string): BotVerdict {
  const token = bot.toLowerCase();
  let rules: Rule[] = [];
  let group: BotVerdict['group'] = 'none';

  const own = groups.filter((g) => g.agents.indexOf(token) !== -1);
  if (own.length) {
    group = 'own';
    rules = own.reduce<Rule[]>((all, g) => all.concat(g.rules), []);
  } else {
    const any = groups.filter((g) => g.agents.indexOf('*') !== -1);
    if (any.length) {
      group = 'any';
      rules = any.reduce<Rule[]>((all, g) => all.concat(g.rules), []);
    }
  }

  const target = normalizePath(path || '/');
  let best: Rule | null = null;
  for (const rule of rules) {
    if (!ruleMatches(rule.pattern, target)) continue;
    if (
      !best ||
      rule.pattern.length > best.pattern.length ||
      (rule.pattern.length === best.pattern.length && rule.allow && !best.allow)
    ) {
      best = rule;
    }
  }

  return { bot, kind, allowed: best ? best.allow : true, group, rule: best ? best.raw : null };
}

/* ------------------------------------------------------------------ */
/* Fetch                                                               */
/* ------------------------------------------------------------------ */

/**
 * Reads https://<host>/robots.txt for the given page URL. Never throws.
 * The path tested is the one passed in, so the caller can apply the file to
 * the URL the page actually landed on after redirects.
 */
export async function fetchRobots(pageUrl: string): Promise<{
  host: string;
  status: RobotsCheck['status'];
  httpStatus: number | null;
  groups: Group[];
}> {
  let origin: URL;
  try {
    origin = new URL(pageUrl);
  } catch {
    return { host: '', status: 'unreadable', httpStatus: null, groups: [] };
  }
  const host = origin.hostname;

  try {
    const { body, status, finalUrl } = await safeGet(
      `${origin.protocol}//${origin.host}/robots.txt`,
      'text/plain,*/*;q=0.5',
      Date.now() + FETCH_TIMEOUT_MS,
      { anyStatus: true },
    );
    if (status >= 200 && status < 300) {
      // After redirects: brand.com/robots.txt usually lands on www.brand.com,
      // which is the file that governs the page the visitor submitted.
      return {
        host: finalUrl.hostname,
        status: 'read',
        httpStatus: status,
        groups: parseRobots(body),
      };
    }
    if (status === 404 || status === 410) {
      return { host, status: 'missing', httpStatus: status, groups: [] };
    }
    return { host, status: 'unreadable', httpStatus: status, groups: [] };
  } catch {
    return { host, status: 'unreadable', httpStatus: null, groups: [] };
  }
}

/** Applies a fetched file to one path, for every bot in AI_BOTS. */
export function robotsCheck(
  fetched: Awaited<ReturnType<typeof fetchRobots>>,
  path: string,
): RobotsCheck {
  if (fetched.status === 'unreadable') {
    return { status: 'unreadable', host: fetched.host, httpStatus: fetched.httpStatus, bots: [] };
  }
  return {
    status: fetched.status,
    host: fetched.host,
    httpStatus: fetched.httpStatus,
    bots: AI_BOTS.map(({ bot, kind }) => verdictFor(fetched.groups, bot, kind, path)),
  };
}
