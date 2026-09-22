import Link from 'next/link';
import Reveal from './Reveal';
import type { Dictionary, Locale } from '@/lib/i18n';
import { localizedHref, type VerticalPage } from '@/lib/routes';

/**
 * What we do. The six cards are grouped by their tag rather than laid out as
 * one flat grid: GEO runs across the top at full size because it is the
 * headline offer, and the agents and conversion cards sit under it, smaller.
 * A flat grid of six gave all three services the same weight, which
 * contradicted the hero.
 */
export default function Services({
  dict,
  lang,
}: {
  dict: Dictionary['services'];
  lang: Locale;
}) {
  // Tags in the order they first appear, so the dictionary decides the order.
  const tags = dict.items.reduce<string[]>(
    (acc, item) => (acc.includes(item.tag) ? acc : [...acc, item.tag]),
    [],
  );
  const [lead, ...rest] = tags;
  const leadItems = dict.items.filter((item) => item.tag === lead);
  const restItems = dict.items.filter((item) => rest.includes(item.tag));

  return (
    <section id="work" className="hairline bg-bone-200/40 py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <Reveal>
          <span className="eyebrow">{dict.eyebrow}</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            {dict.title}
          </h2>
          <p className="mt-4 max-w-xl text-ink-600">{dict.intro}</p>
        </Reveal>

        {/* The headline service, on its own band. */}
        <div className="mt-12 rounded-card border border-emerald/20 bg-emerald-50/40 p-5 md:p-7">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald">{lead}</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {leadItems.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <Link
                  href={localizedHref(s.page as VerticalPage, lang)}
                  className="card card-hover group flex h-full flex-col"
                >
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {s.title}
                    <span
                      aria-hidden
                      className="ml-1.5 inline-block text-emerald opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                    >
                      →
                    </span>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.body}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* The two secondary services, smaller. */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {restItems.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 80}>
              <Link
                href={localizedHref(s.page as VerticalPage, lang)}
                className="card card-hover group flex h-full flex-col p-5"
              >
                <span className="inline-flex w-fit rounded-full bg-ink/5 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink-600">
                  {s.tag}
                </span>
                <h3 className="mt-3 text-base font-semibold text-ink">
                  {s.title}
                  <span
                    aria-hidden
                    className="ml-1.5 inline-block text-emerald opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                  >
                    →
                  </span>
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-600">{s.body}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
