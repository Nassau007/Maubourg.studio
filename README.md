# Maubourg Studio

Marketing site for **Maubourg Studio** — a **GEO and AI agents studio for ecommerce**. The site's
job is to turn a store owner into a **booked intro call** (primary CTA) or a **free-teardown
request** (secondary CTA).

Positioning: "GEO and AI agents studio for ecommerce" is the category label (badge, tagline, meta,
footer); the headline and body copy stay in plain outcome language, since GEO is vocabulary a store
owner may not use yet. A FAQ entry defines the term in plain words. The offer is three services:
**GEO** (audit, measure, improve) and **AI agents** (operations, catalogue) as the headline work,
with **conversion** kept as the secondary service for when the store itself is what loses the sale.
The agents double as proof: the studio's own delivery runs on them.

The market is brands selling in **France and French-speaking markets** (Belgium, Switzerland). It is
stated in four places only: the homepage meta description and structured data, the "French-speaking
by focus" block, the "Who do you work with?" FAQ entry, and the footer. It is deliberately absent
from the positioning line.

The free **store teardown** stays as the second way in, concrete and ecommerce-native. It is still
the conversion teardown; a GEO teardown replaces it in a later change.

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
