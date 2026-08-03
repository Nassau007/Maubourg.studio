// Chrome and hero for an answers article.
//
// Same split as VerticalFrame on the service pages: this owns the furniture
// (nav, the way back, the footer) and the headline block, and owns no opinion
// about the body.

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { articlesIndexHref, formatDate, type ArticleMeta } from '@/lib/articles';
import { getDictionary, type Locale } from '@/lib/i18n';
import { serviceMenu } from '@/lib/routes';

export default function ArticleFrame({
  lang,
  children,
}: {
  lang: Locale;
  children: React.ReactNode;
}) {
  const dict = getDictionary(lang);

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
            href={articlesIndexHref()}
            className="block w-fit text-sm font-medium text-ink-500 transition-colors hover:text-ink"
          >
            {dict.articles.backToIndex}
          </Link>
        </div>
        {children}
      </main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}

/** Category pill, headline, byline. The hero scale one notch down from the homepage. */
export function ArticleHeader({
  article,
  lang,
}: {
  article: ArticleMeta;
  lang: Locale;
}) {
  const dict = getDictionary(lang);

  return (
    <header className="pt-8 md:pt-10">
      <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-ink/12 bg-bone-100 px-4 py-1.5 text-xs font-medium text-ink-600">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
        {article.category}
      </div>

      <h1
        className="animate-fade-up mt-5 max-w-3xl font-display font-semibold tracking-tightest text-ink text-[2.15rem] leading-[1.05] sm:text-5xl md:text-[3.25rem]"
        style={{ animationDelay: '80ms' }}
      >
        {article.title}
      </h1>

      <div
        className="animate-fade-up mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13.5px] text-ink-500"
        style={{ animationDelay: '160ms' }}
      >
        <span className="font-medium text-ink-600">{dict.articles.source}</span>
        <Dot />
        <time dateTime={article.date}>{formatDate(article.date, lang)}</time>
        <Dot />
        <span>{dict.articles.readingTime.replace('{n}', String(article.readingTime))}</span>
      </div>
    </header>
  );
}

function Dot() {
  return (
    <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-ink/25" />
  );
}
