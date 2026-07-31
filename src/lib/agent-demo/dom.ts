// A very small HTML scanner, written because this repo has no HTML parser and
// one feature does not justify adding one.
//
// It answers exactly one question: WHERE in the document did the description we
// extracted come from. That location is what lets the demo hand back the
// visitor's own page with new copy inside it instead of a text block they have
// to imagine in place.
//
// Everything here is deliberately conservative. When the answer is not certain
// the functions return null and the caller falls back to the text-only result:
// a wrong substitution renders someone's own store badly, which is worse than
// no render at all.

/* ------------------------------------------------------------------ */
/* Element scan                                                        */
/* ------------------------------------------------------------------ */

export type ElementRange = {
  tag: string;
  /** Index of the opening '<'. */
  start: number;
  /** Index just after the opening tag's '>'. */
  contentStart: number;
  /** Index of the closing tag's '<'. */
  contentEnd: number;
  /** Index just after the closing tag's '>'. */
  end: number;
};

const VOID_TAGS =
  'area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr'.split(',');

/** Elements whose contents are not markup, or are markup we never enter. */
const OPAQUE_TAGS = 'script,style,template,textarea,noscript,svg,math,iframe'.split(',');

/** Tags we record ranges for: the ones a description block is ever made of. */
const RECORDED_TAGS =
  'div,section,article,p,span,td,dd,li,aside,details,figure,blockquote,main'.split(',');

/** Tags that must never be treated as the description block. */
const NEVER_TAGS = 'html,head,body,main,form,header,footer,nav'.split(',');

function has(list: string[], tag: string): boolean {
  return list.indexOf(tag) !== -1;
}

/** Which open tag an opening tag implicitly closes (no DOM, so this is by hand). */
const AUTO_CLOSE: Record<string, string[]> = {
  p: ['p'],
  li: ['li'],
  dt: ['dt', 'dd'],
  dd: ['dt', 'dd'],
  td: ['td', 'th'],
  th: ['td', 'th'],
  tr: ['tr', 'td', 'th'],
  option: ['option'],
};

// Attribute values are matched explicitly so a '>' inside one does not end the
// tag. Themes put inline styles and JSON in attributes constantly.
const TAG_RE = /<(\/?)([a-zA-Z][a-zA-Z0-9:-]*)((?:"[^"]*"|'[^']*'|[^'">])*)>/g;

/**
 * Walks the document once and returns the ranges of every element we might
 * want to replace. Unclosed and mismatched tags are dropped rather than
 * guessed at: a range we are not sure about is a range we will not edit.
 */
export function scanElements(html: string): ElementRange[] {
  const out: ElementRange[] = [];
  const stack: { tag: string; start: number; contentStart: number }[] = [];

  TAG_RE.lastIndex = 0;
  let match = TAG_RE.exec(html);

  while (match) {
    const closing = match[1] === '/';
    const tag = match[2].toLowerCase();
    const attrs = match[3] || '';
    const tagStart = match.index;
    const tagEnd = TAG_RE.lastIndex;

    if (!closing && has(OPAQUE_TAGS, tag)) {
      // Skip the whole element, contents included.
      const closeAt = html.toLowerCase().indexOf(`</${tag}`, tagEnd);
      if (closeAt === -1) break;
      const closeEnd = html.indexOf('>', closeAt);
      TAG_RE.lastIndex = closeEnd === -1 ? html.length : closeEnd + 1;
      match = TAG_RE.exec(html);
      continue;
    }

    if (!closing && !has(VOID_TAGS, tag) && !/\/\s*$/.test(attrs)) {
      const autoCloses = AUTO_CLOSE[tag];
      if (autoCloses && stack.length && has(autoCloses, stack[stack.length - 1].tag)) {
        const open = stack.pop();
        if (open && has(RECORDED_TAGS, open.tag)) {
          out.push({
            tag: open.tag,
            start: open.start,
            contentStart: open.contentStart,
            contentEnd: tagStart,
            end: tagStart,
          });
        }
      }
      stack.push({ tag, start: tagStart, contentStart: tagEnd });
    } else if (closing) {
      let depth = -1;
      for (let i = stack.length - 1; i >= 0; i -= 1) {
        if (stack[i].tag === tag) {
          depth = i;
          break;
        }
      }
      if (depth !== -1) {
        // Anything above the match was left unclosed by the page: discard it.
        const open = stack[depth];
        stack.length = depth;
        if (has(RECORDED_TAGS, open.tag)) {
          out.push({
            tag: open.tag,
            start: open.start,
            contentStart: open.contentStart,
            contentEnd: tagStart,
            end: tagEnd,
          });
        }
      }
    }

    match = TAG_RE.exec(html);
  }

  return out;
}

