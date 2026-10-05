// Turns the page we fetched into a page the visitor can open: their own
// product page, with the agent's copy sitting where their description was.
//
// Two jobs, in this order.
//
// 1. SAFETY. The document belongs to a store we do not control and the visitor
//    may not own it either. Every script goes, so nothing phones home,
//    redirects, opens a chat widget or rewrites the copy we just put in. What
//    stays is what makes it look like their page: stylesheets, images, fonts,
//    markup. A <base> element rebases every relative URL onto the store's
//    origin in one move, which is why no attribute rewriting is needed.
//
// 2. SUBSTITUTION. Into the element the description was read from (and its
//    mobile or desktop twin), only when dom.ts is sure which element that is.
//    The accordion or tab around it is opened, because a page without its
//    JavaScript cannot open it. When the description is not in the page text
//    at all, the new one is added under the product title and labelled as
//    added. Everywhere else the function returns null and the demo falls back
//    to the text result. A wrong render of someone's own store is worse than
//    no render.

import { escapeHtml } from '@/lib/email';
import { RENDER_MAX_CHARS } from './config';
import type { RenderMode } from './types';
import {
  ancestorsAt,
  flatten,
  flattenText,
  isPanelTag,
  locateDescriptionBlocks,
  scanElements,
  visibilityWeight,
} from './dom';

/** Marks the substituted block. Invisible unless the preview stylesheet is added. */
export const MARKER_ATTR = 'data-maubourg-rewrite';
export const MARKER_ID = 'maubourg-rewrite';

/* ------------------------------------------------------------------ */
/* Sanitising                                                          */
/* ------------------------------------------------------------------ */

const EVENT_ATTR =
  /\son(?:abort|animation\w*|blur|cancel|canplay\w*|change|click|close|contextmenu|copy|cut|dblclick|drag\w*|drop|durationchange|ended|error|focus\w*|input|invalid|key\w+|load\w*|mouse\w+|paste|pause|play\w*|pointer\w+|progress|ratechange|reset|resize|scroll|search|seek\w+|select|show|stalled|submit|suspend|timeupdate|toggle|touch\w+|transition\w*|unload|volumechange|waiting|wheel)\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;

/**
 * What a page normally needs JavaScript for and now will not get. Lazy-loaded
 * images are repaired below by promoting data-src; these rules cover the
 * themes that hide the placeholder with CSS until their loader marks it done,
 * and the full-page loader some themes paint first and remove from a script:
 * on Le Slip Français it covered the whole rebuilt page in blue.
 */
const REPAIR_CSS = `
img[data-src],img.lazyload,img.lazyloading,img.lazyloaded,.lazyload,.lazyloading{opacity:1!important;visibility:visible!important;}
html.no-js body,body{visibility:visible!important;}
loading-bar,.loading-bar,.page-loader,#page-loader,.preloader,#preloader,.page-loading,.loading-screen,.page-transition,page-transition{display:none!important;}
`;

const CSP =
  "default-src 'none'; img-src * data: blob:; style-src * 'unsafe-inline'; font-src * data:; media-src *; script-src 'none'; frame-src 'none'; object-src 'none'; form-action 'none'";

function attr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*("[^"]*"|'[^']*'|[^\\s>]+)`, 'i'));
  if (!m) return null;
  const raw = m[1];
  if (raw.startsWith('"') || raw.startsWith("'")) return raw.slice(1, -1);
  return raw;
}

/** A src that shows nothing on its own: the placeholder a lazy loader replaces. */
function isPlaceholder(src: string | null): boolean {
  if (!src) return true;
  const s = src.trim();
  if (!s) return true;
  if (/^data:image\/(gif|svg)/i.test(s)) return true;
  if (/(^|\/)(blank|placeholder|spacer|pixel)[.-]/i.test(s)) return true;
  return false;
}

/** Promotes data-src / data-srcset so images appear without a lazy loader. */
function repairImages(html: string): string {
  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    const dataSrc = attr(tag, 'data-src') || attr(tag, 'data-lazy-src') || attr(tag, 'data-original');
    const dataSrcset = attr(tag, 'data-srcset') || attr(tag, 'data-lazy-srcset');
    let out = tag;

    if (dataSrc && isPlaceholder(attr(tag, 'src'))) {
      out = /\bsrc\s*=/i.test(out)
        ? out.replace(/\bsrc\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/i, `src="${dataSrc.replace(/"/g, '&quot;')}"`)
        : out.replace(/<img\b/i, `<img src="${dataSrc.replace(/"/g, '&quot;')}"`);
    }
    if (dataSrcset && !attr(tag, 'srcset')) {
      out = out.replace(/<img\b/i, `<img srcset="${dataSrcset.replace(/"/g, '&quot;')}"`);
    }
    return out.replace(/\bloading\s*=\s*("lazy"|'lazy'|lazy)/i, 'loading="eager"');
  });
}

