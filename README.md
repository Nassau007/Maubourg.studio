# Maubourg Studio

Marketing site for **Maubourg Studio** — a conversion-optimization & rebuild studio for European
ecommerce brands. The site's job is to turn a store owner into a **free-teardown request**
(primary CTA) or a **booked intro call** (secondary CTA).

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
