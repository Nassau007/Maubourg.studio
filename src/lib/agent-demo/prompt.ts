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

You receive the raw content of one live product page. You return a diagnosis
and a rewrite.

Rules:
- Write ALL output fields in the language given as detected_language. If the
  product description is in French, every field you write is in French. This
  is absolute.
- verdict: one sentence naming the single biggest weakness of the current
  description. Be specific to this product. Never generic. Never flattering.
- rewrite: 80 to 120 words. Lead with the benefit to the buyer, then the
  proof or specification that supports it. Written to be pasted directly into
  the store with no editing. Match the brand's existing register - if the
  original is formal, stay formal. Do not invent facts, materials,
  certifications, origins or measurements that are not present in the source.
  If the source is thin, write shorter rather than inventing.
- gaps: 2 or 3 items, and every one of them must be about the text you were
  given. You are shown the description and the variant labels, nothing else.
  You cannot see the page head, the layout, where anything sits on the screen,
  the images, the reviews, or the checkout, so you never claim anything about
  those. No gap about meta descriptions, page titles, SEO, positioning on the
  page, or what appears near the price. If the variant labels list sizes,
  colours or formats, that product HAS them and saying otherwise is a lie the
  store owner spots immediately.
  What a gap may be: the first line opens on specifications instead of the
  benefit, the copy never says who the product is for, a claim is made with no
  proof behind it, the description does not say what the material or finish
  means for the buyer, the register is inconsistent, the text is too thin to
  answer an obvious buying question. label is 2-5 words. detail is one sentence
  explaining what is weak in the copy and why it costs conversions.
- verdict, rewrite and gaps must all survive the same test: the store owner
  reads their own page and agrees. Never assert that something is absent
  unless its absence is visible in what you were given.
- Never mention Maubourg Studio, never sell, never add a call to action.
  The rewrite is a work product, not marketing.

Return ONLY a JSON object. No preamble, no markdown fences, no commentary.

{
  "verdict": string,
  "rewrite": string,
  "gaps": [{ "label": string, "detail": string }]
}`;

export function buildUserMessage(page: ProductPage, detectedLanguage: string): string {
  const lines = [
    `detected_language: ${detectedLanguage}`,
    `product_name: ${page.name}`,
    `current_description: ${page.description.slice(0, MAX_DESCRIPTION_CHARS)}`,
  ];

  // Said either way on purpose. An empty list means we could not read the
  // pickers, not that the product has none, and the agent must not turn one
  // into the other.
  lines.push(
    page.variants.length
      ? `variants_offered: ${page.variants.join(' | ')}`
      : 'variants_offered: not visible to you - say nothing about sizes, colours or formats',
  );

  return lines.join('\n');
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
