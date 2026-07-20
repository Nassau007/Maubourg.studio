import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Maubourg Studio — Conversion optimization for European ecommerce',
  description:
    "Your store already has traffic. Let's make more of it buy. Conversion optimization and rebuilds for European ecommerce brands — earn more from the visitors you're already paying for.",
  keywords: [
    'conversion rate optimization',
    'CRO agency',
    'ecommerce',
    'Shopify',
    'European ecommerce',
    'store audit',
    'DTC',
  ],
  openGraph: {
    title: 'Maubourg Studio — Conversion optimization for European ecommerce',
    description:
      "Your store already has traffic. Let's make more of it buy. Free store teardown, no strings.",
    url: siteUrl,
    siteName: 'Maubourg Studio',
    locale: 'en_GB',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
