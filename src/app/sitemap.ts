import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';
import { locales } from '@/lib/i18n';
import { localizedPaths, verticalPages, type LocalizedPage } from '@/lib/routes';
import { allArticles, articleHref, articlesIndexHref } from '@/lib/articles';

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

// The five service pages, then privacy. agentDemo is deliberately absent: that
// path is now a permanent redirect onto the agents page, and listing a redirect
// in a sitemap asks a crawler to index a URL we are telling it to leave.
const localizedPages: LocalizedPage[] = [...verticalPages, 'privacy'];

const priorities: Record<string, number> = {
  '': 1,
  '/call': 0.8,
  // The service pages are what we want found, so they sit just under home.
  conversion: 0.9,
  agents: 0.9,
  acquisition: 0.8,
  geo: 0.8,
  foundations: 0.8,
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

  // The answers section. Published in one language, so these carry no hreflang
  // alternates: declaring an English twin that does not exist is a worse signal
  // than declaring none. Each article's own date is its lastModified rather
  // than today's, so a crawler is not told every article changed on a deploy.
  const answers = [
    {
      url: `${siteUrl}${articlesIndexHref()}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    ...allArticles().map((article) => ({
      url: `${siteUrl}${articleHref(article.slug)}`,
      lastModified: new Date(`${article.date}T00:00:00Z`),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return [...shared, ...localized, ...answers];
}
