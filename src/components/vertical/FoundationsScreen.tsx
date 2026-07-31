// Store builds. Layout: the hero is followed immediately by a gate, not by a
// pitch. Two opposed lists, side by side, one of which talks the visitor out of
// the most expensive thing we sell. That inversion is the page's whole design:
// the qualifying section is the hero's equal, not a footnote near the bottom.
//
// Phases run as a five-column rail after it, then what is included, then price.

import VerticalFrame, { SectionHead } from '@/components/vertical/VerticalFrame';
import { PhaseTimeline } from '@/components/vertical/diagrams';
import { getDictionary, type Locale } from '@/lib/i18n';

export default function FoundationsScreen({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const v = dict.verticals.foundations;
  const s = dict.verticals.shared;

  return (
    <VerticalFrame lang={lang} related={v.related}>
      <section className="mx-auto max-w-content px-5 pb-14 pt-8 md:px-8 md:pb-16">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] md:items-end">
          <div>
            <span className="eyebrow">{v.hero.eyebrow}</span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.03] tracking-tightest text-ink md:text-6xl">
              {v.hero.title} <span className="italic text-emerald">{v.hero.titleAccent}</span>
            </h1>
          </div>
          <div className="rounded-card border border-ink/10 bg-bone-100 p-6">
            <p className="font-display text-xl font-semibold text-emerald">{v.hero.stat}</p>
            <p className="mt-1.5 text-[13.5px] leading-snug text-ink-600">{v.hero.statNote}</p>
          </div>
        </div>
        <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-ink-600">
          {v.hero.subtitle}
        </p>
      </section>

      {/* The gate. Two lists, and the one that says no is on the right where a
          reader lands last. */}
      <section className="border-y border-ink/10 bg-bone-200/60 py-14 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <SectionHead eyebrow={v.gate.eyebrow} title={v.gate.title} className="mb-10" />
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-card border border-emerald/30 bg-bone-100 p-7 md:p-9">
              <h3 className="flex items-center gap-2.5 font-display text-xl font-semibold text-ink">
                <span
                  aria-hidden
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald text-[13px] font-bold text-bone"
                >
                  ✓
                </span>
                {v.gate.rebuild.title}
              </h3>
              <ul className="mt-6 space-y-3.5">
                {v.gate.rebuild.items.map((item) => (
                  <li key={item} className="text-[14.5px] leading-relaxed text-ink-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-card border border-ink/12 bg-bone-100/60 p-7 md:p-9">
              <h3 className="flex items-center gap-2.5 font-display text-xl font-semibold text-ink-600">
                <span
                  aria-hidden
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-ink/25 text-[13px] font-bold text-ink-500"
                >
                  ×
                </span>
                {v.gate.dont.title}
              </h3>
              <ul className="mt-6 space-y-3.5">
                {v.gate.dont.items.map((item) => (
                  <li key={item} className="text-[14.5px] leading-relaxed text-ink-500">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-7 text-[14px] font-medium text-emerald">{v.gate.note}</p>
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
        <SectionHead eyebrow={v.phases.eyebrow} title={v.phases.title} className="mb-10" />
        <PhaseTimeline items={v.phases.items} />
      </section>

      <section className="mx-auto max-w-content px-5 pb-4 md:px-8">
        <div className="grid gap-5 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="card">
            <h2 className="font-display text-2xl font-semibold text-ink">{v.included.title}</h2>
            <ul className="mt-6 space-y-3.5">
              {v.included.items.map((item) => (
                <li key={item} className="flex gap-3 text-[14.5px] leading-relaxed text-ink-600">
                  <span aria-hidden className="mt-0.5 shrink-0 font-semibold text-emerald">
                    +
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-card bg-ink p-7 md:p-9">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-bone/50">
              {v.price.label}
            </p>
            <p className="mt-2 font-display text-3xl font-semibold text-signal">{v.price.value}</p>
            <p className="mt-2 text-[13.5px] leading-snug text-bone/70">{v.price.note}</p>
            <p className="mt-5 border-t border-bone/15 pt-4 text-[12px] italic text-bone/50">
              {s.priceNote}
            </p>
          </div>
        </div>
      </section>
    </VerticalFrame>
  );
}
