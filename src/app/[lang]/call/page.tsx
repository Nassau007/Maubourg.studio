import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CallForm from '@/components/CallForm';
import { CallJsonLd } from '@/components/JsonLd';
import { getDictionary, isLocale } from '@/lib/i18n';
import { siteUrl, site } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const dict = getDictionary(params.lang);
  const lang = isLocale(params.lang) ? params.lang : 'en';

  // Without its own alternates block this page inherited the layout's
  // canonical, which pointed every call page at the homepage: a crawler was
  // being told this URL is a duplicate and should not be indexed on its own.
  return {
    // Declaring openGraph here replaces the layout's block wholesale, so the
    // share image and metadataBase have to be restated or the call page ships
    // without either.
    metadataBase: new URL(siteUrl),
    title: dict.call.metaTitle,
    description: dict.call.metaDescription,
    alternates: {
      canonical: `/${lang}/call`,
      languages: {
        en: '/en/call',
        fr: '/fr/call',
        'x-default': '/en/call',
      },
    },
    openGraph: {
      title: dict.call.metaTitle,
      description: dict.call.metaDescription,
      url: `${siteUrl}/${lang}/call`,
      siteName: site.name,
      locale: lang === 'fr' ? 'fr_FR' : 'en_GB',
      alternateLocale: lang === 'fr' ? 'en_GB' : 'fr_FR',
      type: 'website',
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.call.metaTitle,
      description: dict.call.metaDescription,
      images: ['/twitter-image.png'],
    },
  };
}

export default function CallPage({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const dict = getDictionary(lang);
  const c = dict.call;

  return (
    <>
      <CallJsonLd dict={dict} lang={lang} />
      <Nav dict={dict.nav} lang={lang} />
      <main className="pt-28 md:pt-36">
        <section className="mx-auto max-w-content px-5 pb-20 md:px-8 md:pb-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            {/* Left: pitch */}
            <div>
              <Link
                href={`/${lang}`}
                className="block w-fit text-sm font-medium text-ink-500 transition-colors hover:text-ink"
              >
                {c.back}
              </Link>

              <span className="eyebrow mt-6">{c.eyebrow}</span>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-ink md:text-6xl">
                {c.title} <span className="italic text-emerald">{c.titleAccent}</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-ink-600">{c.subtitle}</p>

              <ul className="mt-9 space-y-5">
                {c.points.map((p) => (
                  <li key={p.title} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-emerald text-xs text-bone">
                      ✓
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-ink">{p.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-600">{p.body}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-9 text-sm text-ink-500">
                {c.teardownPrefix}{' '}
                <Link
                  href={`/${lang}#teardown`}
                  className="font-semibold text-emerald underline-offset-4 hover:underline"
                >
                  {c.teardownLink}
                </Link>
              </p>
            </div>

            {/* Right: form */}
            <div>
              <CallForm dict={c} lang={lang} />
            </div>
          </div>
        </section>
      </main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}
