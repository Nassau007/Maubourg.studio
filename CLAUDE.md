# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Answer style

Same convention as the sales-machine repo. Serious but not heavy, plain and grounded. No
unnecessary praise, no jokes. Go easy on technical vocabulary — when a technical term genuinely
helps, use it, then say what it means here in this specific situation. Keep replies short, list next
steps clearly, and put anything the user has to do themselves in its own clearly marked section.

## What this is

The marketing site for **Maubourg Studio**, an AI RevOps studio for European ecommerce brands.
It is one landing page in two languages plus a request-a-call page, and its only job is to turn a
store owner into a lead row: a **free-teardown request** (primary CTA) or a **call request**
(secondary). Everything else — copy, layout, animation — is in service of that. Judge a change by
whether it helps a store owner submit the form.

Positioning notes that drive the copy live in `README.md` and should be read before editing wording.

## Commands

```bash
npm install
cp .env.example .env      # DATABASE_URL -> local SQLite file
npm run db:push           # create the SQLite schema (no migration files; push-only)
npm run dev               # http://localhost:3000 -> redirects to /en or /fr

npm run lint              # next lint (eslint-config-next)
npm run build             # next build, standalone output — the real check
npm run db:studio         # browse captured leads
npx prisma generate       # after any prisma/schema.prisma edit
```

There are **no tests and no test runner**, and **`npm run lint` does not currently work**: there is
no ESLint config in the repo, so `next lint` drops into its interactive setup wizard, checks nothing
and returns. Treat `npm run build` as the only automated check until someone adds a config. The way
to verify a change is `npm run build`, then load both `/en` and `/fr` and submit the form once. A
build failure is usually `fr.ts` drifting from `en.ts` (see below), which TypeScript catches.

## Architecture

### Copy lives in dictionaries, never in components

`src/dictionaries/en.ts` is the **schema**, not just the English copy:

```ts
export type Dictionary = typeof en;   // en.ts
export const fr: Dictionary = { ... } // fr.ts
```

Because `fr` is annotated with a type inferred from `en`, TypeScript refuses to build when the two
diverge. This is the only mechanism keeping the French version complete — there is no translation
tooling. So:

- **Add new copy to `en.ts` first**, then let the type error tell you what `fr.ts` owes.
- Components receive a slice as a `dict` prop (`<Hero dict={dict.hero} lang={lang} />`) and type it
  `Dictionary['hero']`. Do not hardcode user-facing strings in a component.
- Array shapes matter: `typeof` infers `{ stat, label }[]`, so adding a key to one metric object
  changes the contract for both languages.
- `dict.errors` is consumed by the API routes, not just the UI — see below.

### Routing and locale

- `src/middleware.ts` redirects any locale-less path to `/en` or `/fr` by reading `Accept-Language`,
  defaulting to `en`. Its matcher skips `api`, `_next` and anything with a file extension.
- It **deliberately re-declares `locales` and `defaultLocale`** instead of importing `@/lib/i18n`,
  to keep the dictionaries out of the edge middleware bundle. Change the locale list in one place
  and you must change it in the other.
- `src/app/[lang]/` holds the pages. `generateStaticParams` prerenders both locales;
  `isLocale(params.lang)` → `notFound()` for anything else.
- `layout.tsx` builds metadata per locale from `dict.meta`, sets `canonical` and the `en`/`fr`
  `hreflang` alternates, and loads Fraunces (display) + Inter (sans) as CSS variables.

### Lead capture: two routes, one table

`src/app/api/teardown/route.ts` and `src/app/api/call/route.ts` both write to the single `Lead`
model, distinguished by `kind` (`"teardown"` | `"call"`). They share one shape, and a new lead route
should follow it exactly:

1. Parse JSON, 400 on garbage.
2. Localize errors with `getDictionary(String(body.lang ?? 'en')).errors` — the client posts `lang`.
3. **Honeypot**: if the hidden `company` field is non-empty, return `200 {ok:true}` without saving.
   Bots must think they succeeded.
4. Validate, 422 with `{ error, fields: {name: msg} }` so the form can highlight individual inputs.
5. `prisma.lead.create`, then `sendLeadNotification(lead)`, then 201.

Which fields are required differs by route: teardowns need name + email + storeUrl; calls need
name + phone, with email optional (invalid-but-present email uses `errors.emailOptional`). The
Prisma schema keeps almost everything nullable to allow both.

Forms (`TeardownForm.tsx`, `CallForm.tsx`) are client components that `preventDefault`, build the
body with `Object.fromEntries(new FormData(...))`, `fetch` the route, and swap the whole card for a
success panel. They carry `noValidate` and no `required` attributes — **all validation is server
side**, so field-level messages must come back in `payload.fields`.

### The teardown form is two steps, and the split is the conversion argument

`TeardownForm.tsx` holds a `step: 1 | 2` state. Step 1 asks only store URL + email — the two things
a teardown cannot be written without. Step 2 asks name, platform, revenue band and message; revenue
in particular was the field most likely to lose people, so it never appears before the visitor has
committed. Four rules keep it working:

- **Step 1 is hidden, not unmounted** (`className={step === 1 ? 'space-y-4' : 'hidden'}`). Its
  inputs must stay in the DOM or their values vanish from `FormData` when step 2 submits.
