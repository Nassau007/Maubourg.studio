// One HTTP GET of a visitor-submitted URL, then extract a product name and a
// description from it.
//
// The visitor chooses the URL, so this module is the attack surface of the
// whole feature: without the address checks below, anyone could point the
// server at a cloud metadata endpoint or an internal service and read the
// response back through the model. Every hop is re-checked, because a public
// hostname is free to redirect to 127.0.0.1.

import { lookup } from 'node:dns/promises';
import { isIP } from 'node:net';
import {
  FETCH_MAX_BYTES,
  FETCH_MAX_REDIRECTS,
  FETCH_TIMEOUT_MS,
  MAX_DESCRIPTION_CHARS,
  MIN_DESCRIPTION_CHARS,
  USER_AGENT,
} from './config';
import { DemoError, type Confidence, type Platform, type ProductPage } from './types';

/* ------------------------------------------------------------------ */
/* Address safety                                                      */
/* ------------------------------------------------------------------ */

function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n))) return true;
  const [a, b] = parts;
  if (a === 0) return true; // 0.0.0.0/8
  if (a === 10) return true; // 10.0.0.0/8
  if (a === 127) return true; // loopback
  if (a === 169 && b === 254) return true; // link-local, incl. 169.254.169.254
  if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
  if (a === 192 && b === 168) return true; // 192.168.0.0/16
  if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
  if (a === 192 && b === 0) return true; // 192.0.0.0/24 + test nets
  if (a >= 224) return true; // multicast, reserved, broadcast
  return false;
}

function isPrivateIPv6(raw: string): boolean {
  const ip = raw.toLowerCase().replace(/^\[|\]$/g, '').split('%')[0];
  if (ip === '::' || ip === '::1') return true;
  // IPv4-mapped (::ffff:127.0.0.1) hides an IPv4 address inside an IPv6 one.
  const mapped = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isPrivateIPv4(mapped[1]);
  if (ip.startsWith('fe80')) return true; // link-local
  if (/^f[cd]/.test(ip)) return true; // unique local fc00::/7
  if (ip.startsWith('ff')) return true; // multicast
  return false;
}

function isPrivateAddress(ip: string): boolean {
  const kind = isIP(ip);
  if (kind === 4) return isPrivateIPv4(ip);
  if (kind === 6) return isPrivateIPv6(ip);
  return true;
}

/**
 * Rejects anything that is not a public http(s) address, resolving the
 * hostname and judging the answer rather than the string. Throws BLOCKED_URL
 * or INVALID_URL; returns nothing when the address is acceptable.
 */
export async function assertPublicUrl(raw: string): Promise<URL> {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new DemoError('INVALID_URL', `unparseable url`);
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new DemoError('BLOCKED_URL', `scheme ${url.protocol}`);
  }

  const host = url.hostname.toLowerCase().replace(/^\[|\]$/g, '');
  if (!host) throw new DemoError('INVALID_URL', 'no host');
  if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local')) {
    throw new DemoError('BLOCKED_URL', 'localhost');
  }
  if (host === 'metadata.google.internal' || host.endsWith('.internal')) {
    throw new DemoError('BLOCKED_URL', 'internal host');
  }

  // A literal IP needs no lookup; a name does, and the resolved answer is what
  // the request will actually connect to.
  if (isIP(host)) {
    if (isPrivateAddress(host)) throw new DemoError('BLOCKED_URL', 'private ip literal');
    return url;
  }

  if (!host.includes('.')) throw new DemoError('BLOCKED_URL', 'unqualified host');

  let addresses: { address: string }[];
  try {
    addresses = await lookup(host, { all: true });
  } catch {
    throw new DemoError('FETCH_FAILED', 'dns lookup failed');
  }
  if (addresses.length === 0) throw new DemoError('FETCH_FAILED', 'no dns answer');
  for (const { address } of addresses) {
    if (isPrivateAddress(address)) throw new DemoError('BLOCKED_URL', 'resolves to private ip');
  }

  return url;
}

/* ------------------------------------------------------------------ */
/* Fetching                                                            */
/* ------------------------------------------------------------------ */

/**
 * GET with a byte cap and a manual redirect loop, so every hop goes back
 * through assertPublicUrl. Returns the body text and the final URL.
 */
