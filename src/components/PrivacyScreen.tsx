import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { getDictionary, type Locale } from '@/lib/i18n';
import { site } from '@/lib/site';

/** Shared body of /en/privacy and /fr/confidentialite. */
export default function PrivacyScreen({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);
  const p = dict.privacy;

  return (
    <>
      <Nav dict={dict.nav} lang={lang} />
      <main className="pt-28 md:pt-36">
        <section className="mx-auto max-w-content px-5 pb-20 md:px-8 md:pb-28">
          <div className="max-w-2xl">
            <Link
              href={`/${lang}`}
              className="block w-fit text-sm font-medium text-ink-500 transition-colors hover:text-ink"
            >
              {p.back}
            </Link>

            <span className="eyebrow mt-6">{p.eyebrow}</span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-ink md:text-5xl">
              {p.title}
            </h1>
            <p className="mt-3 text-sm text-ink-500">{p.updated}</p>
            <p className="mt-6 text-lg text-ink-600">{p.intro}</p>

            <div className="mt-12 space-y-9">
              {p.sections.map((section) => (
                <div key={section.title}>
                  <h2 className="font-display text-xl font-semibold text-ink">{section.title}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-600">{section.body}</p>
                </div>
              ))}
            </div>

            <p className="mt-12 border-t border-ink/10 pt-6 text-[15px] text-ink-600">
              {p.contactPrefix}{' '}
              <a
                href={`mailto:${site.email}`}
                className="font-semibold text-emerald underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}
