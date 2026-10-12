// French index of the AI visibility observatory: the latest edition's five
// findings, each linking to its detail in the full study. The English side is
// a summary at its own path, so the two declare each other as alternates.
// Any other locale 404s here rather than serving this URL with the wrong
// language inside it.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ObservatoryIndexScreen } from '@/components/observatory/ObservatoryScreens';
import { ObservatoryJsonLd } from '@/components/JsonLd';
import { getDictionary } from '@/lib/i18n';
import { latestEdition, observatoryHref } from '@/lib/observatory';
import { loadObservatoryDoc } from '@/lib/observatory-content';
import { observatoryMetadata } from '@/lib/observatory-metadata';

export function generateStaticParams() {
  return [{ lang: 'fr' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const edition = latestEdition();
  if (!edition) return {};
  const doc = loadObservatoryDoc(edition, 'index', 'fr');
  return observatoryMetadata({
    lang: 'fr',
    path: observatoryHref('fr'),
    title: doc.metaTitle,
    description: doc.description,
    alternates: {
      en: observatoryHref('en'),
      fr: observatoryHref('fr'),
      'x-default': observatoryHref('fr'),
    },
  });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (params.lang !== 'fr') notFound();
  const edition = latestEdition();
  if (!edition) notFound();
  const doc = loadObservatoryDoc(edition, 'index', 'fr');
  return (
    <>
      <ObservatoryJsonLd
        lang="fr"
        path={observatoryHref('fr')}
        name={getDictionary('fr').observatory.meta.title.replace(' - Maubourg Studio', '')}
        description={doc.description}
      />
      <ObservatoryIndexScreen lang="fr" edition={edition} />
    </>
  );
}
