// GET /api/agent-demo/page/<token> — the visitor's own product page with the
// agent's copy in it.
//
// Served from a route rather than handed to the browser inside the reveal JSON
// for two reasons: an HTML document is orders of magnitude bigger than the rest
// of that payload, and a URL is what makes the two halves of the deliverable
// possible at all — an inline preview, and a file they can save.
//
// What comes back here is a third party's markup, already stripped of every
// script by renderPage.ts. It is served with a sandbox CSP on top, so even a
// tag that survived the cleaning cannot run, cannot reach our origin and
// cannot read anything of ours. The page is framed with sandbox="" as well:
// two locks on the same door, because the document is not ours.
//
// ?download=1 sends the same document as a file, WITHOUT the marker stylesheet.
// The green ring is there to point the visitor's eye during the preview; in a
// file they may paste into their own store it would be a defect.

import { getPage } from '@/lib/agent-demo/store';
import { withPreviewMarker } from '@/lib/agent-demo/renderPage';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const CSP = [
  'sandbox',
  "default-src 'none'",
  'img-src * data: blob:',
  "style-src * 'unsafe-inline'",
  'font-src * data:',
  'media-src *',
  "script-src 'none'",
  "frame-src 'none'",
  "object-src 'none'",
  "form-action 'none'",
].join('; ');

export function GET(request: Request, { params }: { params: { token: string } }) {
  const page = getPage(params.token);
  if (!page) {
    return new Response('This preview has expired.', {
      status: 410,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }

  const download = new URL(request.url).searchParams.get('download') === '1';
  const body = download ? page.html : withPreviewMarker(page.html, page.label);

  const headers: Record<string, string> = {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
    'Content-Security-Policy': CSP,
  };
  if (download) {
    headers['Content-Disposition'] = `attachment; filename="${page.filename}"`;
  }

  return new Response(body, { status: 200, headers });
}
