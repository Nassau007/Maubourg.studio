import { site } from '@/lib/site';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 md:pt-36">
      {/* subtle grid + glow backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(20,20,15,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,20,15,0.05) 1px, transparent 1px)',
          backgroundSize: '46px 46px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)',
        }}
      />

      <div className="mx-auto max-w-content px-5 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-ink/12 bg-bone-100 px-4 py-1.5 text-xs font-medium text-ink-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
            Conversion optimization &amp; rebuilds · European ecommerce
          </div>

          <h1
            className="animate-fade-up font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tightest text-ink sm:text-6xl md:text-7xl"
            style={{ animationDelay: '80ms' }}
          >
            Your store already has traffic.{' '}
            <span className="italic text-emerald">Let&rsquo;s make more of it buy.</span>
          </h1>

          <p
            className="animate-fade-up mx-auto mt-6 max-w-xl text-lg text-ink-600"
            style={{ animationDelay: '160ms' }}
          >
            We help European ecommerce brands earn more from the visitors they&rsquo;re already
            paying for — through conversion optimization, and full rebuilds when the foundation
            won&rsquo;t hold.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: '240ms' }}
          >
            <a href="#teardown" className="btn-primary w-full sm:w-auto">
              Get a free store teardown →
            </a>
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost w-full sm:w-auto"
            >
              Book a 15-min call
            </a>
          </div>

          <p
            className="animate-fade-up mt-5 text-sm text-ink-500"
            style={{ animationDelay: '320ms' }}
          >
            8–10 fixes ranked by revenue impact. No strings, no pitch.
          </p>
        </div>

        {/* Metric strip */}
        <div
          className="animate-fade-up mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-card border border-ink/10 bg-ink/10 sm:grid-cols-3"
          style={{ animationDelay: '400ms' }}
        >
          {[
            { stat: '20–40%', label: 'of store revenue typically comes from email & SMS' },
            { stat: 'Every 1%', label: 'of lost conversion is traffic you already paid for' },
            { stat: '3-month', label: 'minimum retainer — enough time for tests to prove out' },
          ].map((m) => (
            <div key={m.label} className="bg-bone-100 px-6 py-6 text-center sm:text-left">
              <div className="font-display text-3xl font-semibold text-ink">{m.stat}</div>
              <div className="mt-1.5 text-sm leading-snug text-ink-600">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
