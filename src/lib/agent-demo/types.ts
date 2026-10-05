// Shared types for the live agent demo (/en/try-an-agent, /fr/essayer-un-agent).
//
// Validation here is hand-rolled rather than schema-driven. The repo has no
// runtime validation dependency and adding one for a single route would be a
// second pattern for something the lead routes already solve by hand.

export type Platform = 'shopify' | 'woocommerce' | 'other';

/**
 * How the new description got into the rebuilt page. 'substituted': the old
 * one was in the page's HTML and the new one sits in its place. 'inserted':
 * the old one is not in the HTML at all (a script adds it), so the new one is
 * placed under the product title and labelled as added, never as a
 * replacement.
 */
export type RenderMode = 'substituted' | 'inserted';
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

/* ------------------------------------------------------------------ */
/* The three checks                                                    */
/* ------------------------------------------------------------------ */
//
// Measured by code, never by the model. The model is shown a summary of them
// and may comment on it; it can never produce, change or contradict one. The
// visitor reads these as facts about their own page, so each one is something
// that was literally read, and "could not read" is always a separate state from
// "absent".

/**
 * Where a fact was found in the HTML one plain request returns, with no
 * JavaScript run, which is what an AI crawler gets.
 *
 * - 'text'  in the text of the page itself
 * - 'meta'  only in structured data or meta tags, not in the readable text
 * - 'absent' in neither
 */
export type FactPlace = 'text' | 'meta' | 'absent';

export type CrawlerCheck = {
  name: FactPlace;
  price: FactPlace;
  availability: FactPlace;
  description: FactPlace;
  /** Words of the product description found in the place above. 0 when absent. */
  descriptionWords: number;
};

export type BotKind = 'training' | 'answer';

export type BotVerdict = {
  /** Product token, as the bot announces itself: GPTBot, PerplexityBot, ... */
  bot: string;
  /** Training crawlers feed a model; answer-time bots read a page to answer. */
  kind: BotKind;
  allowed: boolean;
  /** 'own' when the file has a group naming this bot, 'any' for the * group. */
  group: 'own' | 'any' | 'none';
  /** The rule that decided it, as written in the file, e.g. "Disallow: /". */
  rule: string | null;
};

export type RobotsCheck = {
  /**
   * - 'read'       a robots.txt was read and applied
   * - 'missing'    the site answered 404 or 410: no file, so every bot is allowed
   * - 'unreadable' timeout, network error, 5xx, or a refusal (403, 429...):
   *                nothing is claimed either way
   */
  status: 'read' | 'missing' | 'unreadable';
  /** Host whose robots.txt this is. One file per site, not per page. */
  host: string;
  httpStatus: number | null;
  /** Empty when status is 'unreadable'. */
  bots: BotVerdict[];
};

export type StructuredField =
  | 'name'
  | 'price'
  | 'availability'
  | 'brand'
  | 'identifier'
  | 'rating'
  | 'shipping'
  | 'returns';

export type StructuredCheck = {
  /**
   * - 'found'     a JSON-LD Product node was read
   * - 'none'      no Product node in any JSON-LD block, and no microdata either
   * - 'invalid'   a JSON-LD block mentions Product but is not valid JSON
   * - 'microdata' no JSON-LD Product, but the page marks the product up as
   *               microdata, which this check does not read field by field
   */
  status: 'found' | 'none' | 'invalid' | 'microdata';
  /** Empty unless status is 'found'. */
  fields: { field: StructuredField; present: boolean }[];
};

export type Checks = {
  crawler: CrawlerCheck;
  robots: RobotsCheck;
  structured: StructuredCheck;
};

/** Fields a Product block can carry that the page did not give us. */
export type BlockGap =
  | 'price'
  | 'availability'
  | 'brand'
  | 'image'
  | 'sku'
  | 'gtin'
  | 'rating'
  | 'shipping'
  | 'returns';

/**
 * The ready-to-paste JSON-LD Product block, built in code from facts read on
 * the page plus the rewritten description. Nothing in it is invented: a field
 * the page does not give is left out and listed in toComplete.
 */
export type ProductBlock = {
  /** The whole <script type="application/ld+json"> element, ready to paste. */
  snippet: string;
  toComplete: BlockGap[];
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
  checks: Checks;
  /** Gated with the rewrite: it carries the new description. */
  productBlock: ProductBlock;
  /**
   * The visitor's own page with the rewrite substituted into it, sanitized and
   * ready to load. Null when we could not be certain which element the
   * description came from, in which case the demo says so and shows the text
   * result on its own.
   */
  renderedHtml: string | null;
  /** Null exactly when renderedHtml is. */
  renderMode: RenderMode | null;
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

/**
 * 200 body of POST /api/agent-demo.
 *
 * Which optional fields are present is decided by GATE_MODE alone. The client
 * reads the response instead of importing that constant, so the switch stays a
 * server decision and the browser bundle carries no copy of it.
 */
export type RunResponse = {
  ok: true;
  /** Absent under GATE_MODE 'open': there is no second step to hold anything for. */
  token?: string;
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
  /**
   * How the rebuilt page carries the new description, so every label can say
   * "in place of" or "added" truthfully. Null when there is no page.
   */
  render_mode: RenderMode | null;
  /** Present under GATE_MODE 'rewrite-only' and 'open': the free half. */
  verdict?: string;
  gaps?: Gap[];
  checks?: Checks;
  /** Present only under GATE_MODE 'open' - the whole result, in one response. */
  rewrite?: string;
  product_block?: ProductBlock;
  before_excerpt?: string;
  preview_url?: string | null;
  download_url?: string | null;
};

/** 200 body of POST /api/agent-demo/reveal. */
export type RevealResponse = {
  ok: true;
  verdict: string;
  before_excerpt: string;
  rewrite: string;
  gaps: Gap[];
  checks: Checks;
  product_block: ProductBlock;
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
