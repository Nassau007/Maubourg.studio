// The AI visibility observatory: the studio's own research on how French
// ecommerce brands appear in answers from ChatGPT, Gemini, Perplexity and
// Claude.
//
// This module is the single source of truth for the section's shape: which
// verticals exist, which editions have been published, and whether the section
// is visible at all. The routes, the sitemap, the navigation, the structured
// data and the homepage proof link all read it, so turning the section on is
// one edit here rather than a hunt through the app.
//
// It deliberately holds no prose. Copy lives in the dictionaries like the rest
// of the site; figures come from the campaign data and are written by hand into
// an edition once that campaign exists.

/**
 * The section is dark until the first campaign has data.
 *
 * While this is false the routes exist and render, but nothing links to them,
 * they stay out of the sitemap, and they ask not to be indexed. A thin page on
 * a site selling GEO expertise is worse than no page, and a crawler that reads
 * an empty observatory once will not hurry back.
 *
 * Flipping this to true, in the same commit that adds an edition below, turns
 * on: the sitemap entries, the footer link, the Dataset structured data, the
 * homepage proof link, and indexing.
 *
 * The checklist for that commit, so nothing is forgotten:
 *   1. add the campaign to OBSERVATORY_EDITIONS below, with its real date;
 *   2. drop the aggregate table in public/atlas/ and point `aggregate`
 *      at it;
 *   3. write the findings and the method copy (the dictionaries hold the
 *      labels, the figures belong to the edition and carry their query IDs);
 *   4. add the section to public/llms.txt, which is a static file and cannot
 *      read this flag: one line under "## Pages" per language, plus a line in
 *      "## What it does";
 *   5. set this to true. The main nav link comes with it: Nass confirmed the
 *      section belongs there once campaign 1 is published.
 */
export const OBSERVATORY_LIVE = true;

/**
 * Where the section lives, per language. The rest of the paths are built from
 * these two, so a slug is decided once.
 *
 * The section is published as the "Atlas des réponses IA" (English: "AI
 * Answers Atlas"); the code keeps calling it the observatory.
 *
 * Descriptive rather than short (`/atlas` alone) on purpose: a URL that
 * says what it contains is easier for an assistant to quote, and quotability is
 * the whole point of the section.
 */
export const OBSERVATORY_BASE = {
  en: '/ai-answers-atlas',
  fr: '/atlas-reponses-ia',
} as const;

/** Sub-pages that are not a vertical and not an edition. */
export const OBSERVATORY_SEGMENTS = {
  methodology: { en: 'methodology', fr: 'methodologie' },
  editions: { en: 'editions', fr: 'editions' },
} as const;

/**
 * The three verticals the query panel covers, keyed by the prefix used in the
 * study's query IDs (LIT-CMP-2 and so on), so a figure on a page can always be
 * traced back to the campaign file it came from.
 *
 * A vertical exists here as soon as the panel covers it. Whether its page is
 * worth reading is decided by `editions`: with no campaign, there is nothing to
 * put on it.
 */
export type ObservatoryVertical = {
  /** Query ID prefix in Observatory/llm-visibility/panel/queries.md. */
  id: 'LIT' | 'COS' | 'CHA';
  slug: { en: string; fr: string };
};

export const OBSERVATORY_VERTICALS: readonly ObservatoryVertical[] = [
  { id: 'LIT', slug: { en: 'bedding', fr: 'literie' } },
  { id: 'COS', slug: { en: 'clean-cosmetics', fr: 'cosmetique-clean' } },
  { id: 'CHA', slug: { en: 'comfort-shoes', fr: 'chaussures-confort' } },
];

/**
 * One published campaign. Editions are never overwritten: a new campaign adds
 * an entry, it does not edit the previous one. That is the whole value of the
 * dataset, the same queries tracked across model generations.
 *
 * `slug` is the edition's month (YYYY-MM), which is also its URL segment and
 * the folder of its texts (content/atlas/<slug>/) and of its files
 * (public/atlas/<slug>/).
 *
 * A campaign does not ask every question the same number of times. Edition 1
 * asked all 60 questions once (series 1), then 12 of them four more times
 * (series 2, five runs in all). A single "runs per query" number would be
 * false for 48 of the 60, so the repeated subset is described on its own.
 *
 * `aggregate` is the plain data published beside the edition, served from
 * public/atlas/. A clean table is what other sites link to, and inbound
 * links are what feed the models.
 */
export type ObservatoryEdition = {
  slug: string;
  /** Edition number, as the texts name it ("édition 1"). */
  number: number;
  /** Publication date, ISO. Used as lastModified and datePublished, never the deploy date. */
  published: string;
  /** When the answers were collected, ISO dates. The Dataset's temporal coverage. */
  period: { start: string; end: string };
  /** Engines the campaign actually ran against. */
  engines: readonly string[];
  /** Number of queries in the panel for this campaign. */
  queries: number;
  /** The subset asked more than once, and how many runs it got in all. */
  repeated: { queries: number; runs: number };
  /** Answers analysed. */
  answers: number;
  /** Downloadable files, or null until they are published. */
  aggregate: {
    /** The questions asked, with their ID, type and series. */
    questions: string;
    /** Brands cited, per question, series and engine. */
    citations: string;
    /** Sites cited as sources, with their type. */
    sources: string;
    /** How to read the two files. */
    readme: string;
    /** Folder holding the data behind each chart of the edition page. */
    charts: string;
  } | null;
};

