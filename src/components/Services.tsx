import Reveal from './Reveal';

const SERVICES = [
  {
    tag: 'Core',
    title: 'Conversion rate optimization',
    body: 'Continuous A/B testing across product pages, cart and checkout — the highest-value leaks first. You see the revenue impact, not vanity metrics.',
  },
  {
    tag: 'Core',
    title: 'Email & SMS retention',
    body: 'Lifecycle flows in Klaviyo that recover carts and bring buyers back. Often 20–40% of a store&rsquo;s revenue, and usually the most underserved.',
  },
  {
    tag: 'Core',
    title: 'Paid media management',
    body: 'Meta, Google and TikTok spend managed to a target return — so a better-converting store compounds into cheaper acquisition.',
  },
  {
    tag: 'Foundation',
    title: 'Store builds & rebuilds',
    body: 'Conversion-ready Shopify builds and replatforms, fixed scope, when the current foundation is holding sales back.',
  },
  {
    tag: 'Foundation',
    title: 'Analytics & tracking',
    body: 'GA4, server-side tracking and consent mode set up properly — so every win is measurable and GDPR-compliant.',
  },
  {
    tag: 'Included',
    title: 'Systematized delivery',
    body: 'An automation-driven process means standardized reporting and onboarding — faster delivery, and nothing slips through.',
  },
];

export default function Services() {
  return (
    <section id="work" className="hairline bg-bone-200/40 py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <Reveal>
          <span className="eyebrow">What we do</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            One focus: more of your traffic buys.
          </h2>
          <p className="mt-4 max-w-xl text-ink-600">
            We lead with conversion and retention — the levers that pay for themselves — and rebuild
            the store only when the foundation is what&rsquo;s holding you back.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 80}>
              <div className="card card-hover h-full">
                <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald">
                  {s.tag}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{s.title}</h3>
                <p
                  className="mt-2 text-sm leading-relaxed text-ink-600"
                  dangerouslySetInnerHTML={{ __html: s.body }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