/**
 * Strips everything active out of a document and rebases it on the store's
 * origin. The result is meant to be openable from anywhere: a sandboxed
 * iframe, a new tab, or a file on the visitor's desktop.
 */
export function sanitizeDocument(html: string, pageUrl: string): string {
  let doc = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script\b[\s\S]*?<\/script\s*>/gi, '')
    .replace(/<script\b[^>]*>/gi, '')
    .replace(/<\/script\s*>/gi, '')
    .replace(/<noscript\b[\s\S]*?<\/noscript\s*>/gi, '')
    .replace(/<template\b[\s\S]*?<\/template\s*>/gi, '')
    .replace(/<iframe\b[\s\S]*?<\/iframe\s*>/gi, '')
    .replace(/<iframe\b[^>]*>/gi, '')
    .replace(/<(object|applet)\b[\s\S]*?<\/\1\s*>/gi, '')
    .replace(/<embed\b[^>]*>/gi, '')
    .replace(/<base\b[^>]*>/gi, '')
    .replace(/<meta\b[^>]*http-equiv\s*=\s*["']?refresh["']?[^>]*>/gi, '')
    .replace(
      /<link\b[^>]*\brel\s*=\s*["']?(?:preload|modulepreload|prefetch|preconnect|dns-prefetch)["']?[^>]*>/gi,
      '',
    )
    .replace(EVENT_ATTR, '')
    .replace(/(href|src|action)\s*=\s*("|')\s*javascript:[^"']*\2/gi, '$1="#"');

  doc = repairImages(doc);

  // A stylesheet requested with crossorigin needs the store's server to allow
  // our origin, and most do not: Typology's page came back with no styles at
  // all. Asked for without it, the same file loads like any other. integrity
  // goes too, because it only works on a crossorigin request.
  doc = doc.replace(/<link\b[^>]*>/gi, (tag) =>
    tag.replace(/\s(?:crossorigin|integrity)(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?/gi, ''),
  );

  // The theme's own JavaScript would have removed this class. Left in place it
  // keeps no-js fallback styles switched on, which hide half the page.
  doc = doc.replace(/<html\b[^>]*>/i, (tag) =>
    tag.replace(/\bno-js\b/g, '').replace(/class\s*=\s*("|')\s*\1/g, ''),
  );

  const head = [
    `<base href="${escapeHtml(pageUrl)}">`,
    '<meta name="referrer" content="no-referrer">',
    `<meta http-equiv="Content-Security-Policy" content="${CSP}">`,
    `<style>${REPAIR_CSS}</style>`,
  ].join('');

  if (/<head\b[^>]*>/i.test(doc)) {
    doc = doc.replace(/<head\b[^>]*>/i, (tag) => `${tag}${head}`);
  } else if (/<html\b[^>]*>/i.test(doc)) {
    doc = doc.replace(/<html\b[^>]*>/i, (tag) => `${tag}<head>${head}</head>`);
  } else {
    doc = `<head>${head}</head>${doc}`;
  }

  return doc;
}

/* ------------------------------------------------------------------ */
/* The new copy, as markup                                             */
/* ------------------------------------------------------------------ */

/**
 * The agent writes plain text. This renders it as the paragraphs and list a
 * product page would have, and escapes everything: the model's output is never
 * markup, and treating it as markup is how a rewrite becomes an injection.
 */
export function rewriteToHtml(rewrite: string): string {
  const blocks = rewrite
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  const out: string[] = [];
  for (let i = 0; i < blocks.length; i += 1) {
    const lines = blocks[i].split('\n').map((l) => l.trim()).filter(Boolean);
    const bulleted = lines.filter((l) => /^[-•*]\s+/.test(l));

    if (bulleted.length === lines.length && lines.length > 1) {
      out.push(
        `<ul>${lines
          .map((l) => `<li>${escapeHtml(l.replace(/^[-•*]\s+/, ''))}</li>`)
          .join('')}</ul>`,
      );
    } else {
      out.push(`<p>${lines.map((l) => escapeHtml(l)).join('<br>')}</p>`);
    }
  }

  return out.join('');
}

/* ------------------------------------------------------------------ */
/* The whole job                                                       */
/* ------------------------------------------------------------------ */

/** The rebuilt page, and how the new copy got into it (see RenderMode). */
export type RenderedPage = { html: string; mode: RenderMode };

/**
 * Opens what a click would have opened. The new copy often lands in an
 * accordion or a tab that the theme closes with CSS and opens with
 * JavaScript; the rebuilt page has no JavaScript, so without this it shows the
 * page exactly as it was and the visitor concludes nothing changed. Only the
 * wrappers of the new block are touched, marked one by one in the markup.
 */
const OPEN_CSS = `
[data-maubourg-open]{visibility:visible!important;opacity:1!important;}
[data-maubourg-open="target"]{overflow:visible!important;max-height:none!important;height:auto!important;}
[data-maubourg-open="panel"]{display:block!important;max-height:none!important;height:auto!important;overflow:visible!important;clip-path:none!important;transform:none!important;}
[data-maubourg-open="overlay"]{position:static!important;inset:auto!important;transform:none!important;display:block!important;max-height:none!important;height:auto!important;width:auto!important;max-width:none!important;overflow:visible!important;box-shadow:none!important;z-index:auto!important;}
[data-maubourg-mode="inserted"] p{margin:0 0 .75em;}
[data-maubourg-mode="inserted"] ul{list-style:disc outside;padding-left:1.25em;margin:0 0 .75em;}
[data-maubourg-mode="inserted"] li{display:list-item;}
`;

const OVERLAY_SIG = /drawer|modal|popup|popover|off-?canvas|lightbox|dialog|flyout/i;

type Splice = { at: number; end: number; text: string };

function applySplices(doc: string, splices: Splice[]): string {
  const sorted = splices.slice().sort((a, b) => b.at - a.at);
  let out = doc;
  for (let i = 0; i < sorted.length; i += 1) {
    const s = sorted[i];
    out = out.slice(0, s.at) + s.text + out.slice(s.end);
  }
  return out;
}

/**
 * Marks every wrapper of `pos` so OPEN_CSS can show it. The block whose
 * content was replaced, if any, starts at `targetStart`: it is unclipped too,
 * since Rouje's clipped the new text and the ring that points at it.
 */
function openWrappers(doc: string, pos: number, targetStart = -1): Splice[] {
  const out: Splice[] = [];
  const chain = ancestorsAt(doc, pos);
  for (let i = 0; i < chain.length; i += 1) {
    const a = chain[i];
    if (a.tag === 'html' || a.tag === 'head' || a.tag === 'body') continue;
    const close = a.openEnd - 1;
    if (doc.charAt(close) !== '>') continue;
    const open = doc.slice(a.start, a.openEnd);
    // Without the class, so a "dialog" in a data attribute does not count.
    const cls = (open.match(/\bclass\s*=\s*("([^"]*)"|'([^']*)')/i) || [])[0] || '';
    let level = '1';
    if (OVERLAY_SIG.test(cls) || a.tag === 'dialog') level = 'overlay';
    else if (isPanelTag(a.tag, open)) level = 'panel';
    else if (a.start === targetStart) level = 'target';
    let attrs = ` data-maubourg-open="${level}"`;
    if (a.tag === 'details' && !/\sopen(\s|=|>|$)/i.test(open)) attrs += ' open';
    out.push({ at: close, end: close, text: attrs });
  }
  return out;
}

function addHeadStyle(doc: string, css: string): string {
  const style = `<style>${css}</style>`;
  if (/<\/head>/i.test(doc)) return doc.replace(/<\/head>/i, `${style}</head>`);
  return style + doc;
}

/**
 * The product title the inserted block goes under: an <h1> on screen,
 * preferably the one that names the product. Null when the HTML has none,
 * which happens when the whole product area is drawn by JavaScript: then
 * there is no honest place to put anything, and no page is built.
 */
function titleEnd(doc: string, productName: string): number | null {
  const bodyAt = Math.max(0, doc.search(/<body\b/i));
  const re = /<h1\b[^>]*>[\s\S]*?<\/h1\s*>/gi;
  re.lastIndex = bodyAt;
  const name = flattenText(productName);
  let chosen: { start: number; end: number; text: number } | null = null;
  let m = re.exec(doc);
  while (m) {
    if (visibilityWeight(doc, m.index + 1) >= 0.8) {
      const text = flatten(m[0]).text;
      const here = { start: m.index, end: m.index + m[0].length, text: text.length };
      if (text.length >= 4 && (name.indexOf(text) !== -1 || text.indexOf(name.slice(0, 30)) !== -1)) {
        chosen = here;
        break;
      }
      if (!chosen) chosen = here;
    }
    m = re.exec(doc);
  }
  if (!chosen) return null;

  // Below the title row, not inside it. Themes set the title beside the price
  // or under a badge in a small flex row; a block dropped inside that row is
  // squeezed between the two. So climb out of every wrapper that holds little
  // more than the title, and insert after the last one.
  const title = chosen;
  const flat = flatten(doc);
  const wrappers = scanElements(doc)
    .filter((el) => el.start < title.start && el.end >= title.end)
    .sort((a, b) => a.end - a.start - (b.end - b.start));
  let at = title.end;
  for (let i = 0; i < wrappers.length && i < 4; i += 1) {
    const el = wrappers[i];
    if (el.tag === 'main' || el.tag === 'body' || el.tag === 'form') break;
    const inside = countFlat(flat.offsets, el.contentStart, el.contentEnd);
    if (inside > title.text + 80) break;
    at = el.end;
  }
  return at;
}

function countFlat(offsets: number[], from: number, to: number): number {
  let n = 0;
  for (let i = 0; i < offsets.length; i += 1) {
    if (offsets[i] >= to) break;
    if (offsets[i] >= from) n += 1;
  }
  return n;
}

/**
 * Returns the visitor's page with the rewrite in it, or null when there is no
 * place we can put it honestly. Null is a normal outcome, not an error: the
 * caller shows the text result and says why there is no rebuilt page.
 *
 * `descriptionInPage` is the crawler check's answer, passed in rather than
 * worked out again, so the rebuilt page and "What an AI crawler sees" can
 * never disagree: substituted only when the check found the description in
 * the page text, inserted only when it did not.
 */
export function buildRenderedPage(input: {
  html: string;
  pageUrl: string;
  description: string;
  rewrite: string;
  productName: string;
  descriptionInPage: boolean;
}): RenderedPage | null {
  const { html, pageUrl, description, rewrite, productName, descriptionInPage } = input;
  if (!html || !description || !rewrite) return null;

  let doc: string;
  try {
    doc = sanitizeDocument(html, pageUrl);
  } catch {
    return null;
  }
  if (doc.length > RENDER_MAX_CHARS) return null;

  const body = rewriteToHtml(rewrite);
  let out: string;
  let mode: RenderMode;

  if (descriptionInPage) {
    const found = locateDescriptionBlocks(doc, description);
    if (!found) return null;
    const splices: Splice[] = [
      {
        at: found.primary.contentStart,
        end: found.primary.contentEnd,
        text: `<div id="${MARKER_ID}" ${MARKER_ATTR}="1">${body}</div>`,
      },
      ...found.copies.map((el) => ({
        at: el.contentStart,
        end: el.contentEnd,
        text: `<div ${MARKER_ATTR}="1">${body}</div>`,
      })),
      ...openWrappers(doc, found.primary.contentStart, found.primary.start),
    ];
    out = applySplices(doc, splices);
    mode = 'substituted';
  } else {
    const at = titleEnd(doc, productName);
    if (at === null) return null;
    out = applySplices(doc, [
      {
        at,
        end: at,
        text: `<div id="${MARKER_ID}" ${MARKER_ATTR}="1" data-maubourg-mode="inserted" style="margin:1.25em 0;text-align:left;">${body}</div>`,
      },
      ...openWrappers(doc, at),
    ]);
    mode = 'inserted';
  }

  out = addHeadStyle(out, OPEN_CSS);
  return out.length > RENDER_MAX_CHARS ? null : { html: out, mode };
}

/* ------------------------------------------------------------------ */
/* Preview marking                                                     */
/* ------------------------------------------------------------------ */

/**
 * The visible ring and label that put the visitor's eye on what changed. It is
 * added when the page is served for preview and left out of the download,
 * because a green box labelled "new copy" printed into a file they may paste
 * into their own store is not something we want to ship them.
 */
export function withPreviewMarker(doc: string, label: string): string {
  const safe = label.replace(/["'\\<>]/g, '');
  const style = `<style>
[${MARKER_ATTR}]{position:relative!important;outline:2px solid #0F6B4F!important;outline-offset:8px!important;background:rgba(15,107,79,.05)!important;border-radius:2px;scroll-margin-top:120px;}
[${MARKER_ATTR}]::before{content:"${safe}";position:absolute;top:-30px;left:-2px;background:#0F6B4F;color:#F5F1E8;font:600 11px/1.6 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;padding:3px 10px;border-radius:999px;white-space:nowrap;z-index:2147483647;}
</style>`;

  if (/<\/head>/i.test(doc)) return doc.replace(/<\/head>/i, `${style}</head>`);
  if (/<\/body>/i.test(doc)) return doc.replace(/<\/body>/i, `${style}</body>`);
  return doc + style;
}
