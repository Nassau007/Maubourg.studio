// The parts every service page shares: chrome, a breadcrumb, the cross-links
// at the bottom and the closing call to action. Deliberately thin - it does
// not own the hero or the body, because pages that share a hero component end
// up looking like instances of one page. Each screen composes its own middle
// and hands the repeated furniture to this.

import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import LogoBar from '@/components/LogoBar';
import { getDictionary, type Locale } from '@/lib/i18n';
import { localizedHref, type VerticalPage, serviceMenu } from '@/lib/routes';

type Related = readonly { page: string; text: string }[];

/**
 * The closing block. By default every page closes on the free GEO audit, which
 * is the one hook on the site. A page passes its own when that ask is wrong for
 * it: the agents page closes on a call.
 */
export type FrameCta = {
  title: string;
  body?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export default function VerticalFrame({
  lang,
  related,
  cta,
  hero,
  children,
}: {
  lang: Locale;
  related: Related;
  cta?: FrameCta;
  /** The page's own opening, set on forest green with the logo bar under it. */
  hero: React.ReactNode;
  children: React.ReactNode;
}) {
  const dict = getDictionary(lang);
  const s = dict.verticals.shared;
  const closing: FrameCta = cta ?? {
    title: s.ctaTitle,
    body: s.ctaBody,
    primaryLabel: s.ctaPrimary,
    primaryHref: `/${lang}#audit`,
    secondaryLabel: s.ctaSecondary,
    secondaryHref: `/${lang}/call`,
  };

  return (
    <>
      <Nav
        dict={dict.nav}
        lang={lang}
        services={serviceMenu(lang)}
        servicesLabel={dict.verticals.shared.navHeading}
      />
      <main id="main">
        {/* Exploration B "Foret": forest green opens the page (hero, then the
            tools we measure) and closes it (the one closing ask, then the
            footer). Everything in between stays light. */}
        <section className="bg-ink pt-24 text-bone md:pt-28">
          <div className="mx-auto max-w-content px-5 md:px-8">
            <Link
              href={`/${lang}`}
              className="inline-block py-2 text-sm font-medium text-bone/75 transition-colors hover:text-bone"
            >
              {s.backHome}
            </Link>
          </div>
          {hero}
        </section>
        <LogoBar dict={dict.aiTools} tone="dark" />

        {children}

        {/* Cross-link to the other service page: a line, not a lone card. */}
        <section className="bg-bone">
          <div className="mx-auto max-w-content px-5 py-14 md:px-8 md:py-16">
            <div className="flex flex-col gap-3 border-t border-ink/12 pt-8 md:flex-row md:items-baseline md:gap-10">
              <h2 className="font-display flex-none text-lg font-bold text-ink md:w-56">{s.relatedHeading}</h2>
              <ul className="flex-1 space-y-4">
                {related.map((item) => {
                  const page = item.page as VerticalPage;
                  const label = dict.verticals[page].nav.label;
                  return (
                    <li key={item.page}>
                      <Link
                        href={localizedHref(page, lang)}
                        className="group inline-flex items-baseline gap-2 font-display text-2xl font-bold text-ink"
                      >
                        <span className="underline decoration-signal decoration-2 underline-offset-[6px]">{label}</span>
                        <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                      <p className="mt-1.5 max-w-xl text-[15px] leading-relaxed text-ink-600">{item.text}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* The one closing ask. The footer drops its own CTA block on these
            pages, so the same ask never appears twice in a row. */}
        <section className="bg-ink text-bone">
          <div className="mx-auto max-w-content px-5 py-20 md:px-8 md:py-28">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <h2 className="font-display max-w-3xl text-4xl font-bold leading-[1.05] text-bone md:text-[3.25rem] [text-wrap:balance]">
                  {closing.title}
                </h2>
                {closing.body && (
                  <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-bone/85">{closing.body}</p>
                )}
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 lg:col-span-4 lg:flex-col lg:items-start">
                <Link href={closing.primaryHref} className="btn-primary">
                  {closing.primaryLabel}
                </Link>
                <Link href={closing.secondaryHref} className="text-link-light text-[15px]">
                  {closing.secondaryLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer dict={dict.footer} lang={lang} hideCta />
    </>
  );
}

/** The opening shared by the service pages: label, title, one paragraph and
    the two asks, on forest green. `aside` lets a page add its own element
    beside the text. */
export function ForestHero({
  eyebrow,
  title,
  titleAccent,
  subtitle,
  primary,
  secondary,
  aside,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  aside?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-content px-5 pb-14 pt-6 md:px-8 md:pb-16">
      <div className={aside ? 'grid gap-12 lg:grid-cols-12 lg:items-end' : ''}>
        <div className={aside ? 'lg:col-span-7' : 'max-w-4xl'}>
          <p className="text-sm font-medium text-bone/75">{eyebrow}</p>
          <h1 className="font-display mt-5 text-[2.4rem] font-bold leading-[1.04] text-bone sm:text-5xl lg:text-[3.6rem] [text-wrap:balance]">
            {title}
            {titleAccent && (
              <>
                {' '}
                <span className="text-signal">{titleAccent}</span>
              </>
            )}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-bone/85">{subtitle}</p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <a href={primary.href} className="btn-primary">
              {primary.label}
            </a>
            <Link href={secondary.href} className="text-link-light text-center text-[15px] sm:text-left">
              {secondary.label}
            </Link>
          </div>
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
      </div>
    </div>
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
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={['max-w-3xl', className].join(' ')}>
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2 className="font-display text-4xl font-bold leading-[1.05] text-ink md:text-[3rem] [text-wrap:balance]">
        {title}
      </h2>
      {intro && <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-ink-600">{intro}</p>}
    </div>
  );
}

/** The one number each hero leads on. */
export function StatBadge({ value, note }: { value: string; note: string }) {
  return (
    <div className="flex items-baseline gap-3 rounded-card border border-ink/10 bg-bone-100 px-5 py-4">
      <span className="whitespace-nowrap font-display text-2xl font-semibold text-emerald md:text-3xl">
        {value}
      </span>
      <span className="text-[13px] leading-snug text-ink-600">{note}</span>
    </div>
  );
}
