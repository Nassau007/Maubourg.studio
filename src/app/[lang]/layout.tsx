import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import '../globals.css';
import { getDictionary, locales, isLocale, type Locale } from '@/lib/i18n';

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

const siteUrl = 'https://maubourg.studio';

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
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: '/en',
        fr: '/fr',
      },
    },
    openGraph: {
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
      url: `${siteUrl}/${lang}`,
      siteName: 'Maubourg Studio',
      locale: lang === 'fr' ? 'fr_FR' : 'en_GB',
      type: 'website',
    },
    robots: { index: true, follow: true },
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
      <body>{children}</body>
    </html>
  );
}
