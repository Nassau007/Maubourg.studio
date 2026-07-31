// POST /api/agent-demo — run the agent on a visitor-submitted product URL.
//
// WHAT GOES BACK DEPENDS ON GATE_MODE, and on nothing else.
//
// Under 'full' and 'rewrite-only' this route enforces the gate: the full
// result never leaves the server here, only a product name, a ~60-character
// teaser and a token. Adding the verdict or the rewrite to that response, even
// to render it hidden, would defeat the whole thing.
//
// Under 'open' there is no gate to defeat. The whole result and the rebuilt
// page go back in this one response, nothing is held for a second step, and no
// address is collected anywhere in the flow.
//
// maxDuration and runtime below are documentation: this deploys to Railway
// from the repo Dockerfile, where neither export does anything. The real
// timeout budget is the fetch and model timeouts in config.ts.

import { NextResponse } from 'next/server';
import { GATE_MODE, BEFORE_EXCERPT_CHARS, TEASER_CHARS } from '@/lib/agent-demo/config';
import { sendDemoRunNotice } from '@/lib/agent-demo/email';
import { fetchProduct } from '@/lib/agent-demo/fetchProduct';
import { detectLanguage, runAgent } from '@/lib/agent-demo/prompt';
import { canRun, recordRun, visitorKey } from '@/lib/agent-demo/rateLimit';
import { countRun } from '@/lib/agent-demo/metrics';
import { publishPage } from '@/lib/agent-demo/publish';
import { buildRenderedPage } from '@/lib/agent-demo/renderPage';
import { fail, failFrom } from '@/lib/agent-demo/respond';
import { putRun } from '@/lib/agent-demo/store';
import type { RunResponse, StoredRun } from '@/lib/agent-demo/types';

export const maxDuration = 60;
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Accepts "brand.com/products/x" as well as a full URL, like the lead form does. */
function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';
  if (!/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

/**
 * First clause of the verdict, cut at a word boundary. Cut server-side: a
 * client-side truncation would mean shipping the whole sentence.
 */
function toTeaser(verdict: string): string {
  const clause = verdict.split(/[,;:.]/)[0].trim() || verdict.trim();
  if (clause.length <= TEASER_CHARS) return `${clause}…`;
  const cut = clause.slice(0, TEASER_CHARS);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 30 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail('BAD_REQUEST', 'en');
  }

  const locale = typeof body.locale === 'string' ? body.locale : 'en';
  const url = normalizeUrl(String(body.url ?? ''));
  if (!url) return fail('INVALID_URL', locale);

  const key = visitorKey(request);
  if (!canRun(key)) return fail('RATE_LIMITED', locale);

  const started = Date.now();

  try {
    const page = await fetchProduct(url);
    const detectedLanguage = detectLanguage(page);
    const model = await runAgent(page, detectedLanguage);

    // The deliverable: their own page, cleaned of everything active, with the
    // new copy sitting in the element the old copy came from. Null whenever we
    // could not be certain which element that was, and the visitor is told so
    // rather than shown a mangled version of their store.
    const renderedHtml = buildRenderedPage({
      html: page.html,
      pageUrl: page.finalUrl,
      description: page.description,
      rewrite: model.rewrite,
    });

    const run: Omit<StoredRun, 'createdAt' | 'expiresAt'> = {
      result: {
        verdict: model.verdict,
        rewrite: model.rewrite,
        gaps: model.gaps,
        before_excerpt: page.description.slice(0, BEFORE_EXCERPT_CHARS).trim(),
      },
      renderedHtml,
      productName: page.name,
      url,
      platform: page.platform,
      detectedLanguage,
      confidence: page.confidence,
      locale,
    };

    // With the gate open nothing waits for a second step, so the run is never
    // stored: the page is published straight away and the result goes out in
    // this response. Holding it as well would keep the same document in memory
    // twice for a reveal that will never come.
    const open = GATE_MODE === 'open';
    const published = open ? publishPage(run) : null;
    const token = open ? undefined : putRun(run);

    // Only a run that produced something counts against the visitor's two.
    // Unchanged by the gate: the spend guard sits in front of the model call,
    // not in front of the email, which is the whole reason it can stay open.
    recordRun(key);
    countRun({
      platform: page.platform,
      language: detectedLanguage,
      confidence: page.confidence,
      ms: Date.now() - started,
      rendered: renderedHtml !== null,
    });

    const payload: RunResponse = {
      ok: true,
      ...(token ? { token } : {}),
      product_name: page.name,
      teaser: toTeaser(model.verdict),
      gaps_count: model.gaps.length,
      platform: page.platform,
      detected_language: detectedLanguage,
      confidence: page.confidence,
      render_available: renderedHtml !== null,
      // Under 'rewrite-only' the diagnosis is shown before the ask and only the
      // rewrite is held back. Under 'full' neither field is sent at all.
      ...(GATE_MODE === 'rewrite-only' ? { verdict: model.verdict, gaps: model.gaps } : {}),
      // Under 'open' the visitor gets the lot, here, now.
      ...(open
        ? {
            verdict: model.verdict,
            gaps: model.gaps,
            rewrite: model.rewrite,
            before_excerpt: run.result.before_excerpt,
            preview_url: published ? published.preview : null,
            download_url: published ? published.download : null,
          }
        : {}),
    };

    // There is no address to reply to with the gate open, so this is a notice
    // rather than a lead: it tells the studio which store ran the demo and what
    // the agent said, and it says outright that no contact details exist.
    if (open) await sendDemoRunNotice({ run });

    return NextResponse.json(payload, { status: 200 });
  } catch (err) {
    return failFrom(err, locale);
  }
}

export function GET() {
  return NextResponse.json({ ok: false, code: 'BAD_REQUEST' }, { status: 405 });
}
