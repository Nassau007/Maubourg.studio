// Two of the three checks, and the ready-to-paste Product block. All code, no
// model: the visitor reads these as facts about their own page, so each one is
// something read off the HTML we fetched, and a state we could not read is
// never presented as an absence. The third check, robots.txt, needs its own
// request and lives in robots.ts.
//
// The HTML in question is the one plain GET in fetchProduct.ts returned, with
// no JavaScript run. That is the point of the first check: it is close to what
// an AI crawler gets, and a description a theme injects with JavaScript, or
// one that only exists in the Shopify product JSON, is not in it.

import { flatten, flattenText } from './dom';
import { metaContent, productJsonLdStatus, toPlainText } from './htmlText';
import type {
  BlockGap,
  CrawlerCheck,
  FactPlace,
  ProductBlock,
  StructuredCheck,
  StructuredField,
} from './types';

/* ------------------------------------------------------------------ */
/* Small readers                                                       */
/* ------------------------------------------------------------------ */

type Node = Record<string, unknown>;

function str(v: unknown): string | null {
  if (typeof v === 'string') return v.trim() || null;
  if (typeof v === 'number' && Number.isFinite(v)) return String(v);
  return null;
}

/** A JSON-LD value that is set: a non-empty string, a number, a node or a non-empty list. */
function present(v: unknown): boolean {
  if (v === null || v === undefined) return false;
  if (typeof v === 'string') return v.trim() !== '';
  if (typeof v === 'number') return Number.isFinite(v);
  if (Array.isArray(v)) return v.some(present);
  if (typeof v === 'object') return Object.keys(v as Node).length > 0;
  return false;
}

/** Every Offer under a Product: a single node, a list, or an AggregateOffer wrapping either. */
function allOffers(product: Node): Node[] {
  const out: Node[] = [];
  const visit = (v: unknown, depth: number) => {
    if (!v || typeof v !== 'object' || depth > 3 || out.length >= 50) return;
    if (Array.isArray(v)) {
      v.forEach((item) => visit(item, depth + 1));
      return;
    }
    const node = v as Node;
    out.push(node);
    if (node.offers) visit(node.offers, depth + 1);
  };
  visit(product.offers, 0);
  return out;
}

function anyOffer(product: Node, test: (offer: Node) => boolean): boolean {
  return allOffers(product).some(test);
}

const GTIN_KEYS = ['gtin', 'gtin8', 'gtin12', 'gtin13', 'gtin14'];

function hasGtin(node: Node): boolean {
  return GTIN_KEYS.some((k) => present(node[k]));
}

/** The page body only. <title> and the meta tags in <head> are metadata, not text. */
function bodyOf(html: string): string {
  const at = html.search(/<body\b/i);
  return at === -1 ? html : html.slice(at);
}

/* ------------------------------------------------------------------ */
/* 1. What an AI crawler sees                                          */
/* ------------------------------------------------------------------ */

// Accented words sit outside the \b group: without the u flag JavaScript counts
// "é" as a non-word character, so \b before "épuisé" never matches.
const STOCK_WORDS =
  /\b(?:en stock|in stock|out of stock|rupture de stock|sold out|indisponible|unavailable|plus que \d+|only \d+ left|low stock|back in stock|de retour en stock|pre-?order)\b|[ée]puis[ée]|pr[ée]-?commande|stock limit[ée]/i;

const CURRENCY = '(?:€|\\$|£|\\b(?:eur|euros?|usd|gbp|chf)\\b)';

