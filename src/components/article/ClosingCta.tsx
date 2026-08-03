// The closing call to action: narrative and citation templates only, never
// the sidebar template, which keeps its card in view the whole way down and
// has nothing left to close with.
//
// Which of the three styles an article gets is decided by closingStyleFor()
// in src/lib/articles.ts, deterministically per slug so it never depends on
// publish order. `question` needs no authored copy at all: its headline is
// the article's own frontmatter `question`, already written for every
// article. `minimal` and `conversational` are fixed copy general enough to
// read fine under any topic.

import Link from 'next/link';
import { closingStyleFor, serviceCta, type Article } from '@/lib/articles';
import { getDictionary, type Locale } from '@/lib/i18n';

export default function ClosingCta({ article, lang }: { article: Article; lang: Locale }) {
  const dict = getDictionary(lang);
  const copy = dict.articles.closing;
  const style = closingStyleFor(article.slug);

  if (style === 'minimal') {
    const cta = serviceCta(article.service, lang, copy.minimal.button);
    return (
      <div className="mt-10 border-y border-ink/10 py-5 text-center">
        <p className="text-[14.5px] text-ink-700">
          {copy.minimal.prefix}{' '}
          <Link
            href={cta.href}
            className="font-semibold text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:text-emerald"
          >
            {cta.label}
          </Link>
        </p>
      </div>
    );
  }

  const isQuestion = style === 'question';
  const heading = isQuestion ? article.question : copy.conversational.title;
  const body = isQuestion ? copy.question.body : copy.conversational.body;
  const cta = serviceCta(
    article.service,
    lang,
    isQuestion ? copy.question.button : copy.conversational.button,
  );

  return (
    <div className="mt-10 rounded-card bg-ink px-6 py-9 text-center md:px-9">
      <h3 className="mx-auto max-w-md font-display text-lg font-semibold leading-snug text-bone">
        {heading}
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-[14px] leading-snug text-bone/70">{body}</p>
      <Link href={cta.href} className="btn-signal mt-5 inline-flex">
        {cta.label}
      </Link>
    </div>
  );
}
