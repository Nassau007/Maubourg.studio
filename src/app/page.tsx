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

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <Services />
        <Process />
        <WhyMe />
        <Pricing />
        <TeardownForm />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
