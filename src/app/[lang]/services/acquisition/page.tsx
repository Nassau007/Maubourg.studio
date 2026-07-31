// The one service page whose slug is identical in both languages, so a single
// directory serves /en/services/acquisition and /fr/services/acquisition.
// There is no locale check to make here: both are legitimate.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AcquisitionScreen from '@/components/vertical/AcquisitionScreen';
import { getDictionary, isLocale, locales } from '@/lib/i18n';
import { localizedMetadata } from '@/lib/routes';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = isLocale(params.lang) ? params.lang : 'en';
  const m = getDictionary(lang).verticals.acquisition.meta;
  return localizedMetadata({
    page: 'acquisition',
    lang,
    title: m.title,
    description: m.description,
  });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  return <AcquisitionScreen lang={params.lang} />;
}
