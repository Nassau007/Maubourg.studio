// French methodology page. Anything quoting a figure from this section needs
// somewhere to point for how the figure was produced, which is what makes a
// number reusable. French only: no English twin is declared.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ObservatoryMethodScreen } from '@/components/observatory/ObservatoryScreens';
import { latestEdition, methodologyHref } from '@/lib/observatory';
import { loadObservatoryDoc } from '@/lib/observatory-content';
import { observatoryMetadata } from '@/lib/observatory-metadata';

export function generateStaticParams() {
  return [{ lang: 'fr' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const edition = latestEdition();
  if (!edition) return {};
  const doc = loadObservatoryDoc(edition, 'methodologie', 'fr');
  return observatoryMetadata({
    lang: 'fr',
    path: methodologyHref('fr'),
    title: doc.metaTitle,
    description: doc.description,
  });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (params.lang !== 'fr') notFound();
  const edition = latestEdition();
  if (!edition) notFound();
  return <ObservatoryMethodScreen lang="fr" edition={edition} />;
}
