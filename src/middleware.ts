import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Kept in sync with src/lib/i18n.ts. Inlined here so the edge middleware
// bundle doesn't pull in the full dictionaries.
const locales = ['en', 'fr'] as const;
const defaultLocale = 'en';

function detectLocale(request: NextRequest): string {
  const header = request.headers.get('accept-language') || '';
  const preferred = header.split(',').map((part) => part.split(';')[0].trim().toLowerCase());
  for (const lang of preferred) {
    const base = lang.split('-')[0];
    if ((locales as readonly string[]).includes(base)) return base;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, Next internals and any file with an extension.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
