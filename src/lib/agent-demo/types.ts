// Shared types for the live agent demo (/en/try-an-agent, /fr/essayer-un-agent).
//
// Validation here is hand-rolled rather than schema-driven. The repo has no
// runtime validation dependency and adding one for a single route would be a
// second pattern for something the lead routes already solve by hand.

export type Platform = 'shopify' | 'woocommerce' | 'other';
export type Confidence = 'high' | 'low';

export type Gap = {
  label: string;
  detail: string;
};

/** What the model returns, plus the excerpt we took from the page ourselves. */
export type AgentResult = {
  verdict: string;
  before_excerpt: string;
  rewrite: string;
  gaps: Gap[];
};

/** What one HTTP GET of the submitted URL yielded. */
export type ProductPage = {
  name: string;
  description: string;
  platform: Platform;
  confidence: Confidence;
  /** Base subtag read off <html lang>, or null when the page did not say. */
  language: string | null;
};

/**
 * Everything held server-side against a token between the run and the reveal.
 * It never leaves the server whole: the run route returns a teaser, the reveal
 * route returns the gated half, and the studio notification reads the rest.
 */
export type StoredRun = {
  result: AgentResult;
  productName: string;
  url: string;
  platform: Platform;
  detectedLanguage: string;
  confidence: Confidence;
  /** Site locale the visitor was browsing in, for the notification only. */
  locale: string;
  createdAt: number;
  expiresAt: number;
};

/** 200 body of POST /api/agent-demo. */
export type RunResponse = {
  ok: true;
  token: string;
  product_name: string;
  teaser: string;
  gaps_count: number;
  platform: Platform;
  detected_language: string;
  confidence: Confidence;
  /** Present only under GATE_MODE 'rewrite-only'. */
  verdict?: string;
  gaps?: Gap[];
};

/** 200 body of POST /api/agent-demo/reveal. */
export type RevealResponse = {
  ok: true;
  verdict: string;
  before_excerpt: string;
  rewrite: string;
  gaps: Gap[];
};

export type ErrorCode =
  | 'BAD_REQUEST'
  | 'INVALID_URL'
  | 'BLOCKED_URL'
  | 'INVALID_EMAIL'
  | 'FETCH_FAILED'
  | 'NOT_A_PRODUCT'
  | 'TOKEN_EXPIRED'
  | 'RATE_LIMITED'
  | 'MODEL_ERROR';

/**
 * Carries the error code out of the lib layer so the route can map it to an
 * HTTP status and a localized message. The `message` is for the server log
 * only — nothing here is ever shown to a visitor.
 */
export class DemoError extends Error {
  code: ErrorCode;

  constructor(code: ErrorCode, message?: string) {
    super(message ?? code);
    this.code = code;
    this.name = 'DemoError';
  }
}

export const HTTP_STATUS: Record<ErrorCode, number> = {
  BAD_REQUEST: 400,
  INVALID_URL: 400,
  BLOCKED_URL: 400,
  INVALID_EMAIL: 400,
  FETCH_FAILED: 502,
  NOT_A_PRODUCT: 422,
  TOKEN_EXPIRED: 410,
  RATE_LIMITED: 429,
  MODEL_ERROR: 502,
};
