// What else the page says, read off the same document the description came
// from.
//
// The agent used to receive a product name, a block of description text and a
// list of variant labels, and a system prompt whose main job was forbidding it
// from discussing anything else. That is an honest guard on a starved input,
// and a starved input is why the output read generic. Everything here widens
// what the agent can see WITHOUT widening what it may assume: each field is
// something literally present in the page source, and a field that is absent
// from this object means we could not read it, which the prompt states plainly
// so the agent never converts our blindness into their omission.
//
// Priority order everywhere: structured data first (JSON-LD Product is on most
// Shopify and Woo stores and is written by the platform, not by a theme), then
// meta tags, then the rendered markup.

import { MAX_DESCRIPTION_CHARS } from './config';
import { locateDescription, outerHtml } from './dom';
import { decodeEntities, metaContent, oneLine, toPlainText } from './htmlText';
import type { PageSignals } from './types';

/* ------------------------------------------------------------------ */
/* Small readers                                                       */
/* ------------------------------------------------------------------ */

function str(v: unknown): string | null {
  if (typeof v === 'string') return v.trim() || null;
  if (typeof v === 'number' && Number.isFinite(v)) return String(v);
  return null;
}

/** JSON-LD writes a value as a string, a number, an array or a nested node. */
function scalar(v: unknown): string | null {
  if (v === null || v === undefined) return null;
  if (Array.isArray(v)) return v.length ? scalar(v[0]) : null;
  if (typeof v === 'object') {
    const node = v as Record<string, unknown>;
    return str(node.name) || str(node.value) || null;
  }
  return str(v);
}

