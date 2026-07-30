// Pages whose slug differs per language.
//
// Next.js gives every page one path, so a localized slug means one directory
// per language, each a thin wrapper around the same component. This map is the
// single place that knows which slug belongs to which locale: the sitemap, the
// metadata alternates, the footer link and the pages themselves all read it,
// so adding a language means editing one object.
//
// Anything not listed here shares its path across locales (/en, /fr, /en/call).

import type { Metadata } from 'next';
import type { Locale } from '@/lib/i18n';
import { site, siteUrl } from '@/lib/site';

export const localizedPaths = {
  agentDemo: { en: '/try-an-agent', fr: '/essayer-un-agent' },
  privacy: { en: '/privacy', fr: '/confidentialite' },
} as const;

export type LocalizedPage = keyof typeof localizedPaths;

/** Locale-prefixed href, e.g. /fr/essayer-un-agent. */
export function localizedHref(page: LocalizedPage, lang: Locale): string {
  return `/${lang}${localizedPaths[page][lang]}`;
}

/** { en, fr, x-default } map for a metadata alternates block. */
export function languageAlternates(page: LocalizedPage): Record<string, string> {
  return {
    en: `/en${localizedPaths[page].en}`,
    fr: `/fr${localizedPaths[page].fr}`,
    'x-default': `/en${localizedPaths[page].en}`,
  };
}

/**
 * Same page, other language. Swapping only the locale segment is not enough
 * once a slug is localized: /fr/essayer-un-agent would become
 * /en/essayer-un-agent, which does not exist and 404s the visitor out of the
 * page they were reading. Anything not in the map keeps its path.
 */
export function swapLocaleInPath(pathname: string, target: Locale): string {
  const segments = pathname.split('/');
  if (segments.length < 2) return `/${target}`;

  const rest = `/${segments.slice(2).join('/')}`.replace(/\/$/, '') || '';
  const pages = Object.keys(localizedPaths) as LocalizedPage[];
  const match = pages.find((page) =>
    (Object.values(localizedPaths[page]) as string[]).includes(rest),
  );

  segments[1] = target;
  if (match) return `/${target}${localizedPaths[match][target]}`;
  return segments.join('/') || `/${target}`;
}

/**
 * Full metadata for a localized page.
 *
 * Declaring openGraph on a page replaces the layout's block wholesale, so
 * metadataBase and the share image have to be restated here or the page ships
 * without either. Same trap the call page documents. Without its own canonical
 * a page inherits the layout's, which points every URL at the homepage.
 */
export function localizedMetadata({
  page,
  lang,
  title,
  description,
}: {
  page: LocalizedPage;
  lang: Locale;
  title: string;
  description: string;
}): Metadata {
  const path = `/${lang}${localizedPaths[page][lang]}`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: path,
      languages: languageAlternates(page),
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${path}`,
      siteName: site.name,
      locale: lang === 'fr' ? 'fr_FR' : 'en_GB',
      alternateLocale: lang === 'fr' ? 'en_GB' : 'fr_FR',
      type: 'website',
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/twitter-image.png'],
    },
  };
}
