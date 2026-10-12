// English page of the AI visibility observatory: a summary of the French
// edition, not a translation. It is the section's only English page; the
// method, the verticals and the full study are in French and linked from the
// summary's own text. Its twin is the French index, so the two declare each
// other as alternates. Any other locale 404s here.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ObservatoryIndexScreen } from '@/components/observatory/ObservatoryScreens';
import { ObservatoryJsonLd } from '@/components/JsonLd';
import { getDictionary } from '@/lib/i18n';
import { latestEdition, observatoryHref } from '@/lib/observatory';
import { loadObservatoryDoc } from '@/lib/observatory-content';
import { observatoryMetadata } from '@/lib/observatory-metadata';

export function generateStaticParams() {
  return [{ lang: 'en' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const edition = latestEdition();
  if (!edition) return {};
  const doc = loadObservatoryDoc(edition, 'index', 'en');
  return observatoryMetadata({
    lang: 'en',
    path: observatoryHref('en'),
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
  if (params.lang !== 'en') notFound();
  const edition = latestEdition();
  if (!edition) notFound();
  const doc = loadObservatoryDoc(edition, 'index', 'en');
  return (
    <>
      <ObservatoryJsonLd
        lang="en"
        path={observatoryHref('en')}
        name={getDictionary('en').observatory.meta.title.replace(' - Maubourg Studio', '')}
        description={doc.description}
      />
      <ObservatoryIndexScreen lang="en" edition={edition} />
    </>
  );
}
