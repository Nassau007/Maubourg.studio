import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CallForm from '@/components/CallForm';

export const metadata: Metadata = {
  title: 'Request a call — Maubourg Studio',
  description:
    'Leave your number and we&rsquo;ll call you back — a real 15-minute conversation about your store&rsquo;s conversion, no obligation.',
};

const POINTS = [
  {
    title: 'A real conversation, not a demo',
    body: '15 minutes on where your store is leaking sales and what&rsquo;s worth fixing first — useful whether or not we work together.',
  },
  {
    title: 'We call you, on your time',
    body: 'Pick a window that suits you. No calendar ping-pong, no forms about forms.',
  },
  {
    title: 'No obligation, no hard sell',
    body: 'If there&rsquo;s a fit, we&rsquo;ll say so. If there isn&rsquo;t, you&rsquo;ll still leave with something useful.',
  },
];

export default function CallPage() {
  return (
    <>
      <Nav />
      <main className="pt-28 md:pt-36">
        <section className="mx-auto max-w-content px-5 pb-20 md:px-8 md:pb-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            {/* Left: pitch */}
            <div>
              <Link
                href="/"
                className="text-sm font-medium text-ink-500 transition-colors hover:text-ink"
              >
                ← Back to home
              </Link>

              <span className="eyebrow mt-6">Request a call</span>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-ink md:text-6xl">
                Let&rsquo;s talk about your store —{' '}
                <span className="italic text-emerald">we&rsquo;ll call you.</span>
              </h1>
              <p className="mt-5 max-w-md text-lg text-ink-600">
                Leave your number and the best time to reach you. We&rsquo;ll call within one working
                day for a quick, no-pressure conversation about where your conversion is leaking.
              </p>

              <ul className="mt-9 space-y-5">
                {POINTS.map((p) => (
                  <li key={p.title} className="flex items-start gap-3.5">
                    <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-emerald text-xs text-bone">
                      ✓
                    </span>
                    <div>
                      <h3 className="text-base font-semibold text-ink">{p.title}</h3>
                      <p
                        className="mt-1 text-sm leading-relaxed text-ink-600"
                        dangerouslySetInnerHTML={{ __html: p.body }}
                      />
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-9 text-sm text-ink-500">
                Rather have fixes in writing first?{' '}
                <Link
                  href="/#teardown"
                  className="font-semibold text-emerald underline-offset-4 hover:underline"
                >
                  Get a free store teardown →
                </Link>
              </p>
            </div>

            {/* Right: form */}
            <div>
              <CallForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
