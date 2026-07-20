import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/i18n';

export default function Hero({ dict, lang }: { dict: Dictionary['hero']; lang: Locale }) {
  const home = `/${lang}`;
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
            {dict.badge}
          </div>

          <h1
            className="animate-fade-up font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tightest text-ink sm:text-6xl md:text-7xl"
            style={{ animationDelay: '80ms' }}
          >
            {dict.title} <span className="italic text-emerald">{dict.titleAccent}</span>
          </h1>

          <p
            className="animate-fade-up mx-auto mt-6 max-w-xl text-lg text-ink-600"
            style={{ animationDelay: '160ms' }}
          >
            {dict.subtitle}
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: '240ms' }}
          >
            <Link href={`${home}#teardown`} className="btn-primary w-full sm:w-auto">
              {dict.ctaPrimary}
            </Link>
            <Link href={`${home}/call`} className="btn-ghost w-full sm:w-auto">
              {dict.ctaSecondary}
            </Link>
          </div>

          <p
            className="animate-fade-up mt-5 text-sm text-ink-500"
            style={{ animationDelay: '320ms' }}
          >
            {dict.note}
          </p>
        </div>

        {/* Metric strip */}
        <div
          className="animate-fade-up mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-card border border-ink/10 bg-ink/10 sm:grid-cols-3"
          style={{ animationDelay: '400ms' }}
        >
          {dict.metrics.map((m) => (
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
