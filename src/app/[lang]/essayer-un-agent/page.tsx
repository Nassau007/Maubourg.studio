// French slug of the live agent demo. See /en/try-an-agent for the pair.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AgentDemoScreen from '@/components/AgentDemoScreen';
import { getDictionary } from '@/lib/i18n';
import { localizedMetadata } from '@/lib/routes';

export function generateStaticParams() {
  return [{ lang: 'fr' }];
}

export async function generateMetadata(): Promise<Metadata> {
  const d = getDictionary('fr').agentDemo;
  return localizedMetadata({
    page: 'agentDemo',
    lang: 'fr',
    title: d.metaTitle,
    description: d.metaDescription,
  });
}

export default function EssayerUnAgentPage({ params }: { params: { lang: string } }) {
  if (params.lang !== 'fr') notFound();
  return <AgentDemoScreen lang="fr" />;
}
