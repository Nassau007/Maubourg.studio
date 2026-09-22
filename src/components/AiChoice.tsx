import Link from 'next/link';
import Reveal from './Reveal';
import { RetrievalChain } from './vertical/diagrams';
import type { Dictionary, Locale } from '@/lib/i18n';
import { localizedHref } from '@/lib/routes';

/**
 * How an AI picks a brand: the four-step chain from the GEO page, condensed
 * onto the homepage. It is the block that has to earn the visitor's trust in
 * the expertise, so it sits before the offer rather than after it.
 *
 * It renders the same `verticals.geo.chain` data the GEO page uses. One source,
 * so the two can never describe the mechanism differently.
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
    <section className="hairline py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <Reveal>
          <span className="eyebrow">{dict.eyebrow}</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            {dict.title}
          </h2>
          <p className="mt-4 max-w-xl text-ink-600">{dict.subtitle}</p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10">
            <RetrievalChain
              query={chain.query}
              steps={chain.steps}
              influenceLabel={chain.influenceLabel}
            />
          </div>
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink-700">
            {dict.conclusion}{' '}
            <Link
              href={localizedHref('geo', lang)}
              className="font-semibold text-emerald underline-offset-4 hover:underline"
            >
              {dict.link}
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
