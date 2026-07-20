import Reveal from './Reveal';
import { site } from '@/lib/site';

const ENTRY = [
  {
    name: 'Free store teardown',
    price: '€0',
    desc: '8–10 conversion fixes ranked by revenue impact. The fastest way to see if we&rsquo;re a fit.',
    cta: { label: 'Request teardown', href: '#teardown' },
    featured: true,
  },
  {
    name: 'Paid deep audit',
    price: '€500–1,500',
    desc: 'Full report and prioritized roadmap. Credited toward your first sprint or retainer.',
    cta: { label: 'Book a call', href: site.bookingUrl },
    featured: false,
  },
];

const PROJECT = [
  {
    name: 'Optimization sprint',
    price: '€1,500–3,500',
    desc: 'Fixed 2–3 week fix of the top audit findings.',
  },
  {
    name: 'Rebuild / replatform',
    price: '€4,000–12,000+',
    desc: 'New conversion-ready Shopify build, fixed scope.',
  },
];

const RETAINERS = [
  {
    tier: 'Starter',
    price: '€1,000–1,500',
    per: '/mo',
    features: ['1–2 tests / month', 'Monthly reporting', 'Small fixes included'],
    featured: false,
  },
  {
    tier: 'Growth',
    price: '€2,000–3,500',
    per: '/mo',
    features: ['Ongoing A/B testing', 'PDP & checkout work', 'Email flow support'],
    featured: true,
  },
  {
    tier: 'Scale',
    price: '€4,000–6,000+',
    per: '/mo',
    features: ['Full CRO program', 'Multiple concurrent tests', 'Priority + strategy calls'],
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="hairline py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <Reveal>
          <span className="eyebrow">Pricing</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            Priced to the revenue we lift.
          </h2>
          <p className="mt-4 max-w-xl text-ink-600">
            Land with a teardown or one-off project, then retain with monthly optimization. Every
            retainer runs a 3-month minimum so tests have time to prove out.
          </p>
        </Reveal>

        {/* Entry + project */}
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {ENTRY.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div
                className={`flex h-full flex-col rounded-card p-7 ${
                  p.featured
                    ? 'bg-emerald text-bone'
                    : 'card'
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3
                    className={`text-lg font-semibold ${p.featured ? 'text-bone' : 'text-ink'}`}
                  >
                    {p.name}
                  </h3>
                  <span
                    className={`font-display text-2xl font-semibold ${
                      p.featured ? 'text-bone' : 'text-ink'
                    }`}
                  >
                    {p.price}
                  </span>
                </div>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    p.featured ? 'text-bone/80' : 'text-ink-600'
                  }`}
                  dangerouslySetInnerHTML={{ __html: p.desc }}
                />
                <a
                  href={p.cta.href}
                  {...(p.cta.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className={`mt-6 w-full ${p.featured ? 'btn-signal' : 'btn-ghost'}`}
                >
                  {p.cta.label}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* One-off projects */}
        <Reveal>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {PROJECT.map((p) => (
              <div key={p.name} className="card flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-ink">{p.name}</h3>
                  <p className="mt-1 text-sm text-ink-600">{p.desc}</p>
                </div>
                <span className="whitespace-nowrap font-display text-lg font-semibold text-emerald">
                  {p.price}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Retainers */}
        <Reveal>
          <h3 className="mt-16 text-center text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">
            Monthly retainers — where it compounds
          </h3>
        </Reveal>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {RETAINERS.map((r, i) => (
            <Reveal key={r.tier} delay={i * 80}>
              <div
                className={`relative flex h-full flex-col rounded-card p-7 ${
                  r.featured
                    ? 'border-2 border-emerald bg-bone-100 shadow-[0_18px_40px_-24px_rgba(14,107,74,0.5)]'
                    : 'card'
                }`}
              >
                {r.featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-emerald px-3 py-1 text-xs font-semibold text-bone">
                    Most popular
                  </span>
                )}
                <h4 className="text-lg font-semibold text-ink">{r.tier}</h4>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-semibold text-ink">{r.price}</span>
                  <span className="text-sm text-ink-500">{r.per}</span>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {r.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink-700">
                      <span className="mt-0.5 text-emerald">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#teardown" className={`mt-7 w-full ${r.featured ? 'btn-primary' : 'btn-ghost'}`}>
                  Start with a teardown
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 text-center text-sm text-ink-500">
            Indicative ranges for the European market. First few clients discounted in exchange for
            a case study &amp; testimonial.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
