import Reveal from './Reveal';
import type { Dictionary } from '@/lib/i18n';

/**
 * Exploration B. Three things to know, as three short columns under a coral
 * rule. Light, like the rest of the middle of the page: the forest green is
 * kept for the opening and the close.
 */
export default function WhyMe({ dict }: { dict: Dictionary['whyMe'] }) {
  return (
    <section className="bg-bone py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <Reveal>
          <h2 className="font-display max-w-3xl text-4xl font-bold leading-[1.05] text-ink md:text-[3.25rem]">
            {dict.title}
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {dict.points.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <div className="border-t-[3px] border-signal pt-5">
                <h3 className="font-display text-xl font-bold leading-snug text-ink">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
