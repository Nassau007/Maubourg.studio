// The agent itself: system prompt, one call to the Anthropic Messages API,
// and hand-rolled validation of what comes back.
//
// Called over raw fetch for the same reason src/lib/email.ts calls Resend that
// way: one endpoint, one shape, no SDK in the dependency tree. Validation is
// hand-rolled for the same reason - the repo has no schema library and one
// route does not justify adding a second validation pattern.

import {
  MAX_DESCRIPTION_CHARS,
  MODEL,
  MODEL_EFFORT,
  MODEL_MAX_TOKENS,
  MODEL_TIMEOUT_MS,
} from './config';
import { DemoError, type Gap, type ProductPage } from './types';

const ENDPOINT = 'https://api.anthropic.com/v1/messages';
const API_VERSION = '2023-06-01';

export const SYSTEM_PROMPT = `You are a product copy agent built by Maubourg Studio, an AI RevOps studio
working with European ecommerce brands.

You are given one read of one live product page: its selling copy, and the
signals that were actually present in the page source next to it. You return a
diagnosis of that page and a replacement description. The store owner reads
what you write about their own page, so everything you say has to be something
they can go and check.

WHAT YOU ARE LOOKING AT
Every field in the input was read off the page itself. A field that is not in
the input is a field we could not read in one automated pass - it is NOT
evidence that the page lacks it. Never turn our blindness into their omission.
Concretely: if there is no rating field you say nothing about reviews, if there
is no price field you say nothing about pricing, if there is no terms field you
say nothing about delivery or returns. You also cannot see the page as it
renders: no layout, no positions, no colours, nothing about what sits above the
fold, nothing about speed or checkout.
Read the whole of current_description before calling anything missing. On most
stores it runs several blocks together: the sales paragraph, then
specifications, care, delivery, guarantees. Material, weight, origin, washing
and returns are usually further down rather than absent.

RULES
- Language. Write every output field in detected_language. If the page is in
  French, all of it is in French. This is absolute.
- verdict. One sentence naming the single thing about THIS page's copy that
  costs the most sales. It must be unusable on any other product: name the
  product, the claim, the specification or the phrase you are reacting to. A
  sentence that would fit any product page is a failed verdict. No flattery, no
  hedging.
- gaps. Two or three, ranked by what costs the most, and each one anchored to
  something in the input you can point at: a phrase in the description, a
  heading, a bullet, a specification present in the structured data but absent
  from the copy, a variant the copy never explains, an alt text, a page title
  that says something the copy does not. label is 2 to 5 words. detail is one
  or two sentences: what is weak, and what it makes the buyer do.
  Good gaps read like: the copy leads on a specification instead of the reason
  to own it, a claim is made with nothing behind it, the material is named but
  never explained, the structured data holds a fact the buyer never sees in the
  copy, the register drifts, the text does not answer an obvious question
  someone about to spend this much would ask.
- rewrite. 90 to 150 words, in the language of the page. This is the strongest
  part of your answer: it gets pasted into the store as it is. Lead with the
  reason to own the product, then the proof or specification that supports it,
  then whatever practical fact removes the last hesitation. Keep the brand's
  register - formal stays formal. Use only facts present in the input:
  specifications, variants, published terms, structured data. Invent nothing:
  no material, certification, origin, measurement, delivery time or guarantee
  that is not there. If the input is thin, write shorter rather than fuller.
  Plain paragraphs separated by a blank line; a short list is allowed with each
  item on its own line starting with "- ". No headings, no markdown, no emoji.
- Facts you may state but never judge. price_published is the page's own price:
  you may reference what it buys, never call it cheap, expensive, fair or a
  bargain. variants_offered is a list of names and nothing else - it carries no
  stock, no availability and no price, so you never say a variant is sold out,
  low in stock or unavailable, and never count what is available. rating is
  whatever the page publishes: quote it or leave it, never round it up and
  never describe it as good or bad.
- Never mention Maubourg Studio, never sell, never add a call to action. The
  rewrite is a work product, not marketing.

Return ONLY a JSON object. No preamble, no markdown fences, no commentary.

{
  "verdict": string,
  "rewrite": string,
  "gaps": [{ "label": string, "detail": string }]
}`;

/** Only fields we actually read reach the model. Absence is never stated as a fact. */
function line(label: string, value: string | null | undefined): string | null {
  const v = (value ?? '').toString().trim();
  return v ? `${label}: ${v}` : null;
}

function listLine(label: string, values: string[], max: number): string | null {
  if (!values.length) return null;
  return `${label}: ${values.slice(0, max).join(' | ')}`;
}

export function buildUserMessage(page: ProductPage, detectedLanguage: string): string {
  const s = page.signals;

  const lines: (string | null)[] = [
    line('detected_language', detectedLanguage),
    line('product_name', page.name),
    line('page_url', s.url),
    line('brand', s.brand),
    line('price_published', s.price),
    line('availability_published', s.availability),
    line('rating_published', s.rating),
    line('sku', s.sku),
    line('page_title', s.pageTitle),
    line('meta_description', s.metaDescription),
    listLine('page_headings', s.headings, 12),
    listLine('specifications_in_structured_data', s.specs, 14),
    listLine('bullets_in_the_description_block', s.bullets, 12),
    listLine('lines_about_delivery_returns_or_guarantee', s.terms, 6),
    listLine('image_alt_text', s.imageAlts, 8),
    line(
      'images_read_without_alt_text',
      s.imageAlts.length || s.imagesWithoutAlt
        ? `${s.imagesWithoutAlt} of ${s.imagesWithoutAlt + s.imageAlts.length} images read on the page`
        : null,
    ),
    listLine('buttons_and_calls_to_action', s.ctas, 8),
    line('description_shape', s.descriptionShape),
    // Said either way on purpose. An empty list means we could not read the
    // pickers, not that the product has none, and the agent must not turn one
    // into the other.
    page.variants.length
      ? `variants_offered: ${page.variants.join(' | ')}`
      : 'variants_offered: not visible to you - say nothing about sizes, colours or formats',
    `current_description: ${page.description.slice(0, MAX_DESCRIPTION_CHARS)}`,
  ];

  return lines.filter(Boolean).join('\n');
}