- The client mirrors `EMAIL_RE` from the route. That copy is a **gate between the steps, not
  validation** — the server re-checks everything and stays the only authority. Do not add rules to
  one side only.
- `handleSubmit` intercepts a step-1 submit and advances instead, so Enter in an input never posts a
  half-filled form.
- A 422 naming `storeUrl` or `email` forces `setStep(1)`, otherwise the error points at an input the
  visitor cannot see. Add a step-1 field and you must add it to that check.

Two placeholders live in this section: `public/example-teardown.pdf` (the redacted sample, linked
beside the ask as proof the deliverable is worth an email address) and `<Founder hasPhoto={false} />`
— flip that to `true` once `public/founder.jpg` exists.

### Email notification

`src/lib/email.ts` posts to the Resend REST API directly (no SDK). It is fire-and-forget by
contract: **it never throws**, and a missing `RESEND_API_KEY` logs a warning and returns. A broken
inbox must never cost a lead. It renders one inline-styled HTML table for both lead kinds, branching
on `lead.kind` for the subject, heading and CTA button.

### The notification email is an API, not just an email

This repo is the **front half of a two-repo pipeline**. The back half is the sales machine at
`C:\Users\NAE7\Documents\Nassgence` (separate git remote), which turns a teardown request into a
PDF and a drafted reply. The two are joined by nothing but the Resend notification: an Apps Script
in that repo (`automation/AppsScript_LeadBridge.gs`) searches Gmail and **parses the message this
repo sends**. There is no shared database, no API call, no webhook — Gmail is the queue.

So five things in `src/lib/email.ts` are a wire format, not copy. Reword them and the automation
silently stops finding leads — no error anywhere, the drafts just never appear:

| `email.ts` | Consumed as |
|---|---|
| `` `New teardown request — ${name} (${storeUrl})` `` (:67) | Gmail search `subject:"New teardown request"`, then a regex that takes the name before the dash and the URL from the parens. Em dash or hyphen both parse; the shape does not. |
| `reply_to: lead.email` (:129) | The prospect's address. It is read from the Reply-To header, *not* the body. |
| `row('Platform', …)` (:106) | Body regex `/Platform\s*\n?\s*(Shopify\|WooCommerce\|Other)/i` — the label **and** the three allowed values. |
| `row('Monthly revenue', …)` (:107) | Body regex `/Monthly revenue\s*\n?\s*([^\n]+)/i`. |
| `Lead #${lead.id}` (:114) | Body regex `/Lead\s*#(\d+)/`. |

A lead is skipped entirely unless both `storeUrl` and `reply_to` survive. Note the call route
(`New call request — …`) is deliberately **not** matched — only teardowns are automated.

If you change any of these, change the regexes in the nassgence repo in the same sitting.

### Styling

Design tokens are in `tailwind.config.js` — `ink` (warm near-black), `bone` (paper), `emerald`
(brand), `signal` (acid green, used sparingly). Reusable component classes are `@apply`-ed in
`src/app/globals.css`: `.btn-primary` / `.btn-signal` / `.btn-ghost` / `.btn-ghost-light`, `.card`,
`.card-hover`, `.field`, `.field-label`, `.eyebrow`, `.hairline`. Prefer these over ad-hoc utility
strings so the ten sections keep looking like one page.

`src/components/Reveal.tsx` wraps blocks in a fade-and-lift on scroll via `IntersectionObserver`,
with an inline-style transition and a `delay` prop for stagger. It falls back to visible when
`IntersectionObserver` is missing.

### Deployment

Railway builds the `Dockerfile` (multi-stage, `output: 'standalone'`) and runs
`docker-entrypoint.sh`, which executes `prisma db push` on every boot and then starts `server.js`.
SQLite lives on the `/data` volume mount, so `DATABASE_URL` is `file:/data/maubourg.db` in the image.

Two consequences that have already broken deploys once:

- **`.gitattributes` pins LF**, and the Dockerfile additionally strips CR from the entrypoint. A
  CRLF shebang fails with a confusing "No such file or directory". Do not relax either.
- There are **no migration files** — `prisma db push` is the migration path. A destructive schema
  change will be applied silently against the production volume.

## Gotchas

- **`src/lib/site.ts` is mostly dead.** Only `site.email` is read (by `Footer.tsx`). Its `nav`,
  `name`, `tagline` and `bookingUrl` are unused — nav comes from `dict.nav.links`, and the booking
  CTA links to `/${lang}/call`. The README still describes `site.ts` as the place to set the
  booking link; that is stale. Fix the file or the README rather than adding to the confusion.
- **`NOTIFY_EMAIL` falls back to `touchtabletapps@gmail.com`** (`email.ts:48`) — a personal address,
  not a `maubourg.studio` one. If that env var is unset in Railway, leads still save to the database
  but the notification lands in an inbox the Apps Script never searches, so the whole automation
  above goes quiet without failing. Check this first when drafts stop appearing.
- Anchor links are locale-prefixed (`/en#pricing`). A bare `#pricing` href breaks the FR page.
- **There is no admin page and no lead export.** Nothing in the app reads the `Lead` table back. A
  captured lead is visible in exactly two places: the Resend notification, and `npm run db:studio`
  pointed at the database. In production that database is a file on the Railway `/data` volume, so a
  lost notification is a lead nobody sees.
