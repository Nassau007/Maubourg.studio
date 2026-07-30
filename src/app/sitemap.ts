import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';
import { locales } from '@/lib/i18n';
import { localizedPaths, type LocalizedPage } from '@/lib/routes';

/**
 * Served at /sitemap.xml. Every page in both locales, each declaring the other
 * as its hreflang alternate so a crawler treats them as one page in two
 * languages rather than duplicates.
 *
 * Two kinds of entry. Shared paths are the same string in both locales (/en,
 * /en/call). Localized ones have a different slug per language and read it
 * from src/lib/routes.ts, which is also what the pages and the footer use.
 *
 * Add a page here whenever you add one under src/app/[lang]/.
 */
const sharedPaths = ['', '/call'] as const;
const localizedPages: LocalizedPage[] = ['agentDemo', 'privacy'];

const priorities: Record<string, number> = {
  '': 1,
  '/call': 0.8,
  agentDemo: 0.9,
  privacy: 0.3,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const shared = sharedPaths.flatMap((path) =>
    locales.map((lang) => ({
      url: `${siteUrl}/${lang}${path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: priorities[path],
      alternates: {
        languages: Object.fromEntries([
          ...locales.map((l) => [l, `${siteUrl}/${l}${path}`]),
          ['x-default', `${siteUrl}/en${path}`],
        ]),
      },
    })),
  );

  const localized = localizedPages.flatMap((page) =>
    locales.map((lang) => ({
      url: `${siteUrl}/${lang}${localizedPaths[page][lang]}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: priorities[page],
      alternates: {
        languages: Object.fromEntries([
          ...locales.map((l) => [l, `${siteUrl}/${l}${localizedPaths[page][l]}`]),
          ['x-default', `${siteUrl}/en${localizedPaths[page].en}`],
        ]),
      },
    })),
  );

  return [...shared, ...localized];
}