/* ------------------------------------------------------------------ */
/* Flattened text, with a map back into the document                   */
/* ------------------------------------------------------------------ */

export type FlatText = {
  /** Lowercase ASCII letters and digits only. */
  text: string;
  /** offsets[i] is the index in the source document of text[i]. */
  offsets: number[];
};

/**
 * Reduces a document to comparable characters, keeping a pointer back into the
 * source for each one.
 *
 * Only ASCII letters and digits survive, and character entities are dropped
 * whole. That is on purpose: the description may have arrived from a store's
 * JSON endpoint with real accented characters while the page writes them as
 * entities, and "cr&egrave;me" against "crème" must not be a mismatch. Both
 * sides reduce to "crme".
 */
export function flatten(html: string): FlatText {
  const offsets: number[] = [];
  const chars: string[] = [];
  const lower = html.toLowerCase();
  let i = 0;

  while (i < html.length) {
    const c = html.charCodeAt(i);

    if (c === 60 /* < */) {
      if (lower.startsWith('<!--', i)) {
        const close = lower.indexOf('-->', i);
        i = close === -1 ? html.length : close + 3;
        continue;
      }
      const name = lower.slice(i + 1, i + 12).match(/^\/?([a-z][a-z0-9:-]*)/);
      const tagName = name ? name[1] : '';
      const close = html.indexOf('>', i);
      const afterTag = close === -1 ? html.length : close + 1;
      if (tagName && has(OPAQUE_TAGS, tagName) && lower[i + 1] !== '/') {
        const endAt = lower.indexOf(`</${tagName}`, afterTag);
        if (endAt === -1) {
          i = html.length;
        } else {
          const endClose = html.indexOf('>', endAt);
          i = endClose === -1 ? html.length : endClose + 1;
        }
        continue;
      }
      i = afterTag;
      continue;
    }

    if (c === 38 /* & */) {
      const semi = html.indexOf(';', i);
      if (semi !== -1 && semi - i <= 12) {
        i = semi + 1;
        continue;
      }
      i += 1;
      continue;
    }

    if ((c >= 97 && c <= 122) || (c >= 48 && c <= 57)) {
      chars.push(html[i]);
      offsets.push(i);
    } else if (c >= 65 && c <= 90) {
      chars.push(String.fromCharCode(c + 32));
      offsets.push(i);
    }
    i += 1;
  }

  return { text: chars.join(''), offsets };
}

