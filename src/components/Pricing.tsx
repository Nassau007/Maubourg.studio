import Link from 'next/link';
import Reveal from './Reveal';
import type { Dictionary, Locale } from '@/lib/i18n';
import { localizedHref } from '@/lib/routes';

/**
 * Pricing, in three groups: GEO, agents, conversion, in that order, because
 * that is the order the studio sells them. The monthly conversion retainers
 * keep their own block at the bottom.
 *
 * Each card carries an `action` rather than a URL, so the dictionary stays
 * copy and the routing stays here: 'audit' is the form further up this page,
 * 'diagnostic' the one on the conversion page, 'call' the call page.
 */
export default function Pricing({ dict, lang }: { dict: Dictionary['pricing']; lang: Locale }) {
  const home = `/${lang}`;
  const hrefFor = (action: string) => {
    if (action === 'call') return `${home}/call`;
    if (action === 'diagnostic') return `${localizedHref('conversion', lang)}#diagnostic`;
    return `${home}#audit`;
  };

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

        {dict.groups.map((group, gi) => (
          <div key={group.heading} className={gi === 0 ? 'mt-12' : 'mt-14'}>
            <Reveal>
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">
                {group.heading}
              </h3>
            </Reveal>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {group.items.map((item, i) => (
                <Reveal key={item.name} delay={(i % 4) * 70}>
                  <div
                    className={`relative flex h-full flex-col rounded-card p-6 ${
                      item.featured
                        ? 'bg-emerald text-bone'
                        : item.badge
                          ? 'border-2 border-emerald bg-bone-100 shadow-[0_18px_40px_-24px_rgba(14,107,74,0.5)]'
                          : 'card'
                    }`}
                  >
                    {item.badge && (
                      <span className="absolute -top-3 left-6 rounded-full bg-emerald px-3 py-1 text-xs font-semibold text-bone">
                        {dict.mostRequested}
                      </span>
                    )}
                    <h4
                      className={`text-base font-semibold ${item.featured ? 'text-bone' : 'text-ink'}`}
                    >
                      {item.name}
                    </h4>
                    <p
                      className={`mt-2 font-display text-2xl font-semibold ${
                        item.featured ? 'text-bone' : 'text-emerald'
                      }`}
                    >
                      {item.price}
                    </p>
                    <p className={`mt-1 text-xs ${item.featured ? 'text-bone/70' : 'text-ink-500'}`}>
                      {item.meta}
                    </p>
                    <p
                      className={`mt-3 flex-1 text-[13.5px] leading-relaxed ${
                        item.featured ? 'text-bone/80' : 'text-ink-600'
                      }`}
                    >
                      {item.desc}
                    </p>
                    <Link
                      href={hrefFor(item.action)}
                      className={`mt-6 w-full ${item.featured ? 'btn-signal' : 'btn-ghost'}`}
                    >
                      {item.cta}
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ))}

        {/* Monthly conversion retainers */}
        <Reveal>
          <h3 className="mt-16 text-center text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">
            {dict.retainersHeading}
          </h3>
        </Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {dict.retainers.map((r, i) => (
            <Reveal key={r.tier} delay={i * 80}>
              <div className="card flex h-full flex-col">
                <h4 className="text-lg font-semibold text-ink">{r.tier}</h4>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-semibold text-ink">{r.price}</span>
                  <span className="text-sm text-ink-500">{dict.perMonth}</span>
                </div>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {r.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink-700">
                      <span className="mt-0.5 text-emerald">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`${localizedHref('conversion', lang)}#diagnostic`}
                  className="btn-ghost mt-7 w-full"
                >
                  {dict.retainerCta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 text-center text-sm text-ink-500">{dict.footnote}</p>
        </Reveal>
      </div>
    </section>
  );
}
