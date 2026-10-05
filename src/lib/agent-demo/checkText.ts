// The three checks as plain sentences, in the copy of one dictionary. Pure:
// no Node imports, so the emails and the browser can both use it. The page
// draws richer markup from the same data; the emails need text.

import type { Dictionary } from '@/lib/i18n';
import type { Checks } from './types';

type CheckCopy = Dictionary['agentDemo']['checks'];

export const SHORT_DESCRIPTION_WORDS = 50;

export function fill(template: string, values: Record<string, string | number>): string {
  return Object.keys(values).reduce(
    (out, key) => out.split(`{${key}}`).join(String(values[key])),
    template,
  );
}

export function descriptionWordsLabel(copy: CheckCopy, words: number): string {
  return fill(words < SHORT_DESCRIPTION_WORDS ? copy.crawler.short : copy.crawler.words, { n: words });
}

/** One titled list of lines per check. */
export function checkSummary(checks: Checks, copy: CheckCopy): { title: string; lines: string[] }[] {
  const c = checks.crawler;
  const facts = copy.crawler.facts;
  const places = copy.crawler.places;
  const crawler = [
    `${facts.name}: ${places[c.name]}`,
    `${facts.price}: ${places[c.price]}`,
    `${facts.availability}: ${places[c.availability]}`,
    `${facts.description}: ${places[c.description]}${
      c.description === 'absent' ? '' : ` (${descriptionWordsLabel(copy, c.descriptionWords)})`
    }`,
  ];

  const r = checks.robots;
  let robots: string[];
  if (r.status === 'unreadable') {
    const reason = r.httpStatus
      ? fill(copy.robots.reasonStatus, { status: r.httpStatus })
      : copy.robots.reasonNoAnswer;
    robots = [fill(copy.robots.unreadable, { reason })];
  } else if (r.status === 'missing') {
    robots = [fill(copy.robots.missing, { status: r.httpStatus ?? 404 })];
  } else {
    robots = [fill(copy.robots.fileRead, { host: r.host })].concat(
      r.bots.map(
        (b) =>
          `${b.bot}: ${b.allowed ? copy.robots.allowed : copy.robots.blocked}${
            !b.allowed && b.rule ? ` (${copy.robots.byRule} ${b.rule})` : ''
          }`,
      ),
    );
  }

  const s = checks.structured;
  let structured: string[];
  if (s.status === 'found') {
    structured = s.fields.map(
      (f) => `${copy.structured.fields[f.field]}: ${f.present ? copy.structured.present : copy.structured.missing}`,
    );
  } else {
    structured = [copy.structured[s.status]];
  }

  return [
    { title: copy.crawler.title, lines: crawler },
    { title: copy.robots.title, lines: robots },
    { title: copy.structured.title, lines: structured },
  ];
}
