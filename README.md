# Maubourg Studio

Marketing site for **Maubourg Studio** — an **AI RevOps studio** for European ecommerce brands. The
site's job is to turn a store owner into a **free-teardown request** (primary CTA) or a **booked
intro call** (secondary CTA).

Positioning: "AI RevOps studio" is the category label (badge, tagline, meta, footer); the headline
and body copy deliberately stay in plain outcome language, since RevOps is B2B vocabulary a DTC
store owner may not use. A FAQ entry defines the term in plain words. The offer covers the whole
revenue operation — conversion, retention, paid media, tracking — plus **AI agents** for store
operators (ops, catalog/merchandising, support). The agents double as proof: the studio's own
delivery runs on them.

The free **store teardown** is intentionally left as the entry point — concrete and ecommerce-native
— rather than being renamed to match the RevOps label.

## Stack

- **Next.js 14** (App Router) + **React 18**
- **Tailwind CSS**
- **Prisma + SQLite** for lead capture (`Lead` model)
- Deploys to **Railway** via the included `Dockerfile` (standalone output, SQLite on a `/data` volume)

## Local development

```bash
npm install
cp .env.example .env      # sets DATABASE_URL to a local SQLite file
npm run db:push           # creates the SQLite schema
npm run dev               # http://localhost:3000
```

Teardown requests submitted through the form are stored in the `Lead` table. Inspect them with:

```bash
npm run db:studio
```

## Configuration

Contact details and the booking link live in one place: [`src/lib/site.ts`](src/lib/site.ts).
Update `email` and `bookingUrl` (currently a placeholder Cal.com link) before going live.

## Structure

```
src/
  app/
    layout.tsx              # fonts + metadata/SEO
    page.tsx                # assembles the landing sections
    globals.css             # Tailwind layer + component classes
    api/teardown/route.ts   # POST endpoint that validates + saves a Lead
  components/               # Nav, Hero, Problem, Services, Process, WhyMe,
                            # Pricing, TeardownForm, Faq, Footer, Reveal
  lib/
    prisma.ts               # Prisma client singleton
    site.ts                 # contact details / nav / booking link
prisma/schema.prisma        # Lead model
```

## Deploy (Railway)

The repo already contains `Dockerfile`, `docker-entrypoint.sh` and `railway.toml`. On deploy the
entrypoint runs `prisma db push` against the SQLite database mounted at `/data`, then starts the
Next.js server. Set the `DATABASE_URL` env var (defaults to `file:/data/maubourg.db` in the image).

## Content source

Copy is lifted from the Maubourg Studio positioning docs (one-page pitch, services, offer &
pricing). Once the first case study exists, add real proof numbers to the hero metric strip and a
testimonials section.
