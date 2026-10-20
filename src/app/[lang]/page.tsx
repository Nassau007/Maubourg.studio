import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import LogoBar from '@/components/LogoBar';
import Problem from '@/components/Problem';
import AiChoice from '@/components/AiChoice';
import Services from '@/components/Services';
import Proof from '@/components/Proof';
import Process from '@/components/Process';
import WhyMe from '@/components/WhyMe';
import Pricing from '@/components/Pricing';
import LeadForm from '@/components/LeadForm';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import { HomeJsonLd } from '@/components/JsonLd';
import { getDictionary, isLocale } from '@/lib/i18n';
import { serviceMenu } from '@/lib/routes';

// The founder card (Nathan Alcotte, under the audit form) was hidden on Nass's
// request on 20 Oct 2026. The component (Founder.tsx) and its copy
// (dict.founder in en.ts and fr.ts) are kept: set this back to true to show it.
const SHOW_FOUNDER_CARD = false;

export default function Home({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const dict = getDictionary(lang);

  return (
    <>
      <HomeJsonLd dict={dict} lang={lang} />
      <Nav
        dict={dict.nav}
        lang={lang}
        services={serviceMenu(lang)}
        servicesLabel={dict.verticals.shared.navHeading}
      />
      <main id="main">
        {/* Exploration B "Foret": forest green opens and closes the page (hero,
            then the audit form and the footer); the middle stays light. The
            form is the closing ask, so the footer drops its own CTA block. */}
        <Hero dict={dict.hero} lang={lang} />
        <LogoBar dict={dict.aiTools} tone="dark" />
        <Problem dict={dict.problem} lead={dict.atlasProof.lead} link={dict.atlasProof.link} lang={lang} />
        <Services dict={dict.services} tools={dict.marquee} lang={lang} />
        <AiChoice dict={dict.aiChoice} chain={dict.verticals.geo.chain} lang={lang} />
        <Proof dict={dict.proof} atlas={dict.atlasProof} lang={lang} />
        <WhyMe dict={dict.whyMe} />
        <Process dict={dict.process} lang={lang} />
        <Pricing dict={dict.pricing} lang={lang} />
        <Faq dict={dict.faq} />
        <LeadForm
          anchor="audit"
          variant="audit"
          section={dict.audit}
          form={dict.audit.form}
          submitLabel={dict.audit.form.submit}
          talk={{ prefix: dict.audit.talkPrefix, link: dict.audit.talkLink, note: dict.footer.ctaNote }}
          sample={null}
          founder={SHOW_FOUNDER_CARD ? dict.founder : null}
          errors={dict.errors}
          lang={lang}
        />
      </main>
      <Footer dict={dict.footer} lang={lang} hideCta />
    </>
  );
}
