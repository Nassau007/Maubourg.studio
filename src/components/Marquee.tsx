const ITEMS = [
  'Shopify',
  'WooCommerce',
  'Klaviyo',
  'GA4 & server-side tracking',
  'Meta & Google Ads',
  'A/B testing',
  'Checkout optimization',
  'EU / GDPR compliant',
];

export default function Marquee() {
  return (
    <section className="border-y border-ink/10 bg-bone-200/60 py-5">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
          The stack we optimize
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
          {ITEMS.map((item) => (
            <span
              key={item}
              className="text-sm font-medium text-ink-600"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
