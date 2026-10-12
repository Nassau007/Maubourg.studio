import Link from 'next/link';
import Reveal from './Reveal';
import { observatoryHref } from '@/lib/observatory';
import type { Dictionary, Locale } from '@/lib/i18n';

const CAPTURES = '/atlas/2026-10/captures';

/**
 * Exploration B. The evidence, editorial: one large Atlas figure, a second
 * one under it, and the two real answers it comes from. The site itself as
 * proof closes the section. Figures are copied from the edition, never rounded.
 */
export default function Proof({
  dict,
  atlas,
  lang,
}: {
  dict: Dictionary['proof'];
  atlas: Dictionary['atlasProof'];
  lang: Locale;
}) {
  return (
    <section className="bg-bone-200 py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5">
            <h2 className="font-display text-4xl font-bold leading-[1.05] text-ink md:text-[2.6rem] [text-wrap:balance]">
              {atlas.title}
            </h2>
            <p className="font-display figure mt-10 text-7xl font-bold leading-none text-ink md:text-8xl">
              {atlas.figure.value}
            </p>
            <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-ink-700">{atlas.figure.label}</p>
            <div className="mt-8 border-t border-ink/15 pt-6">
              <p className="font-display figure text-4xl font-bold text-ink">{atlas.second.value}</p>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink-700">{atlas.second.label}</p>
            </div>
            <Link href={observatoryHref(lang)} className="text-link mt-8 inline-block">
              {atlas.link}
            </Link>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={60}>
            <figure>
              <div className="grid grid-cols-2 gap-4">
                {atlas.pair.items.map((shot, i) => (
                  <div
                    key={shot.file}
                    className={`overflow-hidden rounded-2xl bg-white ring-1 ring-ink/10 ${i === 1 ? 'mt-10' : ''}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`${CAPTURES}/${shot.file}`}
                      alt={shot.alt}
                      width={700}
                      height={1000}
                      className="aspect-[3/4] w-full object-cover object-top"
                    />
                  </div>
                ))}
              </div>
              <figcaption className="mt-4 text-sm leading-relaxed text-ink-600">{atlas.pair.caption}</figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal>
          <p className="mt-16 max-w-3xl border-t border-ink/15 pt-6 text-[15.5px] leading-relaxed text-ink-700">
            <strong className="font-semibold text-ink">{dict.title}</strong> {dict.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
