// The parts every service page shares: chrome, a breadcrumb, the cross-links
// at the bottom and the closing call to action. Deliberately thin - it does
// not own the hero or the body, because five pages that share a hero component
// end up looking like five instances of one page. Each screen composes its own
// middle and hands the repeated furniture to this.

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { getDictionary, type Locale } from '@/lib/i18n';
import { localizedHref, type VerticalPage, serviceMenu } from '@/lib/routes';

type Related = readonly { page: string; text: string }[];

export default function VerticalFrame({
  lang,
  related,
  children,
}: {
  lang: Locale;
  related: Related;
  children: React.ReactNode;
}) {
  const dict = getDictionary(lang);
  const s = dict.verticals.shared;

  return (
    <>
      <Nav
        dict={dict.nav}
        lang={lang}
        services={serviceMenu(lang)}
        servicesLabel={dict.verticals.shared.navHeading}
      />
      <main className="pt-28 md:pt-32">
        <div className="mx-auto max-w-content px-5 md:px-8">
          <Link
            href={`/${lang}`}
            className="block w-fit text-sm font-medium text-ink-500 transition-colors hover:text-ink"
          >
            {s.backHome}
          </Link>
        </div>

        {children}

        {/* Cross-links. Each page names the two verticals that genuinely follow
            from it, with a sentence saying why, rather than a grid of all five. */}
        <section className="mx-auto max-w-content px-5 pb-4 md:px-8">
          <div className="hairline pt-12">
            <h2 className="font-display text-xl font-semibold text-ink">{s.relatedHeading}</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {related.map((item) => {
                const page = item.page as VerticalPage;
                const label = dict.verticals[page].nav.label;
                return (
                  <Link
                    key={item.page}
                    href={localizedHref(page, lang)}
                    className="card card-hover group"
                  >
                    <p className="font-display text-lg font-semibold text-ink">
                      {label}{' '}
                      <span
                        aria-hidden
                        className="inline-block transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </p>
                    <p className="mt-1.5 text-[14px] leading-snug text-ink-600">{item.text}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-content px-5 py-16 md:px-8 md:py-24">
          <div className="rounded-card bg-ink px-6 py-12 text-center md:px-16 md:py-16">
            <span className="eyebrow justify-center text-signal before:bg-signal/60">
              {s.ctaEyebrow}
            </span>
            <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold leading-[1.1] tracking-tightest text-bone md:text-4xl">
              {s.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-bone/70">
              {s.ctaBody}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={`/${lang}#teardown`} className="btn-signal w-full sm:w-auto">
                {s.ctaPrimary}
              </Link>
              <Link href={`/${lang}/call`} className="btn-ghost-light w-full sm:w-auto">
                {s.ctaSecondary}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Small shared pieces. Typography only, no layout opinions.           */
/* ------------------------------------------------------------------ */

export function SectionHead({
  eyebrow,
  title,
  intro,
  className = '',
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
  align?: 'left' | 'center';
}) {
  const centered = align === 'center';
  return (
    <div className={[centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl', className].join(' ')}>
      {eyebrow && <span className={['eyebrow', centered ? 'justify-center' : ''].join(' ')}>{eyebrow}</span>}
      <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tightest text-ink md:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-[16px] leading-relaxed text-ink-600">{intro}</p>}
    </div>
  );
}

/** The one number each hero leads on. */
export function StatBadge({ value, note }: { value: string; note: string }) {
  return (
    <div className="flex items-baseline gap-3 rounded-card border border-ink/10 bg-bone-100 px-5 py-4">
      <span className="font-display text-2xl font-semibold text-emerald md:text-3xl">{value}</span>
      <span className="text-[13px] leading-snug text-ink-600">{note}</span>
    </div>
  );
}
