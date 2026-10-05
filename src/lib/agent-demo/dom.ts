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
/* Hidden blocks                                                       */
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

/* ------------------------------------------------------------------ */
/* What wraps a block                                                  */
/* ------------------------------------------------------------------ */

export type OpenTag = {
  tag: string;
  /** Index of the opening '<'. */
  start: number;
  /** Index just after the opening tag's '>'. */
  openEnd: number;
};

/**
 * The elements open at `pos`, outermost first, every tag name included.
 *
 * scanElements only records the tags a description block is made of. The
 * wrappers that decide whether a block is on screen are often something else:
 * <details>, or a theme's own <accordion-item> or <x-drawer>. Same tokenizer
 * and the same closing rules, stopped at `pos`.
 */
export function ancestorsAt(html: string, pos: number): OpenTag[] {
  const stack: OpenTag[] = [];
  const lower = html.toLowerCase();
  const re = new RegExp(TAG_RE.source, 'g');
  let match = re.exec(html);

  while (match && match.index < pos) {
    const closing = match[1] === '/';
    const tag = match[2].toLowerCase();
    const attrs = match[3] || '';

    if (!closing && has(OPAQUE_TAGS, tag)) {
      const closeAt = lower.indexOf(`</${tag}`, re.lastIndex);
      if (closeAt === -1) break;
      const closeEnd = html.indexOf('>', closeAt);
      re.lastIndex = closeEnd === -1 ? html.length : closeEnd + 1;
      match = re.exec(html);
      continue;
    }

    if (!closing && !has(VOID_TAGS, tag) && !/\/\s*$/.test(attrs)) {
      const autoCloses = AUTO_CLOSE[tag];
      if (autoCloses && stack.length && has(autoCloses, stack[stack.length - 1].tag)) stack.pop();
      stack.push({ tag, start: match.index, openEnd: re.lastIndex });
    } else if (closing) {
      for (let i = stack.length - 1; i >= 0; i -= 1) {
        if (stack[i].tag === tag) {
          stack.length = i;
          break;
        }
      }
    }
    match = re.exec(html);
  }

  return stack;
}

/** class, id and role of an opening tag, plus the framework attributes that toggle display. */
function signature(openTag: string): string {
  const out: string[] = [];
  const re = /\b(class|id|role)\s*=\s*("([^"]*)"|'([^']*)')/gi;
  let m = re.exec(openTag);
  while (m) {
    out.push(m[3] ?? m[4] ?? '');
    m = re.exec(openTag);
  }
  // x-show and x-collapse sit on the panel itself. x-cloak does not count: it
  // goes on whole components, Jimmy Fairly's entire product column included.
  if (/\s(?:x-show|x-collapse|v-show)\b/i.test(openTag)) out.push('x-collapse');
  return out.join(' ');
}

/**
 * A wrapper that a visitor opens with a click: an accordion, a tab, a
 * "read more". Themes close these with CSS (display, height, a hidden class)
 * that a page without its JavaScript can never undo, which is why the old
 * rebuilt pages put the new copy in place and still showed nothing.
 *
 * Judged token by token, and only on tokens that name the panel's content:
 * "accordion-content" or "product-tabs__tab-item-content" qualify, a
 * "product-collapsible-sections" container does not. A loose match forced a
 * whole product column open on Jimmy Fairly and wrecked the layout.
 */
const PANEL_TOKEN_RE =
  /(?:^|[-_:])(?:accordion|collapsible|collapse|disclosure|toggle|tabs?|faq|expand(?:able)?|read-?more)(?:[-_]+(?:item|content|panel|pane|body|inner|text|answer|details?))*$/i;
const PANEL_WORDS = ['panel', 'tabpanel', 'answer', 'collapse', 'collapsed', 'x-collapse'];

function isPanelSignature(sig: string): boolean {
  if (/(?:^|\s)(?:group-open|peer-checked):/i.test(sig)) return true;
  const tokens = sig.toLowerCase().split(/\s+/);
  for (let i = 0; i < tokens.length; i += 1) {
    const t = tokens[i];
    if (!t) continue;
    if (has(PANEL_WORDS, t) || PANEL_TOKEN_RE.test(t)) return true;
  }
  return false;
}

/** A wrapper that floats over the page when opened: drawer, modal, popup. */
const OVERLAY_RE = /drawer|modal|popup|popover|off-?canvas|lightbox|dialog|flyout/i;

/** A copy shown at one screen width only: the mobile or desktop twin of the same block. */
const RESPONSIVE_HIDE_RE =
  /(?:^|\s)[a-z]{2,8}:(?:tw-)?hidden(?:\s|$)|(?:^|\s)[a-z0-9-]*(?:hide|hidden)-(?:on-)?(?:sm|md|lg|xl|small|medium|large|desktop|tablet|mobile|for)\b|(?:^|\s)(?:small|medium|large|mobile|desktop|tablet)[a-z-]*--?hid(?:e|den)\b|(?:^|[\s_-])(?:mobile|desktop|tablet)(?:-only)?(?:\s|$)/i;