type ModelOutput = { verdict: string; rewrite: string; gaps: Gap[] };

/** Strips ``` fences and any stray prose around the object. */
function extractJson(text: string): string {
  let out = text.trim();
  out = out.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
  const first = out.indexOf('{');
  const last = out.lastIndexOf('}');
  if (first > 0 || (last !== -1 && last < out.length - 1)) {
    if (first !== -1 && last > first) out = out.slice(first, last + 1);
  }
  return out;
}

/** Hand-rolled schema check. Anything off-shape is a MODEL_ERROR, not a guess. */
function validate(raw: unknown): ModelOutput | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const obj = raw as Record<string, unknown>;

  const verdict = typeof obj.verdict === 'string' ? obj.verdict.trim() : '';
  const rewrite = typeof obj.rewrite === 'string' ? obj.rewrite.trim() : '';
  if (verdict.length < 10 || rewrite.length < 40) return null;

  if (!Array.isArray(obj.gaps)) return null;
  const gaps: Gap[] = [];
  for (const item of obj.gaps) {
    if (!item || typeof item !== 'object') continue;
    const g = item as Record<string, unknown>;
    const label = typeof g.label === 'string' ? g.label.trim() : '';
    const detail = typeof g.detail === 'string' ? g.detail.trim() : '';
    if (!label || !detail) continue;
    gaps.push({ label, detail });
  }
  if (gaps.length < 2) return null;

  return { verdict, rewrite, gaps: gaps.slice(0, 3) };
}

type Reply = { text: string; detectedLanguage?: string };

async function callOnce(system: string, user: string): Promise<Reply> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new DemoError('MODEL_ERROR', 'ANTHROPIC_API_KEY not set');

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), MODEL_TIMEOUT_MS);

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': API_VERSION,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MODEL_MAX_TOKENS,
        thinking: { type: 'disabled' },
        output_config: { effort: MODEL_EFFORT },
        system,
        messages: [{ role: 'user', content: user }],
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      throw new DemoError('MODEL_ERROR', `anthropic ${res.status}: ${detail.slice(0, 300)}`);
    }

    const payload = (await res.json()) as {
      content?: { type: string; text?: string }[];
    };
    const text = (payload.content || [])
      .filter((block) => block.type === 'text' && typeof block.text === 'string')
      .map((block) => block.text as string)
      .join('')
      .trim();
    if (!text) throw new DemoError('MODEL_ERROR', 'empty completion');
    return { text };
  } catch (err) {
    if (err instanceof DemoError) throw err;
    throw new DemoError('MODEL_ERROR', 'model request failed');
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Runs the agent. One retry on unparseable output, then MODEL_ERROR - a second
 * failure is a bad day for the model, not something a third call will fix.
 */
export async function runAgent(page: ProductPage, detectedLanguage: string): Promise<ModelOutput> {
  const user = buildUserMessage(page, detectedLanguage);

  for (let attempt = 0; attempt < 2; attempt += 1) {
    const system =
      attempt === 0
        ? SYSTEM_PROMPT
        : `${SYSTEM_PROMPT}\n\nYour previous reply was not valid JSON in the required shape. Return the JSON object only.`;

    const { text } = await callOnce(system, user);
    let parsed: unknown;
    try {
      parsed = JSON.parse(extractJson(text));
    } catch {
      continue;
    }
    const valid = validate(parsed);
    if (valid) return valid;
  }

  throw new DemoError('MODEL_ERROR', 'output failed validation twice');
}

/**
 * The page's own <html lang> wins. Where it is missing we fall back to a small
 * function-word test rather than a second model call: it only has to pick the
 * language the agent writes in, and it is corrected by the description itself,
 * which the model reads.
 */
export function detectLanguage(page: ProductPage): string {
  if (page.language) return page.language;

  const sample = ` ${page.description.toLowerCase().slice(0, 1200)} `;
  const score = (words: string[]) =>
    words.reduce((n, w) => n + (sample.split(` ${w} `).length - 1), 0);

  const candidates: [string, number][] = [
    ['fr', score(['le', 'la', 'les', 'des', 'une', 'pour', 'avec', 'vous', 'est', 'et'])],
    ['en', score(['the', 'and', 'with', 'your', 'for', 'this', 'is', 'of', 'to'])],
    ['de', score(['und', 'der', 'die', 'das', 'mit', 'für', 'ist', 'ein'])],
    ['es', score(['el', 'los', 'las', 'para', 'con', 'una', 'que', 'de'])],
    ['it', score(['il', 'lo', 'gli', 'per', 'con', 'una', 'che', 'di'])],
    ['nl', score(['het', 'een', 'voor', 'met', 'van', 'en', 'is'])],
  ];
  candidates.sort((a, b) => b[1] - a[1]);
  return candidates[0][1] > 0 ? candidates[0][0] : 'en';
}
