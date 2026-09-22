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

// Pages dropped in the refocus, and where each one now sends its visitors.
// Handled here rather than with a redirecting page component: a prerendered
// page that calls permanentRedirect() ships its status without a Location
// header once it is cached, which leaves the visitor on a blank 308.
//
// Acquisition (paid media, email and SMS) is gone with nothing equivalent
// behind it, so it goes home. Store builds fold into conversion work, which is
// the page a visitor looking for a rebuild is now best served by. Same
// language on both sides: sending a French reader to an English page is a
// worse answer than the 404 it replaces.
const RETIRED_PAGES: Record<string, string> = {
  '/en/services/acquisition': '/en',
  '/fr/services/acquisition': '/fr',
  '/en/services/store-build': '/en/services/conversion-tracking',
  '/fr/services/creation-boutique': '/fr/services/conversion-et-mesure',
};

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
 * Three jobs, done in a single redirect so a visitor never takes two hops.
 *
 *  1. www -> apex, keeping path and query.
 *  2. a retired page -> the page that replaced it, in the same language.
 *  3. a locale-less path -> /en or /fr, from Accept-Language.
 *
 * A request needing more than one (an old www link to a dropped service page)
 * still gets exactly one response, pointing at the final URL.
 *
 * The status code differs on purpose. A host move and a retired page are
 * permanent: those URLs have one destination forever, and 308 is what passes
 * ranking across. The locale hop is negotiated per visitor, so it stays
 * temporary or a browser would cache one language for everyone who follows.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = (request.headers.get('host') ?? request.nextUrl.host).toLowerCase().split(':')[0];

  const wrongHost = host === WWW_HOST;
  // Next serves these without the trailing slash, so both spellings of a
  // retired URL have to find the same entry.
  const retired = RETIRED_PAGES[pathname.replace(/\/$/, '')];
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  const needsLocale = !hasLocale && !NON_PAGE.test(pathname);

  if (!wrongHost && !retired && !needsLocale) return;

  const url = request.nextUrl.clone();
  if (wrongHost) {
    url.protocol = 'https:';
    url.host = CANONICAL_HOST;
    url.port = '';
  }
  if (retired) {
    url.pathname = retired;
  } else if (needsLocale) {
    url.pathname = `/${detectLocale(request)}${pathname === '/' ? '' : pathname}`;
  }

  return NextResponse.redirect(url, needsLocale && !retired ? 307 : 308);
}

export const config = {
  // Everything, because the host redirect has to cover the API routes, the
  // sitemap and the PDF as well as the pages. The locale skip list above is
  // what keeps those paths untouched on the canonical host.
  matcher: ['/:path*'],
};