async function safeGet(
  startUrl: string,
  accept: string,
  deadline: number,
): Promise<{ body: string; finalUrl: URL; status: number }> {
  let target = await assertPublicUrl(startUrl);

  for (let hop = 0; hop <= FETCH_MAX_REDIRECTS; hop += 1) {
    const remaining = deadline - Date.now();
    if (remaining <= 0) throw new DemoError('FETCH_FAILED', 'timeout');

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), Math.min(remaining, FETCH_TIMEOUT_MS));

    let res: Response;
    try {
      res = await fetch(target.toString(), {
        method: 'GET',
        redirect: 'manual',
        signal: controller.signal,
        headers: {
          'User-Agent': USER_AGENT,
          Accept: accept,
          'Accept-Language': 'fr,en;q=0.8,*;q=0.5',
        },
      });
    } catch {
      throw new DemoError('FETCH_FAILED', 'network error');
    } finally {
      clearTimeout(timer);
    }

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location');
      if (!location) throw new DemoError('FETCH_FAILED', 'redirect without location');
      if (hop === FETCH_MAX_REDIRECTS) throw new DemoError('FETCH_FAILED', 'too many redirects');
      target = await assertPublicUrl(new URL(location, target).toString());
      continue;
    }

    if (!res.ok) throw new DemoError('FETCH_FAILED', `status ${res.status}`);

    const body = await readCapped(res);
    return { body, finalUrl: target, status: res.status };
  }

  throw new DemoError('FETCH_FAILED', 'too many redirects');
}

/** Reads at most FETCH_MAX_BYTES, aborting rather than buffering a huge page. */
async function readCapped(res: Response): Promise<string> {
  const reader = res.body?.getReader();
  if (!reader) return res.text();

  const decoder = new TextDecoder('utf-8');
  let out = '';
  let bytes = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > FETCH_MAX_BYTES) {
      await reader.cancel().catch(() => {});
      break;
    }
    out += decoder.decode(value, { stream: true });
  }
  out += decoder.decode();
  return out;
}

/* ------------------------------------------------------------------ */
/* HTML helpers                                                        */
/* ------------------------------------------------------------------ */

const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  eacute: 'é',
  egrave: 'è',
  ecirc: 'ê',
  agrave: 'à',
  ccedil: 'ç',
  ugrave: 'ù',
  ocirc: 'ô',
  icirc: 'î',
  laquo: '«',
  raquo: '»',
  hellip: '…',
  rsquo: '’',
  lsquo: '‘',
  ldquo: '“',
  rdquo: '”',
  ndash: '–',
  mdash: '—',
  euro: '€',
  deg: '°',
};

function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[String(name).toLowerCase()] ?? m);
}

