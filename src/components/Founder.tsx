import Reveal from './Reveal';
import { site } from '@/lib/site';
import type { Dictionary } from '@/lib/i18n';

/**
 * "Who you'll actually be working with."
 *
 * A studio with no name and no face on it reads as a shell. This sits directly
 * above the teardown form, where the visitor decides whether to hand over an
 * email address.
 *
 * The photo is optional by design: drop a file at `public/founder.jpg`, flip
 * `hasPhoto` to true in page.tsx, and it renders. Until then the block falls
 * back to a monogram rather than a broken image. Never substitute a stock
 * portrait — a fake face is worse than no face.
 *
 * Plain <img> rather than next/image on purpose: one fixed-size portrait does
 * not need the optimizer, and the optimizer needs sharp present in the
 * standalone Docker image. Not worth the deploy risk for a single asset.
 */
const PHOTO = '/founder.jpg';

export default function Founder({
  dict,
  hasPhoto = false,
}: {
  dict: Dictionary['founder'];
  hasPhoto?: boolean;
}) {
  return (
    <section id="founder" className="hairline bg-bone py-20 md:py-28">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <Reveal>
          <div className="mx-auto grid max-w-3xl gap-8 sm:grid-cols-[auto_1fr] sm:items-start">
            <div className="flex-none">
              {hasPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={PHOTO}
                  alt={dict.photoAlt}
                  width={160}
                  height={160}
                  className="h-32 w-32 rounded-card border border-ink/10 object-cover sm:h-40 sm:w-40"
                />
              ) : (
                <div className="flex h-32 w-32 items-center justify-center rounded-card border border-ink/10 bg-bone-200 sm:h-40 sm:w-40">
                  <span className="font-display text-4xl font-semibold text-ink-500">
                    {dict.initials}
                  </span>
                </div>
              )}
            </div>

            <div>
              <span className="eyebrow">{dict.eyebrow}</span>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                {dict.name}
              </h2>
              <p className="mt-1 text-sm text-ink-500">{dict.role}</p>

              <ul className="mt-5 space-y-2.5">
                {dict.lines.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm leading-relaxed text-ink-700">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-emerald" />
                    {line}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm text-ink-500">
                {dict.directPrefix}{' '}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-emerald underline-offset-4 hover:underline"
                >
                  {site.email}
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
