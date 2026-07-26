import { site } from '@/lib/site';
import type { Dictionary } from '@/lib/i18n';

/**
 * "Who you'll actually be working with", as a compact card rather than a
 * section of its own.
 *
 * It lives inside the teardown section, next to the form, so the face and the
 * name land exactly where the visitor decides whether to hand over an email
 * address. As a full-width band it read as a team page, which is the wrong
 * signal for a studio of one.
 *
 * The photo is optional by design: drop a file at `public/founder.jpg`, flip
 * `hasPhoto` to true where this is rendered, and it replaces the initials.
 * Never substitute a stock portrait — a fake face is worse than no face.
 *
 * Plain <img> rather than next/image on purpose: one small avatar does not
 * need the optimizer, and the optimizer needs sharp present in the standalone
 * Docker image. Not worth the deploy risk for a single asset.
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
    <div className="mt-4 rounded-card border border-ink/10 bg-bone-100 p-5">
      <div className="flex items-center gap-3.5">
        {hasPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={PHOTO}
            alt={dict.photoAlt}
            width={96}
            height={96}
            className="h-12 w-12 flex-none rounded-full border border-ink/10 object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-ink/10 bg-bone-200 font-display text-sm font-semibold text-ink-600"
          >
            {dict.initials}
          </span>
        )}
        <div>
          <p className="font-display text-base font-semibold leading-tight text-ink">
            {dict.name}
          </p>
          <p className="text-sm text-ink-500">{dict.role}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink-700">{dict.blurb}</p>

      <a
        href={`mailto:${site.email}`}
        className="mt-3 inline-block text-sm font-medium text-emerald underline-offset-4 hover:underline"
      >
        {site.email}
      </a>
    </div>
  );
}
