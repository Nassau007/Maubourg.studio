import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Problem from '@/components/Problem';
import Services from '@/components/Services';
import Process from '@/components/Process';
import WhyMe from '@/components/WhyMe';
import Pricing from '@/components/Pricing';
import TeardownForm from '@/components/TeardownForm';
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
        <Services dict={dict.services} lang={lang} />
        <Process dict={dict.process} lang={lang} />
        <WhyMe dict={dict.whyMe} />
        <Pricing dict={dict.pricing} lang={lang} />
        {/* The founder card renders inside the teardown section, beside the form. */}
        <TeardownForm
          dict={dict.teardown}
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
