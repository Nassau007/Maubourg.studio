import Reveal from './Reveal';

const PAINS = [
  {
    title: 'You&rsquo;re paying for traffic that leaves',
    body: 'Spend on ads and SEO keeps climbing, but too many visitors land, look, and go — without ever adding to cart.',
  },
  {
    title: 'You suspect a leak — you can&rsquo;t see where',
    body: 'The drop-off is somewhere between the product page and the payment step. Guessing is expensive; testing blind is worse.',
  },
  {
    title: 'The revenue is already yours to win',
    body: 'You don&rsquo;t need more traffic to grow. A better-converting store earns more from the exact same visitors, at the same ad spend.',
  },
];

export default function Problem() {
  return (
    <section id="problem" className="hairline py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <Reveal>
          <span className="eyebrow">The problem</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
            More ad spend won&rsquo;t fix a store that leaks.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PAINS.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <div className="card card-hover h-full">
                <div className="mb-4 font-display text-4xl font-semibold text-ink/15">
                  0{i + 1}
                </div>
                <h3
                  className="text-lg font-semibold text-ink"
                  dangerouslySetInnerHTML={{ __html: p.title }}
                />
                <p
                  className="mt-2 text-sm leading-relaxed text-ink-600"
                  dangerouslySetInnerHTML={{ __html: p.body }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
