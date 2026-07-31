// Moving a rebuilt page out of the run and into the page store, which is the
// one thing that is readable more than once: the visitor previews it in the
// iframe, opens it in a tab and downloads it, and those are three reads of the
// same document.
//
// It lives here rather than in a route because two routes now do it. Under the
// email gate the reveal route publishes, after the address is in. With the gate
// open the run route publishes immediately, because there is no second step.

import { getDictionary } from '@/lib/i18n';
import { putPage } from './store';
import type { StoredRun } from './types';

/** ASCII file name for the download, since a browser saves it to a real disk. */
export function slug(name: string): string {
  const base = name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
    .slice(0, 60);
  return `${base || 'product-page'}-maubourg.html`;
}

export type PublishedPage = { preview: string; download: string };

/**
 * Null whenever there is no rebuilt page, which is a normal outcome: the demo
 * says so and shows the text result on its own.
 *
 * The ring label drawn around the substituted block is written in the page's
 * own language, not the site's - it is printed inside their store's page.
 */
export function publishPage(run: {
  renderedHtml: StoredRun['renderedHtml'];
  detectedLanguage: string;
  productName: string;
}): PublishedPage | null {
  if (!run.renderedHtml) return null;
  const pageLocale = run.detectedLanguage.startsWith('fr') ? 'fr' : 'en';
  const token = putPage({
    html: run.renderedHtml,
    label: getDictionary(pageLocale).agentDemo.result.previewMarker,
    filename: slug(run.productName),
  });
  return {
    preview: `/api/agent-demo/page/${token}`,
    download: `/api/agent-demo/page/${token}?download=1`,
  };
}