/** Newest first. See Observatory/datasets/01_llm-visibility/campaigns/ in the studio repo. */
export const OBSERVATORY_EDITIONS: readonly ObservatoryEdition[] = [
  {
    slug: '2026-10',
    number: 1,
    published: '2026-10-12',
    period: { start: '2026-09-25', end: '2026-10-08' },
    engines: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity'],
    queries: 60,
    repeated: { queries: 12, runs: 5 },
    answers: 432,
    aggregate: {
      questions: '/atlas/2026-10/atlas-reponses-ia-edition-1-questions.csv',
      citations: '/atlas/2026-10/atlas-reponses-ia-edition-1-citations.csv',
      sources: '/atlas/2026-10/atlas-reponses-ia-edition-1-sources.csv',
      readme: '/atlas/2026-10/LISEZMOI.md',
      charts: '/atlas/2026-10/graphiques',
    },
  },
];

export function latestEdition(): ObservatoryEdition | null {
  return OBSERVATORY_EDITIONS.length > 0 ? OBSERVATORY_EDITIONS[0] : null;
}

export function getEdition(slug: string): ObservatoryEdition | null {
  return OBSERVATORY_EDITIONS.find((edition) => edition.slug === slug) ?? null;
}

export function getVerticalBySlug(slug: string, lang: 'en' | 'fr'): ObservatoryVertical | null {
  return OBSERVATORY_VERTICALS.find((vertical) => vertical.slug[lang] === slug) ?? null;
}

/* ------------------------------------------------------------------ */
/* Hrefs. Locale-prefixed, built from the two base slugs above.        */
/* ------------------------------------------------------------------ */

export function observatoryHref(lang: 'en' | 'fr'): string {
  return `/${lang}${OBSERVATORY_BASE[lang]}`;
}

export function methodologyHref(lang: 'en' | 'fr'): string {
  return `${observatoryHref(lang)}/${OBSERVATORY_SEGMENTS.methodology[lang]}`;
}

export function verticalHref(vertical: ObservatoryVertical, lang: 'en' | 'fr'): string {
  return `${observatoryHref(lang)}/${vertical.slug[lang]}`;
}

export function editionHref(edition: ObservatoryEdition, lang: 'en' | 'fr'): string {
  return `${observatoryHref(lang)}/${OBSERVATORY_SEGMENTS.editions[lang]}/${edition.slug}`;
}

/**
 * Sub-pages that exist in English. Edition 1 is written in French, and the
 * English side is one page: a summary at the section root, not a translation.
 * The method, the verticals and the edition have no English twin, so they are
 * not built in English, carry no hreflang alternate, and switching to English
 * from one of them lands on the English summary. The day English sub-pages
 * are written, set this to true and add their routes back under
 * src/app/[lang]/ai-answers-atlas/.
 */
export const OBSERVATORY_EN_SUBPAGES = false;

/** Whether a given page of the section exists in a given language. */
export function observatoryPageExists(lang: 'en' | 'fr', page: 'index' | 'sub'): boolean {
  return lang === 'fr' || page === 'index' || OBSERVATORY_EN_SUBPAGES;
}

/**
 * Same observatory page, other language. The language switcher needs this
 * because the vertical slugs differ per language: /atlas-reponses-ia/
 * literie must become /ai-answers-atlas/bedding, not a path that 404s.
 *
 * Returns null when the path is not in this section, so the caller can fall
 * back to its own rules.
 */
export function swapObservatoryLocale(pathname: string, target: 'en' | 'fr'): string | null {
  const source: 'en' | 'fr' = target === 'fr' ? 'en' : 'fr';
  const prefix = `/${source}${OBSERVATORY_BASE[source]}`;
  if (pathname !== prefix && !pathname.startsWith(`${prefix}/`)) return null;

  const rest = pathname.slice(prefix.length).replace(/^\//, '').replace(/\/$/, '');
  if (!rest) return observatoryHref(target);
  // No twin in the target language: the section root is the honest landing.
  if (!observatoryPageExists(target, 'sub')) return observatoryHref(target);

  const [first, ...tail] = rest.split('/');
  if (first === OBSERVATORY_SEGMENTS.methodology[source]) return methodologyHref(target);
  if (first === OBSERVATORY_SEGMENTS.editions[source]) {
    const edition = tail[0] ? getEdition(tail[0]) : null;
    // An edition slug is a date, identical in both languages.
    return edition ? editionHref(edition, target) : observatoryHref(target);
  }
  const vertical = getVerticalBySlug(first, source);
  return vertical ? verticalHref(vertical, target) : observatoryHref(target);
}
