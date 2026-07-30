// Conversion & measurement. Layout: wide hero with the arithmetic beside it,
// then a funnel that narrows, then a three-column table of real findings, then
// the measurement half on an inverted band, then the three commercial steps.
//
// The table is the point of this page: it is the only vertical where we can
// show the actual output of the work, so it gets the most space.

import VerticalFrame, { SectionHead, StatBadge } from '@/components/vertical/VerticalFrame';
import { FunnelDiagram, MeasureChain } from '@/components/vertical/diagrams';
import { getDictionary, type Locale } from '@/lib/i18n';

export default function ConversionScreen({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const v = dict.verticals.conversion;
  const s = dict.verticals.shared;

  return (
    <VerticalFrame lang={lang} related={v.related}>
      <section className="mx-auto max-w-content px-5 pb-16 pt-6 md:px-8 md:pb-20">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-end">
          <div>
            <span className="eyebrow">{v.hero.eyebrow}</span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.03] tracking-tightest text-ink md:text-6xl">
              {v.hero.title} <span className="italic text-emerald">{v.hero.titleAccent}</span>
            </h1>
          </div>
          <div>
            <p className="text-[17px] leading-relaxed text-ink-600">{v.hero.subtitle}</p>
            <div className="mt-6">
              <StatBadge value={v.hero.stat} note={v.hero.statNote} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 pb-16 md:px-8 md:pb-24">
        <div className="grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-start md:gap-16">
          <SectionHead eyebrow={v.funnel.eyebrow} title={v.funnel.title} intro={v.funnel.intro} />
          <div>
            <FunnelDiagram steps={v.funnel.steps} />
            <p className="mt-5 text-[13px] italic text-ink-500">{v.funnel.caption}</p>
          </div>
        </div>
      </section>

      {/* The findings table. Scrolls inside itself on a phone rather than
          pushing the page sideways. */}
      <section className="mx-auto max-w-content px-5 pb-16 md:px-8 md:pb-24">
        <SectionHead eyebrow={v.leaks.eyebrow} title={v.leaks.title} intro={v.leaks.intro} />
        <div className="mt-10 overflow-x-auto rounded-card border border-ink/10">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <thead>
              <tr className="bg-bone-200">
                <th className="w-[26%] px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-ink-600">
                  {v.leaks.columns.leak}
                </th>
                <th className="w-[37%] px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-ink-600">
                  {v.leaks.columns.cost}
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-ink-600">
                  {v.leaks.columns.fix}
                </th>
              </tr>
            </thead>
            <tbody>
              {v.leaks.rows.map((row) => (
                <tr key={row.leak} className="border-t border-ink/10 bg-bone-100 align-top">
                  <td className="px-5 py-4 text-[14px] font-semibold text-ink">{row.leak}</td>
                  <td className="px-5 py-4 text-[13.5px] leading-snug text-ink-600">{row.cost}</td>
                  <td className="px-5 py-4 text-[13.5px] leading-snug text-emerald">{row.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Measurement, on an inverted band so the page has a spine break and
          the second half reads as a different subject. */}
      <section className="bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <div className="max-w-2xl">
            <span className="eyebrow text-signal before:bg-signal/60">{v.measure.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tightest text-bone md:text-4xl">
              {v.measure.title}
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-bone/70">{v.measure.body}</p>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
            <div className="rounded-card border border-bone/15 bg-bone-100 p-7">
              <MeasureChain chain={v.measure.chain} />
            </div>
            <div>
              <ul className="space-y-4">
                {v.measure.checks.map((check) => (
                  <li key={check} className="flex gap-3">
                    <span aria-hidden className="mt-0.5 shrink-0 font-semibold text-signal">
                      +
                    </span>
                    <span className="text-[14.5px] leading-relaxed text-bone/80">{check}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-l-2 border-signal/60 pl-4 text-[13.5px] leading-relaxed text-bone/60">
                {v.measure.caveat}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
        <SectionHead eyebrow={v.how.eyebrow} title={v.how.title} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {v.how.steps.map((step, i) => (
            <div
              key={step.name}
              className={[
                'card',
                i === 2 ? 'border-emerald/30 bg-emerald-50/50' : '',
              ].join(' ')}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">{step.name}</h3>
              <p className="mt-1 font-display text-lg font-semibold text-emerald">{step.price}</p>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-600">{step.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-[13px] italic text-ink-500">{s.priceNote}</p>
      </section>
    </VerticalFrame>
  );
}
