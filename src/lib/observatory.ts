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
 *   2. drop the aggregate table in public/observatory/ and point `aggregate`
 *      at it;
 *   3. write the findings and the method copy (the dictionaries hold the
 *      labels, the figures belong to the edition and carry their query IDs);
 *   4. add the section to public/llms.txt, which is a static file and cannot
 *      read this flag: one line under "## Pages" per language, plus a line in
 *      "## What it does";
 *   5. set this to true. The main nav link comes with it: Nass confirmed the
 *      section belongs there once campaign 1 is published.
 */
export const OBSERVATORY_LIVE = false;

/**
 * Where the section lives, per language. The rest of the paths are built from
 * these two, so a slug is decided once.
 *
 * Descriptive rather than short (`/observatoire` alone) on purpose: a URL that
 * says what it contains is easier for an assistant to quote, and quotability is
 * the whole point of the section.
 */
export const OBSERVATORY_BASE = {
  en: '/ai-visibility-observatory',
  fr: '/observatoire-visibilite-ia',
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
 * `slug` is the campaign folder name in the study repo (YYYY-MM), which keeps
 * the URL and the source data on the same key.
 *
 * `aggregate` is the plain table published beside the edition, served from
 * public/observatory/. A clean table is what other sites link to, and inbound
 * links are what feed the models.
 */
export type ObservatoryEdition = {
  slug: string;
  /** Campaign date, ISO. Used as lastModified rather than the deploy date. */
  date: string;
  /** Engines the campaign actually ran against. */
  engines: readonly string[];
  /** Number of queries in the panel for this campaign. */
  queries: number;
  /** Runs per query. The published claim is a frequency, never one screenshot. */
  runsPerQuery: number;
  /** Path of the downloadable aggregate, or null until it is published. */
  aggregate: string | null;
};

/** No campaign has been run yet. See Observatory/llm-visibility/campaigns/. */
export const OBSERVATORY_EDITIONS: readonly ObservatoryEdition[] = [];

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
 * Same observatory page, other language. The language switcher needs this
 * because the vertical slugs differ per language: /observatoire-visibilite-ia/
 * literie must become /ai-visibility-observatory/bedding, not a path that 404s.
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
