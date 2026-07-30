// AI agents. Layout: proof first. The working demo sits directly under the
// hero, before any description of what we build, because a visitor who can run
// one in thirty seconds does not need the paragraph that explains it. The three
// agent families, the build workflow and the guardrails come after.
//
// This is the only vertical carrying a client component, and it is the same
// AgentDemo the standalone demo page used.

import Link from 'next/link';
import AgentDemo from '@/components/AgentDemo';
import VerticalFrame, { SectionHead } from '@/components/vertical/VerticalFrame';
import { AgentWorkflow } from '@/components/vertical/diagrams';
import { getDictionary, type Locale } from '@/lib/i18n';
import { localizedHref } from '@/lib/routes';

export default function AgentsScreen({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const v = dict.verticals.agents;
  const s = dict.verticals.shared;

  return (
    <VerticalFrame lang={lang} related={v.related}>
      <section className="mx-auto max-w-content px-5 pb-12 pt-8 md:px-8 md:pb-16">
        <div className="max-w-3xl">
          <span className="eyebrow">{v.hero.eyebrow}</span>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.03] tracking-tightest text-ink md:text-6xl">
            {v.hero.title} <span className="italic text-emerald">{v.hero.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink-600">
            {v.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#demo" className="btn-primary w-full sm:w-auto">
              {v.hero.ctaPrimary}
            </a>
            <Link href={`/${lang}/call`} className="btn-ghost w-full sm:w-auto">
              {v.hero.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* The demo. Same component as the standalone page, mounted here. */}
      <section id="demo" className="scroll-mt-24 border-y border-ink/10 bg-bone-100 py-14 md:py-20">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <div className="max-w-2xl">
            <span className="eyebrow">{v.demoIntro.eyebrow}</span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tightest text-ink md:text-4xl">
              {v.demoIntro.title}
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">{v.demoIntro.body}</p>
          </div>
          <AgentDemo
            dict={dict.agentDemo}
            lang={lang}
            privacyHref={localizedHref('privacy', lang)}
          />
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
        <SectionHead eyebrow={v.families.eyebrow} title={v.families.title} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {v.families.items.map((item) => (
            <div key={item.title} className="card card-hover flex flex-col">
              <h3 className="font-display text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-600">{item.body}</p>
              <ul className="mt-6 space-y-2 border-t border-ink/10 pt-5">
                {item.examples.map((example) => (
                  <li key={example} className="flex gap-2.5 text-[13px] text-ink-600">
                    <span aria-hidden className="text-emerald">
                      ·
                    </span>
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-content px-5 pb-16 md:px-8 md:pb-24">
        <SectionHead eyebrow={v.workflow.eyebrow} title={v.workflow.title} />
        <div className="mt-10">
          <AgentWorkflow nodes={v.workflow.nodes} />
        </div>
        <p className="mt-5 text-[13px] italic text-ink-500">{v.workflow.caption}</p>
      </section>

      {/* Guardrails and the price, side by side: the two questions a buyer
          actually has at this point. */}
      <section className="mx-auto max-w-content px-5 pb-4 md:px-8">
        <div className="grid gap-5 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="rounded-card bg-ink p-7 md:p-10">
            <h2 className="font-display text-2xl font-semibold text-bone">{v.guardrails.title}</h2>
            <ul className="mt-6 space-y-4">
              {v.guardrails.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden className="mt-0.5 shrink-0 font-semibold text-signal">
                    ·
                  </span>
                  <span className="text-[14.5px] leading-relaxed text-bone/80">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <div className="card">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-500">
                {v.price.label}
              </p>
              <p className="mt-2 font-display text-3xl font-semibold text-emerald">
                {v.price.value}
              </p>
              <p className="mt-2 text-[13.5px] leading-snug text-ink-600">{v.price.note}</p>
              <p className="mt-4 border-t border-ink/10 pt-4 text-[12px] italic text-ink-500">
                {s.priceNote}
              </p>
            </div>
            <div className="card border-emerald/30 bg-emerald-50/50">
              <h3 className="font-display text-lg font-semibold text-ink">{v.included.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-600">{v.included.body}</p>
            </div>
          </div>
        </div>
      </section>
    </VerticalFrame>
  );
}
