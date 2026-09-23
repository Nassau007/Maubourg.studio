// LLM visibility. Layout: narrow editorial column rather than the wide grids
// the other pages use, because this page is an explanation before it is an
// offer. The retrieval chain sits inside the column as the one visual, the
// three blocks of work run as a numbered list, and the page ends on two
// admissions rather than a price - there is no honest price list for work this
// young.
//
// The two articles linked under the blocks are the studio's own GEO writing.
// They are French, like the whole blog, and the English page says so rather
// than pretending otherwise.

import Link from 'next/link';
import VerticalFrame, { SectionHead } from '@/components/vertical/VerticalFrame';
import { RetrievalChain } from '@/components/vertical/diagrams';
import { articleHref, getArticle } from '@/lib/articles';
import { getDictionary, type Locale } from '@/lib/i18n';

const GEO_ARTICLES = [
  'comment-faire-en-sorte-que-chatgpt-recommande-ma-marque',
  'pourquoi-ma-marque-n-apparait-jamais-quand-on-demande-une-recommandation-a-perplexity-ou-gemini',
];

export default function GeoScreen({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const v = dict.verticals.geo;
  // A slug that stopped existing drops out of the list rather than rendering a
  // link into a 404.
  const reading = GEO_ARTICLES.map(getArticle).flatMap((a) => (a ? [a] : []));

  return (
    <VerticalFrame lang={lang} related={v.related}>
      <section className="mx-auto max-w-content px-5 pb-14 pt-8 md:px-8 md:pb-20">
        <div className="max-w-3xl">
          <span className="eyebrow">{v.hero.eyebrow}</span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.03] tracking-tightest text-ink md:text-6xl">
            {v.hero.title} <span className="italic text-emerald">{v.hero.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-600">
            {v.hero.subtitle}
          </p>
          <p className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-ink/10 pt-7">
            <span className="font-display text-2xl font-semibold text-emerald">{v.hero.stat}</span>
            <span className="text-[13.5px] text-ink-600">{v.hero.statNote}</span>
          </p>
          {/* The page had no ask at all above the fold. */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={`/${lang}#audit`} className="btn-primary w-full sm:w-auto">
              {v.hero.ctaPrimary}
            </Link>
            <Link href={`/${lang}/call`} className="btn-ghost w-full sm:w-auto">
              {v.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* One wide statement, set large. The argument of the page in a paragraph. */}
      <section className="border-y border-ink/10 bg-bone-100 py-14 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <div className="max-w-3xl">
            <span className="eyebrow">{v.what.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tightest text-ink md:text-4xl">
              {v.what.title}
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-ink-600 md:text-[18px]">
              {v.what.body}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16">
          <SectionHead eyebrow={v.chain.eyebrow} title={v.chain.title} intro={v.chain.caption} />
          <RetrievalChain
            query={v.chain.query}
            steps={v.chain.steps}
            influenceLabel={v.chain.influenceLabel}
          />
        </div>
      </section>

      {/* What we will not promise. Being honest about the limits is what an
          expert sounds like, so it arrives early rather than as a footnote. */}
      <section className="mx-auto max-w-content px-5 pb-16 md:px-8 md:pb-20">
        <div className="max-w-3xl rounded-card border-2 border-dashed border-ink/20 p-7 md:p-9">
          <h2 className="font-display text-2xl font-semibold text-ink">{v.honest.title}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{v.honest.body}</p>
        </div>
      </section>

      {/* The three blocks of work, as a numbered editorial list rather than
          cards: they are one sequence, and each has a lead sentence that also
          appears on the homepage, then what the client actually receives. */}
      <section className="mx-auto max-w-content px-5 pb-16 md:px-8 md:pb-24">
        <SectionHead eyebrow={v.blocks.eyebrow} title={v.blocks.title} />
        <ol className="mt-10 max-w-3xl divide-y divide-ink/10 border-t border-ink/10">
          {v.blocks.items.map((item, i) => (
            <li key={item.title} className="flex gap-5 py-7">
              <span className="font-display text-xl font-semibold text-emerald/70">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 text-[13px] font-medium text-emerald">
                  {v.blocks.priceLabel} · {item.price}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-700">{item.lead}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{item.body}</p>

                {/* What the free audit actually contains, under the step it
                    belongs to. No example PDF linked yet: the GEO one does not
                    exist, and the conversion teardown is a different document. */}
                {i === 0 && (
                  <div className="mt-5 rounded-card border border-emerald/25 bg-emerald-50/50 p-5">
                    <p className="text-[13px] font-semibold uppercase tracking-wide text-emerald">
                      {v.blocks.auditBox.title}
                    </p>
                    <ul className="mt-3 space-y-2">
                      {v.blocks.auditBox.items.map((line) => (
                        <li key={line} className="flex gap-2.5 text-[14px] text-ink-700">
                          <span aria-hidden className="text-emerald">
                            ·
                          </span>
                          {line}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/${lang}#audit`}
                      className="mt-4 inline-block text-sm font-semibold text-emerald underline-offset-4 hover:underline"
                    >
                      {v.blocks.auditBox.cta}
                    </Link>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>

      </section>

      {/* What we change on a real store. The GEO equivalent of the conversion
          page's findings table, and the block that makes the offer tangible. */}
      <section className="mx-auto max-w-content px-5 pb-16 md:px-8 md:pb-24">
        <SectionHead
          eyebrow={v.changes.eyebrow}
          title={v.changes.title}
          intro={v.changes.intro}
        />
        <div className="mt-10 overflow-x-auto rounded-card border border-ink/10">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <thead>
              <tr className="bg-bone-200">
                <th className="w-[26%] px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-ink-600">
                  {v.changes.columns.finding}
                </th>
                <th className="w-[37%] px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-ink-600">
                  {v.changes.columns.cost}
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-ink-600">
                  {v.changes.columns.fix}
                </th>
              </tr>
            </thead>
            <tbody>
              {v.changes.rows.map((row) => (
                <tr key={row.finding} className="border-t border-ink/10 bg-bone-100 align-top">
                  <td className="px-5 py-4 text-[14px] font-semibold text-ink">{row.finding}</td>
                  <td className="px-5 py-4 text-[13.5px] leading-snug text-ink-600">{row.cost}</td>
                  <td className="px-5 py-4 text-[13.5px] leading-snug text-emerald">{row.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {reading.length > 0 && (
          <div className="mt-12 max-w-3xl rounded-card border border-ink/10 bg-bone-100 p-6">
            <p className="text-[13px] font-semibold uppercase tracking-wider text-ink-500">
              {v.reading.heading}
            </p>
            <ul className="mt-4 space-y-3">
              {reading.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={articleHref(article.slug)}
                    className="text-[15px] font-medium text-emerald underline-offset-4 hover:underline"
                  >
                    {article.title} →
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[12.5px] italic text-ink-500">{v.reading.note}</p>
          </div>
        )}
      </section>

      {/* We did it here first. The one piece of proof that costs nothing to
          check: the visitor is reading it. */}
      <section className="mx-auto max-w-content px-5 pb-4 md:px-8">
        <div className="rounded-card bg-emerald p-7 text-bone md:p-9">
          <h2 className="max-w-2xl font-display text-2xl font-semibold">{v.ourown.title}</h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-bone/80">{v.ourown.body}</p>
        </div>
      </section>
    </VerticalFrame>
  );
}
