import Reveal from './Reveal';
import ServicesFlow from './ServicesFlow';
import type { Dictionary, Locale } from '@/lib/i18n';

/**
 * Exploration B. The offer as five steps on one animated line (ServicesFlow):
 * the three GEO steps, then the two moments of the agent. The tools strip
 * becomes a line.
 */
export default function Services({
  dict,
  tools,
  lang,
}: {
  dict: Dictionary['services'];
  tools: Dictionary['marquee'];
  lang: Locale;
}) {
  return (
    <section id="work" className="scroll-mt-20 bg-bone-100 py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <Reveal>
          <h2 className="font-display max-w-3xl text-4xl font-bold leading-[1.05] text-ink md:text-[3.25rem]">
            {dict.title}
          </h2>
          <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-ink-600">{dict.intro}</p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-12">
            <ServicesFlow items={dict.items} lang={lang} />
          </div>
        </Reveal>

        <p className="mt-6 text-sm text-ink-600">
          {tools.heading}
          {lang === 'fr' ? ' : ' : ': '}
          {tools.items.join(', ')}. {tools.note}
        </p>
      </div>
    </section>
  );
}
