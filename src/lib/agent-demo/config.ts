// Tunables for the live agent demo. Everything the owner may want to change
// without reading the route code lives here.

/**
 * What the email gate holds back.
 *
 * - 'full'         the whole result is gated (v1 default)
 * - 'rewrite-only' verdict and gaps are returned ungated, only the rewrite is gated
 * - 'open'         nothing is gated: the run response carries the verdict, the
 *                  gaps, the rewrite and the rebuilt page, no name and no email
 *                  are asked, and the reveal step never runs
 *
 * All three modes are implemented end to end. Flip this one constant and the
 * API, the client and the payload all follow.
 *
 * THE PRICE OF 'open', STATED PLAINLY: the demo captures no leads at all. No
 * address is collected, no result email goes to the visitor, and the studio
 * notification becomes a run notice with no one to reply to. Everything the
 * page earns has to come from the call and teardown CTAs under the result. The
 * reveal route is left working so this constant is the only thing to change to
 * put the gate back.
 *
 * Under 'full' or 'rewrite-only', review it against the run-to-reveal ratio
 * (GET /api/agent-demo/metrics) after ~50 runs: below roughly 40%, try
 * 'rewrite-only' and compare. Under 'open' that ratio does not exist, and the
 * metrics endpoint reports it as null rather than as zero.
 */
export const GATE_MODE: 'full' | 'rewrite-only' | 'open' = 'open';

/** Held result lifetime. After this the token is gone and the run must be redone. */
export const TOKEN_TTL_MS = 30 * 60 * 1000;

/** One HTTP GET of the visitor's page. */
export const FETCH_TIMEOUT_MS = 8_000;
export const FETCH_MAX_REDIRECTS = 3;
export const FETCH_MAX_BYTES = 2 * 1024 * 1024;
export const USER_AGENT = 'MaubourgStudio-AgentDemo/1.0 (+https://maubourg.studio)';

/** Model call. */
export const MODEL_TIMEOUT_MS = 30_000;
export const MODEL_MAX_TOKENS = 1500;
/**
 * The spec asked for temperature 0.7. Sonnet 5 removed the sampling
 * parameters and rejects them, so the request sends none. Thinking is off for
 * the same reason max_tokens is small: thinking and the answer share that
 * budget, and the page has to return inside 30 seconds. Effort stays low - the
 * task is one page of copy, not a research problem.
 */
export const MODEL_EFFORT = 'low';
/**
 * Set ANTHROPIC_MODEL in Railway to pin a dated snapshot. The default is the
 * alias named in the build spec.
 */
export const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5';

/** How much of the page description the model is allowed to see. */
export const MAX_DESCRIPTION_CHARS = 4_000;
/** How much of it the visitor gets back as the "before" column. */
export const BEFORE_EXCERPT_CHARS = 200;
/** Rough length of the ungated teaser clause. */
export const TEASER_CHARS = 60;

/**
 * Budget guard. The model runs before the email gate, so an abusive visitor
 * can spend money without ever leaving an address. Ceiling is ~€10/month at
 * roughly 1-2 US cents a run.
 */
/**
 * Spec default is 2. Overridable only so a test window can run the ten
 * acceptance URLs from one machine without tripping it - put it back to 2
 * before the page is shown to anyone.
 */
export const RUNS_PER_IP_PER_DAY = Number(process.env.AGENT_DEMO_RUNS_PER_IP) || 2;
export const DAILY_GLOBAL_CAP = Number(process.env.AGENT_DEMO_DAILY_CAP) || 15;

/** Minimum usable description length before a page counts as a product page. */
export const MIN_DESCRIPTION_CHARS = 50;

/* ------------------------------------------------------------------ */
/* The rendered page                                                   */
/* ------------------------------------------------------------------ */

/**
 * Ceiling on the document we hold and serve back. The fetch cap is 2 MB of raw
 * page, most of which is JavaScript that the sanitiser removes, so a typical
 * Shopify product page lands between 100 and 400 KB here. Anything still above
 * this after cleaning is not worth holding in memory for thirty minutes: the
 * demo drops the render and falls back to the text result.
 */
export const RENDER_MAX_CHARS = 1_200_000;

/**
 * How long the rendered page stays servable after the reveal. Longer than the
 * run token because the visitor reads the result, then goes looking for the
 * download.
 */
export const PAGE_TTL_MS = 60 * 60 * 1000;

/**
 * Total characters the rendered-page store may hold. Same memory as everything
 * else here, so it needs a ceiling: past it, the oldest pages are dropped and
 * their links return 410, which the UI reports as expired.
 */
export const PAGE_STORE_MAX_CHARS = 24_000_000;
