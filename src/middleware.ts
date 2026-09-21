import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Kept in sync with src/lib/i18n.ts. Inlined here so the edge middleware
// bundle doesn't pull in the full dictionaries.
const locales = ['en', 'fr'] as const;
const defaultLocale = 'en';

// The one address of the site. Both hosts stay attached in Railway, but www
// only exists to hand its visitors (and their link equity) to the apex domain.
// Canonical tags, the sitemap, robots.txt and the JSON-LD all say apex already,
// so a www page answering 200 is the same page under a second address.
const CANONICAL_HOST = 'maubourg.studio';
const WWW_HOST = `www.${CANONICAL_HOST}`;

// Paths that are not pages and must never be given a locale prefix: the lead
// routes, Next's own assets, and anything with a file extension (sitemap.xml,
// robots.txt, the example teardown PDF). They still get the host redirect.
const NON_PAGE = /^\/(api|_next)(\/|$)|\.[^/]+$/;

function detectLocale(request: NextRequest): string {
  const header = request.headers.get('accept-language') || '';
  const preferred = header.split(',').map((part) => part.split(';')[0].trim().toLowerCase());
  for (const lang of preferred) {
    const base = lang.split('-')[0];
    if ((locales as readonly string[]).includes(base)) return base;
  }
  return defaultLocale;
}

/**
 * Two jobs, done in a single redirect so a visitor never takes two hops.
 *
 *  1. www -> apex, keeping path and query.
 *  2. a locale-less path -> /en or /fr, from Accept-Language.
 *
 * A request needing both (typing www.maubourg.studio into a browser) gets one
 * response pointing straight at https://maubourg.studio/en.
 *
 * The status code differs on purpose. A host-only move is permanent: that URL
 * has one destination forever, and 308 is what passes ranking to the apex. The
 * locale hop is negotiated per visitor, so it stays temporary or a browser
 * would cache one language for everyone who follows.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = (request.headers.get('host') ?? request.nextUrl.host).toLowerCase().split(':')[0];

  const wrongHost = host === WWW_HOST;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  const needsLocale = !hasLocale && !NON_PAGE.test(pathname);

  if (!wrongHost && !needsLocale) return;

  const url = request.nextUrl.clone();
  if (wrongHost) {
    url.protocol = 'https:';
    url.host = CANONICAL_HOST;
    url.port = '';
  }
  if (needsLocale) {
    url.pathname = `/${detectLocale(request)}${pathname === '/' ? '' : pathname}`;
  }

  return NextResponse.redirect(url, needsLocale ? 307 : 308);
}

export const config = {
  // Everything, because the host redirect has to cover the API routes, the
  // sitemap and the PDF as well as the pages. The locale skip list above is
  // what keeps those paths untouched on the canonical host.
  matcher: ['/:path*'],
};
