// The demo used to live here on its own. It is now a section of the AI agents
// service page, so this path only exists to forward the people and the links
// that already point at it. Permanent, so search engines move the authority
// across rather than indexing two pages that hold the same demo.

import { redirect, permanentRedirect } from 'next/navigation';
import { localizedPaths } from '@/lib/routes';

export function generateStaticParams() {
  return [{ lang: 'en' }];
}

export default function TryAnAgentRedirect({ params }: { params: { lang: string } }) {
  if (params.lang !== 'en') redirect('/en' + localizedPaths.agents.en);
  permanentRedirect('/en' + localizedPaths.agents.en);
}
