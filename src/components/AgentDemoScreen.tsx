import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import AgentDemo from '@/components/AgentDemo';
import { getDictionary, type Locale } from '@/lib/i18n';
import { localizedHref } from '@/lib/routes';

/**
 * The demo page body, shared by /en/try-an-agent and /fr/essayer-un-agent.
 * The slug differs per language, so each locale needs its own directory; this
 * component is what both of them render, so the page exists once.
 *
 * Everything visible is a server component except the form itself. The page
 * shell is static, which is also why nothing here can leak a result: the only
 * component that ever holds one is the client form, and it gets it from the
 * reveal route.
 */
export default function AgentDemoScreen({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const d = dict.agentDemo;

  return (
    <>
      <Nav dict={dict.nav} lang={lang} />
      <main className="pt-28 md:pt-36">
        <section className="mx-auto max-w-content px-5 pb-16 md:px-8 md:pb-24">
          <Link
            href={`/${lang}`}
            className="block w-fit text-sm font-medium text-ink-500 transition-colors hover:text-ink"
          >
            {d.back}
          </Link>

          <span className="eyebrow mt-6">{d.eyebrow}</span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-ink md:text-6xl">
            {d.title} <span className="italic text-emerald">{d.titleAccent}</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-ink-600">{d.subtitle}</p>

          <AgentDemo dict={d} lang={lang} privacyHref={localizedHref('privacy', lang)} />
        </section>

        {/* Below the fold: what this is. Kept short - the proof is the output
            above it, not the description of it. */}
        <section className="hairline">
          <div className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-20">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
              {d.what.heading}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {d.what.items.map((item) => (
                <div key={item.title} className="card">
                  <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}
