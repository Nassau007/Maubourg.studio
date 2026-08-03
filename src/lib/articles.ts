// The blog: reading the markdown files and deciding which service each
// article's call to action points at.
//
// Server only. Every consumer is a statically generated page, so the files are
// read at build time and the rendered HTML is what ships. Nothing here runs on
// a request, which is what keeps it working inside the standalone Docker
// output, where the content directory is present at build and irrelevant after.

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { getDictionary, type Locale } from '@/lib/i18n';
import { parseBlocks, splitSections, type Block } from '@/lib/markdown';
import { localizedHref, type VerticalPage } from '@/lib/routes';

/**
 * Every article is written in French, and there is no English index worth
 * publishing until English ones exist. The section is therefore French only:
 * the routes prerender nothing under /en, and the language switcher sends an
 * English reader to the English home rather than to a 404.
 */
export const ARTICLES_LOCALE: Locale = 'fr';

/** URL segment, under the locale prefix: /fr/blog, /fr/blog/<slug>. */
export const ARTICLES_SEGMENT = 'blog';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'articles');

/* ------------------------------------------------------------------ */
/* Which service an article sells                                       */
/* ------------------------------------------------------------------ */

/**
 * Article category -> service page.
 *
 * The fifteen categories in the source files are finer than the five services,
 * so each one is placed against what the service copy in the dictionaries
 * actually claims, not against the name of the service:
 *
 * - conversion is the broadest by design. Its leak table names delivery terms
 *   beside the price, product copy, forced accounts at checkout and proof that
 *   arrives after the decision, and its measurement half names GA4, consent
 *   and server-side tagging. That covers pricing, payment and trust, reviews,
 *   product content, delivery and returns terms, analytics, and testing.
 * - acquisition owns both engines on its page: paid media, and the Klaviyo
 *   lifecycle flows including winback. So retention, loyalty and lifetime
 *   value sit here, and so does organic and marketplace traffic, which is the
 *   same job (bringing people in) even though that page leads on paid.
 * - geo, agents and foundations map one to one with their own categories.
 *
 * The one genuinely arguable row is delivery, returns and customer service.
 * Four of its five articles are about the terms a buyer reads before they buy,
 * which is conversion; the fifth is about deflecting support tickets, which is
 * the agents page. Category wins, and `service` in an article's frontmatter
 * overrides it when a single article deserves the other one.
 */
const CATEGORY_SERVICE: Record<string, VerticalPage> = {
  'Conversion (CRO)': 'conversion',
  'Mesure, tests et pilotage': 'conversion',
  'Analytics et tracking': 'conversion',
  "Paiement et confiance à l'achat": 'conversion',
  'Prix et stratégie tarifaire': 'conversion',
  'Avis clients et preuve sociale': 'conversion',
  'Contenu produit et expérience': 'conversion',
  'Livraison, retours et service client': 'conversion',
  'Acquisition et publicité payante': 'acquisition',
  'Rétention (email et SMS)': 'acquisition',
  'Fidélisation, abonnement et valeur client': 'acquisition',
  'Acquisition organique et marketplaces': 'acquisition',
  'Visibilité sur les IA génératives (GEO)': 'geo',
  'Agents IA': 'agents',
  'Création et refonte de site': 'foundations',
};

/**
 * A category nobody mapped falls back to conversion rather than to nothing.
 * The free teardown is the entry point for every one of these readers, and the
 * conversion page is the one that offers it in the plainest terms, so a new
 * category added upstream ships with a working call to action instead of a
 * blank sidebar.
 */
const FALLBACK_SERVICE: VerticalPage = 'conversion';

export function serviceForCategory(category: string): VerticalPage {
  return CATEGORY_SERVICE[category] ?? FALLBACK_SERVICE;
}

/* ------------------------------------------------------------------ */
/* Loading                                                              */
/* ------------------------------------------------------------------ */

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  question: string;
  category: string;
  /** ISO yyyy-mm-dd. Kept as a string so no timezone can move the day. */
  date: string;
  readingTime: number;
  service: VerticalPage;
};

