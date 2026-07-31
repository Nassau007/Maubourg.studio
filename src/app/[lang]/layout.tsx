import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import '../globals.css';
import { getDictionary, locales, isLocale, type Locale } from '@/lib/i18n';
import { siteUrl, site } from '@/lib/site';

const display = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const dict = getDictionary(params.lang);
  const lang = isLocale(params.lang) ? params.lang : 'en';

  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    applicationName: site.name,
    authors: [{ name: site.name, url: siteUrl }],
    creator: site.name,
    publisher: site.name,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: '/en',
        fr: '/fr',
        // Tells a crawler which version to serve when it matches no language.
        'x-default': '/en',
      },
    },
    openGraph: {
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
      url: `${siteUrl}/${lang}`,
      siteName: site.name,
      locale: lang === 'fr' ? 'fr_FR' : 'en_GB',
      alternateLocale: lang === 'fr' ? 'en_GB' : 'fr_FR',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
    },
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang: Locale = isLocale(params.lang) ? params.lang : 'en';
  return (
    <html lang={lang} className={`${display.variable} ${sans.variable}`}>
      <body>
        {/*
          Reveal renders its children at opacity 0 until IntersectionObserver
          fires, so without JavaScript most of the page is present in the HTML
          but invisible. Crawlers that read the markup are fine either way;
          this is for the ones that render, and for a visitor with JS off.
        */}
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
