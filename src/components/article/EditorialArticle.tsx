// The answers article template: editorial hero, one wide reading column, a
// sticky sidebar CTA.
//
// The call to action is pinned rather than parked at the bottom because a
// reader who is convinced at section two should not have to scroll past three
// more to act on it.

import Link from 'next/link';
import ArticleFrame, { ArticleHeader } from './ArticleFrame';
import Prose from './Prose';
import { articleHref, relatedArticles, serviceCta, type Article } from '@/lib/articles';
import { getDictionary, type Locale } from '@/lib/i18n';

export default function EditorialArticle({ article, lang }: { article: Article; lang: Locale }) {
  const dict = getDictionary(lang);
  const copy = dict.articles;
  const cta = serviceCta(article.service, lang, copy.sidebar.button);
  const related = relatedArticles(article);

  return (
    <ArticleFrame lang={lang}>
      <div className="mx-auto max-w-content px-5 md:px-8">
        <ArticleHeader article={article} lang={lang} />
      </div>

      {/* items-start, or the sticky child is stretched to the row height and
          never has anywhere to stick to. */}
      <div className="mx-auto mt-12 grid max-w-content items-start gap-12 px-5 pb-8 md:px-8 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
        {/* min-w-0, or the grid track is sized by the article's min-content
            width. A comparison table sets that to 36rem, which is wider than a
            phone, so without this the whole page scrolls sideways. */}
        <article className="min-w-0 max-w-[68ch]">
          <Prose blocks={article.lead} />

          {article.sections.map((section) => (
            <section key={section.heading} className="mt-11">
              <h2 className="font-display text-[1.6rem] font-semibold leading-snug tracking-tight text-ink md:text-[1.8rem]">
                {section.heading}
              </h2>
              <Prose blocks={section.blocks} className="mt-4" />
            </section>
          ))}
        </article>

        <aside className="min-w-0 lg:sticky lg:top-24">
          <div className="card card-hover">
            <p className="font-display text-lg font-semibold leading-snug text-ink">
              {copy.sidebar.title}
            </p>
            <p className="mt-2 text-[14px] leading-snug text-ink-600">{copy.sidebar.body}</p>
            <Link href={cta.href} className="btn-primary mt-5 w-full">
              {cta.label}
            </Link>

            {related.length > 0 && (
              <div className="mt-7 border-t border-ink/10 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
                  {copy.relatedHeading}
                </p>
                <ul className="mt-3 divide-y divide-ink/10">
                  {related.map((item) => (
                    <li key={item.slug} className="py-3 first:pt-0 last:pb-0">
                      <Link
                        href={articleHref(item.slug)}
                        className="block text-[14px] font-medium leading-snug text-ink-700 transition-colors hover:text-emerald"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
    </ArticleFrame>
  );
}