function tidy(values: (string | null)[], max: number, maxLen = 180): string[] {
  const seen: Record<string, true> = {};
  const out: string[] = [];
  for (let i = 0; i < values.length; i += 1) {
    const raw = values[i];
    if (!raw) continue;
    const v = raw.replace(/\s+/g, ' ').trim();
    if (!v || v.length > maxLen) continue;
    const key = v.toLowerCase();
    if (seen[key]) continue;
    seen[key] = true;
    out.push(v);
    if (out.length >= max) break;
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Structured data                                                     */
/* ------------------------------------------------------------------ */

function firstOffer(node: Record<string, unknown>): Record<string, unknown> | null {
  const offers = node.offers;
  if (!offers) return null;
  if (Array.isArray(offers)) {
    for (let i = 0; i < offers.length; i += 1) {
      if (offers[i] && typeof offers[i] === 'object') return offers[i] as Record<string, unknown>;
    }
    return null;
  }
  if (typeof offers === 'object') {
    const o = offers as Record<string, unknown>;
    // AggregateOffer wraps the real ones.
    if (Array.isArray(o.offers) && o.offers.length && typeof o.offers[0] === 'object') {
      return o.offers[0] as Record<string, unknown>;
    }
    return o;
  }
  return null;
}

const SPEC_KEYS = [
  'material',
  'color',
  'colour',
  'size',
  'pattern',
  'category',
  'audience',
  'countryOfOrigin',
  'countryOfAssembly',
  'itemCondition',
  'model',
  'weight',
  'width',
  'height',
  'depth',
];

function specsFromJsonLd(node: Record<string, unknown>): string[] {
  const out: (string | null)[] = [];

  for (let i = 0; i < SPEC_KEYS.length; i += 1) {
    const key = SPEC_KEYS[i];
    const value = scalar(node[key]);
    if (value) out.push(`${key}: ${value.replace(/^https?:\/\/schema\.org\//i, '')}`);
  }

  const extra = node.additionalProperty;
  if (Array.isArray(extra)) {
    for (let i = 0; i < extra.length && i < 20; i += 1) {
      const item = extra[i];
      if (!item || typeof item !== 'object') continue;
      const p = item as Record<string, unknown>;
      const name = str(p.name);
      const value = scalar(p.value);
      if (name && value) out.push(`${name}: ${value}`);
    }
  }

  return tidy(out, 14, 120);
}

/* ------------------------------------------------------------------ */
/* Rendered markup                                                     */
/* ------------------------------------------------------------------ */

function scopeToMain(html: string): string {
  return html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] || html;
}

function headings(html: string): string[] {
  const found = html.match(/<h[1-3]\b[^>]*>[\s\S]*?<\/h[1-3]>/gi) || [];
  const level = (tag: string) => tag.slice(1, 3).toLowerCase();
  return tidy(
    found.slice(0, 60).map((tag) => {
      const text = oneLine(tag);
      return text ? `${level(tag)}: ${text}` : null;
    }),
    12,
    120,
  );
}

function bullets(scope: string): string[] {
  const items = scope.match(/<li\b[^>]*>[\s\S]*?<\/li>/gi) || [];
  return tidy(
    items.slice(0, 80).map((item) => {
      const text = oneLine(item);
      if (text.length < 8 || text.length > 200) return null;
      return text;
    }),
    12,
    200,
  );
}

/** Alt text of the images in the page body, and how many of them had none. */
function images(scope: string): { alts: string[]; missing: number } {
  const tags = (scope.match(/<img\b[^>]*>/gi) || []).slice(0, 60);
  const alts: (string | null)[] = [];
  let missing = 0;

  for (let i = 0; i < tags.length; i += 1) {
    const tag = tags[i];
    // Tracking pixels and spacers are not product images.
    if (/\b(width|height)\s*=\s*["']?[12]["']?/i.test(tag)) continue;
    const alt = tag.match(/\balt\s*=\s*("([^"]*)"|'([^']*)')/i);
    const value = alt ? decodeEntities(alt[2] ?? alt[3] ?? '').trim() : '';
    if (value.length > 2) alts.push(value);
    else missing += 1;
  }

  return { alts: tidy(alts, 10, 120), missing };
}

const CTA_HINT = /add[-_ ]?to[-_ ]?cart|ajouter|panier|acheter|buy|checkout|commander|add_to_cart/i;

/** Menu toggles, icon labels and leftover markup are not calls to action. */
function usableLabel(text: string): boolean {
  if (text.length < 2 || text.length > 40) return false;
  if (/[<>]|--&gt;|-->|☰/.test(text)) return false;
  return /[a-zA-Z]{2}/.test(text);
}

function ctas(scope: string): string[] {
  const out: (string | null)[] = [];

  const buttons = (scope.match(/<button\b[^>]*>[\s\S]*?<\/button>/gi) || []).slice(0, 40);
  for (let i = 0; i < buttons.length; i += 1) {
    const text = oneLine(buttons[i]);
    if (usableLabel(text)) out.push(text);
  }

  const inputs = (scope.match(/<input\b[^>]*type\s*=\s*["'](?:submit|button)["'][^>]*>/gi) || []).slice(0, 20);
  for (let i = 0; i < inputs.length; i += 1) {
    const value = inputs[i].match(/\bvalue\s*=\s*("([^"]*)"|'([^']*)')/i);
    const text = value ? decodeEntities(value[2] ?? value[3] ?? '').trim() : '';
    if (usableLabel(text)) out.push(text);
  }

  const links = (scope.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) || []).slice(0, 200);
  for (let i = 0; i < links.length; i += 1) {
    if (!CTA_HINT.test(links[i])) continue;
    const text = oneLine(links[i]);
    if (usableLabel(text)) out.push(text);
  }

  return tidy(out, 8, 40);
}

const TERMS_HINT =
  /livraison|exp[ée]dition|retour|[ée]change|garantie|remboursement|shipping|delivery|returns?|refund|warranty|guarantee|versand|r[üu]ckgabe|envio|spedizione|reso/i;

/**
 * Lines anywhere on the page that talk about delivery, returns or guarantees.
 * Read as text rather than located as a block, because every theme puts them
 * somewhere different and the question the agent needs answering is only
 * whether the page says anything about them at all.
 */
function terms(html: string): string[] {
  const lines = toPlainText(html).split('\n');
  const out: (string | null)[] = [];
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (line.length < 20 || line.length > 240) continue;
    if (!TERMS_HINT.test(line)) continue;
    out.push(line);
  }
  return tidy(out, 6, 240);
}

/** A plain reading of how the current description is built. */
function shape(description: string, listItems: number): string {
  const words = description.split(/\s+/).filter(Boolean).length;
  const paragraphs = description.split(/\n{1,}/).map((p) => p.trim()).filter((p) => p.length > 30);
  const longest = paragraphs.reduce(
    (max, p) => Math.max(max, p.split(/\s+/).filter(Boolean).length),
    0,
  );
  return [
    `${words} words`,
    `${paragraphs.length} paragraph${paragraphs.length === 1 ? '' : 's'}`,
    `longest paragraph ${longest} words`,
    listItems ? `${listItems} list items inside the description block` : 'no list inside the description block',
  ].join(', ');
}

/* ------------------------------------------------------------------ */
/* The whole read                                                      */
/* ------------------------------------------------------------------ */

export function readSignals(input: {
  html: string;
  url: URL;
  description: string;
  jsonld: Record<string, unknown> | null;
}): PageSignals {
  const { html, url, description, jsonld } = input;

  const main = scopeToMain(html);
  const block = locateDescription(html, description);
  const blockHtml = block ? outerHtml(html, block) : '';

  const offer = jsonld ? firstOffer(jsonld) : null;
  const rating = jsonld && jsonld.aggregateRating && typeof jsonld.aggregateRating === 'object'
    ? (jsonld.aggregateRating as Record<string, unknown>)
    : null;

  const priceAmount =
    (offer ? scalar(offer.price) || scalar(offer.lowPrice) : null) ||
    metaContent(html, 'product:price:amount') ||
    metaContent(html, 'og:price:amount');
  const priceCurrency =
    (offer ? scalar(offer.priceCurrency) : null) ||
    metaContent(html, 'product:price:currency') ||
    metaContent(html, 'og:price:currency');

  const ratingValue = rating ? scalar(rating.ratingValue) : null;
  const ratingCount = rating ? scalar(rating.reviewCount) || scalar(rating.ratingCount) : null;

  const img = images(main);
  // Only from the block the description actually came from. Falling back to
  // <main> pulled a PrestaShop navigation menu in as "bullets in the
  // description", which is noise the agent would then have written about.
  const descBullets = blockHtml ? bullets(blockHtml) : [];

  return {
    pageTitle:
      metaContent(html, 'og:title') ||
      (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
        ? oneLine(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)![1])
        : null),
    metaDescription: metaContent(html, 'description') || metaContent(html, 'og:description'),
    price: priceAmount ? `${priceAmount}${priceCurrency ? ` ${priceCurrency}` : ''}` : null,
    availability: offer ? scalar(offer.availability)?.replace(/^https?:\/\/schema\.org\//i, '') ?? null : null,
    brand: jsonld ? scalar(jsonld.brand) : null,
    sku: jsonld ? scalar(jsonld.sku) || scalar(jsonld.mpn) || scalar(jsonld.gtin13) : null,
    rating:
      ratingValue && ratingCount
        ? `${ratingValue} from ${ratingCount} ratings`
        : ratingValue
          ? `${ratingValue}`
          : null,
    specs: jsonld ? specsFromJsonLd(jsonld) : [],
    headings: headings(main),
    bullets: descBullets,
    terms: terms(main),
    imageAlts: img.alts,
    imagesWithoutAlt: img.missing,
    ctas: ctas(main),
    descriptionShape: shape(description.slice(0, MAX_DESCRIPTION_CHARS), descBullets.length),
    descriptionBlockFound: Boolean(block),
    url: `${url.origin}${url.pathname}`,
  };
}
