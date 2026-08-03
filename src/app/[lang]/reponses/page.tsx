// The answers index. French only, same reason as the article pages.

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import {
  ARTICLES_LOCALE,
  allArticles,
  articleHref,
  articlesIndexHref,
  formatDate,
} from '@/lib/articles';
import { getDictionary, isLocale } from '@/lib/i18n';
import { serviceMenu } from '@/lib/routes';
import { siteUrl, site } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (params.lang !== ARTICLES_LOCALE) return {};
  const m = getDictionary(ARTICLES_LOCALE).articles.meta;

  return {
    metadataBase: new URL(siteUrl),
    title: m.title,
    description: m.description,
    alternates: { canonical: articlesIndexHref() },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${siteUrl}${articlesIndexHref()}`,
      siteName: site.name,
      locale: 'fr_FR',
      type: 'website',
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
    },
  };
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang) || params.lang !== ARTICLES_LOCALE) notFound();

  const lang = ARTICLES_LOCALE;
  const dict = getDictionary(lang);
  const copy = dict.articles;
  const articles = allArticles();

  return (
    <>
      <Nav
        dict={dict.nav}
        lang={lang}
        services={serviceMenu(lang)}
        servicesLabel={dict.verticals.shared.navHeading}
      />
      <main className="pt-28 md:pt-32">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <Link
            href={`/${lang}`}
            className="block w-fit text-sm font-medium text-ink-500 transition-colors hover:text-ink"
          >
            {dict.verticals.shared.backHome}
          </Link>

          <div className="mt-8 max-w-2xl">
            <span className="eyebrow">{copy.index.eyebrow}</span>
            <h1 className="mt-4 font-display text-[2.15rem] font-semibold leading-[1.05] tracking-tightest text-ink sm:text-5xl">
              {copy.index.title}
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-600">{copy.index.intro}</p>
          </div>

          {articles.length === 0 ? (
            <p className="mt-12 text-ink-500">{copy.index.empty}</p>
          ) : (
            <ul className="mt-12 grid gap-5 pb-6 md:grid-cols-2">
              {articles.map((article, i) => (
                <li key={article.slug}>
                  <Reveal delay={i * 60}>
                    <Link href={articleHref(article.slug)} className="card card-hover group block h-full">
                      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald">
                        {article.category}
                      </span>
                      <p className="mt-3 font-display text-[1.35rem] font-semibold leading-snug text-ink">
                        {article.title}{' '}
                        <span
                          aria-hidden
                          className="inline-block transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </p>
                      <p className="mt-2.5 text-[14.5px] leading-snug text-ink-600">
                        {article.description}
                      </p>
                      <p className="mt-4 text-[13px] text-ink-500">
                        {formatDate(article.date, lang)} ·{' '}
                        {copy.readingTime.replace('{n}', String(article.readingTime))}
                      </p>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}
