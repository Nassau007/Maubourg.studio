import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Problem from '@/components/Problem';
import Services from '@/components/Services';
import Process from '@/components/Process';
import WhyMe from '@/components/WhyMe';
import Founder from '@/components/Founder';
import Pricing from '@/components/Pricing';
import TeardownForm from '@/components/TeardownForm';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import { getDictionary, isLocale } from '@/lib/i18n';

export default function Home({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const dict = getDictionary(lang);

  return (
    <>
      <Nav dict={dict.nav} lang={lang} />
      <main>
        <Hero dict={dict.hero} lang={lang} />
        <Marquee dict={dict.marquee} />
        <Problem dict={dict.problem} />
        <Services dict={dict.services} />
        <Process dict={dict.process} lang={lang} />
        <WhyMe dict={dict.whyMe} />
        {/* hasPhoto: flip to true once public/founder.jpg exists. */}
        <Founder dict={dict.founder} hasPhoto={false} />
        <Pricing dict={dict.pricing} lang={lang} />
        <TeardownForm dict={dict.teardown} errors={dict.errors} lang={lang} />
        <Faq dict={dict.faq} />
      </main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}
