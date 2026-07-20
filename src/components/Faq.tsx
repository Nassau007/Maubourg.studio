import Reveal from './Reveal';

const FAQS = [
  {
    q: 'Is the teardown really free?',
    a: 'Yes. We audit your live store and send back 8–10 fixes ranked by revenue impact, no charge and no obligation. If the fixes are worth acting on, we can talk about doing them together — but the list is yours either way.',
  },
  {
    q: 'Who do you work with?',
    a: 'Existing European ecommerce brands — typically Shopify or WooCommerce stores already doing meaningful traffic and revenue. We focus on Europe so we know your market and your compliance obligations.',
  },
  {
    q: 'Do I need a rebuild?',
    a: 'Usually not. We lead with conversion optimization because it earns more from the store you already have. We only recommend a rebuild or replatform when the foundation itself is what&rsquo;s holding sales back.',
  },
  {
    q: 'How fast will I see results?',
    a: 'The quick wins from a sprint can ship within weeks. Compounding gains come from continuous testing on a retainer — which is why we ask for a 3-month minimum, so tests have time to prove out.',
  },
  {
    q: 'How do you measure success?',
    a: 'By revenue, not vanity metrics. Every change is tied to a number — conversion rate lifted, revenue added at the same ad spend. If we can&rsquo;t measure it, we don&rsquo;t claim it.',
  },
];

export default function Faq() {
  return (
    <section className="hairline py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl">
              Questions, answered.
            </h2>
          </Reveal>

          <div className="divide-y divide-ink/10">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink">
                    {f.q}
                    <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-ink/15 text-ink-600 transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p
                    className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-600"
                    dangerouslySetInnerHTML={{ __html: f.a }}
                  />
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
