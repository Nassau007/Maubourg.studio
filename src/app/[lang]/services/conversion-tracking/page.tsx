// en slug of the conversion service page. The other language lives at a different
// path; both render <ConversionScreen />. Any other locale 404s here rather than
// serving this URL with the wrong language inside it.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ConversionScreen from '@/components/vertical/ConversionScreen';
import { getDictionary } from '@/lib/i18n';
import { localizedMetadata } from '@/lib/routes';

export function generateStaticParams() {
  return [{ lang: 'en' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const m = getDictionary('en').verticals.conversion.meta;
  return localizedMetadata({ page: 'conversion', lang: 'en', title: m.title, description: m.description });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (params.lang !== 'en') notFound();
  return <ConversionScreen lang="en" />;
}
