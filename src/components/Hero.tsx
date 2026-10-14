import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';

const CAPTURES = '/atlas/2026-10/captures';

/**
 * Exploration B. A forest-green opening: a short question as the headline,
 * one line of offer, one button, and under it the four real answers that
 * ChatGPT, Claude, Gemini and Perplexity gave to the same question on the
 * same day. On a phone the four answers scroll sideways.
 */
export default function Hero({ dict, lang }: { dict: Dictionary['hero']; lang: Locale }) {
  const home = `/${lang}`;
  return (
    <section id="top" className="overflow-hidden bg-ink pt-28 text-bone md:pt-32">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <p className="text-sm font-medium text-bone/75">{dict.badge}</p>
        <h1 className="font-display mt-5 max-w-4xl text-[2.7rem] font-bold leading-[1.02] text-bone sm:text-6xl lg:text-[4.75rem] [text-wrap:balance]">
          {/* A hyphenated word ("est-elle") never splits across two lines. */}
          {dict.forestTitle.split(' ').map((word, i) => (
            <span key={i}>
              {i > 0 && ' '}
              {word.includes('-') ? <span className="whitespace-nowrap">{word}</span> : word}
            </span>
          ))}
        </h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <p className="max-w-xl text-lg leading-relaxed text-bone/85 lg:col-span-7">{dict.forestSubtitle}</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 lg:col-span-5 lg:justify-end">
            <Link href={`${home}#audit`} className="btn-primary">
              {dict.ctaPrimary}
            </Link>
            <Link href={`${home}/call`} className="text-link-light text-center text-[15px]">
              {dict.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>

      <figure className="mx-auto mt-14 max-w-content pb-12 md:pb-14">
        <ul className="flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 md:grid md:grid-cols-4 md:overflow-visible md:px-8">
          {dict.tiles.items.map((tile) => (
            <li key={tile.file} className="w-[68%] flex-none snap-start md:w-auto">
              <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-bone/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${CAPTURES}/${tile.file}`}
                  alt={tile.alt}
                  width={600}
                  height={951}
                  className="aspect-[4/5] w-full object-cover object-top"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-bone/80">{tile.tool}</p>
            </li>
          ))}
        </ul>
        <figcaption className="mt-5 max-w-3xl px-5 text-sm leading-relaxed text-bone/75 md:px-8">
          {dict.tiles.caption}
        </figcaption>
      </figure>
    </section>
  );
}
