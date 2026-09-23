import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
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
      <main>
        <Hero dict={dict.hero} lang={lang} />
        <Marquee dict={dict.marquee} />
        <Problem dict={dict.problem} />
        {/* The mechanism, before the offer: it is what makes the rest credible. */}
        <AiChoice dict={dict.aiChoice} chain={dict.verticals.geo.chain} lang={lang} />
        <Services dict={dict.services} lang={lang} />
        <Proof dict={dict.proof} lang={lang} />
        <Process dict={dict.process} lang={lang} />
        <WhyMe dict={dict.whyMe} />
        <Pricing dict={dict.pricing} lang={lang} />
        {/* The free GEO audit: the one hook on the site. The founder card
            renders inside this section, beside the form. */}
        <LeadForm
          anchor="audit"
          variant="audit"
          section={dict.audit}
          form={dict.audit.form}
          submitLabel={dict.audit.form.submit}
          talk={{ prefix: dict.audit.talkPrefix, link: dict.audit.talkLink }}
          sample={null}
          founder={dict.founder}
          errors={dict.errors}
          lang={lang}
        />
        <Faq dict={dict.faq} />
      </main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}