/** "1 290,00", "1,290.00" and "49.9" all read as numbers. */
function parseAmount(raw: string): number {
  let s = raw.replace(/[\s\u00a0\u202f']/g, '');
  if (/,\d{1,2}$/.test(s)) s = s.replace(/\./g, '').replace(',', '.');
  else s = s.replace(/,/g, '');
  return Number(s);
}

/** The published amount, written the way a page prints it, next to a currency. */
function priceInText(plain: string, amount: string): boolean {
  const value = parseAmount(amount);
  if (!Number.isFinite(value) || value <= 0) return false;
  const whole = Math.floor(value).toString();
  const cents = Math.round((value - Math.floor(value)) * 100);
  // 1290 may be printed 1 290, 1.290 or 1,290.
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, "[\\s\\u00a0\\u202f.,']?");
  const decimals = cents ? `[.,]${String(cents).padStart(2, '0')}` : '(?:[.,]00?)?';
  const number = `(?<![\\d.,])${grouped}${decimals}(?![\\d])`;
  const re = new RegExp(`${CURRENCY}\\s?${number}|${number}\\s?${CURRENCY}`, 'i');
  return re.test(plain);
}

export function crawlerCheck(input: {
  html: string;
  name: string;
  description: string;
  jsonld: Node | null;
}): CrawlerCheck {
  const { html, name, description, jsonld } = input;
  const body = bodyOf(html);
  // Letters and digits only, scripts, styles and templates skipped: the same
  // reduction dom.ts uses to find the description, so an entity or an accent
  // written two ways never reads as a mismatch.
  const haystack = flatten(body).text;
  const plain = toPlainText(body);
  // Stock words and a bare price are looked for in <main> when there is one,
  // so a "Sold out" badge on a related product in the footer does not count.
  const mainPlain = toPlainText(body.match(/<main\b[\s\S]*?<\/main>/i)?.[0] || body);
  const offers = jsonld ? allOffers(jsonld) : [];

  // Name. Matched on its opening characters, so a title the page suffixes
  // with " - Store name" in its metadata still finds its H1.
  const nameNeedle = flattenText(toPlainText(name)).slice(0, 30);
  const h1s = (body.match(/<h1\b[\s\S]*?<\/h1>/gi) || []).map((h) => flatten(h).text);
  const fullName = flattenText(toPlainText(name));
  let namePlace: FactPlace = 'absent';
  if (
    (nameNeedle.length >= 3 && haystack.indexOf(nameNeedle) !== -1) ||
    h1s.some((h) => h.length >= 6 && fullName.indexOf(h) !== -1)
  ) {
    namePlace = 'text';
  } else if (
    (jsonld && present(jsonld.name)) ||
    metaContent(html, 'og:title') ||
    /<title[^>]*>\s*\S/i.test(html)
  ) {
    namePlace = 'meta';
  }

  // Price
  const amount =
    offers.map((o) => str(o.price) || str(o.lowPrice)).filter(Boolean)[0] ||
    metaContent(html, 'product:price:amount') ||
    metaContent(html, 'og:price:amount');
  let pricePlace: FactPlace = 'absent';
  if (amount) {
    pricePlace = priceInText(plain, amount) ? 'text' : 'meta';
  } else if (new RegExp(`${CURRENCY}\\s?\\d|\\d[.,]?\\d*\\s?${CURRENCY}`, 'i').test(mainPlain)) {
    // No published amount to look for, but the text prints a price.
    pricePlace = 'text';
  }

  // Availability
  const structuredStock =
    offers.some((o) => present(o.availability)) ||
    Boolean(metaContent(html, 'product:availability') || metaContent(html, 'og:availability'));
  const availabilityPlace: FactPlace = STOCK_WORDS.test(mainPlain)
    ? 'text'
    : structuredStock
      ? 'meta'
      : 'absent';

  // Description: each paragraph we extracted, looked for in the page text.
  let words = 0;
  const paragraphs = description
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 30);
  for (const p of paragraphs) {
    const needle = flattenText(p);
    const probe = needle.slice(0, Math.min(needle.length, 48));
    if (probe.length >= 20 && haystack.indexOf(probe) !== -1) {
      words += p.split(/\s+/).filter(Boolean).length;
    }
  }
  let descriptionPlace: FactPlace = words > 0 ? 'text' : 'absent';
  if (!words) {
    const fallback =
      (jsonld && str(jsonld.description)) ||
      metaContent(html, 'og:description') ||
      metaContent(html, 'description');
    if (fallback) {
      descriptionPlace = 'meta';
      words = toPlainText(fallback).split(/\s+/).filter(Boolean).length;
    }
  }

  return {
    name: namePlace,
    price: pricePlace,
    availability: availabilityPlace,
    description: descriptionPlace,
    descriptionWords: words,
  };
}

