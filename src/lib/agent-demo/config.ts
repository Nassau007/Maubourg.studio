// Tunables for the live agent demo. Everything the owner may want to change
// without reading the route code lives here.

/**
 * What the email gate holds back.
 *
 * - 'full'         the whole result is gated (v1 default)
 * - 'rewrite-only' verdict and gaps are returned ungated, only the rewrite is gated
 *
 * Both modes are implemented end to end. Flip this one constant and the API,
 * the client and the reveal payload all follow. Review it against the
 * run-to-reveal ratio (GET /api/agent-demo/metrics) after ~50 runs: below
 * roughly 40%, try 'rewrite-only' and compare.
 */
export const GATE_MODE: 'full' | 'rewrite-only' = 'full';

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
export const MODEL_TEMPERATURE = 0.7;
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
export const RUNS_PER_IP_PER_DAY = 2;
export const DAILY_GLOBAL_CAP = Number(process.env.AGENT_DEMO_DAILY_CAP) || 15;

/** Minimum usable description length before a page counts as a product page. */
export const MIN_DESCRIPTION_CHARS = 50;
