import { AI_MARKS } from './aiMarks';
import type { Dictionary } from '@/lib/i18n';

/**
 * The four AI tools the studio measures, by mark and by name, under a plain
 * label. It says what we measure, not who we work with: no "partners" or
 * "trusted by" heading, ever. The marks are decoration (aria-hidden), the
 * names are the content.
 *
 * `tone` follows the section it sits on: light text on forest green, ink on
 * the light paper. It sits in the page's content column.
 */
export default function LogoBar({
  dict,
  tone,
  className = '',
}: {
  dict: Dictionary['aiTools'];
  tone: 'dark' | 'light';
  className?: string;
}) {
  const dark = tone === 'dark';
  return (
    <section aria-label={dict.aria} className={[dark ? 'bg-ink' : 'bg-bone', className].join(' ')}>
      <div className="mx-auto max-w-content px-5 md:px-8">
        <div
          className={[
            'flex flex-col gap-5 py-7 md:flex-row md:items-center md:justify-between md:gap-10',
            // On green the bar closes the opening block, so only a top rule.
            dark ? 'border-t border-bone/15 pb-10 md:pb-12' : 'border-y border-ink/12',
          ].join(' ')}
        >
          <p className={['max-w-[24ch] text-sm', dark ? 'text-bone/75' : 'text-ink-600'].join(' ')}>
            {dict.label}
          </p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:flex sm:flex-wrap sm:items-center sm:gap-x-12 lg:gap-x-14">
            {AI_MARKS.map((mark) => (
              <li
                key={mark.name}
                className={[
                  'flex items-center gap-2.5 text-[17px] font-medium tracking-[-0.01em]',
                  dark ? 'text-bone' : 'text-ink',
                ].join(' ')}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="flex-none"
                >
                  <path d={mark.path} />
                </svg>
                <span>{mark.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
