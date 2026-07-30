// fr slug of the geo service page. The other language lives at a different
// path; both render <GeoScreen />. Any other locale 404s here rather than
// serving this URL with the wrong language inside it.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GeoScreen from '@/components/vertical/GeoScreen';
import { getDictionary } from '@/lib/i18n';
import { localizedMetadata } from '@/lib/routes';

export function generateStaticParams() {
  return [{ lang: 'fr' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const m = getDictionary('fr').verticals.geo.meta;
  return localizedMetadata({ page: 'geo', lang: 'fr', title: m.title, description: m.description });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (params.lang !== 'fr') notFound();
  return <GeoScreen lang="fr" />;
}
