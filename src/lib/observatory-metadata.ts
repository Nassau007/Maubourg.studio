// Metadata for the observatory pages.
//
// Kept out of src/lib/observatory.ts because that module is reached from the
// language switcher, which is a client component: this half is server only and
// has no business in the browser bundle.

import type { Metadata } from 'next';
import { OBSERVATORY_LIVE } from '@/lib/observatory';
import { site, siteUrl } from '@/lib/site';
import type { Locale } from '@/lib/i18n';

/**
 * One observatory page's metadata.
 *
 * `alternates` is passed rather than derived so a page with no twin in the
 * other language can declare none: pointing hreflang at a URL that is not
 * there is worse than declaring nothing, which is the rule the blog follows.
 *
 * While the section is dark the pages ask not to be indexed. The routes exist
 * so the shape can be reviewed and so turning the section on is one commit,
 * but a thin page on a site selling GEO expertise is worse than no page.
 */
export function observatoryMetadata({
  lang,
  path,
  title,
  description,
  alternates,
}: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
  alternates?: Partial<Record<Locale | 'x-default', string>>;
}): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: path,
      ...(alternates ? { languages: alternates } : {}),
    },
    robots: OBSERVATORY_LIVE
      ? {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
        }
      : { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${path}`,
      siteName: site.name,
      locale: lang === 'fr' ? 'fr_FR' : 'en_GB',
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
