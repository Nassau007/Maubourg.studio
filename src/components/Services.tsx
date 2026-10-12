import Link from 'next/link';
import Reveal from './Reveal';
import type { Dictionary, Locale } from '@/lib/i18n';
import { localizedHref, type VerticalPage } from '@/lib/routes';

/**
 * Exploration B. The offer as one panel with two bands: GEO (three steps)
 * and the agent that does the work (two moments). The hero's three cards said
 * the same thing, so they are folded in here. The tools strip becomes a line.
 */
export default function Services({
  dict,
  tools,
  lang,
}: {
  dict: Dictionary['services'];
  tools: Dictionary['marquee'];
  lang: Locale;
}) {
  const tags = dict.items.reduce<string[]>(
    (acc, item) => (acc.includes(item.tag) ? acc : [...acc, item.tag]),
    [],
  );
  return (
    <section id="work" className="scroll-mt-20 bg-bone-100 py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <Reveal>
          <h2 className="font-display max-w-3xl text-4xl font-bold leading-[1.05] text-ink md:text-[3.25rem]">
            {dict.title}
          </h2>
          <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-ink-600">{dict.intro}</p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-12 overflow-hidden rounded-card border border-ink/10 bg-white">
            {tags.map((tag, ti) => {
              const items = dict.items.filter((item) => item.tag === tag);
              return (
                <div
                  key={tag}
                  className={`grid gap-6 p-7 md:grid-cols-[11rem_1fr] md:gap-10 md:p-10 ${
                    ti > 0 ? 'border-t border-ink/10' : ''
                  }`}
                >
                  <p className="font-display text-2xl font-bold text-ink">{tag}</p>
                  <ul className={`grid gap-8 ${items.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                    {items.map((s) => (
                      <li key={s.title}>
                        <Link
                          href={localizedHref(s.page as VerticalPage, lang)}
                          className="text-lg font-semibold text-ink underline decoration-transparent decoration-2 underline-offset-4 transition-colors hover:decoration-signal"
                        >
                          {s.title}
                        </Link>
                        <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{s.body}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Reveal>

        <p className="mt-6 text-sm text-ink-600">
          {tools.heading}
          {lang === 'fr' ? ' : ' : ': '}
          {tools.items.join(', ')}. {tools.note}
        </p>
      </div>
    </section>
  );
}
