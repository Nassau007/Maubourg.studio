// Text helpers shared by the extraction (fetchProduct.ts) and the page reading
// (signals.ts). They were in fetchProduct until the demo started reading more
// than a description off the page; two copies of an entity table is how the
// two halves drift.

const ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  eacute: 'é',
  egrave: 'è',
  ecirc: 'ê',
  agrave: 'à',
  ccedil: 'ç',
  ugrave: 'ù',
  ocirc: 'ô',
  icirc: 'î',
  laquo: '«',
  raquo: '»',
  hellip: '…',
  rsquo: '’',
  lsquo: '‘',
  ldquo: '“',
  rdquo: '”',
  ndash: '–',
  mdash: '—',
  euro: '€',
  deg: '°',
};

export function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[String(name).toLowerCase()] ?? m);
}

/** Strips tags and collapses whitespace. Scripts and styles go first. */
export function toPlainText(html: string): string {
  return decodeEntities(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|li|h[1-6])>/gi, '\n')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/[ \t ]+/g, ' ')
    .replace(/\s*\n\s*/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** One line, for a label or a heading. */
export function oneLine(html: string): string {
  return toPlainText(html).replace(/\s+/g, ' ').trim();
}

export function metaContent(html: string, property: string): string | null {
  const pattern = new RegExp(`<meta[^>]+(?:property|name)\\s*=\\s*["']${property}["'][^>]*>`, 'i');
  const tag = html.match(pattern)?.[0];
  if (!tag) return null;
  const content = tag.match(/content\s*=\s*["']([\s\S]*?)["']/i)?.[1];
  return content ? decodeEntities(content).trim() : null;
}

export function htmlLang(html: string): string | null {
  const tag = html.match(/<html[^>]*>/i)?.[0];
  const value = tag?.match(/\blang\s*=\s*["']([a-z]{2,3})(?:[-_][a-z0-9]+)?["']/i)?.[1];
  return value ? value.toLowerCase() : null;
}

/**
 * Walks a parsed JSON-LD value for the first node whose @type includes
 * "Product". Handles the three shapes seen in the wild: a bare object, an
 * array of nodes, and an @graph wrapper.
 */
export function findProductNode(value: unknown, depth = 0): Record<string, unknown> | null {
  if (depth > 6 || value === null || typeof value !== 'object') return null;

  if (Array.isArray(value)) {
    for (const item of value) {
      const hit = findProductNode(item, depth + 1);
      if (hit) return hit;
    }
    return null;
  }

  const node = value as Record<string, unknown>;
  const type = node['@type'];
  const types = Array.isArray(type) ? type : [type];
  if (types.some((t) => typeof t === 'string' && /product/i.test(t))) return node;

  // Deliberately not walking itemListElement: a homepage carousel publishes
  // Product nodes for products it merely links to, and rewriting one of those
  // would answer a URL the visitor never submitted.
  for (const key of ['@graph', 'mainEntity']) {
    const hit = findProductNode(node[key], depth + 1);
    if (hit) return hit;
  }
  return null;
}

/** The first JSON-LD Product node in the document, parsed. */
export function productJsonLd(html: string): Record<string, unknown> | null {
  const blocks = html.match(
    /<script[^>]+type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  );
  if (!blocks) return null;

  for (const block of blocks) {
    const json = block.replace(/^[\s\S]*?>/, '').replace(/<\/script>$/i, '');
    let parsed: unknown;
    try {
      parsed = JSON.parse(json.trim());
    } catch {
      continue;
    }
    const product = findProductNode(parsed);
    if (product) return product;
  }
  return null;
}
