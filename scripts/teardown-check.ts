// Local command for the studio's cold GEO teardown (step 5 of the process in
// the sales-machine repo: Services/GEO Audits/Method/Cold_GEO_teardown_process.md).
//
// Runs the live agent demo's own checks on one or more product page URLs and
// writes the results to a JSON file. It is not part of the website: nothing in
// src/app imports it, and it runs only on the studio's Mac.
//
// It reuses the demo modules as they are, so a teardown and the demo can never
// disagree about the same page. It deliberately imports none of the parts that
// send email, store leads, rate-limit or publish: the only network calls are
// the page itself (plus the Shopify product JSON the extraction may read), its
// robots.txt, and, with --rewrite only, the Anthropic API.
//
// Usage:
//   npm run teardown:check -- <url> [<url> ...] --out <file.json> [--rewrite]
//
// --rewrite runs the demo's product rewrite (same prompt, same model settings
// as src/lib/agent-demo/prompt.ts). The Anthropic key is read at run time from
// the macOS login Keychain (service "maubourg-anthropic-teardown"), never from
// .env or the shell. When the item is missing the checks still run and the
// rewrite is skipped with a message.

import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import { buildProductBlock, crawlerCheck, structuredCheck } from '../src/lib/agent-demo/checks';
import { MODEL, MODEL_EFFORT, MODEL_MAX_TOKENS, USER_AGENT } from '../src/lib/agent-demo/config';
import { fetchProduct } from '../src/lib/agent-demo/fetchProduct';
import { productJsonLd } from '../src/lib/agent-demo/htmlText';
import { detectLanguage, runAgent } from '../src/lib/agent-demo/prompt';
import { AI_BOTS, fetchRobots, robotsCheck } from '../src/lib/agent-demo/robots';
import { DemoError, type Checks, type Gap, type ProductBlock } from '../src/lib/agent-demo/types';

const KEYCHAIN_SERVICE = 'maubourg-anthropic-teardown';

type UrlResult = {
  url: string;
  fetchedAt: string;
  finalUrl: string | null;
  platform: string | null;
  productName: string | null;
  /** 'high' when read from the store's product JSON or JSON-LD, 'low' from Open Graph and paragraphs. */
  extractionConfidence: string | null;
  detectedLanguage: string | null;
  /** The description the checks were run against, as the demo extracted it. The "before". */
  currentDescription: string | null;
  checks: Partial<Checks>;
  /** Built by the demo's code. Without --rewrite it carries the current description. */
  productBlock: (ProductBlock & { descriptionSource: 'current' | 'rewrite' }) | null;
  rewrite: {
    status: 'done' | 'skipped' | 'failed';
    reason?: string;
    model?: string;
    verdict?: string;
    rewrite?: string;
    gaps?: Gap[];
  } | null;
  errors: { step: string; code: string; detail: string }[];
};

/* ------------------------------------------------------------------ */
/* Arguments                                                           */
/* ------------------------------------------------------------------ */

function usage(message?: string): never {
  if (message) console.error(`Error: ${message}\n`);
  console.error(
    'Usage: npm run teardown:check -- <product url> [<product url> ...] --out <file.json> [--rewrite]',
  );
  process.exit(2);
}

function parseArgs(argv: string[]): { urls: string[]; out: string; rewrite: boolean } {
  const urls: string[] = [];
  let out = '';
  let rewrite = false;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--out') {
      out = argv[i + 1] || '';
      i += 1;
    } else if (arg.startsWith('--out=')) {
      out = arg.slice('--out='.length);
    } else if (arg === '--rewrite') {
      rewrite = true;
    } else if (arg === '--help' || arg === '-h') {
      usage();
    } else if (arg.startsWith('--')) {
      usage(`unknown option ${arg}`);
    } else {
      urls.push(arg);
    }
  }
  if (!urls.length) usage('give at least one product page URL');
  if (!out) usage('--out <file.json> is required');
  if (!out.toLowerCase().endsWith('.json')) usage('--out must name a .json file');
  return { urls, out: resolve(out), rewrite };
}

/** Same leniency as the demo route: a bare domain gets https:// in front. */
function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/* ------------------------------------------------------------------ */
/* The Anthropic key, from the Keychain only                           */
/* ------------------------------------------------------------------ */

/**
 * Returns true when the key was found and handed to prompt.ts for this
 * process. The key is never printed: stderr from `security` is discarded and
 * only a fixed message is shown when the item is missing.
 */
