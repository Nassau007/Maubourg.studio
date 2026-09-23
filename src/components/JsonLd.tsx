import { siteUrl, site } from '@/lib/site';
// Type only: src/lib/articles.ts reads the filesystem, and this module is
// imported by the homepage, which has no business pulling that in.
import type { Article } from '@/lib/articles';
import { getDictionary, type Dictionary, type Locale } from '@/lib/i18n';
import {
  OBSERVATORY_LIVE,
  latestEdition,
  observatoryHref,
  verticalHref,
  type ObservatoryVertical,
} from '@/lib/observatory';

/**
 * Structured data (schema.org, JSON-LD).
 *
 * Two audiences, one purpose: search engines that show rich results, and the
 * AI crawlers that answer "who gets a French ecommerce brand cited in AI
 * answers". A model quoting the site is only as accurate as the facts it can
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

/**
 * Dataset markup for the observatory. This is the schema that tells a crawler a
 * page is a source rather than an opinion, which is the whole reason the
 * section exists.
 *
 * It renders nothing until a campaign has been published: a Dataset that
 * declares no measurement period, no engines and no distribution is a claim to
 * be a source with nothing behind it, which is exactly what this site must not
 * do.
 */
export function ObservatoryJsonLd({
  lang,
  vertical,
}: {
  lang: Locale;
  vertical?: ObservatoryVertical;
}) {
  const edition = latestEdition();
  if (!OBSERVATORY_LIVE || !edition) return null;

  const dict = getDictionary(lang);
  const o = dict.observatory;
  const url = vertical
    ? `${siteUrl}${verticalHref(vertical, lang)}`
    : `${siteUrl}${observatoryHref(lang)}`;
  const name = vertical ? `${o.verticals[vertical.id]} - ${o.meta.title}` : o.meta.title;

  const dataset = {
    '@type': 'Dataset',
    '@id': `${url}#dataset`,
    name,
    description: o.meta.description,
    url,
    inLanguage: lang === 'fr' ? 'fr-FR' : 'en-GB',
    creator: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    // The measurement period is the campaign, and the campaign is what a
    // reader retypes the query against.
    temporalCoverage: edition.date,
    dateModified: edition.date,
    measurementTechnique: `${edition.queries} buying questions, each asked ${edition.runsPerQuery} times per engine`,
    variableMeasured: edition.engines,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isAccessibleForFree: true,
    ...(edition.aggregate
      ? {
          distribution: {
            '@type': 'DataDownload',
            contentUrl: `${siteUrl}${edition.aggregate}`,
            encodingFormat: 'text/csv',
          },
        }
      : {}),
  };

  return <Script data={{ '@context': 'https://schema.org', '@graph': [dataset] }} />;
}

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
    areaServed: [
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'Belgium' },
      { '@type': 'Country', name: 'Switzerland' },
    ],
    availableLanguage: ['en', 'fr'],
    knowsAbout: dict.marquee.items,
    serviceType: dict.services.items.map((s) => `${s.tag}: ${s.title}`),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: dict.services.eyebrow,
      itemListElement: dict.services.items.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, description: s.body },
      })),
    },
    // The free GEO audit: the one price on the page that is a single number
    // rather than a range. Ranges stay in the visible HTML instead of being
    // restated here, where a stale figure would be quoted back as fact.
    makesOffer: {
      '@type': 'Offer',
      name: dict.pricing.groups[0].items[0].name,
      description: dict.pricing.groups[0].items[0].desc,
      price: 0,
      priceCurrency: 'EUR',
      url: `${url}#audit`,
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

/** An answers article: Article plus a BreadcrumbList back to the section index. */
export function ArticleJsonLd({
  article,
  lang,
  indexUrl,
  indexName,
}: {
  article: Article;
  lang: Locale;
  indexUrl: string;
  indexName: string;
}) {
  const url = `${siteUrl}${indexUrl}/${article.slug}`;
  const locale = lang === 'fr' ? 'fr-FR' : 'en-GB';

  const post = {
    '@type': 'Article',
    '@id': `${url}#article`,
    url,
    mainEntityOfPage: url,
    headline: article.title,
    description: article.description,
    articleSection: article.category,
    inLanguage: locale,
    datePublished: article.date,
    dateModified: article.date,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
  };

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: site.name, item: `${siteUrl}/${lang}` },
      { '@type': 'ListItem', position: 2, name: indexName, item: `${siteUrl}${indexUrl}` },
      { '@type': 'ListItem', position: 3, name: article.title, item: url },
    ],
  };

  return (
    <Script
      data={{ '@context': 'https://schema.org', '@graph': [post, breadcrumb] }}
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
