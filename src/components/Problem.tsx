import Reveal from './Reveal';
import type { Dictionary } from '@/lib/i18n';

export default function Problem({ dict }: { dict: Dictionary['problem'] }) {
  return (
    <section id="problem" className="hairline py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <Reveal>
          <span className="eyebrow">{dict.eyebrow}</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            {dict.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {dict.pains.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="card card-hover h-full">
                <div className="mb-4 font-display text-4xl font-semibold text-ink/15">0{i + 1}</div>
                <h3 className="text-lg font-semibold text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
