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

          {/* One primary action for cold traffic. The call is a text link below, not a
              competing button — every extra choice at this point costs conversion. */}
          <div
            className="animate-fade-up mt-9 flex justify-center"
            style={{ animationDelay: '240ms' }}
          >
            <Link href={`${home}#teardown`} className="btn-primary w-full sm:w-auto">
              {dict.ctaPrimary}
            </Link>
          </div>

          <p
            className="animate-fade-up mt-5 text-sm text-ink-500"
            style={{ animationDelay: '320ms' }}
          >
            {dict.note}
          </p>

          <p
            className="animate-fade-up mt-3 text-sm text-ink-500"
            style={{ animationDelay: '360ms' }}
          >
            {dict.talkPrefix}{' '}
            <Link
              href={`${home}/call`}
              className="font-medium text-ink-700 underline underline-offset-4 decoration-ink/25 transition-colors hover:text-emerald"
            >
              {dict.ctaSecondary}
            </Link>
          </p>
        </div>

        {/* What we actually do — our own capabilities, not borrowed industry averages. */}
        <div className="animate-fade-up mx-auto mt-16 max-w-4xl" style={{ animationDelay: '400ms' }}>
          <p className="eyebrow text-center">{dict.skillsHeading}</p>
          <div className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-card border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {dict.skills.map((s) => (
              <div key={s.name} className="bg-bone-100 px-6 py-6 text-left">
                <div className="font-display text-xl font-semibold text-ink">{s.name}</div>
                <div className="mt-1.5 text-sm leading-snug text-ink-600">{s.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
