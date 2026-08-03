// Renders the parsed article blocks.
//
// No @tailwindcss/typography here: the plugin is not installed and adding it
// would give long-form copy a second, separate type scale to drift from the
// rest of the site. These classes are the site's own tokens, applied per
// element, so an article and a service page look like the same hand.

import Link from 'next/link';
import type { Block, Inline } from '@/lib/markdown';

function Spans({ content }: { content: Inline[] }) {
  return (
    <>
      {content.map((span, i) => {
        if (span.kind === 'strong') {
          return (
            <strong key={i} className="font-semibold text-ink">
              {span.text}
            </strong>
          );
        }
        if (span.kind === 'em') {
          return (
            <em key={i} className="italic">
              {span.text}
            </em>
          );
        }
        if (span.kind === 'link') {
          return (
            <Link
              key={i}
              href={span.href}
              className="font-medium text-emerald underline underline-offset-4 decoration-emerald/30 transition-colors hover:decoration-emerald"
            >
              {span.text}
            </Link>
          );
        }
        return <span key={i}>{span.text}</span>;
      })}
    </>
  );
}

export default function Prose({ blocks, className = '' }: { blocks: Block[]; className?: string }) {
  return (
    <div className={`space-y-5 text-[16.5px] leading-[1.75] text-ink-700 ${className}`}>
      {blocks.map((block, i) => {
        if (block.kind === 'p') {
          return (
            <p key={i}>
              <Spans content={block.content} />
            </p>
          );
        }

        if (block.kind === 'ul') {
          return (
            <ul key={i} className="space-y-2 pl-5">
              {block.items.map((item, j) => (
                <li key={j} className="list-disc marker:text-emerald">
                  <Spans content={item} />
                </li>
              ))}
            </ul>
          );
        }

        if (block.kind === 'ol') {
          return (
            <ol key={i} className="space-y-2 pl-5">
              {block.items.map((item, j) => (
                <li key={j} className="list-decimal marker:font-semibold marker:text-emerald">
                  <Spans content={item} />
                </li>
              ))}
            </ol>
          );
        }

        // Tables in these articles are comparison tables, and a comparison
        // that gets clipped on a phone proves the opposite of its point. The
        // wrapper scrolls rather than shrinking the type.
        return (
          <div key={i} className="-mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
            <table className="w-full min-w-[36rem] border-collapse overflow-hidden rounded-card border border-ink/10 text-left text-[14.5px] leading-snug">
              <thead className="bg-bone-200">
                <tr>
                  {block.head.map((cell, j) => (
                    <th
                      key={j}
                      scope="col"
                      className="border-b border-ink/10 px-4 py-3 align-bottom font-semibold text-ink"
                    >
                      <Spans content={cell} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, j) => (
                  <tr key={j} className="border-b border-ink/8 last:border-b-0">
                    {row.map((cell, k) => (
                      <td key={k} className="px-4 py-3 align-top text-ink-600">
                        <Spans content={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
