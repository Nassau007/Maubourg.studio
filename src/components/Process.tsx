import Reveal from './Reveal';

const STEPS = [
  {
    step: '01',
    name: 'Teardown',
    price: 'Free',
    body: 'We audit your store and pinpoint exactly where sales leak — 8 to 10 fixes ranked by revenue impact. Yours to keep whether we work together or not.',
    highlight: true,
  },
  {
    step: '02',
    name: 'Sprint',
    price: 'Fixed scope',
    body: 'We ship the highest-ROI fixes first, in a focused 2–3 week sprint — or rebuild the store when the foundation won&rsquo;t hold. Cash-flow friendly, no long commitment to start.',
    highlight: false,
  },
  {
    step: '03',
    name: 'Retainer',
    price: 'Monthly',
    body: 'We run continuous A/B testing to compound conversion month over month. This is where the real gains — and the real relationship — live.',
    highlight: false,
  },
];

export default function Process() {
  return (
    <section id="process" className="hairline py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <Reveal>
          <span className="eyebrow">How it works</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            Start free. Fix what pays. Then compound.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.name} delay={i * 100}>
              <div
                className={`relative flex h-full flex-col rounded-card p-7 transition-all duration-200 ${
                  s.highlight
                    ? 'bg-ink text-bone'
                    : 'card card-hover'
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span
                    className={`font-display text-4xl font-semibold ${
                      s.highlight ? 'text-signal' : 'text-ink/15'
                    }`}
                  >
                    {s.step}
                  </span>
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      s.highlight ? 'text-bone/60' : 'text-ink-500'
                    }`}
                  >
                    {s.price}
                  </span>
                </div>
                <h3
                  className={`mt-5 text-xl font-semibold ${
                    s.highlight ? 'text-bone' : 'text-ink'
                  }`}
                >
                  {s.name}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    s.highlight ? 'text-bone/75' : 'text-ink-600'
                  }`}
                  dangerouslySetInnerHTML={{ __html: s.body }}
                />
                {s.highlight && (
                  <a href="#teardown" className="btn-signal mt-6 w-full">
                    Claim yours →
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
