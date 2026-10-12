import Reveal from './Reveal';
import type { Dictionary } from '@/lib/i18n';

/**
 * Exploration B. One centred reading column. The answers stay in the page
 * source, readable by an AI even when closed.
 */
export default function Faq({ dict }: { dict: Dictionary['faq'] }) {
  return (
    <section className="bg-bone-100 py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <h2 className="font-display text-center text-4xl font-bold leading-[1.05] text-ink md:text-[3.25rem]">
            {dict.title}
          </h2>
        </Reveal>
        <div className="mt-12 border-t border-ink/15">
          {dict.items.map((f) => (
            <details key={f.q} className="group border-b border-ink/10 py-6">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold text-ink">
                {f.q}
                <span
                  aria-hidden
                  className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-bone-200 text-lg text-ink transition-transform duration-200 group-open:rotate-45 group-open:bg-signal"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[65ch] text-[15.5px] leading-relaxed text-ink-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