/** Same reduction, for a string that is already plain text. */
export function flattenText(text: string): string {
  return text.replace(/&[a-z0-9#]{1,10};/gi, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

/* ------------------------------------------------------------------ */
/* Locating the description                                            */
/* ------------------------------------------------------------------ */

/**
 * Whether an opening tag says this element is not on screen.
 *
 * This test earns its place. Friendly Frenchy's theme keeps a second copy of
 * the description in `<div class="dfc_description_section hidden">` and paints
 * the visible one with JavaScript. The first copy in the document is the
 * hidden one, so the substitution landed somewhere the visitor would never
 * look and the page came back apparently unchanged - the worst failure of the
 * three, because it looks like it worked.
 *
 * Deliberately narrow: exact class tokens, the hidden attribute, and inline
 * display/visibility. A loose test would reject responsive helpers like
 * hidden-sm and cost renders on pages that were perfectly fine.
 */
const HIDDEN_CLASSES = 'hidden,is-hidden,d-none,sr-only,visually-hidden,screen-reader-text'.split(
  ',',
);

function isHiddenTag(openTag: string): boolean {
  if (/\shidden(\s|>|=\s*["']?(?:hidden|true)["']?)/i.test(openTag)) return true;
  if (/aria-hidden\s*=\s*["']?true/i.test(openTag)) return true;
  if (/style\s*=\s*("[^"]*"|'[^']*')/i.test(openTag)) {
    const style = openTag.match(/style\s*=\s*("([^"]*)"|'([^']*)')/i);
    const value = style ? (style[2] ?? style[3] ?? '') : '';
    if (/display\s*:\s*none|visibility\s*:\s*hidden/i.test(value)) return true;
  }
  const cls = openTag.match(/\bclass\s*=\s*("([^"]*)"|'([^']*)')/i);
  const tokens = (cls ? (cls[2] ?? cls[3] ?? '') : '').toLowerCase().split(/\s+/);
  for (let i = 0; i < tokens.length; i += 1) {
    if (tokens[i] && has(HIDDEN_CLASSES, tokens[i])) return true;
  }
  return false;
}

/**
 * Finds the element the given description text was taken from.
 *
 * Three conditions have to hold before it returns anything: the description's
 * characters must be found in the document in one run, the element holding
 * them must be roughly the size of the description, and neither it nor
 * anything wrapping it may be hidden. The size test is what stops it returning
 * <body> on a page whose whole content is one long block; the hidden test is
 * what stops it editing a copy nobody sees.
 */
export function locateDescription(html: string, description: string): ElementRange | null {
  const needle = flattenText(description);
  if (needle.length < 80) return null;

  const flat = flatten(html);
  if (!flat.text) return null;

  // Probes at three depths: the opening of a description is sometimes a
  // heading the store renders elsewhere, or a lead-in the extraction kept and
  // the theme does not print.
  const probes: { text: string; offset: number }[] = [
    { text: needle.slice(0, 80), offset: 0 },
    { text: needle.slice(60, 140), offset: 60 },
    { text: needle.slice(150, 230), offset: 150 },
  ];

  const elements = scanElements(html);

  for (let p = 0; p < probes.length; p += 1) {
    const probe = probes[p];
    if (probe.text.length < 60) continue;

    // Every occurrence, not just the first: a theme that duplicates the
    // description puts the hidden copy first about half the time.
    let from = 0;
    for (let n = 0; n < 5; n += 1) {
      const start = flat.text.indexOf(probe.text, from);
      if (start === -1) break;
      from = start + 1;

      const hit = elementFor(html, flat, elements, needle, start, probe.offset);
      if (hit) return hit;
    }
  }

  return null;
}

function elementFor(
  html: string,
  flat: FlatText,
  elements: ElementRange[],
  needle: string,
  start: number,
  probeOffset: number,
): ElementRange | null {
  // How far the two strings agree from the probe onward.
  let common = 0;
  while (
    start + common < flat.text.length &&
    probeOffset + common < needle.length &&
    flat.text.charAt(start + common) === needle.charAt(probeOffset + common)
  ) {
    common += 1;
  }

  // If the page interleaves something the extraction did not have, resync on
  // the tail rather than giving up on the whole block.
  let matched = common;
  const tail = needle.slice(-60);
  if (tail.length === 60) {
    const tailAt = flat.text.indexOf(tail, start + common);
    if (tailAt !== -1) {
      const span = tailAt + 60 - start;
      if (span <= (needle.length - probeOffset) * 1.6 + 400) matched = Math.max(matched, span);
    }
  }

  const wanted = needle.length - probeOffset;
  if (matched < Math.max(120, wanted * 0.45)) return null;

  const htmlStart = flat.offsets[start];
  const htmlEnd = flat.offsets[start + matched - 1] + 1;

  let best: ElementRange | null = null;
  for (let i = 0; i < elements.length; i += 1) {
    const el = elements[i];
    if (has(NEVER_TAGS, el.tag)) continue;
    if (el.contentStart > htmlStart || el.contentEnd < htmlEnd) continue;
    // Anything wrapping the match that is hidden disqualifies the match
    // outright: a bigger visible ancestor would only mean editing the hidden
    // copy from further out.
    if (isHiddenTag(html.slice(el.start, el.contentStart))) return null;
    if (!best || el.contentEnd - el.contentStart < best.contentEnd - best.contentStart) best = el;
  }
  if (!best) return null;

  // The element must be about the size of the description. Too big and we are
  // holding a page wrapper; too small and the match was a coincidence.
  const inside = countBetween(flat.offsets, best.contentStart, best.contentEnd);
  if (inside > needle.length * 2 + 500) return null;
  if (inside < matched * 0.8) return null;

  return best;
}

/** Number of flattened characters whose source index falls inside [from, to). */
function countBetween(offsets: number[], from: number, to: number): number {
  return upperBound(offsets, to) - lowerBound(offsets, from);
}

function lowerBound(arr: number[], value: number): number {
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] < value) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

function upperBound(arr: number[], value: number): number {
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] <= value) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

/** Swaps an element's contents, leaving the element and its classes in place. */
export function replaceInner(html: string, el: ElementRange, inner: string): string {
  return html.slice(0, el.contentStart) + inner + html.slice(el.contentEnd);
}

/** The source of one element, opening and closing tags included. */
export function outerHtml(html: string, el: ElementRange): string {
  return html.slice(el.start, el.end);
}