/* ------------------------------------------------------------------ */
/* 2. Product structured data                                          */
/* ------------------------------------------------------------------ */

export function structuredCheck(html: string): StructuredCheck {
  const { product, brokenProductBlock } = productJsonLdStatus(html);

  if (!product) {
    if (brokenProductBlock) return { status: 'invalid', fields: [] };
    if (/itemtype\s*=\s*["']https?:\/\/schema\.org\/Product["']/i.test(html)) {
      return { status: 'microdata', fields: [] };
    }
    return { status: 'none', fields: [] };
  }

  const offers = allOffers(product);
  const has: Record<StructuredField, boolean> = {
    name: present(product.name),
    // Both halves, or an AI tool cannot state the price.
    price:
      offers.some((o) => present(o.price) || present(o.lowPrice)) &&
      offers.some((o) => present(o.priceCurrency)),
    availability: offers.some((o) => present(o.availability)),
    brand: present(product.brand),
    identifier:
      present(product.sku) ||
      hasGtin(product) ||
      anyOffer(product, (o) => present(o.sku) || hasGtin(o)),
    rating: present(product.aggregateRating),
    shipping: present(product.shippingDetails) || anyOffer(product, (o) => present(o.shippingDetails)),
    returns:
      present(product.hasMerchantReturnPolicy) ||
      anyOffer(product, (o) => present(o.hasMerchantReturnPolicy)),
  };

  const order: StructuredField[] = [
    'name',
    'price',
    'availability',
    'brand',
    'identifier',
    'rating',
    'shipping',
    'returns',
  ];
  return { status: 'found', fields: order.map((field) => ({ field, present: has[field] })) };
}

/* ------------------------------------------------------------------ */
/* 3. The ready-to-paste Product block                                 */
/* ------------------------------------------------------------------ */

const AVAILABILITY: [RegExp, string][] = [
  [/^in ?stock$/i, 'https://schema.org/InStock'],
  [/^(oos|out ?of ?stock)$/i, 'https://schema.org/OutOfStock'],
  [/^pre-?order$/i, 'https://schema.org/PreOrder'],
  [/^back-?order$/i, 'https://schema.org/BackOrder'],
];

function schemaAvailability(raw: string | null): string | null {
  if (!raw) return null;
  if (/^https?:\/\/schema\.org\/\w+$/i.test(raw)) return raw.replace(/^http:/i, 'https:');
  for (const [re, value] of AVAILABILITY) if (re.test(raw.trim())) return value;
  return null;
}

/** The rewrite as one plain-text value: paragraphs kept, the "- " list markers kept. */
function descriptionValue(rewrite: string): string {
  return rewrite
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean)
    .join('\n');
}

/**
 * Starts from the store's own Product node when there is one, so that nothing
 * it already publishes (offers per variant, reviews, identifiers) is lost if
 * they paste this in its place. Then sets the new description, and fills only
 * the fields the page states elsewhere (Open Graph and product meta tags).
 * Everything still missing is listed, never filled in.
 */
