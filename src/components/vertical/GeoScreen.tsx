// LLM visibility. Exploration B "Foret": forest green opening and closing,
// light middle, coral as the one accent (fills and marks only on light).
//
// The page is an explanation before it is an offer, so its middle runs as a
// sequence of different shapes rather than a stack of card grids: a statement
// with the one claim beside it, the retrieval chain on a tinted band, a pull
// statement for what we will not promise, the three blocks of work as a
// vertical timeline, then the table of real fixes. Two eyebrows in nine
// sections: the hero label and "what the work is".
//
// The two articles linked under the table are the studio's own GEO writing.
// They are French, like the whole blog, and the English page says so.

import Link from 'next/link';
import VerticalFrame, { ForestHero, SectionHead } from '@/components/vertical/VerticalFrame';
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
  // One real answer from the Atlas beside the hero: the same capture the
  // home page shows, ChatGPT on 7 October 2026.
  const capture = dict.hero.tiles.items[0];
  const reading = GEO_ARTICLES.map(getArticle).flatMap((a) => (a ? [a] : []));

  return (
    <VerticalFrame
      lang={lang}
      related={v.related}
      hero={
        <ForestHero
          eyebrow={v.hero.eyebrow}
          title={v.hero.title}
          titleAccent={v.hero.titleAccent}
          subtitle={v.hero.subtitle}
          primary={{ label: v.hero.ctaPrimary, href: `/${lang}#audit` }}
          secondary={{ label: v.hero.ctaSecondary, href: `/${lang}/call` }}
          aside={
            <figure className="mx-auto max-w-sm lg:ml-auto lg:mr-0">
              <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-bone/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/atlas/2026-10/captures/${capture.file}`}
                  alt={capture.alt}
                  width={600}
                  height={951}
                  className="aspect-[4/5] w-full object-cover object-top"
                />
              </div>
              <figcaption className="mt-3 text-sm leading-relaxed text-bone/75">{v.hero.captureCaption}</figcaption>
            </figure>
          }
        />
      }
    >
      {/* The argument of the page in one paragraph, with the claim it rests
          on set beside it in the coral tint. */}
      <section className="bg-bone py-20 md:py-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <h2 className="font-display max-w-3xl text-4xl font-bold leading-[1.05] text-ink md:text-[3.25rem] [text-wrap:balance]">
            {v.what.title}
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-12 md:gap-12">
            <div className="rounded-card bg-signal-50 p-8 md:col-span-4">
              <p className="font-display text-3xl font-bold leading-tight text-ink">{v.hero.stat}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-700">{v.hero.statNote}</p>
            </div>
            <p className="text-[17px] leading-relaxed text-ink-700 md:col-span-8 md:text-[18px]">
              {v.what.body}
            </p>
          </div>
        </div>
      </section>

      {/* How an answer gets made: the one diagram, on a tinted band. */}
      <section className="bg-bone-100 py-20 md:py-28">
        <div className="mx-auto grid max-w-content gap-12 px-5 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-16 md:px-8">
          <SectionHead title={v.chain.title} intro={v.chain.caption} />
          <RetrievalChain
            query={v.chain.query}
            steps={v.chain.steps}
            influenceLabel={v.chain.influenceLabel}
          />
        </div>
      </section>

      {/* What we will not promise. Arrives early rather than as a footnote:
          being plain about the limits is what an expert sounds like. */}
      <section className="bg-bone py-20 md:py-24">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <div className="max-w-4xl border-l-4 border-signal pl-6 md:pl-10">
            <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-[2.5rem]">
              {v.honest.title}
            </h2>
            <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-ink-700">{v.honest.body}</p>
          </div>
        </div>
      </section>

      {/* The three blocks of work, one sequence: a vertical timeline. The
          first, the free audit, carries the coral marker and says what the
          audit contains. */}
      <section className="bg-bone pb-20 md:pb-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <SectionHead eyebrow={v.blocks.eyebrow} title={v.blocks.title} />
          <ol className="relative mt-14 max-w-4xl">
            <span aria-hidden className="absolute bottom-6 left-5 top-6 w-px bg-ink/20" />
            {v.blocks.items.map((item, i) => (
              <li key={item.title} className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-5 pb-14 last:pb-0 md:gap-8">
                <span
                  className={`figure relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                    i === 0 ? 'bg-signal text-ink' : 'border border-ink/25 bg-bone text-ink-600'
                  }`}
                >
                  {i + 1}
                </span>
                <div className="pt-1">
                  <h3 className="font-display text-2xl font-bold text-ink md:text-[1.75rem]">{item.title}</h3>
                  <p className="mt-2 text-[14.5px] font-semibold leading-snug text-ink-700">
                    <span className="sr-only">{v.blocks.priceLabel}. </span>
                    {item.price}
                  </p>
                  <p className="mt-4 text-[16.5px] leading-relaxed text-ink">{item.lead}</p>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-ink-600">{item.body}</p>

                  {/* What the free audit actually contains, under the step it
                      belongs to. No example PDF linked yet: the GEO one does
                      not exist yet. */}
                  {i === 0 && (
                    <div className="mt-7 rounded-card bg-bone-100 p-6 ring-1 ring-ink/10 md:p-7">
                      <h4 className="font-display text-lg font-bold text-ink">{v.blocks.auditBox.title}</h4>
                      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                        {v.blocks.auditBox.items.map((line) => (
                          <li key={line} className="flex gap-3 text-[14.5px] leading-snug text-ink-700">
                            <span aria-hidden className="mt-1.5 h-2 w-2 flex-none rounded-sm bg-signal" />
                            {line}
                          </li>
                        ))}
                      </ul>
                      <Link href={`/${lang}#audit`} className="btn-primary mt-6">
                        {v.blocks.auditBox.cta}
                      </Link>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What we change on a real store. A real table: five findings, the
          same three questions asked of each. */}
      <section className="bg-bone-100 py-20 md:py-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <SectionHead title={v.changes.title} intro={v.changes.intro} />
          <div className="mt-12 overflow-x-auto rounded-card bg-bone ring-1 ring-ink/10">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-ink/15">
                  <th scope="col" className="w-[26%] px-6 py-4 text-sm font-semibold text-ink">
                    {v.changes.columns.finding}
                  </th>
                  <th scope="col" className="w-[37%] px-6 py-4 text-sm font-semibold text-ink">
                    {v.changes.columns.cost}
                  </th>
                  <th scope="col" className="px-6 py-4 text-sm font-semibold text-ink">
                    {v.changes.columns.fix}
                  </th>
                </tr>
              </thead>
              <tbody>
                {v.changes.rows.map((row, i) => (
                  <tr key={row.finding} className={`align-top ${i > 0 ? 'border-t border-ink/10' : ''}`}>
                    <th scope="row" className="px-6 py-5 text-[15px] font-semibold leading-snug text-ink">
                      {row.finding}
                    </th>
                    <td className="px-6 py-5 text-[14.5px] leading-snug text-ink-600">{row.cost}</td>
                    <td className="px-6 py-5 text-[14.5px] font-medium leading-snug text-emerald">{row.fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {reading.length > 0 && (
            <div className="mt-14 grid gap-6 border-t border-ink/12 pt-8 md:grid-cols-12">
              <div className="md:col-span-4">
                <h3 className="font-display text-lg font-bold text-ink">{v.reading.heading}</h3>
                <p className="mt-1 text-sm text-ink-600">{v.reading.note}</p>
              </div>
              <ul className="space-y-4 md:col-span-8">
                {reading.map((article) => (
                  <li key={article.slug}>
                    <Link href={articleHref(article.slug)} className="text-link text-[16px] leading-snug">
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* We did it here first: the one piece of proof that costs nothing to
          check, since the visitor is reading it. A rule and a statement, not
          a dark block in the middle of the light pages. */}
      <section className="bg-bone">
        <div className="mx-auto max-w-content px-5 pt-20 md:px-8 md:pt-24">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-[2.25rem]">
              {v.ourown.title}
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink-700">{v.ourown.body}</p>
          </div>
        </div>
      </section>
    </VerticalFrame>
  );
}
