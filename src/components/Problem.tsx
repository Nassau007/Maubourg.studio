import Link from 'next/link';
import Reveal from './Reveal';
import { observatoryHref } from '@/lib/observatory';
import type { Dictionary, Locale } from '@/lib/i18n';

/**
 * Exploration B. A four-cell grid: the Atlas figure in forest green, and the
 * three reasons around it. Four contents, four cells, no empty slot.
 */
export default function Problem({
  dict,
  lead,
  link,
  lang,
}: {
  dict: Dictionary['problem'];
  lead: Dictionary['atlasProof']['lead'];
  link: string;
  lang: Locale;
}) {
  const [first, ...others] = dict.pains;
  return (
    <section id="problem" className="scroll-mt-20 bg-bone py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <Reveal>
          <h2 className="font-display max-w-3xl text-4xl font-bold leading-[1.05] text-ink md:text-[3.25rem] [text-wrap:balance]">
            {dict.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <Reveal className="md:row-span-2">
            <div className="flex h-full flex-col justify-between rounded-card bg-ink p-8 text-bone">
              <div>
                <p className="font-display figure whitespace-nowrap text-[3.25rem] font-bold leading-none lg:text-[3.6rem]">{lead.value}</p>
                <p className="mt-5 text-[15.5px] leading-relaxed text-bone/85">{lead.label}</p>
              </div>
              <p className="mt-10 text-sm text-bone/75">
                {lead.source}.{' '}
                <Link href={observatoryHref(lang)} className="text-link-light">
                  {link}
                </Link>
              </p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-2" delay={60}>
            <div className="h-full rounded-card bg-signal-50 p-8">
              <h3 className="font-display text-2xl font-bold text-ink">{first.title}</h3>
              <p className="mt-3 max-w-[60ch] text-[15.5px] leading-relaxed text-ink-700">{first.body}</p>
            </div>
          </Reveal>

          {others.map((p, i) => (
            <Reveal key={p.title} delay={120 + i * 60}>
              <div className="h-full rounded-card border border-ink/10 bg-bone-100 p-7">
                <h3 className="font-display text-xl font-bold text-ink">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
