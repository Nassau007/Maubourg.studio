export const en = {
  nav: {
    links: [
      { label: 'Why GEO', hash: '#problem' },
      { label: 'Process', hash: '#process' },
      { label: 'Pricing', hash: '#pricing' },
    ],
    blog: 'Blog (FR)',
    // One label on desktop and on a phone: the hook has one name everywhere.
    cta: 'Free GEO audit',
    ctaShort: 'Free GEO audit',
    languageLabel: 'Language',
  },

  hero: {
    badge: 'GEO and AI agents studio for ecommerce',
    title: 'When buyers ask ChatGPT what to buy,',
    titleAccent: 'is your brand in the answer?',
    subtitle:
      'We get your brand into the answers ChatGPT, Gemini and Perplexity give, and we measure what that traffic is worth. For your operations, we build AI agents that absorb the repetitive work your team carries.',
    ctaPrimary: 'Get a free GEO audit →',
    talkPrefix: 'Prefer to talk first?',
    ctaSecondary: 'Book a 15-min call →',
    skillsHeading: 'Our three areas',
    // The first card is the headline offer and renders wide. The other two sit
    // under it, smaller, so the page does not contradict the hero.
    skills: [
      {
        name: 'LLM visibility (GEO)',
        body: 'Getting your brand cited, and described correctly, when a buyer asks ChatGPT, Gemini, Perplexity or Claude. Then measuring what that channel is worth.',
      },
      {
        name: 'AI agents',
        body: 'Agents built on your real processes, for the repetitive tasks that occupy your team without creating value.',
      },
      {
        name: 'Conversion',
        body: 'When it is the store losing the sale: A/B testing on product pages, cart and checkout.',
      },
    ],
  },

  marquee: {
    heading: 'Our tools',
    items: [
      'Shopify',
      'WooCommerce',
      'ChatGPT',
      'Gemini',
      'Perplexity',
      'Claude',
      'GA4',
    ],
    // Compliance is not a tool, so it sits under the strip rather than in it.
    note: 'EU / GDPR compliant.',
  },

  problem: {
    eyebrow: 'Why GEO',
    title: 'Buyers now ask an AI before they search.',
    pains: [
      {
        title: 'Your brand isn’t in the answer',
        body: 'More shoppers ask ChatGPT, Gemini or Perplexity for a recommendation. The answer names a handful of brands. To the buyer, the others do not exist.',
      },
      {
        title: 'Your analytics don’t show it',
        body: 'Most of it happens without a click. The visits that do follow are usually filed as direct traffic in your tools. So you see neither what this channel earns you nor what it costs you.',
      },
      {
        title: 'Your SEO does not answer it',
        body: 'An AI does not rank pages, it reads sources and checks that they agree. Being first on Google helps, but it does not get you cited. The work is a different one, and most stores have not started it.',
      },
    ],
  },

  // The four-step chain from the GEO page, condensed. It runs on the same
  // dictionary data (verticals.geo.chain), so the two can never disagree.
  aiChoice: {
    eyebrow: 'Under the hood',
    title: 'How an AI picks a brand',
    subtitle: 'Four steps. You influence two.',
    conclusion: 'All of our work goes into the two steps you can influence.',
    link: 'Understand our approach →',
  },

  services: {
    eyebrow: 'What we do',
    title: 'First be in the answer. Then free up your team.',
    intro:
      'Our work starts with your brand’s visibility in AI answers: being cited, and described correctly. It continues with agents that take over your team’s repetitive tasks. And when it is the store itself losing the sale, we fix conversion.',
    tags: { geo: 'GEO', ai: 'AI agents', conversion: 'Conversion' },
    items: [
      {
        tag: 'GEO',
        title: 'Audit',
        page: 'geo',
        body: 'What ChatGPT, Gemini, Perplexity and Claude say about your brand and your competitors, measured over repeated runs on real buying questions.',
      },
      {
        tag: 'GEO',
        title: 'Measure',
        page: 'geo',
        body: 'GA4 set up to show the traffic that comes from AI tools and what those visitors do on your site.',
      },
      {
        tag: 'GEO',
        title: 'Improve',
        page: 'geo',
        body: 'The work that gets you cited more often: product pages that read clearly, presence on the sites AI tools consult, wrong information corrected at the source. Much of it run by our own agents.',
      },
      {
        tag: 'AI agents',
        title: 'Operations agents',
        page: 'agents',
        body: 'Agents that take the repetitive work off your team: order triage, supplier chasing, returns, internal reporting. Scoped to your real workflow, not a generic chatbot.',
      },
      {
        tag: 'AI agents',
        title: 'Catalogue agent',
        page: 'agents',
        body: 'An agent that writes and refreshes product copy, fills metadata gaps, and flags listings that underperform, across a catalog too big to edit by hand.',
      },
      {
        tag: 'Conversion',
        title: 'Conversion rate optimization',
        page: 'conversion',
        body: 'Continuous A/B testing across product pages, cart and checkout, starting with the leaks that cost the most. You see the revenue impact, not flattering metrics.',
      },
    ],
  },

  // Proof. One column today: the second, the example GEO audit PDF, ships when
  // that document exists. Nothing here is published before it is real.
  proof: {
    eyebrow: 'Proof',
    title: 'We did it on our own site first.',
    body: 'Every page here ships structured data, a machine-readable sitemap, an explicit policy for AI crawlers and a plain-text summary of what the studio does. You are reading what we would put in place for you.',
  },

  process: {
    eyebrow: 'How it works',
    title: 'A free audit, a fixed-scope programme, then monitoring over time.',
    claim: 'Request my audit →',
    steps: [
      {
        step: '01',
        name: 'GEO audit',
        price: 'Free',
        body: 'We ask ChatGPT, Gemini, Perplexity and Claude 4 buying questions from your category, 5 times each, and measure whether your brand is cited, which brands replace it, and how it is described. Three priority actions, as a 3–4 page PDF, within 3 working days. The document is yours.',
      },
      {
        step: '02',
        name: 'Programme',
        price: 'Fixed scope',
        body: 'We make your store readable and corroborated: structured data, pages that answer buying questions, wrong information corrected, presence on the sources AI tools consult. Six weeks, scope and price agreed up front.',
      },
      {
        step: '03',
        name: 'Monitoring',
        price: 'Monthly',
        body: 'The same questions are asked again every month, traffic from AI tools is followed in GA4, and we iterate on what moved. Corroboration is won slowly, which is where the results compound.',
      },
    ],
  },

  whyMe: {
    eyebrow: 'Why Maubourg',
    title: 'Three things worth knowing before you talk to us.',
    points: [
      {
        title: 'French-speaking by focus',
        body: 'An AI answers a question asked in French from sources in French: press, forums, review sites. We work only with brands selling in France and French-speaking markets. So we know which sources count in your category.',
      },
      {
        title: 'Figures you can check',
        body: 'Every visibility figure we give comes from the same question asked several times, in the same tools your buyers use. Never from a single screenshot.',
      },
      {
        title: 'Our own agents run the studio',
        body: 'Audits, reporting, test QA: our own delivery runs on agents we built. You get faster turnaround, and proof that what we sell works.',
      },
    ],
  },

  founder: {
    name: 'Nathan Alcotte',
    role: 'Founder, Maubourg Studio',
    photoAlt: 'Nathan Alcotte, founder of Maubourg Studio',
    initials: 'NA',
    blurb: 'Ecommerce ops and automation, in Paris. I run your audit myself.',
  },

  pricing: {
    eyebrow: 'Pricing',
    title: 'Clear ranges, a short commitment.',
    intro:
      'Start with a free audit or a fixed-scope project, then continue with monthly monitoring. Every monthly engagement runs a 3-month minimum: that is how long a change takes to become measurable.',
    mostRequested: 'Most requested',
    perMonth: '/mo',
    // GEO first, because it is what the studio now sells first. `action` is
    // resolved to a URL in the component: 'audit' is the form on this page,
    // 'diagnostic' the one on the conversion page, 'call' the call page.
    groups: [
      {
        heading: 'Visibility in AI answers',
        items: [
          {
            name: 'Free GEO audit',
            price: '€0',
            meta: '3 working days',
            desc: '4 buying questions, 4 AI tools, 5 runs each. Your citation rate, the brands cited instead of you, three priority actions.',
            cta: 'Request my audit',
            action: 'audit',
            featured: true,
            badge: false,
          },
          {
            name: 'In-depth GEO audit',
            price: '€900–1,500',
            meta: '10 working days',
            desc: '20 buying questions, 4 AI tools. Competitors cited, the sources AI tools use in your category, a prioritised roadmap. Credited toward your programme.',
            cta: 'Book a call',
            action: 'call',
            featured: false,
            badge: false,
          },
          {
            name: 'GEO programme',
            price: '€3,500–6,000',
            meta: 'Six weeks, fixed scope',
            desc: 'Your store made readable and corroborated, with a before and after measured on the same questions.',
            cta: 'Book a call',
            action: 'call',
            featured: false,
            badge: true,
          },
          {
            name: 'Monthly GEO monitoring',
            price: '€900–1,800',
            meta: 'Per month, 3-month minimum',
            desc: 'The same questions asked again every month, AI traffic followed in GA4, iterations on what moved.',
            cta: 'Book a call',
            action: 'call',
            featured: false,
            badge: false,
          },
        ],
      },
      {
        heading: 'AI agents',
        items: [
          {
            name: 'AI agent build',
            price: '€3,000–8,000',
            meta: 'One workflow',
            desc: 'One agent, scoped to a real process, built, tested and handed over with its documentation.',
            cta: 'Book a call',
            action: 'call',
            featured: false,
            badge: false,
          },
        ],
      },
      {
        heading: 'Conversion',
        items: [
          {
            name: 'Free conversion diagnostic',
            price: '€0',
            meta: '3 working days',
            desc: '5 fixes ranked by revenue impact.',
            cta: 'Request the diagnostic',
            action: 'diagnostic',
            featured: false,
            badge: false,
          },
          {
            name: 'In-depth conversion audit',
            price: '€500–1,500',
            meta: 'Full report',
            desc: 'Full report and prioritised roadmap. Credited toward your first sprint or retainer.',
            cta: 'Book a call',
            action: 'call',
            featured: false,
            badge: false,
          },
          {
            name: 'Optimization sprint',
            price: '€1,500–3,500',
            meta: '2 to 3 weeks',
            desc: 'The main findings of the audit fixed in 2 to 3 weeks, at a fixed scope.',
            cta: 'Book a call',
            action: 'call',
            featured: false,
            badge: false,
          },
        ],
      },
    ],
    retainersHeading: 'Monthly conversion retainer',
    retainerCta: 'Start with a diagnostic',
    retainers: [
      {
        tier: 'Starter',
        price: '€1,000–1,500',
        features: ['1–2 tests / month', 'Monthly reporting', 'Small fixes included'],
      },
      {
        tier: 'Growth',
        price: '€2,000–3,500',
        features: ['Ongoing A/B testing', 'Product page and checkout optimization'],
      },
      {
        tier: 'Scale',
        price: '€4,000–6,000+',
        features: [
          'Full conversion programme',
          'Multiple concurrent tests',
          'Priority handling and a monthly strategy call',
        ],
      },
    ],
    footnote: 'Indicative ranges, price agreed before we start.',
  },

  // The free GEO audit: the one hook on the site. The conversion diagnostic
  // has the same shape and lives on the conversion page.
  audit: {
    eyebrow: 'Free GEO audit',
    title: 'Find out whether your brand is in the answer.',
    intro:
      'Give us your store’s address and your category. Within 3 working days you get a 3–4 page PDF: the 4 buying questions we asked ChatGPT, Gemini, Perplexity and Claude (5 times each), how often each one cites your brand, the brands cited instead of you, how you are described, and the three actions to start with. Free, and the document is yours.',
    points: [
      '4 real buying questions from your category, asked 5 times to 4 AI tools: a frequency, not a screenshot',
      'The brands cited instead of you, and why',
      'A 3–4 page PDF within 3 working days',
      'No obligation: run the actions yourself, or we talk',
    ],
    talkPrefix: 'Prefer to talk first?',
    talkLink: 'Book a 15-minute call →',
    form: {
      step1Of2: 'Step 1 of 2',
      step2Of2: 'Step 2 of 2',
      step1Title: 'What is your store’s address?',
      step2Title: 'Almost done.',
      step2Intro: 'Two details so the audit reaches you, in your name.',
      continue: 'Continue →',
      back: '← Back',
      name: 'Your name',
      namePlaceholder: 'Jane Doe',
      email: 'Email',
      emailPlaceholder: 'jane@brand.com',
      storeUrl: 'Store URL',
      storeUrlPlaceholder: 'brand.com',
      category: 'Your product category',
      categoryPlaceholder: 'e.g. linen shirts, food supplements, outdoor furniture',
      categoryHelp: 'Used to write the 4 buying questions we put to the AI tools.',
      platform: 'Platform',
      monthlyRevenue: 'Monthly revenue',
      revenueHelp: 'Only used to size the figures in your audit.',
      select: 'Select…',
      message: 'A competitor or a question in particular?',
      optional: '(optional)',
      messagePlaceholder: 'Anything you would like us to look at.',
      submit: 'Send me my free GEO audit →',
      submitting: 'Sending…',
      privacy: 'No spam. Your email is only used to send the audit, and to follow up once.',
      revenueBands: [
        'Under €10k / month',
        '€10k–50k / month',
        '€50k–200k / month',
        '€200k–500k / month',
        '€500k+ / month',
      ],
      platforms: ['Shopify', 'WooCommerce', 'Other'],
    },
    success: {
      title: 'Request received.',
      body: 'We’ll put your category’s buying questions to the four AI tools and send your audit PDF within 3 working days. Keep an eye on your inbox.',
      again: 'Submit another store',
    },
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Common questions',
    items: [
      {
        q: 'What is GEO?',
        a: 'GEO (generative engine optimization) is the work of getting your brand mentioned, and described correctly, when someone asks an AI tool like ChatGPT or Perplexity for a recommendation. It overlaps with SEO but depends above all on what other sites say about you.',
      },
      {
        q: 'Can you guarantee ChatGPT will recommend us?',
        a: 'No, and nobody honestly can. AI answers vary from one question to the next. What we can do is measure where you stand today, fix what’s in your control, and show you the change over time with the same method.',
      },
      {
        q: 'How do you measure traffic from AI tools?',
        a: 'We set up GA4 so that visits coming from ChatGPT, Perplexity and the other AI tools appear as their own channel, with what those visitors do on the site. Part of this traffic arrives with no trace of where it came from, so we always say how much the figures may undercount.',
      },
      {
        q: 'Is the GEO audit really free?',
        a: 'Yes. We ask ChatGPT, Gemini, Perplexity and Claude 4 buying questions from your category, 5 times each, and send you a 3–4 page PDF within 3 working days: your presence, the brands cited instead of you, and three priority actions. No charge and no obligation. If the actions are worth it, we can talk about them; the document is yours either way.',
      },
      {
        q: 'Who do you work with?',
        a: 'Ecommerce brands selling in France and French-speaking markets (Belgium, Switzerland), typically on Shopify or WooCommerce. We focus on French-speaking markets because an AI answers a question asked in French from sources in French, and that’s the ground we know. Brands based elsewhere that sell into France are welcome.',
      },
      {
        q: 'Do you actually build the AI agents, or just resell a tool?',
        a: 'We build them. Each agent is scoped to one real workflow in your business, built against your systems, tested, and handed over with documentation. You own it. We use the same agents to run our own delivery, so we only ship what we trust ourselves.',
      },
      {
        q: 'How fast will I see results?',
        a: 'On visibility in AI answers: what depends on your own site (structured data, pages that answer buying questions, corrected information) is in place within weeks, and the programme runs six weeks. Corroboration by other sources is won over several months, which is why monitoring runs a 3-month minimum. On conversion: the fixes from a sprint are live within weeks, and the compounding gains come from the retainer.',
      },
      {
        q: 'How do you measure success?',
        a: 'With figures you can check: the share of AI answers where your brand appears, the traffic coming from AI tools and what it buys, conversion rate and revenue added at the same ad spend. If we can’t measure it, we don’t claim it.',
      },
    ],
  },

  footer: {
    ctaTitle: 'Start with a',
    ctaAccent: 'free GEO audit.',
    ctaPrimary: 'Request my audit →',
    talkPrefix: 'Prefer to talk first?',
    ctaSecondary: 'Book a 15-min call →',
    ctaNote: 'Fifteen minutes, no sales deck, no obligation.',
    tagline: 'GEO and AI agents studio for ecommerce',
    market: 'France and French-speaking markets',
    rights: 'All rights reserved.',
    privacy: 'Privacy',
  },

  call: {
    metaTitle: 'Request a call - Maubourg Studio',
    metaDescription:
      'Leave your number and we’ll call you back: 15 minutes on your presence in AI answers, your operations or your store. No obligation.',
    back: '← Back to home',
    eyebrow: 'Request a call',
    title: 'Leave us your number.',
    titleAccent: 'We’ll call you.',
    subtitle:
      'Tell us the best time to reach you. We’ll call within one working day for a direct conversation: your presence in AI answers, a process worth automating, or what is holding your sales back.',
    points: [
      {
        title: 'A real conversation, not a demo',
        body: '15 minutes on your situation and what is worth dealing with first. Useful whether or not we work together.',
      },
      {
        title: 'We call you, on your time',
        body: 'Pick a window that suits you. No calendar ping-pong, no forms about forms.',
      },
      {
        title: 'No obligation, no pushing',
        body: 'If we can help, we’ll say so. If we can’t, you’ll still leave with something useful.',
      },
    ],
    teardownPrefix: 'Rather start with a document?',
    teardownLink: 'Get a free GEO audit →',
    form: {
      name: 'Your name',
      namePlaceholder: 'Jane Doe',
      phone: 'Phone number',
      phonePlaceholder: '+33 6 12 34 56 78',
      topic: 'What is it about?',
      topics: ['Visibility in AI answers (GEO)', 'AI agents', 'Conversion', 'Not sure yet'],
      preferredTime: 'Best time to reach you',
      email: 'Email',
      emailPlaceholder: 'jane@brand.com',
      storeUrl: 'Store URL',
      storeUrlPlaceholder: 'brand.com',
      message: 'What’s on your mind?',
      optional: '(optional)',
      messagePlaceholder: "A line on what you'd like to talk through.",
      select: 'Select…',
      submit: 'Request my call →',
      submitting: 'Sending…',
      note: 'A 15-minute call. No obligation, no pushing.',
      times: [
        'Weekday mornings',
        'Weekday afternoons',
        'Weekday evenings',
        'As soon as possible',
      ],
    },
    success: {
      title: 'We’ll call you.',
      body: 'Thanks, we’ve got your details and will call within one working day at the time you picked. No pitch, just a useful conversation.',
      again: 'Request another call',
    },
  },

  agentDemo: {
    metaTitle: 'Try an agent on your own product page - Maubourg Studio',
    metaDescription:
      'Paste one product page URL from your store. In about 30 seconds an agent reads it, names what is costing you sales, and writes a new description you can paste straight in. Free.',
    back: '← Back to home',
    eyebrow: 'Live agent demo',
    title: 'Watch an agent rewrite',
    titleAccent: 'one of your product pages.',
    subtitle:
      'Paste a product page from your own store. An agent reads it, names the single thing costing you the most sales, and writes a new description ready to paste. About 30 seconds, and the result opens on this page.',
    form: {
      label: 'Product page URL',
      placeholder: 'brand.com/products/your-product',
      submit: 'Run the agent →',
      running: 'Running…',
      note: 'Free. About 30 seconds. No email, no signup: the result opens right here.',
      privacy:
        'The URL is used only to produce this result. Nothing is written to a database, and the rebuilt page is dropped an hour later.',
    },
    loading: {
      steps: ['Reading your product page…', 'Analysing the copy…', 'Writing the rewrite…'],
    },
    what: {
      heading: 'What you are looking at',
      items: [
        {
          title: 'One agent, one task',
          body: 'It reads a live page, diagnoses the copy and rewrites it. Nothing is written back to your store, ever.',
        },
        {
          title: 'It answers in your language',
          body: 'The output follows the language of the page you submit, not the language of this site.',
        },
        {
          title: 'We built it',
          body: 'Same hand that builds the agents we sell. This one is small on purpose, so you can check its work in a minute.',
        },
      ],
    },
    gate: {
      ready: 'Your rewrite is ready.',
      productLabel: 'Product',
      verdictLabel: 'The verdict starts',
      gapsFound: '{n} issues found on this page',
      gapsFoundOne: '1 issue found on this page',
      // The reward, named at the point of the ask. Withheld when the
      // substitution did not work, because promising a page we cannot show is
      // the one thing worse than not promising it.
      previewPromise:
        'Your own product page has been rebuilt with the new description in place of the old one. It opens here, and you can download it.',
      intro: 'Tell us where to send it. The full result opens here as soon as you do.',
      name: 'Your name',
      namePlaceholder: 'Jane Doe',
      email: 'Email',
      emailPlaceholder: 'jane@brand.com',
      consent: 'Send me occasional emails about ecommerce conversion. Unsubscribe anytime.',
      submit: 'Show me the full result →',
      submitting: 'Opening…',
      use: 'We use your email to send you a copy of this result and to reply if you write back.',
      privacyLink: 'How we handle it',
    },
    result: {
      verdictLabel: 'The verdict',
      beforeLabel: 'Your current copy',
      afterLabel: 'The rewrite',
      gapsLabel: 'What is missing',
      copy: 'Copy the rewrite',
      copied: 'Copied',
      previewLabel: 'Your page, with the new copy in it',
      previewNote:
        'This is your own product page, your design and your images, with the new description where the old one was. It runs with all scripts removed, so parts that need JavaScript may look different. Nothing was written to your store.',
      previewMarker: 'New copy',
      previewOpen: 'Open in a new tab',
      previewDownload: 'Download the HTML',
      previewExpires: 'This page stays available for an hour, then the copy on our side is dropped.',
      previewUnavailable:
        'We could not place the new copy back into this page with certainty, so we did not rebuild it. Rather than risk showing you a broken version of your own store, here is the rewrite on its own.',
      emailed: 'A copy is on its way to your inbox.',
      lowConfidence:
        'This page was hard to read automatically, so the rewrite may be based on partial content.',
      again: 'Try another product page',
    },
    frame: {
      title: 'That was one agent doing one task, in about 30 seconds.',
      body: 'The ones we build run continuously across a full catalog: writing and refreshing copy, filling metadata gaps, and flagging the listings that quietly lose sales.',
      ctaPrimary: 'Book a 15-min call →',
      teardownPrefix: 'Rather start with a document?',
      teardownLink: 'Get a free GEO audit →',
    },
    errors: {
      BAD_REQUEST: 'Something in that request did not come through. Please try again.',
      INVALID_URL: 'That does not look like a web address. Paste the full URL of a product page.',
      BLOCKED_URL: 'That address cannot be reached from here. Paste a public product page URL.',
      INVALID_EMAIL: 'Please add a valid email.',
      FETCH_FAILED:
        'We could not open that page. It may be protected against automated visits. Try a different product URL.',
      NOT_A_PRODUCT:
        'We could not find a product on that page. Paste the URL of a single product page rather than a homepage or a collection.',
      TOKEN_EXPIRED: 'This result has expired. Run the agent again on the same URL, it is free.',
      RATE_LIMITED:
        'The demo has hit its daily limit. It runs on a small budget. Book a 15-minute call or request a free GEO audit instead.',
      MODEL_ERROR: 'The agent could not finish that one. Please try again in a moment.',
    },
    resultEmail: {
      subject: 'Your rewrite: {product}',
      intro:
        '{name}, here is what our agent found on your page for {product}, exactly as it appeared on the site.',
      verdictLabel: 'The verdict',
      beforeLabel: 'Your current copy',
      afterLabel: 'The rewrite',
      gapsLabel: 'What is missing',
      previewNote:
        'Your page with the new copy already in it is open in the browser tab you ran this from, for the next hour. It is a rebuilt copy for you to look at, nothing was changed on your store.',
      frame:
        'That was one agent doing one task. The ones we build run continuously across a full catalog. If you want to see what that would look like on yours, book 15 minutes.',
      cta: 'Book a 15-minute call',
      footer:
        'Sent by Maubourg Studio because you asked for this rewrite on maubourg.studio. Reply to this email and a human reads it.',
    },
  },

  privacy: {
    metaTitle: 'Privacy - Maubourg Studio',
    metaDescription:
      'What we collect when you request a teardown, a call or an agent demo, what we do with it, and how to have it deleted.',
    back: '← Back to home',
    eyebrow: 'Privacy',
    title: 'What we collect, and why.',
    updated: 'Last updated: July 2026',
    intro:
      'Maubourg Studio is a one-person studio based in Paris. This page says plainly what happens to what you type into this site. If something here is unclear, email us and ask.',
    sections: [
      {
        title: 'When you request a teardown or a call',
        body: 'We keep your name, email, phone number, store URL and anything you wrote in the message field. We use them to write your teardown, to call you back, and to follow up once. They are stored on our own server in the EU and are not sold or shared.',
      },
      {
        title: 'When you run the agent demo',
        body: 'You give us a product page URL and nothing else. We ask for no name and no email, and the whole result opens on the page. The URL, the page content and the rebuilt copy of your page are held in memory and dropped within the hour, never written to a database. We do send ourselves a copy of what the agent said, so we can see how it performs on real stores.',
      },
      {
        title: 'Mailing lists',
        body: 'The demo puts you on no list, because it asks for no address. The only emails we send are replies about a teardown or a call you requested yourself, and you can tell us to stop in one line.',
      },
      {
        title: 'The agent and the model',
        body: 'The text of the page you submit is sent to Anthropic, the provider of the model that writes the rewrite, to produce the answer. Nothing about you goes with it, because the demo never asked for anything about you.',
      },
      {
        title: 'What we do not do',
        body: 'No advertising cookies, no analytics tags, no consent banner, because there is nothing to consent to. We count runs and results server-side without identifying anyone: IP addresses are hashed for rate limiting and never stored in the clear.',
      },
      {
        title: 'Your rights',
        body: 'You can ask what we hold on you, ask for a copy, or ask us to delete it. Email us and we do it within a few days, no forms and no questions. You can also complain to the CNIL if you think we handled it badly.',
      },
    ],
    contactPrefix: 'Questions, or want your details deleted? Email',
  },

  // The three service pages. Each has its own shape rather than a shared
  // template, because each argument is made differently: GEO with a retrieval
  // chain and three blocks of work, agents with a live demo, conversion with a
  // funnel. fr.ts mirrors this key for key.
  verticals: {
    shared: {
      navHeading: 'Services',
      navBlurb: 'Three things we do, and how each one earns its keep.',
      breadcrumb: 'Services',
      backHome: '← Back to home',
      relatedHeading: 'Where this leads next',
      ctaEyebrow: 'Start here',
      ctaTitle: 'Start with a free GEO audit.',
      ctaBody:
        'We ask ChatGPT, Gemini, Perplexity and Claude 4 buying questions from your category, 5 times each, and send you your citation rate and three priority actions within 3 working days. No call first, nothing owed.',
      ctaPrimary: 'Request my audit →',
      ctaSecondary: 'Book a 15-minute call',
      priceNote: 'Indicative ranges. The price follows what is at stake, not the hours spent.',
    },

    conversion: {
      nav: {
        label: 'Conversion',
        blurb: 'Fix what loses the sale on the store you already have.',
      },
      meta: {
        title: 'Conversion rate optimization - Maubourg Studio',
        description:
          'A/B testing across product pages, cart and checkout, highest-value leaks first, for ecommerce brands selling in France and French-speaking markets.',
      },
      hero: {
        eyebrow: 'Conversion',
        title: 'You already paid for the traffic.',
        titleAccent: 'Make more of it buy.',
        subtitle:
          'Being recommended, by an AI tool or by anyone else, is worth nothing if the page it lands on loses the sale. Here the work is on the store itself: find where buyers drop off, fix that first, then test the fix rather than assume its effect.',
        ctaPrimary: 'Get a free conversion diagnostic →',
        ctaSecondary: 'Book 15 minutes',
        stat: '+1 point',
        statNote:
          'of conversion on 20,000 sessions at 60€ is roughly 12,000€ a month, at the same ad spend.',
      },
      funnel: {
        eyebrow: 'Where the sale is lost',
        title: 'Five steps, four places to lose people.',
        intro:
          'Every store loses visitors in the same places. The point of an audit is finding which one costs you the most: fixing the third problem before the first is how six months disappear.',
        steps: [
          { label: 'Sessions', note: 'Traffic you already pay for' },
          { label: 'Product page', note: 'Most leave here. Copy, proof, delivery terms' },
          { label: 'Cart', note: 'Shipping cost revealed too late' },
          { label: 'Checkout', note: 'Forced accounts, too many fields' },
          { label: 'Purchase', note: 'What everything above is judged on' },
        ],
        caption: 'Illustrative. Your real numbers come out of the diagnostic.',
      },
      leaks: {
        eyebrow: 'What we find most often',
        title: 'The same leaks, store after store.',
        intro:
          'These are not hypotheticals: they are the findings that come up most often in our diagnostics, each one checked against a screenshot of the real page before it goes in a report.',
        columns: { leak: 'What we find', cost: 'Why it costs', fix: 'What we do' },
        rows: [
          {
            leak: 'Delivery terms nowhere near the price',
            cost: 'The most common question at the moment of decision goes unanswered; the buyer leaves to look for it elsewhere.',
            fix: 'Put the terms beside the price, then test the wording and not just the placement.',
          },
          {
            leak: 'Product copy that opens on specifications',
            cost: 'The first line spends the only attention you get on details that do not matter to the buyer yet.',
            fix: 'Rewrite benefit first, keep the specification underneath as proof.',
          },
          {
            leak: 'An account required to check out',
            cost: 'No guest checkout is often the single largest recoverable loss on a store.',
            fix: 'Open guest checkout, then measure the change rather than assuming it.',
          },
          {
            leak: 'No size, fit or usage guidance',
            cost: 'Uncertainty becomes an abandoned cart or a return, and both cost you.',
            fix: 'Put the guidance where the doubt happens, on the page, not in an FAQ.',
          },
          {
            leak: 'Proof that arrives after the decision',
            cost: 'Reviews placed below the fold only persuade people who already scrolled past the buy button.',
            fix: 'Move the strongest proof up, and test how much of it earns the space.',
          },
        ],
      },
      how: {
        eyebrow: 'How it runs',
        title: 'Diagnostic, sprint, then compounding.',
        steps: [
          {
            name: 'Diagnostic',
            price: 'Free',
            body: 'Five fixes ranked by impact. The document is yours, whether or not we work together.',
          },
          {
            name: 'Sprint',
            price: '1,500€ to 3,500€',
            body: 'Two to three weeks, fixed scope, the top findings shipped and measured.',
          },
          {
            name: 'Retainer',
            price: 'from 1,000€ / month',
            body: 'Continuous testing, three-month minimum, the time it takes for a test to be significant.',
          },
        ],
      },
      // The free conversion diagnostic. Same form as the GEO audit on the
      // homepage, different ask, its own anchor (#diagnostic).
      diagnostic: {
        eyebrow: 'Free conversion diagnostic',
        title: 'Get 5 fixes ranked by revenue impact.',
        intro:
          'Tell us where your store lives. Within 3 working days you get a 3–4 page PDF: the leaks that cost you the most first, plus the two or three you could ship this week. Free, and the document is yours.',
        points: [
          'A real audit of your live store, not a generic checklist',
          'Findings ranked by impact and effort, so you know where to start',
          'A 3–4 page PDF within 3 working days',
          'No obligation: apply the fixes yourself, or we talk',
        ],
        sampleTitle: 'See a real diagnostic before you ask for yours.',
        sampleBody: 'A full diagnostic run for a real brand, anonymised.',
        sampleLink: 'Read the example diagnostic (PDF) →',
        submit: 'Send me my free diagnostic →',
        success: {
          title: 'Request received.',
          body: 'We’ll go through your store and send your diagnostic PDF within 3 working days. Keep an eye on your inbox.',
          again: 'Submit another store',
        },
      },
      cta: {
        title: 'Start with a free conversion diagnostic.',
        body: 'We go through your store and send you the five fixes worth the most. No call first, nothing owed.',
        primary: 'Request the diagnostic →',
      },
      related: [
        {
          page: 'geo',
          text: 'Being named in an AI answer brings buyers to the page this work fixes.',
        },
        {
          page: 'agents',
          text: 'An agent can rewrite a catalogue faster than a team can test one page.',
        },
      ],
    },

    geo: {
      nav: { label: 'LLM visibility (GEO)', blurb: 'Be the brand AI tools cite.' },
      meta: {
        title: 'LLM visibility (GEO) - Maubourg Studio',
        description:
          'Audit, measure and improve how ChatGPT, Gemini, Perplexity and Claude name your brand. For ecommerce brands selling in France and French-speaking markets.',
      },
      hero: {
        eyebrow: 'Generative engine optimization',
        title: 'Buyers now ask an AI',
        titleAccent: 'before they ask a search engine.',
        subtitle:
          'Ask for the best linen shirt under 120€: an AI answers from a handful of sources it kept and judged reliable. Being one of those sources has nothing to do with ranking on Google, and few stores have prepared for it.',
        stat: 'A new channel',
        statNote: 'that cannot be bought, and does not show up in your analytics.',
        ctaPrimary: 'Get a free GEO audit →',
        ctaSecondary: 'Book 15 minutes',
      },
      what: {
        eyebrow: 'What it actually is',
        title: 'Not a ranking. A citation.',
        body: 'A search engine offers a list and lets the visitor choose. An AI reads the sources, decides, and gives one answer. There is no second page: cited or absent is the whole result. So the work is making your store legible to a machine that reads instead of crawling: sharp answers to the questions buyers ask, structured data that describes each page, and enough mentions elsewhere to be corroborated outside your own domain.',
      },
      chain: {
        eyebrow: 'How the answer gets made',
        title: 'Four steps. You influence two.',
        query: '“Best linen shirt under 120€ for hot weather?”',
        influenceLabel: 'Your leverage',
        steps: [
          {
            step: 'The question',
            note: 'Conversational, specific, usually with a budget attached',
            influence: 'None',
          },
          {
            step: 'Source selection',
            note: 'The AI gathers the sources it can read and understand',
            influence: 'This is where the work happens',
          },
          {
            step: 'Trust',
            note: 'It weighs corroboration: reviews, mentions, consistency between sources',
            influence: 'Earned, slowly',
          },
          {
            step: 'The answer',
            note: 'One recommendation, no second page',
            influence: 'None',
          },
        ],
        caption:
          'Source selection and trust are the two you can move. All of our work goes into those.',
      },
      blocks: {
        eyebrow: 'What the work is',
        title: 'Audit, measure, improve.',
        priceLabel: 'Price',
        auditBox: {
          title: 'What the free audit contains',
          items: [
            '4 buying questions from your category',
            'Asked 5 times to ChatGPT, Gemini, Perplexity and Claude',
            'Your citation rate, the brands cited instead of you, how you are described',
            '3 priority actions, as a PDF within 3 working days',
          ],
          cta: 'Request my audit →',
        },
        items: [
          {
            title: 'Audit',
            price: 'Free, or €900–1,500 for the in-depth audit',
            lead: 'What ChatGPT, Gemini, Perplexity and Claude say about your brand and your competitors, measured over repeated runs on real buying questions.',
            body: 'You get the questions we ran, how often each tool named you, which brands were named instead, and how your brand was described when it came up. The same questions are asked again later, so the second report is comparable to the first.',
          },
          {
            title: 'Measure',
            price: 'Included in the programme and in monthly monitoring, €900–1,800 / month',
            lead: 'GA4 set up to show the traffic that comes from AI tools and what those visitors do on your site.',
            body: 'Traffic from AI tools appears as its own channel in GA4, with how those visitors behave once on the site. Part of this traffic carries no trace of where it came from, so we say each time how much the figure may undercount.',
          },
          {
            title: 'Improve',
            price: 'GEO programme, €3,500–6,000',
            lead: 'The work that gets your brand mentioned more often: clearer product pages, presence on the sites AI tools rely on, corrected information. Much of it run by our own agents.',
            body: 'You get a prioritised list of what to change, then the work itself: pages that answer buying questions clearly, structured data consistent with the content, wrong information corrected where an AI repeats it, and presence on the sites your category is read from. We report what moved, and what did not.',
          },
        ],
      },
      // The GEO equivalent of the conversion page's findings table: what we
      // actually change on a store, so the offer stops being abstract.
      changes: {
        eyebrow: 'What we change, concretely',
        title: 'What this looks like on a real store.',
        intro:
          'Five findings that come up on almost every store we look at. Each one is checked on the live pages before it goes in a report.',
        columns: { finding: 'What we find', cost: 'What it costs', fix: 'What we do' },
        rows: [
          {
            finding: 'A product page that answers none of the usage questions',
            cost: 'The AI has nothing to quote on sizing, materials or care, so it quotes a competitor that does.',
            fix: 'Answer the buying questions in plain text on the page, where a machine can read them.',
          },
          {
            finding: 'Structured data missing, or contradicting the page',
            cost: 'Wrong markup teaches an AI something false with your name on it. Missing markup leaves the page ambiguous.',
            fix: 'Product, offer and review markup that matches what the page actually says.',
          },
          {
            finding: 'Absent from the comparisons and review sites of your category',
            cost: 'A claim only you make is a claim. An AI weighs corroboration, and finds none.',
            fix: 'A plan for presence on the sources your category is actually read from.',
          },
          {
            finding: 'Wrong price or delivery terms repeated by an AI',
            cost: 'The buyer reads an outdated figure and either leaves or arrives with the wrong expectation.',
            fix: 'Find where the stale information lives and correct it at the source.',
          },
          {
            finding: 'AI crawlers blocked in robots.txt',
            cost: 'The store cannot be cited because it cannot be read. The cheapest possible loss.',
            fix: 'Open the crawlers you want deliberately, and say which parts they may read.',
          },
        ],
      },
      reading: {
        heading: 'On this subject, from our blog',
        note: 'Written in French.',
      },
      honest: {
        title: 'What we will not promise you.',
        body: 'Nobody can guarantee a place in an AI answer, and anyone who promises one is selling what they cannot deliver. The mechanisms are recent, they change without notice, and there is no ranking to display. What we can do is make your store readable and corroborated, then measure your presence on real questions, so you see the change instead of taking our word for it.',
      },
      ourown: {
        title: 'We did this to our own site first.',
        body: 'This page, and every other page here, ships structured data, a machine-readable sitemap, an explicit policy for AI crawlers and a plain-text summary of what the studio does. You are reading what we would put in place for you.',
      },
      related: [
        {
          page: 'conversion',
          text: 'Being recommended is worth less if the page it lands on does not sell.',
        },
        {
          page: 'agents',
          text: 'A catalogue an AI can read is a catalogue kept up to date. That is an agent’s job.',
        },
      ],
    },

    agents: {
      nav: { label: 'AI agents', blurb: 'Software that does the repetitive work. Try one now.' },
      meta: {
        title: 'AI agents for ecommerce - Maubourg Studio',
        description:
          'AI agents scoped to your real processes: order triage, supplier chasing, catalogue upkeep. Try one on your own product page.',
      },
      hero: {
        eyebrow: 'AI agents',
        title: 'What your team redoes every week,',
        titleAccent: 'an agent can do in their place.',
        subtitle:
          'Not a chatbot parked in the corner of a site. An agent built for one precise process, with the tools it needs, boundaries it will not cross, and a handover to a person when it should stop. Easier to show than to describe, so one is running further down this page.',
        ctaPrimary: 'Try one on your product page ↓',
        ctaSecondary: 'Book a 15-minute call',
      },
      demoIntro: {
        eyebrow: 'A demonstration, not a promise',
        title: 'Give it one of your product pages.',
        body: 'It reads the page, identifies what is costing you the sale, and rewrites the description. About thirty seconds, no email and no signup: the result opens here. It is an agent deliberately limited to one task. The ones we build run continuously across a whole catalogue.',
      },
      families: {
        eyebrow: 'What we build',
        title: 'Two kinds of agent, scoped to your processes.',
        items: [
          {
            title: 'Operations agents',
            body: 'What occupies your team without creating value: order triage, chasing suppliers, processing returns, the internal report someone rebuilds by hand every Monday.',
            examples: [
              'Order triage and exceptions',
              'Supplier follow-up',
              'Returns processing',
              'Internal reporting',
            ],
          },
          {
            title: 'Catalogue & merchandising',
            body: 'Writes and refreshes product pages, completes the metadata nobody had time for, and flags the pages and listings that underperform before you notice.',
            examples: [
              'Description writing and refresh',
              'Missing metadata',
              'Underperforming listings',
              'Feed and catalogue quality',
            ],
          },
        ],
      },
      workflow: {
        eyebrow: 'How one is built',
        title: 'How we build an agent.',
        nodes: [
          { label: 'Trigger', note: 'An order lands, a page changes, a customer asks' },
          { label: 'Context', note: 'Only the data the task needs, nothing else' },
          { label: 'Tools', note: 'The systems it may touch, named one by one' },
          { label: 'Guardrail', note: 'What it may never do without a person' },
          { label: 'Handover', note: 'A human, with the context already written up' },
        ],
        caption: 'The guardrail is what still matters six months in. We design it first.',
      },
      guardrails: {
        title: 'The rules we build them under.',
        items: [
          'It never invents a fact about your products. If it could not read it, it does not claim it.',
          'Anything going to a customer stays a draft a person approves, until you decide otherwise.',
          'It touches the systems you listed and no others.',
          'Every run is logged: a mistake is traced, not debated.',
        ],
      },
      included: {
        title: 'We use them ourselves.',
        body: 'The agents we build for clients also run the studio: standardised reporting and onboarding, faster delivery, nothing slipping between the steps. It is what lets a studio our size carry this workload.',
      },
      price: {
        label: 'Agent build',
        value: '3,000€ to 8,000€',
        note: 'One agent, scoped to a real process, built, tested and handed over with its documentation.',
      },
      // This page keeps its own closing block: after a working demo the right
      // ask is a call, not the GEO audit.
      cta: {
        title: 'Have a process in mind?',
        primary: 'Book 15 minutes →',
        secondary: 'Or try the agent on one of your product pages ↑',
      },
      related: [
        {
          page: 'conversion',
          text: 'An agent that rewrites pages is worth more when you can measure which rewrite won.',
        },
        {
          page: 'geo',
          text: 'Catalogue upkeep at scale is also what makes you legible to an AI.',
        },
      ],
    },

  },

  // The AI visibility observatory. Structural labels only: the section's own
  // name, what it measures, and the words around a figure. The findings
  // themselves are written per edition once a campaign has produced them, and
  // nothing here claims a result.
  observatory: {
    nav: 'AI visibility observatory',
    eyebrow: 'Observatory',
    title: 'How AI tools answer about French ecommerce brands.',
    intro:
      'The studio runs the same panel of buying questions across ChatGPT, Gemini, Perplexity and Claude, several times per question, and publishes what comes back. Every figure carries the query it came from and the campaign that produced it.',
    meta: {
      title: 'AI visibility observatory - Maubourg Studio',
      description:
        'The studio’s own research on how French ecommerce brands appear in answers from ChatGPT, Gemini, Perplexity and Claude: method, figures by vertical, and archived editions.',
      methodTitle: 'Method - AI visibility observatory - Maubourg Studio',
      methodDescription:
        'How the observatory’s figures are produced: the query panel, the four engines, the number of runs per question, and what the numbers do not say.',
    },
    // Shown while a campaign has not produced data yet. It is a status, not a
    // placeholder: the page says plainly that there is nothing to read.
    empty: {
      title: 'No edition published yet.',
      body: 'The first campaign is being run. Editions are published here once the full panel has been passed, and are never edited afterwards.',
    },
    methodHeading: 'Method',
    verticalsHeading: 'By vertical',
    editionsHeading: 'Editions',
    methodLink: 'How these figures are produced →',
    backToIndex: '← Observatory',
    // The labels around an edition's own facts.
    facts: {
      campaign: 'Campaign',
      engines: 'Engines',
      queries: 'Queries',
      runsPerQuery: 'Runs per question',
      download: 'Download the aggregate table →',
    },
    verticals: {
      LIT: 'Bedding',
      COS: 'Clean cosmetics',
      CHA: 'Comfort shoes',
    },
    licence: 'Figures may be quoted with a link to this page.',
  },

  // The blog. Only the French pages are built today, so this block exists
  // mainly to hold the schema and keep fr.ts honest, but it is written as
  // real copy rather than as placeholders: the day an English article lands,
  // the section ships with it instead of waiting on a wording pass.
  articles: {
    meta: {
      title: 'Blog - Maubourg Studio',
      description:
        'Plain answers to the questions ecommerce owners ask about being cited by AI tools, AI agents and conversion.',
    },
    index: {
      eyebrow: 'Blog',
      title: 'The questions store owners actually ask.',
      intro:
        'Short pieces on visibility in AI answers, AI agents and conversion. One question each, answered in the first paragraph.',
      empty: 'Nothing published here yet.',
    },
    backToIndex: '← All articles',
    // Byline row under the headline: source, date, reading time.
    source: 'Maubourg Studio',
    readingTime: '{n} min read',
    cta: {
      title: 'This is work we do.',
      body: 'How it runs, what it costs, and where it stops.',
      // {service} is replaced with the mapped service's nav label.
      button: '{service} →',
    },
    relatedHeading: 'Related reading',
    // Closing CTA, narrative and citation templates only. `question`'s
    // headline is the article's own `question` field, not written here.
    closing: {
      question: {
        body: 'We look at your store, not a category average.',
        button: '{service} →',
      },
      minimal: {
        prefix: 'Want us to look at yours?',
        button: '{service} →',
      },
      conversational: {
        title: 'What if your case is different?',
        body: 'Every diagnostic starts from your store, not a standard template.',
        button: '{service} →',
      },
    },
    // Citation template only: the label above the pulled-out description.
    citationLabel: 'The sentence to remember',
  },

  errors: {
    name: 'Please add your name.',
    email: 'Please add a valid email.',
    emailOptional: 'That email looks off.',
    storeUrl: 'Please add your store URL.',
    category: 'Please add your product category.',
    phone: 'Please add a valid phone number.',
    form: 'Please check the form.',
    generic: 'Something went wrong. Please try again.',
    server: 'Something went wrong on our side. Please email us directly.',
    network: 'Network error. Please try again, or email us directly.',
  },

  meta: {
    homeTitle: 'Maubourg Studio - GEO and AI agents studio for ecommerce',
    homeDescription:
      'Maubourg Studio, in Paris, makes ecommerce brands visible in the answers ChatGPT, Gemini and Perplexity give, and builds AI agents for their operations. For brands selling in France and French-speaking markets.',
  },
};

export type Dictionary = typeof en;
