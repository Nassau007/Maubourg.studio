import Link from 'next/link';
import Reveal from './Reveal';
import TypingQuestion from './TypingQuestion';
import type { Dictionary, Locale } from '@/lib/i18n';
import { localizedHref } from '@/lib/routes';

/**
 * Exploration B. The question as a chat bubble that types fifteen buying
 * questions in turn (TypingQuestion), then the four steps down a
 * line. The two steps a brand can move get the coral marker: the colour says
 * "your lever", not decoration. Same `verticals.geo.chain` data as the GEO page.
 */
export default function AiChoice({
  dict,
  chain,
  lang,
}: {
  dict: Dictionary['aiChoice'];
  chain: Dictionary['verticals']['geo']['chain'];
  lang: Locale;
}) {
  return (
    <section className="bg-bone py-20 md:py-28">
      <div className="mx-auto grid max-w-content gap-12 px-5 md:px-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-4xl font-bold leading-[1.05] text-ink md:text-[3.25rem]">
            {dict.title}
          </h2>
          <p className="mt-5 text-lg text-ink-600">{dict.subtitle}</p>
          <p className="mt-8 max-w-md text-[15.5px] leading-relaxed text-ink-700">
            {dict.conclusion}{' '}
            <Link href={localizedHref('geo', lang)} className="text-link">
              {dict.link}
            </Link>
          </p>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={60}>
          <TypingQuestion questions={dict.queries} lang={lang} />
          <ol className="mt-10">
            {chain.steps.map((step, i) => {
              const movable = i === 1 || i === 2;
              const last = i === chain.steps.length - 1;
              return (
                <li key={step.step} className="relative pb-9 pl-14 last:pb-0">
                  {!last && <span aria-hidden className="absolute bottom-0 left-[17px] top-10 w-px bg-ink/20" />}
                  <span
                    className={`figure absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                      movable ? 'bg-signal text-ink' : 'border border-ink/25 bg-bone-100 text-ink-600'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <p className="font-display text-xl font-bold text-ink">{step.step}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-600">{step.note}</p>
                  <p className="mt-2 text-sm text-ink-600">
                    {chain.influenceLabel}
                    {lang === 'fr' ? ' : ' : ': '}
                    <span className={`font-semibold ${movable ? 'text-ink' : 'text-ink-600'}`}>{step.influence}</span>
                  </p>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
