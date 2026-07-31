// LLM visibility. Layout: narrow editorial column rather than the wide grids
// the other pages use, because this page is an explanation before it is an
// offer. The retrieval chain sits inside the column as the one visual, the
// levers run as a numbered list, and the page ends on two admissions rather
// than a price - there is no honest price list for work this young.

import VerticalFrame, { SectionHead } from '@/components/vertical/VerticalFrame';
import { RetrievalChain } from '@/components/vertical/diagrams';
import { getDictionary, type Locale } from '@/lib/i18n';

export default function GeoScreen({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const v = dict.verticals.geo;

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

      {/* Levers as a numbered editorial list, not cards: five items that read in
          order rather than five boxes that compete. */}
      <section className="mx-auto max-w-content px-5 pb-16 md:px-8 md:pb-24">
        <SectionHead eyebrow={v.levers.eyebrow} title={v.levers.title} />
        <ol className="mt-10 max-w-3xl divide-y divide-ink/10 border-t border-ink/10">
          {v.levers.items.map((item, i) => (
            <li key={item.title} className="flex gap-5 py-7">
              <span className="font-display text-xl font-semibold text-emerald/70">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Two admissions. The honest one is the more persuasive of the two, so it
          is set as the louder block. */}
      <section className="mx-auto max-w-content px-5 pb-4 md:px-8">
        <div className="grid gap-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="rounded-card border-2 border-dashed border-ink/20 p-7 md:p-9">
            <h2 className="font-display text-2xl font-semibold text-ink">{v.honest.title}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{v.honest.body}</p>
          </div>
          <div className="rounded-card bg-emerald p-7 text-bone md:p-9">
            <h2 className="font-display text-2xl font-semibold">{v.ourown.title}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-bone/80">{v.ourown.body}</p>
          </div>
        </div>
      </section>
    </VerticalFrame>
  );
}