/**
 * Hidden by an inline display:none and nothing else. That is what jQuery's
 * slideToggle and Vue's v-show leave on a closed panel, and it is how Joone
 * and Typology close their accordions. A hidden class or the hidden attribute
 * still means hidden for good.
 */
function closedByInlineStyle(openTag: string): boolean {
  const style = openTag.match(/style\s*=\s*("([^"]*)"|'([^']*)')/i);
  const value = style ? (style[2] ?? style[3] ?? '') : '';
  if (!/display\s*:\s*none/i.test(value)) return false;
  const withoutStyle = openTag.replace(/style\s*=\s*("[^"]*"|'[^']*')/i, '');
  return !isHiddenTag(withoutStyle);
}

export function isPanelTag(tag: string, openTag: string): boolean {
  return tag === 'details' || isPanelSignature(signature(openTag)) || closedByInlineStyle(openTag);
}

/**
 * How much a block can be trusted to be seen, from what wraps it. 0 means
 * never use it. A block inside a closed panel is still usable, because the
 * rebuilt page opens the panel; one inside a drawer or a modal is the last
 * choice, since opening it puts an overlay on the page.
 *
 * Hidden outright, and not a panel, is a refusal. That is the Friendly
 * Frenchy case: a second copy kept in a hidden div for a script to move, which
 * the visitor never sees in that place.
 */
export function visibilityWeight(html: string, pos: number): number {
  const chain = ancestorsAt(html, pos);
  let weight = 1;
  for (let i = 0; i < chain.length; i += 1) {
    const a = chain[i];
    if (a.tag === 'html' || a.tag === 'body') continue;
    const open = html.slice(a.start, a.openEnd);
    const sig = signature(open);
    const panel = isPanelTag(a.tag, open);
    if (isHiddenTag(open) && !panel) return 0;
    if (OVERLAY_RE.test(sig) || a.tag === 'dialog') weight = Math.min(weight, 0.4);
    else if (panel) weight = Math.min(weight, 0.8);
    if (RESPONSIVE_HIDE_RE.test(sig)) weight *= 0.6;
  }
  return weight;
}

/* ------------------------------------------------------------------ */
/* Locating the description                                            */
/* ------------------------------------------------------------------ */

export type DescriptionBlocks = {
  /** The block the new copy goes into, and that the preview points at. */
  primary: ElementRange;
  /**
   * Other copies of the same text: the mobile and desktop twins many themes
   * print. They get the new copy too, so whichever one the screen shows is
   * the new one.
   */
  copies: ElementRange[];
};

type Candidate = { el: ElementRange; covered: number; inside: number; pids: number[] };

/**
 * Finds every element the given description text was taken from.
 *
 * Two ways of matching, and both feed the same choice.
 *
 * 1. The description in one run, as before: right for a theme that prints the
 *    product's description field as one block.
 * 2. Paragraph by paragraph. Descriptions are often printed as several blocks
 *    (an intro under the title, then accordion or tab panels), and some
 *    extractions carry text the page interleaves with headings. Each paragraph
 *    must be found whole, so a match is never a coincidence of a few words.
 *
 * An element only qualifies if most of what it holds is description text: that
 * is what stops it returning a page wrapper. Among those, the one holding the
 * most of the description wins, discounted when it sits in a closed panel,
 * a drawer or a one-screen-size copy. A block hidden outright never wins.
 */
export function locateDescriptionBlocks(
  html: string,
  description: string,
): DescriptionBlocks | null {
  const needle = flattenText(description);
  if (needle.length < 40) return null;

  const flat = flatten(html);
  if (!flat.text) return null;

  const elements = scanElements(html);
  const bodyAt = Math.max(0, html.search(/<body\b/i));
  const flatBody = lowerBound(flat.offsets, bodyAt);

  // Paragraph hits, in document positions. Distinct paragraphs only: an
  // extraction that read a mobile and a desktop copy carries each twice.
  const paras: string[] = [];
  description
    .split(/\n+/)
    .map((p) => flattenText(p))
    .forEach((p) => {
      if (p.length >= 20 && paras.indexOf(p) === -1) paras.push(p);
    });

  const hits: { pid: number; s: number; e: number }[] = [];
  for (let pid = 0; pid < paras.length; pid += 1) {
    let from = flatBody;
    for (let n = 0; n < 6; n += 1) {
      const at = flat.text.indexOf(paras[pid], from);
      if (at === -1) break;
      from = at + 1;
      hits.push({ pid, s: flat.offsets[at], e: flat.offsets[at + paras[pid].length - 1] + 1 });
    }
  }

  // A paragraph inside something hidden outright does not count towards any
  // block. Typology keeps closed accordion panels at display:none; counting
  // their text let a whole accordion item, heading included, pass for the
  // description block.
  const hiddenEls = elements.filter((el) => {
    const open = html.slice(el.start, el.contentStart);
    return isHiddenTag(open) && !isPanelTag(el.tag, open);
  });
  for (let i = hits.length - 1; i >= 0; i -= 1) {
    const h = hits[i];
    if (hiddenEls.some((el) => el.contentStart <= h.s && h.e <= el.contentEnd)) hits.splice(i, 1);
  }

  // The share a block must hold is a share of the description the page
  // actually shows, not of the extraction: Typology's product JSON carries
  // more than its page prints.
  const shown: number[] = [];
  hits.forEach((h) => {
    if (shown.indexOf(h.pid) === -1) shown.push(h.pid);
  });
  const total = shown.reduce((n, pid) => n + paras[pid].length, 0);

  const pidsIn = (el: ElementRange): number[] => {
    const out: number[] = [];
    for (let i = 0; i < hits.length; i += 1) {
      const h = hits[i];
      if (h.s >= el.contentStart && h.e <= el.contentEnd && out.indexOf(h.pid) === -1) {
        out.push(h.pid);
      }
    }
    return out;
  };
  const lengthOf = (pids: number[]) => pids.reduce((n, pid) => n + paras[pid].length, 0);

  const pool: Candidate[] = [];

  // 1. One run.
  if (needle.length >= 80) {
    const probes: { text: string; offset: number }[] = [
      { text: needle.slice(0, 80), offset: 0 },
      { text: needle.slice(60, 140), offset: 60 },
      { text: needle.slice(150, 230), offset: 150 },
    ];
    for (let p = 0; p < probes.length; p += 1) {
      const probe = probes[p];
      if (probe.text.length < 60) continue;
      let from = flatBody;
      for (let n = 0; n < 5; n += 1) {
        const start = flat.text.indexOf(probe.text, from);
        if (start === -1) break;
        from = start + 1;
        const found = elementFor(flat, elements, needle, start, probe.offset);
        if (!found) continue;
        const pids = pidsIn(found.el);
        pool.push({
          el: found.el,
          covered: Math.max(found.matched, lengthOf(pids)),
          inside: countBetween(flat.offsets, found.el.contentStart, found.el.contentEnd),
          pids,
        });
      }
    }
  }

  // 2. Paragraph by paragraph.
  if (hits.length) {
    const floor = Math.max(60, total * 0.2);
    for (let i = 0; i < elements.length; i += 1) {
      const el = elements[i];
      if (has(NEVER_TAGS, el.tag) || el.contentStart < bodyAt) continue;
      const pids = pidsIn(el);
      if (!pids.length) continue;
      const covered = lengthOf(pids);
      if (covered < floor) continue;
      const inside = countBetween(flat.offsets, el.contentStart, el.contentEnd);
      if (inside > covered * 1.6 + 250) continue;
      pool.push({ el, covered, inside, pids });
    }
  }

  if (!pool.length) return null;

  // Best first, then nothing that overlaps a block already kept: a wrapper
  // around two twins covers no more than one twin does, so the twins win.
  pool.sort((a, b) => b.covered - a.covered || a.inside - b.inside);
  const kept: (Candidate & { score: number })[] = [];
  for (let i = 0; i < pool.length && kept.length < 8; i += 1) {
    const c = pool[i];
    const overlaps = kept.some(
      (k) => c.el.start < k.el.end && k.el.start < c.el.end,
    );
    if (overlaps) continue;
    const weight = visibilityWeight(html, c.el.contentStart);
    if (weight === 0) continue;
    kept.push({ ...c, score: c.covered * weight });
  }
  if (!kept.length) return null;

  let best = kept[0];
  for (let i = 1; i < kept.length; i += 1) if (kept[i].score > best.score) best = kept[i];

  // Twins: blocks holding the same paragraphs as the primary, nothing else.
  const copies = kept
    .filter((k) => k !== best && k.pids.length > 0)
    .filter((k) => lengthOf(k.pids.filter((pid) => best.pids.indexOf(pid) !== -1)) >= k.covered * 0.8)
    .map((k) => k.el);

  return { primary: best.el, copies };
}

/**
 * The block the description was read from, or null. Kept for signals.ts,
 * which only needs the one block to read the page's own wording from.
 */
export function locateDescription(html: string, description: string): ElementRange | null {
  const found = locateDescriptionBlocks(html, description);
  return found ? found.primary : null;
}

function elementFor(
  flat: FlatText,
  elements: ElementRange[],
  needle: string,
  start: number,
  probeOffset: number,
): { el: ElementRange; matched: number } | null {
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

  // The smallest element holding the whole match. Whether it is on screen is
  // judged afterwards, from everything that wraps it, by visibilityWeight.
  let best: ElementRange | null = null;
  for (let i = 0; i < elements.length; i += 1) {
    const el = elements[i];
    if (has(NEVER_TAGS, el.tag)) continue;
    if (el.contentStart > htmlStart || el.contentEnd < htmlEnd) continue;
    if (!best || el.contentEnd - el.contentStart < best.contentEnd - best.contentStart) best = el;
  }
  if (!best) return null;

  // The element must be about the size of the description. Too big and we are
  // holding a page wrapper; too small and the match was a coincidence.
  const inside = countBetween(flat.offsets, best.contentStart, best.contentEnd);
  if (inside > needle.length * 2 + 500) return null;
  if (inside < matched * 0.8) return null;

  return { el: best, matched };
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

/** The source of one element, opening and closing tags included. */
export function outerHtml(html: string, el: ElementRange): string {
  return html.slice(el.start, el.end);
}
