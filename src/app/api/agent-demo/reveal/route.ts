// POST /api/agent-demo/reveal — exchange a token plus an email for the result.
//
// The token is single-use and taken out of the store before anything else, so
// a replay returns TOKEN_EXPIRED instead of a second copy. Email delivery
// never gates the response: if Resend is down the visitor still gets what they
// asked for, and the studio notification says the result email did not go out.

import { NextResponse } from 'next/server';
import { getDictionary } from '@/lib/i18n';
import { siteUrl } from '@/lib/site';
import { sendDemoNotification, sendDemoResult } from '@/lib/agent-demo/email';
import { countReveal } from '@/lib/agent-demo/metrics';
import { fail } from '@/lib/agent-demo/respond';
import { putPage, takeRun } from '@/lib/agent-demo/store';
import type { RevealResponse, StoredRun } from '@/lib/agent-demo/types';

export const maxDuration = 60;
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Mirrored by the client, which uses it as a gate before posting. The server
// stays the only authority.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** ASCII file name for the download, since a browser saves it to a real disk. */
function slug(name: string): string {
  const base = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 60);
  return `${base || 'product-page'}-maubourg.html`;
}

/**
 * Moves the rendered page out of the single-use run and into the page store,
 * which is readable more than once: the visitor previews it, opens it in a tab
 * and downloads it, and those are three reads of the same document.
 *
 * The ring label drawn around the substituted block is written in the page's
 * own language, not the site's - it is printed inside their store's page.
 */
function publishPage(run: StoredRun): { preview: string; download: string } | null {
  if (!run.renderedHtml) return null;
  const pageLocale = run.detectedLanguage.startsWith('fr') ? 'fr' : 'en';
  const token = putPage({
    html: run.renderedHtml,
    label: getDictionary(pageLocale).agentDemo.result.previewMarker,
    filename: slug(run.productName),
  });
  return {
    preview: `/api/agent-demo/page/${token}`,
    download: `/api/agent-demo/page/${token}?download=1`,
  };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail('BAD_REQUEST', 'en');
  }

  const locale = typeof body.locale === 'string' ? body.locale : 'en';
  const dict = getDictionary(locale);
  const token = String(body.token ?? '').trim();
  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const consent = body.consent === true || body.consent === 'true' || body.consent === 'on';

  // Honeypot, same contract as the lead routes: a filled hidden field gets a
  // plausible-looking 200 and nothing happens.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({
      ok: true,
      verdict: '',
      before_excerpt: '',
      rewrite: '',
      gaps: [],
      preview_url: null,
      download_url: null,
    });
  }

  if (!token) return fail('TOKEN_EXPIRED', locale);
  if (!name) {
    return NextResponse.json(
      { ok: false, code: 'BAD_REQUEST', message: dict.errors.name, fields: { name: dict.errors.name } },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) return fail('INVALID_EMAIL', locale);

  const run = takeRun(token);
  if (!run) return fail('TOKEN_EXPIRED', locale);

  // Published before anything that can fail, so an email problem never costs
  // the visitor the page they came for.
  const page = publishPage(run);

  try {
    // The result email speaks the product page's language, not the site
    // locale. Only en and fr copy exists, so anything else gets the English
    // block; the agent's own prose inside it stays in the detected language.
    const emailLocale = run.detectedLanguage.startsWith('fr') ? 'fr' : 'en';
    const callUrl = `${siteUrl}/${emailLocale}/call`;

    const visitorEmailSent = await sendDemoResult({
      copy: getDictionary(emailLocale).agentDemo.resultEmail,
      run,
      name,
      email,
      callUrl,
    });

    await sendDemoNotification({ run, name, email, consent, visitorEmailSent });
    countReveal(consent);

    const payload: RevealResponse = {
      ok: true,
      verdict: run.result.verdict,
      before_excerpt: run.result.before_excerpt,
      rewrite: run.result.rewrite,
      gaps: run.result.gaps,
      preview_url: page ? page.preview : null,
      download_url: page ? page.download : null,
    };
    return NextResponse.json(payload, { status: 200 });
  } catch (err) {
    // The result is already out of the store, so never fail the response over
    // an email problem: log it and hand over what the visitor earned.
    console.error('[agent-demo] reveal side-effect failed:', err);
    countReveal(consent);
    return NextResponse.json(
      {
        ok: true,
        verdict: run.result.verdict,
        before_excerpt: run.result.before_excerpt,
        rewrite: run.result.rewrite,
        gaps: run.result.gaps,
        preview_url: page ? page.preview : null,
        download_url: page ? page.download : null,
      },
      { status: 200 },
    );
  }
}

export function GET() {
  return NextResponse.json({ ok: false, code: 'BAD_REQUEST' }, { status: 405 });
}
