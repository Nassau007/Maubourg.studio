// Product photos in the rebuilt page.
//
// The rebuilt page runs with every script removed, and most stores load their
// real photos from a script: the HTML carries a blurred or empty placeholder
// and the address of the real file in a data attribute, and a lazy loader swaps
// them as the visitor scrolls. Without the loader the visitor sees grey boxes
// or a blur, on the part of the demo that should look best.
//
// This does, once and statically, what the loader would have done. It only
// rewrites attributes of images (and of the elements that carry a background
// image in a data attribute), never fetches or inlines a file, and only ever
// moves an address the store itself wrote into the page, so every image still
// comes from the store's own CDN. It runs on the rebuilt page only: the
// analysis, the checks and the text the model reads never go through it.

/** Widest file we ask a Shopify-style CDN for when the page leaves it to a script. */
const DEFAULT_WIDTH = 1200;
const MAX_WIDTH = 2048;

/**
 * An opening tag, with quoted attribute values allowed to hold ">" but never
 * "<", so a stray quote cannot carry one match across the next tag (Patine
 * writes JSON with "d'écosse" in a single-quoted attribute). Where the quotes
 * do not balance, the plain "up to the next >" reading is used instead.
 */
const TAG_BODY = `(?:(?:[^>"'<]|"[^"<]*"|'[^'<]*')*|[^>]*)`;

type Attr = { name: string; value: string | null };
type Tag = { name: string; attrs: Attr[]; selfClose: boolean };