export type Article = ArticleMeta & {
  /** Everything before the first `##`. */
  lead: Block[];
  sections: { heading: string; blocks: Block[] }[];
};

type RawFile = { file: string; data: Record<string, unknown>; body: string };

function readRaw(): RawFile[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const parsed = matter(fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8'));
      return { file, data: parsed.data as Record<string, unknown>, body: parsed.content };
    })
    .filter((raw) => raw.data.draft !== true && raw.data.lang === ARTICLES_LOCALE);
}

/** yyyy-mm-dd, whatever the YAML gave us. Unquoted dates arrive as a Date. */
function isoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? '').slice(0, 10);
}

let cache: Article[] | null = null;

function load(): Article[] {
  if (cache) return cache;

  const raw = readRaw();

  // Cross-links in the source point at sibling filenames. Build the index
  // first so a link only survives if the article it names is also published.
  const byFile = new Map<string, string>();
  for (const item of raw) byFile.set(item.file, String(item.data.slug ?? ''));

  const resolve = (target: string): string | null => {
    if (/^(https?:|mailto:|#|\/)/.test(target)) return target;
    const slug = byFile.get(target.replace(/^\.\//, ''));
    return slug ? articleHref(slug) : null;
  };

  const articles = raw.map((item): Article => {
    const { lead, sections } = splitSections(item.body);
    return {
      slug: String(item.data.slug ?? item.file.replace(/\.md$/, '')),
      title: String(item.data.title ?? ''),
      description: String(item.data.description ?? ''),
      question: String(item.data.question ?? item.data.title ?? ''),
      category: String(item.data.category ?? ''),
      date: isoDate(item.data.date),
      readingTime: Number(item.data.readingTime ?? 0),
      service: (item.data.service as VerticalPage) ?? serviceForCategory(String(item.data.category ?? '')),
      lead: parseBlocks(lead, resolve),
      sections: sections.map((section) => ({
        heading: section.heading,
        blocks: parseBlocks(section.body, resolve),
      })),
    };
  });

  articles.sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : b.date.localeCompare(a.date)));
  cache = articles;
  return articles;
}

export function allArticles(): Article[] {
  return load();
}

export function articleSlugs(): string[] {
  return load().map((article) => article.slug);
}

export function getArticle(slug: string): Article | undefined {
  return load().find((article) => article.slug === slug);
}

/**
 * Up to two more to read, same category first and the most recent otherwise.
 * Falling back outside the category matters while the section is small: an
 * empty related list is a dead end on the one page a reader is still engaged.
 */
export function relatedArticles(article: Article, limit = 2): Article[] {
  const others = load().filter((other) => other.slug !== article.slug);
  const sameCategory = others.filter((other) => other.category === article.category);
  const rest = others.filter((other) => other.category !== article.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/* ------------------------------------------------------------------ */
/* Links and formatting                                                 */
/* ------------------------------------------------------------------ */

export function articlesIndexHref(): string {
  return `/${ARTICLES_LOCALE}/${ARTICLES_SEGMENT}`;
}

export function articleHref(slug: string): string {
  return `${articlesIndexHref()}/${slug}`;
}

/**
 * The one place a call to action on an article is built.
 *
 * The sticky sidebar calls this. The category decides the service, the
 * service decides the href and the label, and the label comes out of the
 * same dictionary entry the navigation menu reads, so a service renamed once
 * is renamed everywhere.
 */
export function serviceCta(
  service: VerticalPage,
  lang: Locale,
  labelTemplate: string,
): { href: string; label: string } {
  const dict = getDictionary(lang);
  return {
    href: localizedHref(service, lang),
    label: labelTemplate.replace('{service}', dict.verticals[service].nav.label),
  };
}

/** "2 août 2026". Formatted in UTC so the printed day matches the frontmatter. */
export function formatDate(iso: string, lang: Locale): string {
  const [year, month, day] = iso.split('-').map(Number);
  if (!year || !month || !day) return iso;
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}
