// Central place to tweak contact details / links without hunting through JSX.
export const site = {
  name: 'Maubourg Studio',
  tagline: 'Build & Convert studio for European ecommerce',
  email: 'hello@maubourg.studio',
  // Internal request-a-call page. Point this at an external Calendly /
  // Cal.com link instead if you'd rather use a scheduling widget.
  bookingUrl: '/call',
  nav: [
    { label: 'The problem', href: '#problem' },
    { label: 'What we do', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
  ],
} as const;
