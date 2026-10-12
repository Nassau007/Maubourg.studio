import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';
import { locales } from '@/lib/i18n';
import { localizedPaths, verticalPages, type LocalizedPage } from '@/lib/routes';
import { allArticles, articleHref, articlesIndexHref } from '@/lib/articles';
import {
  OBSERVATORY_EDITIONS,
  OBSERVATORY_LIVE,
  OBSERVATORY_VERTICALS,
  editionHref,
  latestEdition,
  methodologyHref,
  observatoryHref,
  verticalHref,
} from '@/lib/observatory';

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

// The service pages, then privacy. agentDemo is deliberately absent: that
// path is now a permanent redirect onto the agents page, and listing a redirect
// in a sitemap asks a crawler to index a URL we are telling it to leave.
const localizedPages: LocalizedPage[] = [...verticalPages, 'privacy'];

const priorities: Record<string, number> = {
  '': 1,
  '/call': 0.8,
  // The service pages are what we want found, so they sit just under home.
  // GEO leads, because it is what the studio now sells first.
  geo: 0.9,
  agents: 0.9,
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

  // The blog. Published in one language, so these carry no hreflang
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

  // The observatory. Priority level with the service pages: this is research
  // we want found and quoted. It stays out of the sitemap entirely until a
  // campaign has produced data, because asking a crawler to index an empty
  // section spends the one visit it will give us.
  //
  // Every entry carries the latest edition's publication date, not the deploy
  // date. Only the index exists in both languages (the English page is a
  // summary of the French edition); the method, the verticals and the editions
  // are French only and declare no alternate, the rule the blog follows.
  const edition = latestEdition();
  const observatory =
    !OBSERVATORY_LIVE || !edition
      ? []
      : [
          ...locales.map((lang) => ({
            url: `${siteUrl}${observatoryHref(lang)}`,
            lastModified: new Date(`${edition.published}T00:00:00Z`),
            changeFrequency: 'monthly' as const,
            priority: 0.9,
            alternates: {
              languages: Object.fromEntries([
                ...locales.map((l) => [l, `${siteUrl}${observatoryHref(l)}`]),
                ['x-default', `${siteUrl}${observatoryHref('fr')}`],
              ]),
            },
          })),
          {
            url: `${siteUrl}${methodologyHref('fr')}`,
            lastModified: new Date(`${edition.published}T00:00:00Z`),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
          },
          ...OBSERVATORY_VERTICALS.map((vertical) => ({
            url: `${siteUrl}${verticalHref(vertical, 'fr')}`,
            lastModified: new Date(`${edition.published}T00:00:00Z`),
            changeFrequency: 'monthly' as const,
            priority: 0.9,
          })),
          // An edition is never edited after it ships: its own date, always.
          ...OBSERVATORY_EDITIONS.map((e) => ({
            url: `${siteUrl}${editionHref(e, 'fr')}`,
            lastModified: new Date(`${e.published}T00:00:00Z`),
            changeFrequency: 'yearly' as const,
            priority: 0.8,
          })),
        ];

  return [...shared, ...localized, ...answers, ...observatory];
}
