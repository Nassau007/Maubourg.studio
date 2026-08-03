// The blog article template: one centered reading column, no sidebar.
//
// A single column keeps the passage a reader (or a model) lifts out
// self-contained, and it is the shape that holds up best on a phone, which is
// most of this traffic. The call to action appears twice: once right after
// the lead, where a reader convinced early should not have to scroll past
// every section to act on it, and again at the end for anyone who read the
// whole thing.

import Link from 'next/link';
import ArticleFrame, { ArticleHeader } from './ArticleFrame';
import Prose from './Prose';
import { articleHref, relatedArticles, serviceCta, type Article } from '@/lib/articles';
import { getDictionary, type Locale } from '@/lib/i18n';

export default function ArticleBody({ article, lang }: { article: Article; lang: Locale }) {
  const dict = getDictionary(lang);
  const copy = dict.articles;
  const cta = serviceCta(article.service, lang, copy.cta.button);
  const related = relatedArticles(article);

  return (
    <ArticleFrame lang={lang}>
      <div className="mx-auto max-w-2xl px-5 md:px-8">
        <ArticleHeader article={article} lang={lang} />

        <div className="mt-10">
          <Prose blocks={article.lead} />
        </div>

        <div className="my-11 rounded-card bg-ink px-6 py-9 md:px-9">
          <p className="font-display text-lg font-semibold leading-snug text-bone">
            {copy.cta.title}
          </p>
          <p className="mt-2 text-[14px] leading-snug text-bone/70">{copy.cta.body}</p>
          <Link href={cta.href} className="btn-signal mt-5 w-full sm:w-auto">
            {cta.label}
          </Link>
        </div>

        {article.sections.map((section) => (
          <section key={section.heading} className="mt-11">
            <h2 className="font-display text-[1.6rem] font-semibold leading-snug tracking-tight text-ink md:text-[1.8rem]">
              {section.heading}
            </h2>
            <Prose blocks={section.blocks} className="mt-4" />
          </section>
        ))}

        {related.length > 0 && (
          <div className="mt-14 border-t border-ink/10 pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
              {copy.relatedHeading}
            </p>
            <ul className="mt-3 divide-y divide-ink/10">
              {related.map((item) => (
                <li key={item.slug} className="py-3 first:pt-0 last:pb-0">
                  <Link
                    href={articleHref(item.slug)}
                    className="block text-[15px] font-medium leading-snug text-ink-700 transition-colors hover:text-emerald"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 pb-8 text-center">
          <Link href={cta.href} className="btn-ghost">
            {cta.label}
          </Link>
        </div>
      </div>
    </ArticleFrame>
  );
}
