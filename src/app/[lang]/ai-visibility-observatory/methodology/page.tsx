// English methodology page. Anything quoting a figure from this section needs
// somewhere to point for how the figure was produced, which is what makes a
// number reusable.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ObservatoryMethodScreen } from '@/components/observatory/ObservatoryScreens';
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
    path: `/en${localizedPaths.observatoryMethod.en}`,
    title: o.meta.methodTitle,
    description: o.meta.methodDescription,
    alternates: {
      en: `/en${localizedPaths.observatoryMethod.en}`,
      fr: `/fr${localizedPaths.observatoryMethod.fr}`,
      'x-default': `/fr${localizedPaths.observatoryMethod.fr}`,
    },
  });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (params.lang !== 'en') notFound();
  return <ObservatoryMethodScreen lang="en" />;
}
