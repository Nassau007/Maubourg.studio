// Central place to tweak contact details / links without hunting through JSX.
export const site = {
  name: 'Maubourg Studio',
  tagline: 'Build & Convert studio for European ecommerce',
  email: 'hello@maubourg.studio',
  // Swap for your real Calendly / Cal.com link.
  bookingUrl: 'https://cal.com/maubourg/intro',
  nav: [
    { label: 'The problem', href: '#problem' },
    { label: 'What we do', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
  ],
} as const;
