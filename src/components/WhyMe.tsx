import Reveal from './Reveal';

const POINTS = [
  {
    title: 'European by focus',
    body: 'We work only with existing European stores — so we know your market, your buyers and your compliance obligations from the first call.',
  },
  {
    title: 'Everything is measured',
    body: 'You see the revenue impact of every change — “lifted conversion from X% to Y%, adding €Z/month at the same ad spend.” Never vanity metrics.',
  },
  {
    title: 'Systematized, not improvised',
    body: 'An automation-driven process behind the scenes means faster delivery, standardized reporting, and nothing missed.',
  },
];

export default function WhyMe() {
  return (
    <section className="hairline bg-ink py-20 text-bone md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal>
            <span className="eyebrow !text-signal">Why Maubourg</span>
            <blockquote className="mt-5 font-display text-3xl font-medium leading-[1.15] tracking-tight text-bone md:text-[2.75rem]">
              “The visitors you&rsquo;re already paying for are the cheapest growth you&rsquo;ll ever
              buy. We just help more of them{' '}
              <span className="italic text-signal">say yes.</span>”
            </blockquote>
          </Reveal>

          <div className="space-y-8">
            {POINTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 90}>
                <div className="border-l-2 border-signal/70 pl-5">
                  <h3 className="text-base font-semibold text-bone">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-bone/70">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
