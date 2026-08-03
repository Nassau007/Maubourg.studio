// Template 3, citation: no CTA interrupts the body at all.
//
// Right after the lead, its first complete sentence is pulled out and set
// large, in italic serif, on its own. Not the frontmatter `description`: that
// field is written as a truncated meta-description snippet (it ends
// mid-sentence in most of the corpus), so it reads broken set large. The lead
// paragraph itself is real prose, and by house convention it opens with the
// direct answer, so its first sentence is a complete, standalone claim with
// no new authoring needed. It is the passage this template is betting an
// assistant lifts and cites. Only the closing CTA appears, at the very end,
// rotating the same as the narrative template.

import ArticleFrame, { ArticleHeader } from './ArticleFrame';
import ClosingCta from './ClosingCta';
import Prose from './Prose';
import { getDictionary, type Locale } from '@/lib/i18n';
import { type Article } from '@/lib/articles';
import { blockText, firstSentence } from '@/lib/markdown';

export default function ArticleCitation({ article, lang }: { article: Article; lang: Locale }) {
  const dict = getDictionary(lang);
  const copy = dict.articles;
  const leadParagraph = article.lead.find((block) => block.kind === 'p');
  const quote = leadParagraph ? firstSentence(blockText(leadParagraph)) : article.description;

  return (
    <ArticleFrame lang={lang}>
      <div className="mx-auto max-w-2xl px-5 md:px-8">
        <ArticleHeader article={article} lang={lang} />

        <div className="mt-10">
          <Prose blocks={article.lead} />
        </div>

        <div className="my-11 border-l-[3px] border-emerald pl-6">
          <p className="font-display text-[1.35rem] italic leading-snug text-ink md:text-[1.5rem]">
            {quote}
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink-500">
            {copy.citationLabel}
          </p>
        </div>

        {article.sections.map((section) => (
          <section key={section.heading} className="mt-11">
            <h2 className="font-display text-[1.6rem] font-semibold leading-snug tracking-tight text-ink md:text-[1.8rem]">
              {section.heading}
            </h2>
            <Prose blocks={section.blocks} className="mt-4" />
          </section>
        ))}

        <ClosingCta article={article} lang={lang} />
        <div className="pb-8" />
      </div>
    </ArticleFrame>
  );
}
