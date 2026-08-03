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
import { getDictionary, type Locale } from '@/lib/i18n';
import { site, siteUrl } from '@/lib/site';

export const localizedPaths = {
  agentDemo: { en: '/try-an-agent', fr: '/essayer-un-agent' },
  privacy: { en: '/privacy', fr: '/confidentialite' },
  conversion: { en: '/services/conversion-tracking', fr: '/services/conversion-et-mesure' },
  acquisition: { en: '/services/acquisition', fr: '/services/acquisition' },
  geo: { en: '/services/llm-visibility', fr: '/services/visibilite-llm' },
  agents: { en: '/services/ai-agents', fr: '/services/agents-ia' },
  foundations: { en: '/services/store-build', fr: '/services/creation-boutique' },
} as const;

/**
 * The five service pages, in the order they are offered: fix what you have,
 * then bring more of it, then be found, then automate, and rebuild only if the
 * foundation is the problem. Nav, footer and homepage cards all read this, so
 * the order is defined once.
 */
export const verticalPages = [
  'conversion',
  'acquisition',
  'geo',
  'agents',
  'foundations',
] as const satisfies readonly LocalizedPage[];

export type VerticalPage = (typeof verticalPages)[number];

export type ServiceMenuItem = { href: string; label: string; blurb: string };

/**
 * The services menu, resolved server side.
 *
 * Built here rather than inside Nav because Nav is a client component: reading
 * the dictionary in there would ship both languages to the browser, which is
 * the reason it takes its copy as a prop in the first place.
 */
export function serviceMenu(lang: Locale): ServiceMenuItem[] {
  const dict = getDictionary(lang);
  return verticalPages.map((page) => ({
    href: localizedHref(page, lang),
    label: dict.verticals[page].nav.label,
    blurb: dict.verticals[page].nav.blurb,
  }));
}

export type LocalizedPage = keyof typeof localizedPaths;

/**
 * Sections that exist in one language only.
 *
 * The blog is French: every article is written in French and there is no
 * English index to send anyone to. It is deliberately *not* in
 * localizedPaths, because that map promises both languages exist. Switching
 * language from inside one of these lands on that language's home instead of
 * on a URL nothing was ever built for.
 *
 * Delete the entry and add a localizedPaths pair the day English articles ship.
 */
const singleLocaleSections: readonly { locale: Locale; prefix: string }[] = [
  { locale: 'fr', prefix: '/blog' },
];

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

  const single = singleLocaleSections.find(
    (section) => rest === section.prefix || rest.startsWith(`${section.prefix}/`),
  );
  if (single && single.locale !== target) return `/${target}`;

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
