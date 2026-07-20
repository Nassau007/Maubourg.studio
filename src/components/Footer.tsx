import Link from 'next/link';
import { site } from '@/lib/site';
import type { Dictionary, Locale } from '@/lib/i18n';

export default function Footer({ dict, lang }: { dict: Dictionary['footer']; lang: Locale }) {
  const year = new Date().getFullYear();
  const home = `/${lang}`;

  return (
    <footer className="bg-ink text-bone">
      {/* Final CTA */}
      <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-bone md:text-5xl">
            {dict.ctaTitle} <span className="italic text-signal">{dict.ctaAccent}</span>
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={`${home}#teardown`} className="btn-signal w-full sm:w-auto">
              {dict.ctaPrimary}
            </Link>
            <Link href={`${home}/call`} className="btn-ghost-light w-full sm:w-auto">
              {dict.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-bone/10">
        <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-4 px-5 py-8 md:flex-row md:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-bone text-ink">
              <span className="font-display text-sm font-semibold leading-none">M</span>
            </span>
            <span className="font-display text-base font-semibold text-bone">
              Maubourg<span className="text-signal">.</span>
            </span>
          </div>

          <p className="text-sm text-bone/50">{site.tagline}</p>

          <div className="flex items-center gap-6 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="text-bone/70 transition-colors hover:text-bone"
            >
              {site.email}
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-content px-5 pb-8 md:px-8">
          <p className="text-xs text-bone/40">
            © {year} Maubourg Studio. {dict.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
