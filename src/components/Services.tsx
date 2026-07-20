import Reveal from './Reveal';
import type { Dictionary } from '@/lib/i18n';

export default function Services({ dict }: { dict: Dictionary['services'] }) {
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dict.items.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 80}>
              <div className="card card-hover h-full">
                <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald">
                  {s.tag}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
