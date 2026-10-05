import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Kept in sync with src/lib/i18n.ts. Inlined here so the edge middleware
// bundle doesn't pull in the full dictionaries.
const locales = ['en', 'fr'] as const;
const defaultLocale = 'en';

// The one address of the site. Both hosts stay attached in Railway, but www
// only exists to hand its visitors (and their link equity) to the apex domain.
// Canonical tags, the sitemap, robots.txt and the JSON-LD all say apex already,
// so a www page answering 200 is the same page under a second address.
const CANONICAL_HOST = 'maubourg.studio';
const WWW_HOST = `www.${CANONICAL_HOST}`;

// Paths that are not pages and must never be given a locale prefix: the lead
// routes, Next's own assets, and anything with a file extension (sitemap.xml,
// robots.txt, the example teardown PDF). They still get the host redirect.
const NON_PAGE = /^\/(api|_next)(\/|$)|\.[^/]+$/;

// Pages dropped in the refocus, and where each one now sends its visitors.
// Handled here rather than with a redirecting page component: a prerendered
// page that calls permanentRedirect() ships its status without a Location
// header once it is cached, which leaves the visitor on a blank 308.
//
// Acquisition (paid media, email and SMS) is gone with nothing equivalent
// behind it, so it goes home. Conversion was dropped on 2026-10-05, when the
// studio became GEO only: its page goes to the GEO page, which is what the
// studio sells now. Store builds used to fold into conversion, so they go
// straight to the GEO page too, in one hop rather than two. Same language on
// both sides: sending a French reader to an English page is a worse answer
// than the 404 it replaces.
const RETIRED_PAGES: Record<string, string> = {
  '/en/services/acquisition': '/en',
  '/fr/services/acquisition': '/fr',
  '/en/services/store-build': '/en/services/llm-visibility',
  '/fr/services/creation-boutique': '/fr/services/visibilite-llm',
  '/en/services/conversion-tracking': '/en/services/llm-visibility',
  '/fr/services/conversion-et-mesure': '/fr/services/visibilite-llm',
  // The old demo addresses. Their page components redirected with
  // permanentRedirect(), which ships a blank 308 once cached (see above).
  '/en/try-an-agent': '/en/services/ai-agents',
  '/fr/essayer-un-agent': '/fr/services/agents-ia',
  ...retiredArticles(),
};

/**
 * Blog articles taken down when the blog became GEO only. Each one had been
 * live and may be linked or indexed, so it goes to the blog index rather than
 * to a 404. The blog is French only, so only /fr paths ever existed. Slugs,
 * not filenames: the URL is /fr/blog/<slug from the frontmatter>.
 */
function retiredArticles(): Record<string, string> {
  const slugs = [
    'taux-de-conversion-a-0-8-par-ou-commencer-pour-l-ameliorer',
    'comment-reduire-le-taux-d-abandon-de-panier-sur-shopify',
    'combien-de-temps-faut-il-pour-voir-un-resultat-apres-un-audit-de-conversion',
    'qu-est-ce-qu-un-audit-cro-et-a-quoi-ca-sert-concretement',
    'quel-est-un-bon-taux-de-conversion-pour-une-boutique-shopify-en-france',
    'combien-coute-une-refonte-de-site-shopify-en-france',
    'faut-il-migrer-vers-shopify-si-je-suis-sur-un-autre-cms',
    'comment-choisir-une-agence-pour-creer-ou-refaire-ma-boutique-en-ligne',
    'pourquoi-mon-roas-baisse-alors-que-je-depense-plus-sur-meta-ads',
    'comment-savoir-si-mes-campagnes-google-ads-sont-rentables',
    'faut-il-faire-de-la-publicite-sur-tiktok-pour-une-petite-marque-francaise',
    'quelle-agence-choisir-pour-gerer-mes-campagnes-publicitaires-e-commerce',
    'pourquoi-mes-conversions-publicitaires-ne-remontent-plus-correctement-dans-meta-ads-manager',
    'quelle-part-de-mon-chiffre-d-affaires-devrait-venir-de-l-email-et-du-sms',
    'comment-relancer-les-paniers-abandonnes-par-email',
    'combien-coute-la-mise-en-place-d-un-agent-ia-pour-une-petite-marque-e-commerce',
    'comment-savoir-si-mon-pixel-meta-fonctionne-vraiment',
    'qu-est-ce-que-le-tracking-server-side-et-pourquoi-c-est-utile-pour-mon-e-commerce',
    'comment-etre-conforme-rgpd-tout-en-gardant-un-tracking-fiable-sur-shopify',
    'pourquoi-mes-chiffres-google-analytics-ne-correspondent-pas-a-mes-ventes-reelles-sur-shopify',
    'le-paiement-en-une-seule-page-one-page-checkout-ameliore-t-il-vraiment-les-conversions',
    'comment-rediger-une-fiche-produit-qui-convainc-sans-mentir',
    'comment-savoir-si-mon-site-est-trop-lent-et-si-ca-impacte-mes-ventes',
  ];
  return Object.fromEntries(slugs.map((slug) => [`/fr/blog/${slug}`, '/fr/blog']));
}

function detectLocale(request: NextRequest): string {
  const header = request.headers.get('accept-language') || '';
  const preferred = header.split(',').map((part) => part.split(';')[0].trim().toLowerCase());
  for (const lang of preferred) {
    const base = lang.split('-')[0];
    if ((locales as readonly string[]).includes(base)) return base;
  }
  return defaultLocale;
}

/**
 * Three jobs, done in a single redirect so a visitor never takes two hops.
 *
 *  1. www -> apex, keeping path and query.
 *  2. a retired page -> the page that replaced it, in the same language.
 *  3. a locale-less path -> /en or /fr, from Accept-Language.
 *
 * A request needing more than one (an old www link to a dropped service page)
 * still gets exactly one response, pointing at the final URL.
 *
 * The status code differs on purpose. A host move and a retired page are
 * permanent: those URLs have one destination forever, and 308 is what passes
 * ranking across. The locale hop is negotiated per visitor, so it stays
 * temporary or a browser would cache one language for everyone who follows.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = (request.headers.get('host') ?? request.nextUrl.host).toLowerCase().split(':')[0];

  const wrongHost = host === WWW_HOST;
  // Next serves these without the trailing slash, so both spellings of a
  // retired URL have to find the same entry.
  const retired = RETIRED_PAGES[pathname.replace(/\/$/, '')];
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  const needsLocale = !hasLocale && !NON_PAGE.test(pathname);

  if (!wrongHost && !retired && !needsLocale) return;

  const url = request.nextUrl.clone();
  if (wrongHost) {
    url.protocol = 'https:';
    url.host = CANONICAL_HOST;
    url.port = '';
  }
  if (retired) {
    url.pathname = retired;
  } else if (needsLocale) {
    url.pathname = `/${detectLocale(request)}${pathname === '/' ? '' : pathname}`;
  }

  return NextResponse.redirect(url, needsLocale && !retired ? 307 : 308);
}

export const config = {
  // Everything, because the host redirect has to cover the API routes, the
  // sitemap and the PDF as well as the pages. The locale skip list above is
  // what keeps those paths untouched on the canonical host.
  matcher: ['/:path*'],
};
