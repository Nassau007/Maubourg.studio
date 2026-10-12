import Link from 'next/link';
import Reveal from './Reveal';
import type { Dictionary, Locale } from '@/lib/i18n';

/**
 * Exploration B. The free audit as a wide banner, because it is the offer the
 * page is built on; the four paid lines under it as a plain price list, read
 * across: what it is, what it covers, what it costs.
 */
export default function Pricing({ dict, lang }: { dict: Dictionary['pricing']; lang: Locale }) {
  const home = `/${lang}`;
  const hrefFor = (action: string) => (action === 'call' ? `${home}/call` : `${home}#audit`);
  const free = dict.groups[0].items[0];
  const groups = dict.groups
    .map((g, gi) => ({ heading: g.heading, items: gi === 0 ? g.items.slice(1) : g.items }))
    .filter((g) => g.items.length > 0);

  return (
    <section id="pricing" className="scroll-mt-20 bg-bone py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <Reveal>
          <p className="eyebrow">{dict.eyebrow}</p>
          <h2 className="font-display mt-3 max-w-3xl text-4xl font-bold leading-[1.05] text-ink md:text-[3.25rem]">
            {dict.title}
          </h2>
          <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-ink-600">{dict.intro}</p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-12 grid gap-8 rounded-card bg-signal-50 p-8 md:grid-cols-[1fr_auto] md:items-center md:gap-14 md:p-10">
            <div>
              <h3 className="font-display text-3xl font-bold text-ink">{free.name}</h3>
              <p className="mt-1 text-sm font-medium text-ink-700">{free.meta}</p>
              <p className="mt-4 max-w-[58ch] text-[15.5px] leading-relaxed text-ink-700">{free.desc}</p>
            </div>
            <div className="flex flex-col items-start gap-5 md:items-end">
              <p className="font-display figure text-6xl font-bold leading-none text-ink">{free.price}</p>
              <Link href={hrefFor(free.action)} className="btn bg-ink text-bone hover:bg-ink-700">
                {free.cta}
              </Link>
            </div>
          </div>
        </Reveal>

        {groups.map((group) => (
          <div key={group.heading} className="mt-12">
            <h3 className="text-sm font-semibold text-ink-600">{group.heading}</h3>
            <ul className="mt-3 border-t border-ink/15">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="grid gap-3 border-b border-ink/10 py-6 md:grid-cols-[15rem_1fr_13rem] md:gap-8"
                >
                  <div>
                    <p className="font-display text-xl font-bold text-ink">{item.name}</p>
                    <p className="mt-1 text-sm text-ink-600">{item.meta}</p>
                  </div>
                  <p className="text-[15px] leading-relaxed text-ink-600">{item.desc}</p>
                  <div className="md:text-right">
                    <p className="font-display figure text-xl font-bold text-ink">{item.price}</p>
                    <Link href={hrefFor(item.action)} className="text-link mt-2 inline-block text-sm">
                      {item.cta}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <p className="mt-8 text-sm text-ink-600">{dict.footnote}</p>
      </div>
    </section>
  );
}