export function buildProductBlock(input: {
  html: string;
  name: string;
  finalUrl: string;
  rewrite: string;
}): ProductBlock {
  const { html, name, finalUrl, rewrite } = input;
  const existing = productJsonLdStatus(html).product;
  const base: Node = existing ? (JSON.parse(JSON.stringify(existing)) as Node) : {};
  delete base['@context'];
  delete base['@type'];
  delete base.description;

  const out: Node = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    // Plain text: some stores ship markup inside their own name field.
    name: toPlainText(str(base.name) || name).replace(/\s+/g, ' ').trim(),
    description: descriptionValue(rewrite),
  };
  delete base.name;

  // URL: the store's own, then the canonical link, then the address fetched.
  const canonical = html.match(/<link[^>]+rel\s*=\s*["']canonical["'][^>]*>/i)?.[0];
  const canonicalHref = canonical?.match(/href\s*=\s*["']([^"']+)["']/i)?.[1];
  let pageUrl = finalUrl;
  try {
    const u = new URL(finalUrl);
    pageUrl = `${u.origin}${u.pathname}`;
  } catch {
    /* keep finalUrl */
  }
  out.url = str(base.url) || canonicalHref || pageUrl;
  delete base.url;

  const ogImage = metaContent(html, 'og:image:secure_url') || metaContent(html, 'og:image');
  if (present(base.image)) out.image = base.image;
  else if (ogImage) out.image = ogImage.startsWith('//') ? `https:${ogImage}` : ogImage;
  delete base.image;

  const metaBrand = metaContent(html, 'product:brand') || metaContent(html, 'og:brand');
  if (present(base.brand)) {
    out.brand =
      typeof base.brand === 'string' ? { '@type': 'Brand', name: base.brand } : base.brand;
  } else if (metaBrand) {
    out.brand = { '@type': 'Brand', name: metaBrand };
  }
  delete base.brand;

  // Everything else the store already publishes, untouched, offers last.
  const offers = base.offers;
  delete base.offers;
  const rating = base.aggregateRating;
  delete base.aggregateRating;
  Object.keys(base).forEach((key) => {
    out[key] = base[key];
  });

  if (present(offers)) {
    out.offers = Array.isArray(offers) ? offers.slice(0, 20) : offers;
  } else {
    const amount = metaContent(html, 'product:price:amount') || metaContent(html, 'og:price:amount');
    const currency =
      metaContent(html, 'product:price:currency') || metaContent(html, 'og:price:currency');
    const availability = schemaAvailability(
      metaContent(html, 'product:availability') || metaContent(html, 'og:availability'),
    );
    const offer: Node = { '@type': 'Offer' };
    if (amount && currency) {
      const value = parseAmount(amount);
      offer.price = Number.isFinite(value) ? value.toFixed(2) : amount;
      offer.priceCurrency = currency.toUpperCase();
    }
    if (availability) offer.availability = availability;
    if (Object.keys(offer).length > 1) {
      offer.url = out.url;
      out.offers = offer;
    }
  }
  if (present(rating)) out.aggregateRating = rating;
  if (Array.isArray(out.review)) out.review = (out.review as unknown[]).slice(0, 5);

  // What is still missing, in the order a store owner would fill it in.
  const offerNodes = allOffers(out);
  const toComplete: BlockGap[] = [];
  const need = (gap: BlockGap, ok: boolean) => {
    if (!ok) toComplete.push(gap);
  };
  need(
    'price',
    offerNodes.some((o) => present(o.price) || present(o.lowPrice)) &&
      offerNodes.some((o) => present(o.priceCurrency)),
  );
  need('availability', offerNodes.some((o) => present(o.availability)));
  need('brand', present(out.brand));
  need('image', present(out.image));
  need('sku', present(out.sku) || offerNodes.some((o) => present(o.sku)));
  need('gtin', hasGtin(out) || offerNodes.some(hasGtin));
  need('rating', present(out.aggregateRating));
  need('shipping', present(out.shippingDetails) || offerNodes.some((o) => present(o.shippingDetails)));
  need(
    'returns',
    present(out.hasMerchantReturnPolicy) || offerNodes.some((o) => present(o.hasMerchantReturnPolicy)),
  );

  // "<" escaped so a value can never close the script element early.
  const json = JSON.stringify(out, null, 2).replace(/</g, '\\u003c');
  return {
    snippet: `<script type="application/ld+json">\n${json}\n</script>`,
    toComplete,
  };
}
