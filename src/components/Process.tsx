import Link from 'next/link';
import Reveal from './Reveal';
import type { Dictionary, Locale } from '@/lib/i18n';

export default function Process({ dict, lang }: { dict: Dictionary['process']; lang: Locale }) {
  return (
    <section id="process" className="hairline py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <Reveal>
          <span className="eyebrow">{dict.eyebrow}</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            {dict.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {dict.steps.map((s, i) => {
            const highlight = i === 0;
            return (
              <Reveal key={s.name} delay={i * 100}>
                <div
                  className={`relative flex h-full flex-col rounded-card p-7 transition-all duration-200 ${
                    highlight ? 'bg-ink text-bone' : 'card card-hover'
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <span
                      className={`font-display text-4xl font-semibold ${
                        highlight ? 'text-signal' : 'text-ink/15'
                      }`}
                    >
                      {s.step}
                    </span>
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        highlight ? 'text-bone/60' : 'text-ink-500'
                      }`}
                    >
                      {s.price}
                    </span>
                  </div>
                  <h3 className={`mt-5 text-xl font-semibold ${highlight ? 'text-bone' : 'text-ink'}`}>
                    {s.name}
                  </h3>
                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      highlight ? 'text-bone/75' : 'text-ink-600'
                    }`}
                  >
                    {s.body}
                  </p>
                  {highlight && (
                    <Link href={`/${lang}#teardown`} className="btn-signal mt-6 w-full">
                      {dict.claim}
                    </Link>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
