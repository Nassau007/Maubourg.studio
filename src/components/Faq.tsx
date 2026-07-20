import Reveal from './Reveal';
import type { Dictionary } from '@/lib/i18n';

export default function Faq({ dict }: { dict: Dictionary['faq'] }) {
  return (
    <section className="hairline py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <span className="eyebrow">{dict.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
              {dict.title}
            </h2>
          </Reveal>

          <div className="divide-y divide-ink/10">
            {dict.items.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink">
                    {f.q}
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-ink/15 text-ink-600 transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-600">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
