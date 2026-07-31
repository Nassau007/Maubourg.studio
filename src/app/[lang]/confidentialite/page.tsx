// French slug of the privacy page. English: /en/privacy.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PrivacyScreen from '@/components/PrivacyScreen';
import { getDictionary } from '@/lib/i18n';
import { localizedMetadata } from '@/lib/routes';

export function generateStaticParams() {
  return [{ lang: 'fr' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const p = getDictionary('fr').privacy;
  return localizedMetadata({
    page: 'privacy',
    lang: 'fr',
    title: p.metaTitle,
    description: p.metaDescription,
  });
}

export default function ConfidentialitePage({ params }: { params: { lang: string } }) {
  if (params.lang !== 'fr') notFound();
  return <PrivacyScreen lang="fr" />;
}
