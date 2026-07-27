import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';
import { locales } from '@/lib/i18n';

/**
 * Served at /sitemap.xml. Four URLs: the landing page and the call page, in
 * both locales, each declaring the other as its hreflang alternate so a
 * crawler treats them as one page in two languages rather than duplicates.
 *
 * Add a page here whenever you add one under src/app/[lang]/.
 */
const paths = ['', '/call'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return paths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${siteUrl}/${lang}${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries([
          ...locales.map((l) => [l, `${siteUrl}/${l}${path}`]),
          ['x-default', `${siteUrl}/en${path}`],
        ]),
      },
    })),
  );
}