function loadKeyFromKeychain(): boolean {
  try {
    const key = execFileSync('security', ['find-generic-password', '-s', KEYCHAIN_SERVICE, '-w'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (!key) return false;
    // prompt.ts reads the key from process.env, as the demo does on Railway.
    // Set in this process only, from the Keychain, never from .env.
    process.env.ANTHROPIC_API_KEY = key;
    return true;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* One URL                                                             */
/* ------------------------------------------------------------------ */

function errorOf(err: unknown): { code: string; detail: string } {
  if (err instanceof DemoError) return { code: err.code, detail: err.message };
  if (err instanceof Error) return { code: 'UNEXPECTED', detail: err.message };
  return { code: 'UNEXPECTED', detail: String(err) };
}

async function checkOne(rawUrl: string, withRewrite: boolean): Promise<UrlResult> {
  const url = normalizeUrl(rawUrl);
  const result: UrlResult = {
    url,
    fetchedAt: new Date().toISOString(),
    finalUrl: null,
    platform: null,
    productName: null,
    extractionConfidence: null,
    detectedLanguage: null,
    currentDescription: null,
    checks: {},
    productBlock: null,
    rewrite: null,
    errors: [],
  };

  // Same order as the demo route: robots.txt is started first and never
  // throws; an unreadable file comes back as 'unreadable', never as a block.
  const robotsPending = fetchRobots(url);

  let page: Awaited<ReturnType<typeof fetchProduct>> | null = null;
  try {
    page = await fetchProduct(url);
  } catch (err) {
    result.errors.push({ step: 'fetch_page', ...errorOf(err) });
  }

  // Applied to the URL the page landed on, as the demo does. When the page
  // itself failed, the submitted URL's path is used instead.
  const landed = new URL(page ? page.finalUrl : url);
  result.checks.robots = robotsCheck(await robotsPending, `${landed.pathname}${landed.search}`);

  if (!page) return result;

  result.finalUrl = page.finalUrl;
  result.platform = page.platform;
  result.productName = page.name;
  result.extractionConfidence = page.confidence;
  const language = detectLanguage(page);
  result.detectedLanguage = language;
  result.currentDescription = page.description;

  try {
    result.checks.crawler = crawlerCheck({
      html: page.html,
      name: page.name,
      description: page.description,
      jsonld: productJsonLd(page.html),
    });
  } catch (err) {
    result.errors.push({ step: 'crawler_check', ...errorOf(err) });
  }
  try {
    result.checks.structured = structuredCheck(page.html);
  } catch (err) {
    result.errors.push({ step: 'structured_check', ...errorOf(err) });
  }

  if (withRewrite) {
    const checks = result.checks;
    if (!process.env.ANTHROPIC_API_KEY) {
      result.rewrite = { status: 'skipped', reason: `no Keychain item "${KEYCHAIN_SERVICE}"` };
    } else if (!checks.crawler || !checks.robots || !checks.structured) {
      result.rewrite = { status: 'skipped', reason: 'a check failed, so the agent input is incomplete' };
    } else {
      try {
        const model = await runAgent(page, language, checks as Checks);
        result.rewrite = {
          status: 'done',
          model: MODEL,
          verdict: model.verdict,
          rewrite: model.rewrite,
          gaps: model.gaps,
        };
      } catch (err) {
        const e = errorOf(err);
        result.rewrite = { status: 'failed', reason: `${e.code}: ${e.detail}` };
        result.errors.push({ step: 'rewrite', ...e });
      }
    }
  }

  // The demo builds this block around the rewrite. Without one, it is built
  // around the page's current description, so the rest of the block (offers,
  // brand, image, identifiers, what is still missing) can be read either way.
  try {
    const rewritten = result.rewrite?.status === 'done' ? result.rewrite.rewrite : undefined;
    const block = buildProductBlock({
      html: page.html,
      name: page.name,
      finalUrl: page.finalUrl,
      rewrite: rewritten || page.description,
    });
    result.productBlock = { ...block, descriptionSource: rewritten ? 'rewrite' : 'current' };
  } catch (err) {
    result.errors.push({ step: 'product_block', ...errorOf(err) });
  }

  return result;
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

async function main(): Promise<void> {
  const { urls, out, rewrite } = parseArgs(process.argv.slice(2));

  // Whatever the shell or a loaded .env holds is ignored: with --rewrite the
  // key comes from the Keychain, and without it no model call is possible.
  delete process.env.ANTHROPIC_API_KEY;

  if (rewrite && !loadKeyFromKeychain()) {
    console.error(
      `No Anthropic key in the login Keychain under the service "${KEYCHAIN_SERVICE}". ` +
        'The checks will run; the rewrite is skipped. To store the key, run: ' +
        `security add-generic-password -s ${KEYCHAIN_SERVICE} -a "$USER" -w`,
    );
  }

  const results: UrlResult[] = [];
  for (const raw of urls) {
    console.error(`Checking ${raw}`);
    // checkOne records its own failures; this catch is for anything it missed,
    // so one bad URL never stops the others.
    try {
      const r = await checkOne(raw, rewrite);
      results.push(r);
      const status = r.errors.length ? `${r.errors.length} error(s): ${r.errors.map((e) => e.code).join(', ')}` : 'ok';
      console.error(`  ${status}${r.rewrite ? `, rewrite ${r.rewrite.status}` : ''}`);
    } catch (err) {
      results.push({
        url: raw,
        fetchedAt: new Date().toISOString(),
        finalUrl: null,
        platform: null,
        productName: null,
        extractionConfidence: null,
        detectedLanguage: null,
        currentDescription: null,
        checks: {},
        productBlock: null,
        rewrite: null,
        errors: [{ step: 'run', ...errorOf(err) }],
      });
      console.error(`  failed: ${errorOf(err).code}`);
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    tool: 'scripts/teardown-check.ts (agent demo checks, run locally)',
    userAgent: USER_AGENT,
    botsChecked: AI_BOTS,
    rewriteRequested: rewrite,
    model: rewrite ? { name: MODEL, effort: MODEL_EFFORT, maxTokens: MODEL_MAX_TOKENS } : null,
    results,
  };

  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  console.error(`Wrote ${results.length} result(s) to ${out}`);
}

main().catch((err) => {
  console.error(`teardown-check failed: ${errorOf(err).detail}`);
  process.exit(1);
});
