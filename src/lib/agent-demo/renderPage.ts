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
// 2. SUBSTITUTION. Only into the element the description was read from, and
//    only when dom.ts is sure which element that is. Everywhere else the
//    function returns null and the demo falls back to the text result. A wrong
//    render of someone's own store is worse than no render.

import { escapeHtml } from '@/lib/email';
import { RENDER_MAX_CHARS } from './config';
import { locateDescription, replaceInner } from './dom';

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
 * themes that hide the placeholder with CSS until their loader marks it done.
 */
const REPAIR_CSS = `
img[data-src],img.lazyload,img.lazyloading,img.lazyloaded,.lazyload,.lazyloading{opacity:1!important;visibility:visible!important;}
html.no-js body,body{visibility:visible!important;}
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

/**
 * Returns the visitor's page with the rewrite in it, or null when we could not
 * be certain where the description lived. Null is a normal outcome, not an
 * error: the caller shows the text result and says the preview is unavailable.
 */
export function buildRenderedPage(input: {
  html: string;
  pageUrl: string;
  description: string;
  rewrite: string;
}): string | null {
  const { html, pageUrl, description, rewrite } = input;
  if (!html || !description || !rewrite) return null;

  let doc: string;
  try {
    doc = sanitizeDocument(html, pageUrl);
  } catch {
    return null;
  }
  if (doc.length > RENDER_MAX_CHARS) return null;

  const target = locateDescription(doc, description);
  if (!target) return null;

  const inner = `<div id="${MARKER_ID}" ${MARKER_ATTR}="1">${rewriteToHtml(rewrite)}</div>`;
  const out = replaceInner(doc, target, inner);
  return out.length > RENDER_MAX_CHARS ? null : out;
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
