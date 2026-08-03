// Layout C: the answer first, then the follow-up questions in an accordion.
//
// The highlighted block under the headline is the point of the template. It is
// written to stand on its own, because that is the passage an assistant lifts
// when someone asks the question this page is named after, and a passage that
// only makes sense after two paragraphs of run-up gets quoted wrong or not at
// all.
//
// The accordion is <details>/<summary>, the same markup as the homepage FAQ.
// That is not only for consistency: the closed sections are still in the HTML,
// so a crawler reads the whole page while a visitor reads the part they came
// for.

import Link from 'next/link';
import ArticleFrame, { ArticleHeader } from './ArticleFrame';
import Prose from './Prose';
import { serviceCta, type Article } from '@/lib/articles';
import { getDictionary, type Locale } from '@/lib/i18n';

export default function AnswerArticle({ article, lang }: { article: Article; lang: Locale }) {
  const dict = getDictionary(lang);
  const copy = dict.articles;
  const cta = serviceCta(article.service, lang, copy.cta.button);

  // The first paragraph of the source is already the direct answer: it is what
  // the frontmatter description is a truncation of. Anything else in the lead
  // stays below the highlight as ordinary prose.
  const [answer, ...restOfLead] = article.lead;

  return (
    <ArticleFrame lang={lang} width="narrow">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <ArticleHeader article={article} lang={lang} size="compact" />

        {answer && (
          <div className="mt-8 rounded-r-card border-l-[3px] border-emerald bg-emerald-50 px-6 py-5 md:px-7 md:py-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-dark">
              {copy.answerLabel}
            </p>
            <Prose blocks={[answer]} className="mt-2.5 text-ink" />
          </div>
        )}

        {restOfLead.length > 0 && <Prose blocks={restOfLead} className="mt-8" />}

        {article.sections.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">
              {copy.sectionsHeading}
            </h2>

            <div className="mt-4 divide-y divide-ink/10 border-t border-ink/10">
              {article.sections.map((section, i) => (
                <details key={section.heading} className="group py-5" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink">
                    {section.heading}
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-ink/15 text-ink-600 transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <Prose blocks={section.blocks} className="mt-4" />
                </details>
              ))}
            </div>
          </section>
        )}

        <section className="py-14 md:py-20">
          <div className="rounded-card bg-ink px-6 py-12 text-center md:px-14">
            <span className="eyebrow justify-center text-signal before:bg-signal/60">
              {copy.cta.eyebrow}
            </span>
            <h2 className="mx-auto mt-4 max-w-xl font-display text-2xl font-semibold leading-[1.15] tracking-tightest text-bone md:text-3xl">
              {copy.cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-bone/70">
              {copy.cta.body}
            </p>
            <div className="mt-8 flex justify-center">
              <Link href={cta.href} className="btn-signal w-full sm:w-auto">
                {cta.label}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </ArticleFrame>
  );
}
