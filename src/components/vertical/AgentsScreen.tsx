// AI agents, as the way GEO is delivered. Exploration B "Foret": forest green
// opening and closing, light middle, coral as the one accent.
//
// Proof first: the working demo sits directly under the opening, before any
// description of what the agent does, because a visitor who can run one in
// thirty seconds does not need the paragraph that explains it. Then its two
// phases as two columns split by a rule (not cards), the build workflow as a
// rail, and the rules beside the price. Two eyebrows in eight sections.
//
// This is the only vertical carrying a client component, and it is the same
// AgentDemo the standalone demo page used.

import Link from 'next/link';
import AgentDemo from '@/components/AgentDemo';
import VerticalFrame, { ForestHero, SectionHead } from '@/components/vertical/VerticalFrame';
import { AgentWorkflow } from '@/components/vertical/diagrams';
import { getDictionary, type Locale } from '@/lib/i18n';
import { localizedHref } from '@/lib/routes';

export default function AgentsScreen({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const v = dict.verticals.agents;

  return (
    <VerticalFrame
      lang={lang}
      related={v.related}
      cta={{
        title: v.cta.title,
        primaryLabel: v.cta.primary,
        primaryHref: `/${lang}/call`,
        secondaryLabel: v.cta.secondary,
        secondaryHref: '#demo',
      }}
      hero={
        <ForestHero
          eyebrow={v.hero.eyebrow}
          title={v.hero.title}
          titleAccent={v.hero.titleAccent}
          subtitle={v.hero.subtitle}
          primary={{ label: v.hero.ctaPrimary, href: '#demo' }}
          secondary={{ label: v.hero.ctaSecondary, href: `/${lang}/call` }}
        />
      }
    >
      {/* The demo. Same component as the standalone page, mounted here. */}
      <section id="demo" className="scroll-mt-20 bg-bone py-20 md:py-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <SectionHead title={v.demoIntro.title} intro={v.demoIntro.body} />
          <AgentDemo
            dict={dict.agentDemo}
            lang={lang}
            privacyHref={localizedHref('privacy', lang)}
          />
        </div>
      </section>

      {/* Its two phases, side by side and split by a rule: one is set up
          once, the other runs every month. */}
      <section className="bg-bone-100 py-20 md:py-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <SectionHead eyebrow={v.families.eyebrow} title={v.families.title} />
          <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-ink/15">
            {v.families.items.map((item, i) => (
              <div key={item.title} className={i === 0 ? 'md:pr-12' : 'md:pl-12'}>
                <h3 className="font-display text-2xl font-bold text-ink">{item.title}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-ink-600">{item.body}</p>
                <ul className="mt-7 space-y-3">
                  {item.examples.map((example) => (
                    <li key={example} className="flex gap-3 text-[15px] leading-snug text-ink-700">
                      <span aria-hidden className="mt-1.5 h-2 w-2 flex-none rounded-sm bg-signal" />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How one gets built: the rail, the guardrail marked in coral. */}
      <section className="bg-bone py-20 md:py-28">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <SectionHead title={v.workflow.title} />
          <div className="mt-12">
            <AgentWorkflow nodes={v.workflow.nodes} />
          </div>
          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-600">{v.workflow.caption}</p>
        </div>
      </section>

      {/* The rules it is built under, beside the two questions a buyer has at
          this point: what does it cost, and do you use it yourselves. There is
          no agent price: it comes with the programme and the follow-up, so the
          block says so and links to the prices. */}
      <section className="bg-bone pb-6">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <div className="grid gap-12 border-t border-ink/12 pt-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="font-display text-3xl font-bold leading-tight text-ink md:text-[2.25rem]">
                {v.guardrails.title}
              </h2>
              <ul className="mt-8 space-y-5">
                {v.guardrails.items.map((item) => (
                  <li key={item} className="border-l-4 border-signal pl-5 text-[16px] leading-relaxed text-ink-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-10 lg:col-span-5">
              <div className="rounded-card bg-signal-50 p-7">
                <p className="text-sm font-semibold text-ink-700">{v.price.label}</p>
                <p className="font-display mt-2 text-3xl font-bold text-ink">{v.price.value}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-700">{v.price.note}</p>
                <Link href={`/${lang}#pricing`} className="text-link mt-5 inline-block text-[15px]">
                  {v.price.link}
                </Link>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-ink">{v.included.title}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-ink-600">{v.included.body}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </VerticalFrame>
  );
}