/** Strips tags and collapses whitespace. Scripts and styles go first. */
export function toPlainText(html: string): string {
  return decodeEntities(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|li|h[1-6])>/gi, '\n')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/[ \t ]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function metaContent(html: string, property: string): string | null {
  const pattern = new RegExp(
    `<meta[^>]+(?:property|name)\\s*=\\s*["']${property}["'][^>]*>`,
    'i',
  );
  const tag = html.match(pattern)?.[0];
  if (!tag) return null;
  const content = tag.match(/content\s*=\s*["']([\s\S]*?)["']/i)?.[1];
  return content ? decodeEntities(content).trim() : null;
}

function htmlLang(html: string): string | null {
  const tag = html.match(/<html[^>]*>/i)?.[0];
  const value = tag?.match(/\blang\s*=\s*["']([a-z]{2,3})(?:[-_][a-z0-9]+)?["']/i)?.[1];
  return value ? value.toLowerCase() : null;
}

function detectPlatform(html: string): Platform {
  if (/cdn\.shopify\.com|Shopify\.theme|"Shopify"|shopify-features/i.test(html)) return 'shopify';
  if (/wp-content|woocommerce|wp-json/i.test(html)) return 'woocommerce';
  return 'other';
}

/* ------------------------------------------------------------------ */
/* Extraction                                                          */
/* ------------------------------------------------------------------ */

type Extracted = { name: string; description: string; variants: string[] } | null;

function usable(name: unknown, description: unknown, variants: string[] = []): Extracted {
  const n = typeof name === 'string' ? name.trim() : '';
  const d = typeof description === 'string' ? toPlainText(description) : '';
  if (!n || d.length < MIN_DESCRIPTION_CHARS) return null;
  return { name: n, description: d, variants };
}

/**
 * Variant labels off the rendered page: the option pickers a buyer actually
 * sees. Without these the agent reads a description that never mentions sizing
 * and concludes the product has no sizes, which is the one kind of error a
 * prospect disproves instantly. Deliberately generous about what counts as a
 * picker and strict about length, since this feeds a prompt, not a database.
 */
function variantsFromHtml(html: string): string[] {
  const out: string[] = [];

  for (const select of html.match(/<select\b[\s\S]*?<\/select>/gi) || []) {
    const head = select.slice(0, select.indexOf('>') + 1);
    if (!/variant|option|size|taille|colou?r|couleur|attribute|pa_/i.test(head)) continue;
    // A picker the buyer cannot see is not a picker. Greige hides a
    // "product-size" select holding 41 bare measurements; fed to the agent it
    // read as "the sizes are unlabelled numbers", which is not true.
    if (/\bhid(?:e|den)\b|aria-hidden\s*=\s*["']true["']|display\s*:\s*none/i.test(head)) continue;

    const values = (select.match(/<option\b[^>]*>[\s\S]*?<\/option>/gi) || [])
      .map(toPlainText)
      .filter(Boolean);
    // All-numeric means a quantity or a measurement table, not sizes a buyer
    // picks by name. It tells the agent nothing and misleads it about the rest.
    if (!values.length || values.every((v) => /^[\d.,\s]+$/.test(v))) continue;
    out.push(...values);
  }

  // Most themes render swatches as radio labels rather than a select.
  const labels =
    html.match(
      /<label\b[^>]*\bfor\s*=\s*["'][^"']*(?:variant|option|size|swatch)[^"']*["'][^>]*>[\s\S]*?<\/label>/gi,
    ) || [];
  for (const label of labels) out.push(toPlainText(label));

  return tidyVariants(out);
}

/** Drops placeholders and duplicates, caps the list so it cannot flood the prompt. */
function tidyVariants(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of values) {
    const v = raw.replace(/\s+/g, ' ').trim();
    if (!v || v.length > 60) continue;
    if (/^(choose|select|choisir|s[ée]lectionner|pick|--?)$/i.test(v)) continue;
    const key = v.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(v);
    if (out.length >= 30) break;
  }
  return out;
}

/**
 * Walks a parsed JSON-LD value for the first node whose @type includes
 * "Product". Handles the three shapes seen in the wild: a bare object, an
 * array of nodes, and an @graph wrapper.
 */
function findProductNode(value: unknown, depth = 0): Record<string, unknown> | null {
  if (depth > 6 || value === null || typeof value !== 'object') return null;

  if (Array.isArray(value)) {
    for (const item of value) {
      const hit = findProductNode(item, depth + 1);
      if (hit) return hit;
    }
    return null;
  }

  const node = value as Record<string, unknown>;
  const type = node['@type'];
  const types = Array.isArray(type) ? type : [type];
  if (types.some((t) => typeof t === 'string' && /product/i.test(t))) return node;

  // Deliberately not walking itemListElement: a homepage carousel publishes
  // Product nodes for products it merely links to, and rewriting one of those
  // would answer a URL the visitor never submitted.
  for (const key of ['@graph', 'mainEntity']) {
    const hit = findProductNode(node[key], depth + 1);
    if (hit) return hit;
  }
  return null;
}

/**
 * JSON-LD blocks, read by regex rather than a DOM parser. The repo has no HTML
 * parser dependency and this needs only the contents of one script tag.
 */
function fromJsonLd(html: string): Extracted {
  const blocks = html.match(
    /<script[^>]+type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  );
  if (!blocks) return null;

  for (const block of blocks) {
    const json = block.replace(/^[\s\S]*?>/, '').replace(/<\/script>$/i, '');
    let parsed: unknown;
    try {
      parsed = JSON.parse(json.trim());
    } catch {
      continue;
    }
    const product = findProductNode(parsed);
    if (!product) continue;
    const hit = usable(product.name, product.description);
    if (hit) return hit;
  }
  return null;
}

/**
 * Guard on the weakest extraction path. og:title plus a few paragraphs exists
 * on every homepage ever built, so without this a store's front page would
 * come back as a "product" and the agent would rewrite a page that sells
 * nothing in particular. Requires the page to say it is a product somewhere:
 * the OG type, the URL shape, a price marker, or an add-to-cart control.
 */
function looksLikeProductPage(html: string, url: URL): boolean {
  const path = url.pathname.replace(/\/+$/, '');

  // A store front page carries add-to-cart controls and price markup on its
  // tiles, so those signals alone accepted kidur.fr/ as a product and had the
  // agent rewrite a homepage. The root is never a product page.
  if (!path) return false;
  // Neither is a collection or category listing. Matched at exactly one
  // segment deep, because plenty of real product URLs sit inside a collection
  // path (/collection/tabouret/h10-w-stool-65 is a stool, not a listing).
  if (/^(?:\/[a-z]{2})?\/(?:collections?|categor(?:y|ie|ies)|blogs?|search)\/[^/]+$/i.test(path)) {
    return false;
  }

  if (/^product\b/i.test(metaContent(html, 'og:type') || '')) return true;
  if (/\/(products?|produits?|produkt|prodotto|p)\/[^/]+/i.test(url.pathname)) return true;
  if (/itemprop\s*=\s*["']price["']|property\s*=\s*["']product:price:amount["']/i.test(html)) {
    return true;
  }
  if (/name\s*=\s*["']add["']|add-to-cart|ajouter-au-panier|\/cart\/add/i.test(html)) return true;
  return false;
}

/** Open Graph plus the largest paragraph cluster. The weakest path: low confidence. */
function fromOpenGraph(html: string, url: URL): Extracted {
  if (!looksLikeProductPage(html, url)) return null;

  const name = metaContent(html, 'og:title') || html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  const ogDescription = metaContent(html, 'og:description');

  const scope =
    html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ||
    html.match(/<[^>]+itemprop\s*=\s*["']description["'][\s\S]*?<\/[a-z]+>/i)?.[0] ||
    html;

  const paragraphs = (scope.match(/<p\b[^>]*>[\s\S]*?<\/p>/gi) || [])
    .map(toPlainText)
    .filter((p) => p.length > 40);
  const cluster = paragraphs.sort((a, b) => b.length - a.length).slice(0, 5).join('\n');

  const description = [ogDescription, cluster].filter(Boolean).join('\n').trim();
  return usable(name ? decodeEntities(name).trim() : '', description);
}

/**
 * Shopify's own JSON for a product handle. This is the one permitted second
 * request, and only when the path shape says it will exist.
 */
async function fromShopifyJson(
  url: URL,
  platform: Platform,
  deadline: number,
): Promise<Extracted> {
  if (platform !== 'shopify') return null;
  if (!/\/products\/[^/]+\/?$/.test(url.pathname)) return null;

  const jsonUrl = new URL(url.toString());
  jsonUrl.search = '';
  jsonUrl.pathname = `${jsonUrl.pathname.replace(/\/$/, '')}.json`;

  try {
    const { body } = await safeGet(jsonUrl.toString(), 'application/json', deadline);
    const parsed = JSON.parse(body) as {
      product?: {
        title?: unknown;
        body_html?: unknown;
        options?: unknown;
        variants?: unknown;
      };
    };
    if (!parsed.product) return null;

    // The best variant source in the whole pipeline: the store's own options,
    // named ("Size: S, M, L") rather than left as bare labels.
    const named: string[] = [];
    if (Array.isArray(parsed.product.options)) {
      for (const opt of parsed.product.options) {
        if (!opt || typeof opt !== 'object') continue;
        const o = opt as { name?: unknown; values?: unknown };
        const name = typeof o.name === 'string' ? o.name.trim() : '';
        const values = Array.isArray(o.values)
          ? o.values.filter((v): v is string => typeof v === 'string')
          : [];
        if (name && values.length) named.push(`${name}: ${values.join(', ')}`);
      }
    }
    if (!named.length && Array.isArray(parsed.product.variants)) {
      for (const variant of parsed.product.variants) {
        if (!variant || typeof variant !== 'object') continue;
        const title = (variant as { title?: unknown }).title;
        if (typeof title === 'string') named.push(title);
      }
    }

    return usable(parsed.product.title, parsed.product.body_html, tidyVariants(named));
  } catch {
    return null;
  }
}

/**
 * Fetches the submitted URL once and returns what a copy agent can work from.
 * Throws DemoError with BLOCKED_URL, INVALID_URL, FETCH_FAILED or NOT_A_PRODUCT.
 */
export async function fetchProduct(rawUrl: string): Promise<ProductPage> {
  const deadline = Date.now() + FETCH_TIMEOUT_MS * 2;
  const { body: html, finalUrl } = await safeGet(rawUrl, 'text/html,application/xhtml+xml', deadline);

  const platform = detectPlatform(html);
  const language = htmlLang(html);

  let confidence: Confidence = 'high';

  // The spec puts JSON-LD first. On Shopify that is the wrong way round: its
  // JSON-LD description is the opening paragraph only (657 characters on
  // Greige against 1500 in the real page) and it names no variants. The agent
  // then judged a page it had only seen a third of, and reported the care
  // instructions and the size run as missing when both were there. The store's
  // own product JSON is the complete record, so it goes first where it exists.
  // Both paths are equally trustworthy, so confidence stays high either way.
  let extracted = await fromShopifyJson(finalUrl, platform, deadline);

  if (!extracted) {
    extracted = fromJsonLd(html);
  }
  if (!extracted) {
    extracted = fromOpenGraph(html, finalUrl);
    confidence = 'low';
  }
  if (!extracted) {
    throw new DemoError('NOT_A_PRODUCT', 'no product data found');
  }

  // The store's own option list wins outright. Scraping the rendered page is
  // the fallback for the paths that carry no variants (JSON-LD, Open Graph),
  // never a supplement - merging the two let theme markup dilute good data.
  const variants = extracted.variants.length
    ? extracted.variants
    : tidyVariants(variantsFromHtml(html));

  return {
    name: extracted.name.slice(0, 200),
    description: extracted.description.slice(0, MAX_DESCRIPTION_CHARS),
    platform,
    confidence,
    language,
    variants,
  };
}
