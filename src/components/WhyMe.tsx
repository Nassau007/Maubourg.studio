import Reveal from './Reveal';
import type { Dictionary } from '@/lib/i18n';

export default function WhyMe({ dict }: { dict: Dictionary['whyMe'] }) {
  return (
    <section className="hairline bg-ink py-20 text-bone md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal>
            <span className="eyebrow !text-signal">{dict.eyebrow}</span>
            <blockquote className="mt-5 font-display text-3xl font-medium leading-[1.15] tracking-tight text-bone md:text-[2.75rem]">
              “{dict.quoteBefore} <span className="italic text-signal">{dict.quoteAccent}</span>”
            </blockquote>
          </Reveal>

          <div className="space-y-8">
            {dict.points.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="border-l-2 border-signal/70 pl-5">
                  <h3 className="text-base font-semibold text-bone">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-bone/70">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
