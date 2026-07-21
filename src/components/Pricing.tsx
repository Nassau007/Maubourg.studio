import Link from 'next/link';
import Reveal from './Reveal';
import type { Dictionary, Locale } from '@/lib/i18n';

export default function Pricing({ dict, lang }: { dict: Dictionary['pricing']; lang: Locale }) {
  const home = `/${lang}`;
  // Entry card CTAs: first → teardown form, second → call page.
  const entryHrefs = [`${home}#teardown`, `${home}/call`];

  return (
    <section id="pricing" className="hairline py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <Reveal>
          <span className="eyebrow">{dict.eyebrow}</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            {dict.title}
          </h2>
          <p className="mt-4 max-w-xl text-ink-600">{dict.intro}</p>
        </Reveal>

        {/* Entry */}
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {dict.entry.map((p, i) => {
            const featured = i === 0;
            return (
              <Reveal key={p.name} delay={i * 80}>
                <div
                  className={`flex h-full flex-col rounded-card p-7 ${
                    featured ? 'bg-emerald text-bone' : 'card'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className={`text-lg font-semibold ${featured ? 'text-bone' : 'text-ink'}`}>
                      {p.name}
                    </h3>
                    <span
                      className={`font-display text-2xl font-semibold ${
                        featured ? 'text-bone' : 'text-ink'
                      }`}
                    >
                      {p.price}
                    </span>
                  </div>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${
                      featured ? 'text-bone/80' : 'text-ink-600'
                    }`}
                  >
                    {p.desc}
                  </p>
                  <Link
                    href={entryHrefs[i]}
                    className={`mt-6 w-full ${featured ? 'btn-signal' : 'btn-ghost'}`}
                  >
                    {p.cta}
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* One-off projects */}
        <Reveal>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {dict.project.map((p) => (
              <div key={p.name} className="card flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-ink">{p.name}</h3>
                  <p className="mt-1 text-sm text-ink-600">{p.desc}</p>
                </div>
                <span className="whitespace-nowrap font-display text-lg font-semibold text-emerald">
                  {p.price}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Retainers */}
        <Reveal>
          <h3 className="mt-16 text-center text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">
            {dict.retainersHeading}
          </h3>
        </Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {dict.retainers.map((r, i) => {
            const featured = i === 1;
            return (
              <Reveal key={r.tier} delay={i * 80}>
                <div
                  className={`relative flex h-full flex-col rounded-card p-7 ${
                    featured
                      ? 'border-2 border-emerald bg-bone-100 shadow-[0_18px_40px_-24px_rgba(14,107,74,0.5)]'
                      : 'card'
                  }`}
                >
                  {featured && (
                    <span className="absolute -top-3 left-7 rounded-full bg-emerald px-3 py-1 text-xs font-semibold text-bone">
                      {dict.mostPopular}
                    </span>
                  )}
                  <h4 className="text-lg font-semibold text-ink">{r.tier}</h4>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-display text-3xl font-semibold text-ink">{r.price}</span>
                    <span className="text-sm text-ink-500">{dict.perMonth}</span>
                  </div>
                  <ul className="mt-5 space-y-2.5">
                    {r.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-ink-700">
                        <span className="mt-0.5 text-emerald">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`${home}#teardown`}
                    className={`mt-7 w-full ${featured ? 'btn-primary' : 'btn-ghost'}`}
                  >
                    {dict.retainerCta}
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <p className="mt-8 text-center text-sm text-ink-500">{dict.footnote}</p>
        </Reveal>
      </div>
    </section>
  );
}
