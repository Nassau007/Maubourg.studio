// Acquisition. Layout: a centred hero (the only one on the five that centres),
// then the two engines as a split panel with one side inverted, then the loop
// diagram, then the flows as a compact table.
//
// The split panel is the page's signature: two engines, shown as two halves,
// one of them visually heavier because retention is the half clients neglect.

import VerticalFrame, { SectionHead } from '@/components/vertical/VerticalFrame';
import { AcquisitionLoop } from '@/components/vertical/diagrams';
import { getDictionary, type Locale } from '@/lib/i18n';

export default function AcquisitionScreen({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const v = dict.verticals.acquisition;

  return (
    <VerticalFrame lang={lang} related={v.related}>
      <section className="mx-auto max-w-content px-5 pb-14 pt-8 text-center md:px-8 md:pb-20">
        <span className="eyebrow justify-center">{v.hero.eyebrow}</span>
        <h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.03] tracking-tightest text-ink md:text-6xl">
          {v.hero.title} <span className="italic text-emerald">{v.hero.titleAccent}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-600">
          {v.hero.subtitle}
        </p>
        <div className="mx-auto mt-9 flex max-w-xl items-baseline justify-center gap-3 border-t border-ink/10 pt-7">
          <span className="font-display text-3xl font-semibold text-emerald md:text-4xl">
            {v.hero.stat}
          </span>
          <span className="text-left text-[13px] leading-snug text-ink-600">
            {v.hero.statNote}
          </span>
        </div>
      </section>

      {/* Two engines, two halves. The inverted side is retention on purpose:
          it is the one that gets skipped, so it gets the weight. */}
      <section className="mx-auto max-w-content px-5 pb-16 md:px-8 md:pb-24">
        <SectionHead
          eyebrow={v.engines.eyebrow}
          title={v.engines.title}
          align="center"
          className="mb-10"
        />
        <div className="grid gap-px overflow-hidden rounded-card border border-ink/10 bg-ink/10 md:grid-cols-2">
          <div className="bg-bone-100 p-7 md:p-10">
            <h3 className="font-display text-2xl font-semibold text-ink">{v.engines.paid.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{v.engines.paid.body}</p>
            <ul className="mt-7 space-y-3">
              {v.engines.paid.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-[14px] leading-snug text-ink-600">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink/35" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-ink p-7 md:p-10">
            <h3 className="font-display text-2xl font-semibold text-bone">
              {v.engines.retention.title}
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-bone/70">
              {v.engines.retention.body}
            </p>
            <ul className="mt-7 space-y-3">
              {v.engines.retention.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-[14px] leading-snug text-bone/80">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-bone-200/70 py-16 md:py-24">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <SectionHead
            eyebrow={v.loop.eyebrow}
            title={v.loop.title}
            intro={v.loop.intro}
            className="mb-12"
          />
          <AcquisitionLoop nodes={v.loop.nodes} />
          <p className="mt-10 border-l-2 border-emerald/50 pl-4 font-display text-lg italic text-ink md:text-xl">
            {v.loop.caption}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
        <SectionHead eyebrow={v.flows.eyebrow} title={v.flows.title} />
        <div className="mt-10 overflow-x-auto rounded-card border border-ink/10">
          <table className="w-full min-w-[38rem] border-collapse text-left">
            <thead>
              <tr className="bg-bone-200">
                <th className="w-[22%] px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-ink-600">
                  {v.flows.columns.name}
                </th>
                <th className="w-[20%] px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-ink-600">
                  {v.flows.columns.trigger}
                </th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-ink-600">
                  {v.flows.columns.purpose}
                </th>
              </tr>
            </thead>
            <tbody>
              {v.flows.items.map((item) => (
                <tr key={item.name} className="border-t border-ink/10 bg-bone-100 align-top">
                  <td className="px-5 py-4 text-[14px] font-semibold text-ink">{item.name}</td>
                  <td className="px-5 py-4 text-[13px] text-ink-500">{item.trigger}</td>
                  <td className="px-5 py-4 text-[13.5px] leading-snug text-ink-600">
                    {item.purpose}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </VerticalFrame>
  );
}
