// A deliberately small markdown reader for the answers section.
//
// Why not a markdown library. Two reasons. The templates need the article
// *split by its `##` headings* before anything is rendered, because layout C
// turns each section into one accordion row, and a library that hands back a
// finished HTML string cannot be cut up again without parsing it a second
// time. And the source files are machine-written to one fixed shape: `#` once,
// `##` sections, paragraphs, bold, italic, cross-links, bullets, numbered
// lists and pipe tables. Nothing else appears in the eighty of them.
//
// So this covers exactly that shape and nothing more. Anything it does not
// recognise falls through as plain text rather than disappearing, which is the
// failure mode you want in a renderer nobody watches.

export type Inline =
  | { kind: 'text'; text: string }
  | { kind: 'strong'; text: string }
  | { kind: 'em'; text: string }
  | { kind: 'link'; text: string; href: string };

export type Block =
  | { kind: 'p'; content: Inline[] }
  | { kind: 'ul'; items: Inline[][] }
  | { kind: 'ol'; items: Inline[][] }
  | { kind: 'table'; head: Inline[][]; rows: Inline[][][] };

export type Section = { heading: string; blocks: Block[] };

/**
 * Resolves a link target found in the markdown to a real site href.
 *
 * The source files cross-link each other by filename (`24_Fideliser.md`),
 * which means nothing to a browser. Returning null drops the link and keeps
 * its text, so an article that points at one we have not published yet reads
 * as a plain sentence instead of a 404.
 */
export type LinkResolver = (target: string) => string | null;

const INLINE_RE = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|_([^_\n]+)_/g;

function parseInline(text: string, resolve?: LinkResolver): Inline[] {
  const out: Inline[] = [];
  let last = 0;

  // exec in a loop rather than matchAll: the project's tsconfig sets no
  // target, so it compiles to ES5 and cannot iterate the returned iterator.
  const re = new RegExp(INLINE_RE.source, 'g');
  let match: RegExpExecArray | null;
  while ((match = re.exec(text)) !== null) {
    const at = match.index;
    if (at > last) out.push({ kind: 'text', text: text.slice(last, at) });

    const [, linkText, href, strong, em] = match;
    if (linkText !== undefined && href !== undefined) {
      const resolved = resolve ? resolve(href) : href;
      // An unresolvable cross-link keeps its sentence and loses its underline.
      if (resolved) out.push({ kind: 'link', text: linkText, href: resolved });
      else out.push({ kind: 'text', text: linkText });
    } else if (strong !== undefined) {
      out.push({ kind: 'strong', text: strong });
    } else if (em !== undefined) {
      out.push({ kind: 'em', text: em });
    }

    last = at + match[0].length;
  }

  if (last < text.length) out.push({ kind: 'text', text: text.slice(last) });
  return out.length ? out : [{ kind: 'text', text }];
}

function tableCells(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  return trimmed.split('|').map((cell) => cell.trim());
}

const isTableRow = (line: string) => line.trim().startsWith('|');
const isSeparatorRow = (line: string) => /^\s*\|[\s:|-]+\|?\s*$/.test(line) && line.includes('-');

/** Markdown body -> blocks. Blank lines separate blocks, as in the source. */
export function parseBlocks(markdown: string, resolve?: LinkResolver): Block[] {
  const lines = markdown.split('\n');
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i += 1;
      continue;
    }

    // Table: a header row, a separator, then rows until the pipes stop.
    if (isTableRow(line) && i + 1 < lines.length && isSeparatorRow(lines[i + 1])) {
      const head = tableCells(line).map((cell) => parseInline(cell, resolve));
      i += 2;
      const rows: Inline[][][] = [];
      while (i < lines.length && isTableRow(lines[i])) {
        rows.push(tableCells(lines[i]).map((cell) => parseInline(cell, resolve)));
        i += 1;
      }
      blocks.push({ kind: 'table', head, rows });
      continue;
    }

    if (/^\s*-\s+/.test(line)) {
      const items: Inline[][] = [];
      while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
        items.push(parseInline(lines[i].replace(/^\s*-\s+/, ''), resolve));
        i += 1;
      }
      blocks.push({ kind: 'ul', items });
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items: Inline[][] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(parseInline(lines[i].replace(/^\s*\d+\.\s+/, ''), resolve));
        i += 1;
      }
      blocks.push({ kind: 'ol', items });
      continue;
    }

    // Paragraph: everything up to the next blank line or structural line.
    const paragraph: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !isTableRow(lines[i]) &&
      !/^\s*-\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i]) &&
      !lines[i].startsWith('#')
    ) {
      paragraph.push(lines[i].trim());
      i += 1;
    }
    if (paragraph.length) {
      blocks.push({ kind: 'p', content: parseInline(paragraph.join(' '), resolve) });
      continue;
    }

    // A heading or anything else unrecognised: skip the line rather than loop.
    i += 1;
  }

  return blocks;
}

/**
 * A block as plain text, for the structured data.
 *
 * Anything quoted in JSON-LD has to be the same sentence the visitor reads,
 * so it is flattened from the parsed blocks rather than written a second time.
 */
export function blockText(block: Block): string {
  const spans = (content: Inline[]) => content.map((span) => span.text).join('');
  if (block.kind === 'p') return spans(block.content);
  if (block.kind === 'ul' || block.kind === 'ol') return block.items.map(spans).join(' ');
  return block.rows.map((row) => row.map(spans).join(' - ')).join('. ');
}

/**
 * Splits an article body into the lead (everything before the first `##`) and
 * one entry per `##` section.
 *
 * The `#` title and the `_Maubourg Studio, mis à jour le …_` line under it are
 * dropped: both are already rendered by the hero and the byline row, and
 * leaving them in prints the title twice.
 */
export function splitSections(body: string): { lead: string; sections: { heading: string; body: string }[] } {
  const withoutTitle = body
    .replace(/^\s*#\s+.*$/m, '')
    .replace(/^\s*_[^_\n]*Maubourg Studio[^_\n]*_\s*$/m, '');

  const parts = withoutTitle.split(/^##\s+/m);
  const lead = parts.shift() ?? '';

  const sections = parts.map((part) => {
    const newline = part.indexOf('\n');
    if (newline === -1) return { heading: part.trim(), body: '' };
    return { heading: part.slice(0, newline).trim(), body: part.slice(newline + 1) };
  });

  return { lead: lead.trim(), sections };
}
