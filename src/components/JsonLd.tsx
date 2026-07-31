import { siteUrl, site } from '@/lib/site';
import type { Dictionary, Locale } from '@/lib/i18n';

/**
 * Structured data (schema.org, JSON-LD).
 *
 * Two audiences, one purpose: search engines that show rich results, and the
 * AI crawlers that answer "who does conversion work for European ecommerce
 * brands". A model quoting the site is only as accurate as the facts it can
 * lift cleanly, so everything below is derived from the dictionaries, which
 * are the same source the visible page renders from. Nothing is asserted here
 * that a visitor cannot read on the page.
 *
 * Hard rule: no rating, no review, no client count, no result figure. Those
 * would be invented proof, and this is the one page claiming the studio is
 * honest about other people's stores.
 */

function Script({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // `<` is escaped so a stray tag in the copy can never close the script.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

const ORG_ID = `${siteUrl}/#organization`;
const SITE_ID = `${siteUrl}/#website`;

export function HomeJsonLd({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const url = `${siteUrl}/${lang}`;
  const locale = lang === 'fr' ? 'fr-FR' : 'en-GB';

  const organization = {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: site.name,
    alternateName: 'Maubourg',
    url: siteUrl,
    logo: `${siteUrl}/icon.png`,
    image: `${siteUrl}/opengraph-image.png`,
    email: site.email,
    slogan: dict.footer.tagline,
    description: dict.meta.homeDescription,
    founder: {
      '@type': 'Person',
      name: dict.founder.name,
      jobTitle: dict.founder.role,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paris',
      addressCountry: 'FR',
    },
    areaServed: { '@type': 'Place', name: 'Europe' },
    availableLanguage: ['en', 'fr'],
    knowsAbout: dict.marquee.items,
    serviceType: dict.services.items.map((s) => s.title),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: dict.services.eyebrow,
      itemListElement: dict.services.items.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.body },
      })),
    },
    // The one price on the page that is a single number rather than a range.
    // Ranges stay in the visible HTML instead of being restated here, where a
    // stale figure would be quoted back as fact.
    makesOffer: {
      '@type': 'Offer',
      name: dict.pricing.entry[0].name,
      description: dict.pricing.entry[0].desc,
      price: 0,
      priceCurrency: 'EUR',
      url: `${url}#teardown`,
      availability: 'https://schema.org/InStock',
    },
  };

  const website = {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: siteUrl,
    name: site.name,
    description: dict.meta.homeDescription,
    inLanguage: locale,
    publisher: { '@id': ORG_ID },
  };

  const webPage = {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    inLanguage: locale,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: `${siteUrl}/opengraph-image.png`,
  };

  const faqPage = {
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    inLanguage: locale,
    isPartOf: { '@id': SITE_ID },
    mainEntity: dict.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@graph': [organization, website, webPage, faqPage],
      }}
    />
  );
}

export function CallJsonLd({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const url = `${siteUrl}/${lang}/call`;
  const locale = lang === 'fr' ? 'fr-FR' : 'en-GB';

  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        '@id': `${url}#webpage`,
        url,
        name: dict.call.metaTitle,
        description: dict.call.metaDescription,
        inLanguage: locale,
        isPartOf: { '@id': SITE_ID },
        about: { '@id': ORG_ID },
      }}
    />
  );
}
