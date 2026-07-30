// fr slug of the foundations service page. The other language lives at a different
// path; both render <FoundationsScreen />. Any other locale 404s here rather than
// serving this URL with the wrong language inside it.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FoundationsScreen from '@/components/vertical/FoundationsScreen';
import { getDictionary } from '@/lib/i18n';
import { localizedMetadata } from '@/lib/routes';

export function generateStaticParams() {
  return [{ lang: 'fr' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const m = getDictionary('fr').verticals.foundations.meta;
  return localizedMetadata({ page: 'foundations', lang: 'fr', title: m.title, description: m.description });
}

export default function Page({ params }: { params: { lang: string } }) {
  if (params.lang !== 'fr') notFound();
  return <FoundationsScreen lang="fr" />;
}
