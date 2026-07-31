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

/**
 * Everything else the page said, read off the same document.
 *
 * Every field is literally present in the source. A null or an empty list
 * means we could not read it in one pass, NOT that the page lacks it, and the
 * system prompt says so in those words: the agent may never turn a field it
 * was not given into an absence it reports to a store owner.
 */
export type PageSignals = {
  pageTitle: string | null;
  metaDescription: string | null;
  /** As published, e.g. "49.00 EUR". Never judged, only stated. */
  price: string | null;
  availability: string | null;
  brand: string | null;
  sku: string | null;
  /** From JSON-LD aggregateRating only, which is written by the platform. */
  rating: string | null;
  /** "material: linen", "Weight: 320 g" - structured specifications. */
  specs: string[];
  /** "h1: …", "h2: …" in document order. */
  headings: string[];
  bullets: string[];
  /** Lines mentioning delivery, returns or a guarantee. */
  terms: string[];
  imageAlts: string[];
  imagesWithoutAlt: number;
  ctas: string[];
  descriptionShape: string;
  /** Whether we found the element the description came from. */
  descriptionBlockFound: boolean;
  url: string;
};

/** What one HTTP GET of the submitted URL yielded. */
export type ProductPage = {
  name: string;
  description: string;
  platform: Platform;
  confidence: Confidence;
  /** Base subtag read off <html lang>, or null when the page did not say. */
  language: string | null;
  /** The document itself, kept so the rewrite can be put back into it. */
  html: string;
  /** The URL actually fetched, after redirects. Used to rebase the render. */
  finalUrl: string;
  signals: PageSignals;
  /**
   * Variant labels the page offers, when the extraction path could see them
   * (sizes, colours, formats). Empty means we could not see them, which is not
   * the same as the page not having any - the prompt says so explicitly,
   * because a teardown that calls a five-size product sizeless is disproved by
   * the prospect in five seconds.
   */
  variants: string[];
};

/**
 * Everything held server-side against a token between the run and the reveal.
 * It never leaves the server whole: the run route returns a teaser, the reveal
 * route returns the gated half, and the studio notification reads the rest.
 */
export type StoredRun = {
  result: AgentResult;
  /**
   * The visitor's own page with the rewrite substituted into it, sanitized and
   * ready to load. Null when we could not be certain which element the
   * description came from, in which case the demo says so and shows the text
   * result on its own.
   */
  renderedHtml: string | null;
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
  /**
   * Whether the rendered page exists and is waiting behind the gate. Sent
   * before the email so the ask can promise it, and honestly withheld when the
   * substitution did not succeed.
   */
  render_available: boolean;
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
  /** Same-origin URL of the rendered page, or null when there is none. */
  preview_url: string | null;
  /** The same document as a download, without the preview marker. */
  download_url: string | null;
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
