// The observatory's texts and chart data, read from disk at build time.
//
// The texts are long, written by hand per edition, and exist in French only
// (plus one English summary), so they live as markdown in
// content/atlas/<edition>/ rather than in the dictionaries, the way the
// blog articles do. The dictionaries keep the structural labels around them.
//
// Server only: it reads the filesystem. Every observatory page is prerendered,
// so this runs during `next build` and never in a visitor's request.
//
// The source files follow the blog's markdown shape, plus three things:
//   - `## Heading {#id}` gives a section a stable anchor, so the index can
//     link to the matching section of the edition page;
//   - `{{name}}` or `{{name:arg}}` alone on a line is a block the page renders
//     itself (a link to the edition's detail, the data links);
//   - `{{figure:gN}}` ... `{{/figure}}` wraps a chart: the caption paragraph,
//     then the table that goes with it. The chart is drawn from the CSV of the
//     same name in public/atlas/<edition>/graphiques/. `{{figure:gN:slug}}`
//     draws the same chart restricted to one category (`literie`,
//     `cosmetique-clean`, `chaussures-confort`), for the category pages.
//   - `{{captures:layout}}` ... `{{/captures}}` wraps chat screenshots: one
//     image per line, written `![description](file.webp "label")`, or
//     `[![description](crop.webp "label")](whole.webp)` when the picture is a
//     crop and the link should open the whole answer, or
//     `[![description](tile.webp "label")](whole.webp "tuile")` when the
//     picture is the same answer fitted into an even tile, so the link keeps
//     its "full size" label; then the caption
//     paragraph. Files sit in public/atlas/<edition>/captures/. The layout is
//     `seule`, `paire`, `grille` (2 by 2) or `bande` (one row of four).
//   - `{{a-retenir}}` ... `{{/a-retenir}}` wraps a takeaway, drawn as a
//     report insert. When it is prose, the insert carries the label
//     "Implication" and its `**bold**` sentence is the one to keep. When it is
//     only a bullet list (a category page, under a heading that already says
//     what it is) the insert has no label.
// Links written `[text](@target)` are resolved by `observatoryLinkResolver`,
// so a path is decided once in src/lib/observatory.ts and never typed into a
// text.

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { parseBlocks, type Block, type LinkResolver } from '@/lib/markdown';
import {
  OBSERVATORY_VERTICALS,
  editionHref,
  methodologyHref,
  observatoryHref,
  verticalHref,
  type ObservatoryEdition,
} from '@/lib/observatory';

const CONTENT_ROOT = path.join(process.cwd(), 'content', 'atlas');
const PUBLIC_ROOT = path.join(process.cwd(), 'public');

/** One chat screenshot. The description is the alt text, and says what the answer recommends. */
export type Capture = {
  src: string;
  /** What the link opens: the file itself, or the whole answer when `src` is a crop. */
  href: string;
  /** True when `src` shows only part of the answer, so the link says it opens the whole one. */
  crop: boolean;
  alt: string;
  label: string | null;
  width: number;
  height: number;
};

export type CaptureLayout = 'seule' | 'paire' | 'grille' | 'bande';

export type DocPart =
  | { kind: 'blocks'; blocks: Block[] }
  | { kind: 'directive'; name: string; arg: string | null }
  | { kind: 'figure'; id: string; vertical: string | null; caption: Block | null; blocks: Block[] }
  | { kind: 'captures'; layout: CaptureLayout; images: Capture[]; caption: Block | null }
  | { kind: 'takeaway'; label: string | null; blocks: Block[] };

export type DocSection = { id: string | null; heading: string; parts: DocPart[] };

export type ObservatoryDoc = {
  /** Meta title, from the front matter. */
  metaTitle: string;
  /** Meta description, from the front matter. */
  description: string;
  /** The `#` heading. */
  title: string;
  /** Everything between the title and the first `##`. */
  lead: DocPart[];
  sections: DocSection[];
};

