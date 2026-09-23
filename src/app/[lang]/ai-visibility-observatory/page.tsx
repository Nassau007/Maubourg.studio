// English index of the AI visibility observatory. The other language lives at
// a different path; both render the same screen. Any other locale 404s here
// rather than serving this URL with the wrong language inside it.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ObservatoryIndexScreen } from '@/components/observatory/ObservatoryScreens';
import { ObservatoryJsonLd } from '@/components/JsonLd';
import { getDictionary } from '@/lib/i18n';
import { localizedPaths } from '@/lib/routes';
import { observatoryMetadata } from '@/lib/observatory-metadata';

export function generateStaticParams() {
  return [{ lang: 'en' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const o = getDictionary('en').observatory;
  return observatoryMetadata({
    lang: 'en',
    path: `/en${localizedPaths.observatory.en}`,
    title: o.meta.title,
    description: o.meta.description,
    alternates: {
      en: `/en${localizedPaths.observatory.en}`,
      fr: `/fr${localizedPaths.observatory.fr}`,
      'x-default': `/fr${localizedPaths.observatory.fr}`,
    },
  });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (params.lang !== 'en') notFound();
  return (
    <>
      <ObservatoryJsonLd lang="en" />
      <ObservatoryIndexScreen lang="en" />
    </>
  );
}
