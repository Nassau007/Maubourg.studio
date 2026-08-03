// One answers article. The template is chosen by the article, not by the URL.
//
// French only for now, which is enforced here rather than by the middleware:
// generateStaticParams returns nothing under /en, and dynamicParams is off, so
// an English URL 404s without the renderer ever running. That also means every
// filesystem read in src/lib/articles.ts happens at build time, which is what
// keeps the standalone Docker output working.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AnswerArticle from '@/components/article/AnswerArticle';
import EditorialArticle from '@/components/article/EditorialArticle';
import { ArticleJsonLd } from '@/components/JsonLd';
import {
  ARTICLES_LOCALE,
  allArticles,
  articlesIndexHref,
  getArticle,
} from '@/lib/articles';
import { getDictionary, isLocale } from '@/lib/i18n';
import { siteUrl, site } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { lang: string } }) {
  if (params.lang !== ARTICLES_LOCALE) return [];
  return allArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}): Promise<Metadata> {
  const article = getArticle(params.slug);
  if (!article) return {};

  const path = `${articlesIndexHref()}/${article.slug}`;

  return {
    metadataBase: new URL(siteUrl),
    title: `${article.title} - ${site.name}`,
    description: article.description,
    // No hreflang alternates: this article exists in one language, and
    // claiming an English twin that 404s is worse than claiming none.
    alternates: { canonical: path },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${siteUrl}${path}`,
      siteName: site.name,
      locale: 'fr_FR',
      type: 'article',
      publishedTime: article.date,
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: ['/twitter-image.png'],
    },
  };
}

export default function Page({ params }: { params: { lang: string; slug: string } }) {
  if (!isLocale(params.lang) || params.lang !== ARTICLES_LOCALE) notFound();

  const article = getArticle(params.slug);
  if (!article) notFound();

  const lang = ARTICLES_LOCALE;
  const dict = getDictionary(lang);

  return (
    <>
      <ArticleJsonLd
        article={article}
        lang={lang}
        indexUrl={articlesIndexHref()}
        indexName={dict.articles.index.eyebrow}
      />
      {article.template === 'answer' ? (
        <AnswerArticle article={article} lang={lang} />
      ) : (
        <EditorialArticle article={article} lang={lang} />
      )}
    </>
  );
}
