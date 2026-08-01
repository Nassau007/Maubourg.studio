// Conversion & measurement. One column, top to bottom.
//
// This page was originally built on side-by-side splits: title beside the
// subtitle, section heading beside its diagram, the chain beside its checks.
// It read badly - the eye had to keep choosing which side to continue on. Now
// every section is heading, then prose, then the thing it introduces, stacked
// in one column. Prose stays inside a measure that is comfortable to read;
// only the funnel and the table use the full column width, because both are
// scanned rather than read.

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
        <div className="max-w-3xl">
          <span className="eyebrow">{v.hero.eyebrow}</span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.03] tracking-tightest text-ink md:text-6xl">
            {v.hero.title} <span className="italic text-emerald">{v.hero.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-600">
            {v.hero.subtitle}
          </p>
          <div className="mt-8 max-w-xl">
            <StatBadge value={v.hero.stat} note={v.hero.statNote} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 pb-16 md:px-8 md:pb-24">
        <SectionHead eyebrow={v.funnel.eyebrow} title={v.funnel.title} intro={v.funnel.intro} />
        <div className="mt-10 max-w-3xl">
          <FunnelDiagram steps={v.funnel.steps} />
          <p className="mt-5 text-[13px] italic text-ink-500">{v.funnel.caption}</p>
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

      {/* Measurement, on an inverted band so the page has a spine break and the
          second half reads as a different subject. Still one column inside it. */}
      <section className="bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <div className="max-w-2xl">
            <span className="eyebrow text-signal before:bg-signal/60">{v.measure.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tightest text-bone md:text-4xl">
              {v.measure.title}
            </h2>
            <p className="mt-5 text-[15.5px] leading-relaxed text-bone/70">{v.measure.body}</p>
          </div>

          <div className="mt-10 max-w-2xl rounded-card border border-bone/15 bg-bone-100 p-7">
            <MeasureChain chain={v.measure.chain} />
          </div>

          <ul className="mt-10 max-w-2xl space-y-4">
            {v.measure.checks.map((check) => (
              <li key={check} className="flex gap-3">
                <span aria-hidden className="mt-0.5 shrink-0 font-semibold text-signal">
                  +
                </span>
                <span className="text-[14.5px] leading-relaxed text-bone/80">{check}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-2xl border-l-2 border-signal/60 pl-4 text-[13.5px] leading-relaxed text-bone/60">
            {v.measure.caveat}
          </p>
        </div>
      </section>

      {/* The three commercial steps, stacked. They are a sequence, not three
          options to compare, so reading them down the page matches the order
          a client actually moves through them. */}
      <section className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
        <SectionHead eyebrow={v.how.eyebrow} title={v.how.title} />
        <ol className="mt-10 max-w-3xl space-y-4">
          {v.how.steps.map((step, i) => (
            <li
              key={step.name}
              className={[
                'flex flex-col gap-3 rounded-card border p-6 sm:flex-row sm:items-baseline sm:gap-8',
                i === 2 ? 'border-emerald/30 bg-emerald-50/50' : 'border-ink/10 bg-bone-100',
              ].join(' ')}
            >
              <div className="flex shrink-0 items-baseline gap-3 sm:w-52 sm:flex-col sm:gap-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-xl font-semibold text-ink">{step.name}</h3>
                <p className="font-display text-lg font-semibold text-emerald">{step.price}</p>
              </div>
              <p className="text-[14.5px] leading-relaxed text-ink-600">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-[13px] italic text-ink-500">{s.priceNote}</p>
      </section>
    </VerticalFrame>
  );
}