function parseTag(raw: string): Tag | null {
  const head = raw.match(/^<([a-zA-Z][\w-]*)/);
  if (!head) return null;
  const attrs: Attr[] = [];
  const re = /([^\s"'<>\/=]+)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  const body = raw.slice(head[0].length).replace(/\/?>$/, '');
  let m = re.exec(body);
  while (m) {
    let value: string | null = null;
    if (m[2] !== undefined) {
      if (m[3] !== undefined) value = m[3];
      else if (m[4] !== undefined) value = m[4].replace(/"/g, '&quot;');
      else value = (m[5] || '').replace(/"/g, '&quot;');
    }
    attrs.push({ name: m[1].toLowerCase(), value });
    m = re.exec(body);
  }
  return { name: head[1].toLowerCase(), attrs, selfClose: /\/>$/.test(raw) };
}

function serialize(tag: Tag): string {
  const attrs = tag.attrs
    .map((a) => (a.value === null ? ` ${a.name}` : ` ${a.name}="${a.value}"`))
    .join('');
  return `<${tag.name}${attrs}${tag.selfClose ? ' />' : '>'}`;
}

function get(tag: Tag, name: string): string | null {
  const a = tag.attrs.find((x) => x.name === name);
  return a ? a.value ?? '' : null;
}

function set(tag: Tag, name: string, value: string): void {
  const a = tag.attrs.find((x) => x.name === name);
  if (a) a.value = value;
  else tag.attrs.unshift({ name, value });
}

function remove(tag: Tag, name: string): void {
  tag.attrs = tag.attrs.filter((x) => x.name !== name);
}

/* ------------------------------------------------------------------ */
/* Addresses                                                           */
/* ------------------------------------------------------------------ */

/** A src that shows nothing on its own: the placeholder a lazy loader replaces. */
function isPlaceholder(src: string | null): boolean {
  if (!src) return true;
  const s = src.trim();
  if (!s) return true;
  if (/^data:/i.test(s)) return true;
  if (/(^|\/)(blank|placeholder|spacer|pixel|transparent)[.-]/i.test(s)) return true;
  return false;
}

/** An address we can hand to the browser as it is: not empty, not a placeholder, no template left. */
function usable(url: string | null): url is string {
  if (!url || isPlaceholder(url)) return false;
  return !/[{}]|%7B|%7D/i.test(url) && !/^\s*javascript:/i.test(url);
}

/** The width a loader would have asked for: the largest the theme lists, or a sensible default. */
function pickWidth(tag: Tag): number {
  const listed = (get(tag, 'data-widths') || '').match(/\d+/g);
  if (listed) {
    const widths = listed.map(Number).filter((w) => w > 0 && w <= MAX_WIDTH);
    if (widths.length) return Math.max(...widths);
  }
  return DEFAULT_WIDTH;
}

/** height / width from the tag's own width and height attributes, when it has both. */
function ratioOf(tag: Tag): number | null {
  const w = Number(get(tag, 'width'));
  const h = Number(get(tag, 'height'));
  if (w > 0 && h > 0) return h / w;
  const ar = Number(get(tag, 'data-aspectratio') || get(tag, 'data-aspect-ratio'));
  if (ar > 0) return 1 / ar;
  return null;
}

/**
 * Fills the {width} and {height} templates themes leave for their loader
 * (Rouje's data-src ends in "height={height}&...&width={width}"; older
 * Shopify themes write "_{width}x.jpg"). Without a known shape, the height
 * goes rather than being guessed: the CDN then keeps the photo's proportions.
 */
function fillTemplate(url: string, width: number, ratio: number | null): string {
  if (!/\{width\}|%7Bwidth%7D|\{height\}|%7Bheight%7D/i.test(url)) return url;
  let out = url.replace(/\{width\}|%7Bwidth%7D/gi, String(width));
  if (ratio) {
    out = out.replace(/\{height\}|%7Bheight%7D/gi, String(Math.round(width * ratio)));
  } else {
    out = out
      .replace(/([?&]|&amp;)height=(?:\{height\}|%7Bheight%7D)(&amp;|&)?/gi, (_m, pre: string, post?: string) =>
        post ? pre : '',
      )
      .replace(/x(?:\{height\}|%7Bheight%7D)/gi, 'x');
  }
  return out;
}

/**
 * A Shopify file asked for at a few pixels wide ("width=3", "_16x"). Only
 * worth enlarging when the tag says it is drawn much larger, so an icon or a
 * flag that really is 50 pixels wide keeps its size.
 */
function enlargeTinyShopify(url: string, tag: Tag): string {
  if (!/\/cdn\/shop\/|cdn\.shopify\.com/i.test(url)) return url;
  const drawn = Number(get(tag, 'width'));
  if (!(drawn >= 200)) return url;
  const target = Math.min(drawn, DEFAULT_WIDTH);
  const ratio = ratioOf(tag);
  const q = url.match(/([?&]|&amp;)width=(\d+)/i);
  if (q && Number(q[2]) <= 40) {
    let out = url.replace(/(([?&]|&amp;)width=)\d+/i, `$1${target}`);
    out = ratio
      ? out.replace(/(([?&]|&amp;)height=)\d+/i, `$1${Math.round(target * ratio)}`)
      : out.replace(/([?&]|&amp;)height=\d+(&amp;|&)?/i, (_m, pre: string, post?: string) => (post ? pre : ''));
    return out;
  }
  const f = url.match(/_(\d{1,2})x(\d{1,2})?(?=[._@])/);
  if (f) return url.replace(f[0], `_${target}x`);
  return url;
}

/* ------------------------------------------------------------------ */
/* Classes                                                             */
/* ------------------------------------------------------------------ */

/**
 * The class a loader adds once the photo is in. Themes key their fade-in and
 * blur-up styles on it (".lazyload{opacity:0}", ".blur-up.lazyloaded{filter:none}"),
 * so setting it lets the theme's own stylesheet show the photo, instead of a
 * blanket override that could also reveal a hover image meant to stay hidden.
 */
function markLoaded(tag: Tag, extra: string[] = []): void {
  const cls = get(tag, 'class');
  if (cls === null && !extra.length) return;
  const tokens = (cls || '').split(/\s+/).filter(Boolean);
  const out: string[] = [];
  for (let i = 0; i < tokens.length; i += 1) {
    const t = tokens[i];
    if (t === 'lazyload' || t === 'lazyloading') out.push('lazyloaded');
    else out.push(t);
  }
  for (let i = 0; i < extra.length; i += 1) out.push(extra[i]);
  const unique = out.filter((t, i) => out.indexOf(t) === i);
  if (unique.join(' ') !== tokens.join(' ')) set(tag, 'class', unique.join(' '));
}

/**
 * Classes an inline onload handler would have added to the image itself:
 * Jimmy Fairly's photos carry onload="this.classList.add('is-loaded')". The
 * handler is stripped with every other event attribute, so it is read here,
 * before that, and only when it targets the image and nothing else.
 */
function onloadClasses(tag: Tag): string[] {
  const handler = (get(tag, 'onload') || '').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"');
  const m = handler.match(/^\s*this\.classList\.add\(([^)]*)\)\s*;?\s*$/);
  if (!m) return [];
  const names = m[1].match(/['"]([\w-]+)['"]/g) || [];
  return names.map((n) => n.slice(1, -1));
}

/* ------------------------------------------------------------------ */
/* One tag                                                             */
/* ------------------------------------------------------------------ */

function repairImg(tag: Tag): void {
  const width = pickWidth(tag);
  const ratio = ratioOf(tag);
  const lazySrcRaw =
    get(tag, 'data-src') || get(tag, 'data-lazy-src') || get(tag, 'data-original') || get(tag, 'data-lazy');
  const lazySrc = lazySrcRaw ? fillTemplate(lazySrcRaw.trim(), width, ratio) : null;
  const lazySetRaw = get(tag, 'data-srcset') || get(tag, 'data-lazy-srcset');
  const lazySet = lazySetRaw ? fillTemplate(lazySetRaw.trim(), width, ratio) : null;

  // The address in data-src is, by the loader's contract, the photo it would
  // have shown, so it replaces whatever stands in for it in src.
  if (usable(lazySrc)) {
    set(tag, 'src', lazySrc);
  } else {
    const src = get(tag, 'src');
    if (src && !isPlaceholder(src)) {
      const fixed = enlargeTinyShopify(fillTemplate(src, width, ratio), tag);
      if (fixed !== src) set(tag, 'src', fixed);
    }
  }

  const srcset = get(tag, 'srcset');
  if (lazySet && usable(lazySet.split(/\s/)[0]) && !/data:/i.test(lazySet)) {
    set(tag, 'srcset', lazySet);
  } else if (srcset !== null) {
    if (isPlaceholder(srcset)) {
      // A data: srcset wins over src in the browser; with a real src beside
      // it, the srcset is the only thing hiding the photo.
      if (usable(get(tag, 'src'))) remove(tag, 'srcset');
    } else if (/\{width\}|%7Bwidth%7D/i.test(srcset)) {
      set(tag, 'srcset', fillTemplate(srcset, width, ratio));
    }
  }

  // "auto" sizes are worked out by the loader, or by the browser for lazy
  // images only. Left alone, the browser assumes the full screen width and
  // picks a large enough file, which is what a sharp photo needs.
  const dataSizes = get(tag, 'data-sizes');
  if (dataSizes && dataSizes.trim() !== 'auto' && get(tag, 'sizes') === null) set(tag, 'sizes', dataSizes);
  if ((get(tag, 'sizes') || '').trim().toLowerCase() === 'auto') remove(tag, 'sizes');

  if ((get(tag, 'loading') || '').toLowerCase() === 'lazy') set(tag, 'loading', 'eager');
  markLoaded(tag, onloadClasses(tag));
}

function repairSource(tag: Tag): void {
  const width = pickWidth(tag);
  const ratio = ratioOf(tag);
  const lazySetRaw = get(tag, 'data-srcset') || get(tag, 'data-lazy-srcset');
  const lazySet = lazySetRaw ? fillTemplate(lazySetRaw.trim(), width, ratio) : null;
  if (lazySet && usable(lazySet.split(/\s/)[0]) && !/data:/i.test(lazySet)) {
    set(tag, 'srcset', lazySet);
  } else {
    const srcset = get(tag, 'srcset');
    if (srcset && /\{width\}|%7Bwidth%7D/i.test(srcset)) set(tag, 'srcset', fillTemplate(srcset, width, ratio));
  }
  const dataSizes = get(tag, 'data-sizes');
  if (dataSizes && dataSizes.trim() !== 'auto' && get(tag, 'sizes') === null) set(tag, 'sizes', dataSizes);
  if ((get(tag, 'sizes') || '').trim().toLowerCase() === 'auto') remove(tag, 'sizes');
}

const BG_ATTRS = ['data-bg', 'data-bg-src', 'data-background-image', 'data-background', 'data-bgset'];

/**
 * The address a background loader would have used. data-bgset is a srcset
 * ("a.jpg 180w, b.jpg 360w") or lazysizes' media variant ("a.jpg [--sm] | b.jpg"):
 * the widest candidate is taken, since no script is left to pick by screen size.
 */
function backgroundUrl(tag: Tag): string | null {
  for (let i = 0; i < BG_ATTRS.length; i += 1) {
    const raw = get(tag, BG_ATTRS[i]);
    if (!raw || !raw.trim()) continue;
    let value = raw.trim();
    if (BG_ATTRS[i] === 'data-bgset') {
      const variant = value.split('|').pop() || '';
      const candidates = variant
        .replace(/\[[^\]]*\]/g, '')
        .split(/,\s+/)
        .map((c) => {
          const parts = c.trim().split(/\s+/);
          const w = Number((parts.slice(1).find((p) => /^\d+w$/.test(p)) || '0').replace('w', ''));
          return { url: parts[0], w };
        })
        .filter((c) => c.url);
      if (!candidates.length) continue;
      candidates.sort((a, b) => a.w - b.w);
      const fit = candidates.find((c) => c.w >= DEFAULT_WIDTH * 1.2);
      value = (fit || candidates[candidates.length - 1]).url;
    }
    value = value.replace(/^url\(\s*(['"]?)(.*?)\1\s*\)$/i, '$2').trim();
    value = fillTemplate(value, pickWidth(tag), null);
    // Kept to plain addresses, so nothing can break out of the url('') it is written into.
    if (!usable(value) || /['"()\\\s;<>]/.test(value)) continue;
    return value;
  }
  return null;
}

function repairBackground(tag: Tag): boolean {
  const url = backgroundUrl(tag);
  if (!url) return false;
  const style = get(tag, 'style') || '';
  if (/background(?:-image)?\s*:[^;]*url\(/i.test(style)) return false;
  const sep = style.trim() && !/;\s*$/.test(style) ? ';' : '';
  set(tag, 'style', `${style}${sep}background-image:url('${url}');`);
  markLoaded(tag);
  return true;
}

/* ------------------------------------------------------------------ */
/* <noscript> fallbacks                                                */
/* ------------------------------------------------------------------ */

/** True when an <img>, after repair, still has nothing to show. */
function isDead(img: Tag): boolean {
  const srcset = get(img, 'srcset');
  return !usable(get(img, 'src')) && (srcset === null || isPlaceholder(srcset));
}

const ONLY_IMAGES = new RegExp(`^\\s*(?:<(?:img|picture|source|/picture)\\b${TAG_BODY}>\\s*)+$`, 'i');

/**
 * Themes that load photos from a script often keep the real <img> in a
 * <noscript> next to the placeholder, for browsers without JavaScript. Every
 * <noscript> is dropped from the rebuilt page later, so the fallback is taken
 * here, and only where the placeholder beside it is still empty after repair:
 * a page whose photo was already fixed keeps one photo, not two.
 */
function useNoscriptFallbacks(doc: string): string {
  const re = /<noscript\b[^>]*>([\s\S]*?)<\/noscript\s*>/gi;
  const parts: string[] = [];
  let last = 0;
  let m = re.exec(doc);
  while (m) {
    const inner = m[1];
    if (ONLY_IMAGES.test(inner) && /<img\b/i.test(inner)) {
      const before = doc.slice(last, m.index);
      // Only the tail is searched: the placeholder sits right before its fallback.
      const prev = before.slice(-4000).match(new RegExp(`<img\\b${TAG_BODY}>\\s*$`, 'i'));
      const prevTag = prev ? parseTag(prev[0].trim()) : null;
      if (prev && prevTag && isDead(prevTag)) {
        // Already repaired with the rest of the document.
        const fallback = inner.trim();
        const fallbackImg = fallback.match(new RegExp(`<img\\b${TAG_BODY}>`, 'i'));
        const fbTag = fallbackImg ? parseTag(fallbackImg[0]) : null;
        if (fallbackImg && fbTag && !isDead(fbTag)) {
          // The placeholder's classes size and place the photo in the layout;
          // the fallback usually has none of its own.
          const placeholderClass = get(prevTag, 'class');
          let shown = fallback;
          if (placeholderClass && get(fbTag, 'class') === null) {
            set(fbTag, 'class', placeholderClass);
            markLoaded(fbTag);
            shown = fallback.replace(fallbackImg[0], serialize(fbTag));
          }
          parts.push(before.slice(0, before.length - prev[0].length), shown);
          last = m.index + m[0].length;
        }
      }
    }
    m = re.exec(doc);
  }
  if (!parts.length) return doc;
  parts.push(doc.slice(last));
  return parts.join('');
}

/* ------------------------------------------------------------------ */
/* The whole document                                                  */
/* ------------------------------------------------------------------ */

const ANY_TAG = new RegExp(`<([a-zA-Z][\\w-]*)\\b${TAG_BODY}>`, 'g');

function repairTags(html: string): string {
  return html.replace(ANY_TAG, (raw: string, name: string) => {
    const lower = name.toLowerCase();
    const isImg = lower === 'img';
    const isSource = lower === 'source';
    const hasBg = !isImg && !isSource && /\sdata-(?:bg|bgset|bg-src|background|background-image)\s*=/i.test(raw);
    if (!isImg && !isSource && !hasBg) return raw;
    // A stray quote elsewhere can make one "tag" swallow real markup; such a
    // match is left exactly as it was rather than rewritten.
    if (raw.indexOf('<', 1) !== -1) return raw;
    const tag = parseTag(raw);
    if (!tag) return raw;
    const before = serialize(tag);
    if (isImg) repairImg(tag);
    else if (isSource) repairSource(tag);
    else repairBackground(tag);
    const after = serialize(tag);
    return after === before ? raw : after;
  });
}

/**
 * Makes the page's own photos show without a script. Expects a document with
 * its scripts already removed but its event attributes and <noscript> blocks
 * still in place: the first are read for the class an onload handler adds,
 * the second for the fallback image they hold.
 */
export function repairImages(doc: string): string {
  return useNoscriptFallbacks(repairTags(doc));
}

/**
 * For the themes that hide a photo with CSS until their loader marks it done,
 * in a way the loaded class alone does not undo. Scoped to images a loader
 * owns, so a hover image a theme hides on purpose stays hidden.
 */
export const IMAGE_REPAIR_CSS = `
img[data-src],img[data-srcset],img.lazyload,img.lazyloading,img.lazyloaded,.lazyload,.lazyloading{opacity:1!important;visibility:visible!important;}
img.blur-up,img[class*="blur-up"],img[class*="lazy"][class*="blur"]{filter:none!important;}
`;
