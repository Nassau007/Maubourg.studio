import Link from 'next/link';
import Reveal from './Reveal';
import type { Dictionary, Locale } from '@/lib/i18n';

/**
 * Exploration B. The three steps on one line, in the order they happen. The
 * first, the free audit, carries the coral marker and the one button.
 */
export default function Process({ dict, lang }: { dict: Dictionary['process']; lang: Locale }) {
  return (
    <section id="process" className="scroll-mt-20 bg-bone-100 py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <Reveal>
          <h2 className="font-display max-w-4xl text-4xl font-bold leading-[1.05] text-ink md:text-[3.25rem] [text-wrap:balance]">
            {dict.title}
          </h2>
        </Reveal>

        <ol className="relative mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          <span aria-hidden className="absolute left-5 right-5 top-5 hidden h-px bg-ink/20 md:block" />
          {dict.steps.map((s, i) => (
            <li key={s.name} className="relative">
              <Reveal delay={i * 60}>
                <span
                  className={`figure relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                    i === 0 ? 'bg-signal text-ink' : 'border border-ink/25 bg-bone-100 text-ink-600'
                  }`}
                >
                  {i + 1}
                </span>
                <div className="mt-6 flex items-baseline gap-3">
                  <h3 className="font-display text-2xl font-bold text-ink">{s.name}</h3>
                  <span className="rounded-full bg-bone-200 px-3 py-0.5 text-sm font-medium text-ink-700">
                    {s.price}
                  </span>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <Link href={`/${lang}#audit`} className="btn-primary">
            {dict.claim}
          </Link>
        </div>
      </div>
    </section>
  );
}