/**
 * French typography: a non-breaking space before the high punctuation and
 * inside the guillemets, so a colon or a closing » never starts a line. The
 * texts are typed with ordinary spaces; this is the only change made to them.
 */
function frenchSpacing(text: string): string {
  return text
    .replace(/ ([:;?!»%])/g, ' $1')
    .replace(/« /g, '« ');
}

const DIRECTIVE_RE = /^\{\{([a-z-]+)(?::([\w-]+))?(?::([\w-]+))?\}\}$/;

const CAPTURE_LAYOUTS: readonly CaptureLayout[] = ['seule', 'paire', 'grille', 'bande'];

// `![alt](file "label")`, or the same wrapped in a link: `[![alt](file "label")](other)`.
const IMAGE_RE = /^!\[([^\]]+)\]\(([\w.-]+)(?:\s+"([^"]*)")?\)$/;
const LINKED_IMAGE_RE = /^\[(!\[[^\]]+\]\([\w.-]+(?:\s+"[^"]*")?\))\]\(([\w.-]+)(\s+"tuile")?\)$/;

/**
 * Width and height of a WebP file, read from its header, so the page can
 * reserve the space before the image loads. Throws on anything else: a
 * screenshot that is missing or in another format should fail the build, not
 * ship a broken image.
 */
function webpSize(file: string): { width: number; height: number } {
  const b = fs.readFileSync(file);
  if (b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') {
    throw new Error(`Observatory: ${file} is not a WebP file`);
  }
  const chunk = b.toString('ascii', 12, 16);
  if (chunk === 'VP8 ') return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
  if (chunk === 'VP8L') {
    const bits = b.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (chunk === 'VP8X') return { width: b.readUIntLE(24, 3) + 1, height: b.readUIntLE(27, 3) + 1 };
  throw new Error(`Observatory: cannot read the size of ${file}`);
}

function parseCapture(line: string, folder: string): Capture | null {
  let text = line.trim();
  let link: string | null = null;
  let tile = false;
  const linked = LINKED_IMAGE_RE.exec(text);
  if (linked) {
    text = linked[1];
    link = linked[2];
    tile = Boolean(linked[3]);
  }
  const image = IMAGE_RE.exec(text);
  if (!image) return null;
  const [, alt, file, label] = image;
  const publicPath = (name: string) => `${folder}/${name}`;
  for (const name of [file, link]) {
    if (name && !fs.existsSync(path.join(PUBLIC_ROOT, publicPath(name)))) {
      throw new Error(`Observatory: missing screenshot ${publicPath(name)}`);
    }
  }
  // The file the link opens must be a WebP too.
  if (link) webpSize(path.join(PUBLIC_ROOT, publicPath(link)));
  return {
    src: publicPath(file),
    href: publicPath(link ?? file),
    crop: link !== null && !tile,
    alt: alt.trim(),
    label: label ? label.trim() : null,
    ...webpSize(path.join(PUBLIC_ROOT, publicPath(file))),
  };
}

function joinWrapped(lines: string[]): string {
  // The texts are hard-wrapped. The blog's parser reads one line per list
  // item, and reads any line starting "16. " as a numbered item, so wrapped
  // lines are joined back first:
  //   - an indented line continues the bullet above it;
  //   - a "N. " line inside a paragraph (the previous line is prose, not a
  //     blank or a numbered item) is the end of a sentence like "14
  //     réponses sur\n16. Choisir", not a list.
  const joined: string[] = [];
  let inItem = false;
  let prev: 'blank' | 'bullet' | 'numbered' | 'prose' | 'other' = 'blank';
  for (const line of lines) {
    if (inItem && /^\s+\S/.test(line) && !/^\s*-\s+/.test(line)) {
      joined[joined.length - 1] += ` ${line.trim()}`;
      continue;
    }
    if (prev === 'prose' && /^\d+\.\s/.test(line)) {
      joined[joined.length - 1] += ` ${line.trim()}`;
      continue;
    }
    inItem = /^\s*-\s+/.test(line);
    if (!line.trim()) prev = 'blank';
    else if (inItem) prev = 'bullet';
    else if (/^\s*\d+\.\s/.test(line)) prev = 'numbered';
    else if (/^\s*(\||#|\{\{)/.test(line)) prev = 'other';
    else prev = 'prose';
    joined.push(line);
  }
  return joined.join('\n');
}

// The label of a takeaway written as prose (see the header).
const TAKEAWAY_LABEL = 'Implication';

function parseParts(body: string, resolve: LinkResolver, captures: string): DocPart[] {
  const parts: DocPart[] = [];
  const lines = body.split('\n');
  let buffer: string[] = [];

  const flush = () => {
    const text = joinWrapped(buffer).trim();
    if (text) parts.push({ kind: 'blocks', blocks: parseBlocks(text, resolve) });
    buffer = [];
  };

  for (let i = 0; i < lines.length; i += 1) {
    const match = DIRECTIVE_RE.exec(lines[i].trim());
    if (!match) {
      buffer.push(lines[i]);
      continue;
    }
    flush();
    const [, name, arg, sub] = match;
    if (name === 'figure' && arg) {
      const inner: string[] = [];
      i += 1;
      while (i < lines.length && lines[i].trim() !== '{{/figure}}') {
        inner.push(lines[i]);
        i += 1;
      }
      const blocks = parseBlocks(inner.join('\n').trim(), resolve);
      // The first paragraph is the caption: the chart's title, what it draws,
      // and the file its data comes from.
      const caption = blocks[0]?.kind === 'p' ? blocks[0] : null;
      if (sub && !OBSERVATORY_VERTICALS.some((v) => v.slug.fr === sub)) {
        throw new Error(`Observatory: unknown category "${sub}" in figure ${arg}`);
      }
      parts.push({ kind: 'figure', id: arg, vertical: sub ?? null, caption, blocks: caption ? blocks.slice(1) : blocks });
    } else if (name === 'captures' && arg) {
      if (!(CAPTURE_LAYOUTS as readonly string[]).includes(arg)) {
        throw new Error(`Observatory: unknown captures layout "${arg}"`);
      }
      const images: Capture[] = [];
      const rest: string[] = [];
      i += 1;
      while (i < lines.length && lines[i].trim() !== '{{/captures}}') {
        const capture = parseCapture(lines[i], captures);
        if (capture) images.push(capture);
        else rest.push(lines[i]);
        i += 1;
      }
      const blocks = parseBlocks(rest.join('\n').trim(), resolve);
      const caption = blocks[0]?.kind === 'p' ? blocks[0] : null;
      parts.push({ kind: 'captures', layout: arg as CaptureLayout, images, caption });
    } else if (name === 'a-retenir') {
      const inner: string[] = [];
      i += 1;
      while (i < lines.length && lines[i].trim() !== '{{/a-retenir}}') {
        inner.push(lines[i]);
        i += 1;
      }
      const blocks = parseBlocks(joinWrapped(inner).trim(), resolve);
      const listOnly = blocks.length > 0 && blocks.every((block) => block.kind === 'ul');
      parts.push({ kind: 'takeaway', label: listOnly ? null : TAKEAWAY_LABEL, blocks });
    } else {
      parts.push({ kind: 'directive', name, arg: arg ?? null });
    }
  }
  flush();
  return parts;
}

/**
 * Resolves `@target` links in the texts to real paths. Anything else is
 * returned unchanged; an unknown `@target` returns null, which keeps the link
 * text and drops the link rather than shipping a 404.
 */
export function observatoryLinkResolver(edition: ObservatoryEdition): LinkResolver {
  return (target) => {
    if (!target.startsWith('@')) return target;
    const [key, fragment] = target.slice(1).split('#');
    const hash = fragment ? `#${fragment}` : '';
    const files = edition.aggregate;

    const vertical = OBSERVATORY_VERTICALS.find((v) => v.slug.fr === key);
    if (vertical) return verticalHref(vertical, 'fr') + hash;

    switch (key) {
      case 'index':
        return observatoryHref('fr') + hash;
      case 'methode':
        return methodologyHref('fr') + hash;
      case 'edition':
        return editionHref(edition, 'fr') + hash;
      // The three files sit together, with the licence and the citation line,
      // at the foot of the edition page.
      case 'donnees':
        return `${editionHref(edition, 'fr')}#donnees`;
      case 'questions-csv':
        return files ? files.questions : null;
      case 'citations':
        return files ? files.citations : null;
      case 'sources-csv':
        return files ? files.sources : null;
      case 'lisezmoi':
        return files ? files.readme : null;
      default: {
        const chart = chartFile(edition, key);
        return chart ? chart.publicPath : null;
      }
    }
  };
}

/**
 * One text of an edition. `name` is the file name without the language,
 * e.g. `index`, `methodologie`, `literie`, `edition`.
 */
export function loadObservatoryDoc(
  edition: ObservatoryEdition,
  name: string,
  lang: 'en' | 'fr',
): ObservatoryDoc {
  const file = path.join(CONTENT_ROOT, edition.slug, `${name}.${lang}.md`);
  const parsed = matter(fs.readFileSync(file, 'utf8'));
  const raw = lang === 'fr' ? frenchSpacing(parsed.content) : parsed.content;
  const resolve = observatoryLinkResolver(edition);

  const titleMatch = /^\s*#\s+(.+)$/m.exec(raw);
  const title = titleMatch ? titleMatch[1].trim() : '';
  const body = titleMatch ? raw.replace(titleMatch[0], '') : raw;

  const chunks = body.split(/^##\s+/m);
  const captures = `/atlas/${edition.slug}/captures`;
  const lead = parseParts(chunks.shift() ?? '', resolve, captures);
  const sections = chunks.map((chunk) => {
    const newline = chunk.indexOf('\n');
    const headingLine = (newline === -1 ? chunk : chunk.slice(0, newline)).trim();
    const idMatch = /^(.*?)\s*\{#([\w-]+)\}$/.exec(headingLine);
    return {
      id: idMatch ? idMatch[2] : null,
      heading: idMatch ? idMatch[1] : headingLine,
      parts: parseParts(newline === -1 ? '' : chunk.slice(newline + 1), resolve, captures),
    };
  });

  return {
    metaTitle: String(parsed.data.title ?? title),
    description: String(parsed.data.description ?? ''),
    title,
    lead,
    sections,
  };
}

/* ------------------------------------------------------------------ */
/* Chart data. One CSV per chart, published beside the edition.        */
/* ------------------------------------------------------------------ */

export type CsvRow = Record<string, string>;

function parseCsv(text: string): CsvRow[] {
  const rows: string[][] = [];
  let field = '';
  let row: string[] = [];
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i += 1;
      row.push(field);
      if (row.some((cell) => cell !== '')) rows.push(row);
      row = [];
      field = '';
    } else field += ch;
  }
  row.push(field);
  if (row.some((cell) => cell !== '')) rows.push(row);

  const [head, ...body] = rows;
  return body.map((cells) => Object.fromEntries(head.map((key, i) => [key, cells[i] ?? ''])));
}

function chartFile(edition: ObservatoryEdition, id: string) {
  if (!edition.aggregate || !/^g\d$/.test(id)) return null;
  const folder = path.join(PUBLIC_ROOT, edition.aggregate.charts);
  if (!fs.existsSync(folder)) return null;
  const name = fs.readdirSync(folder).find((file) => file.startsWith(`${id}-`) && file.endsWith('.csv'));
  if (!name) return null;
  return { name, diskPath: path.join(folder, name), publicPath: `${edition.aggregate.charts}/${name}` };
}

/** The rows of chart `id` (g1 to g8), straight from its published CSV. */
export function loadChartData(edition: ObservatoryEdition, id: string): CsvRow[] {
  const file = chartFile(edition, id);
  if (!file) throw new Error(`Observatory: no data file for chart ${id} in edition ${edition.slug}`);
  return parseCsv(fs.readFileSync(file.diskPath, 'utf8'));
}
