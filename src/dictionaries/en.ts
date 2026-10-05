export const en = {
  nav: {
    links: [
      { label: 'Why GEO', hash: '#problem' },
      { label: 'Process', hash: '#process' },
      { label: 'Pricing', hash: '#pricing' },
    ],
    blog: 'Blog (FR)',
    observatory: 'Observatory',
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
      'We get your brand cited, and described correctly, in the answers ChatGPT, Gemini, Perplexity and Claude give. Our own AI agent does the work on your product pages, then keeps it up to date.',
    ctaPrimary: 'Get a free GEO audit →',
    talkPrefix: 'Prefer to talk first?',
    ctaSecondary: 'Book a 15-min call →',
    skillsHeading: 'One offer, done with our own agent',
    // The first card is the offer itself and renders wide. The other two sit
    // under it, smaller: they are how the offer is done, not other services.
    skills: [
      {
        name: 'LLM visibility (GEO)',
        body: 'Getting your brand cited, and described correctly, when a buyer asks ChatGPT, Gemini, Perplexity or Claude. Then measuring what that channel is worth.',
      },
      {
        name: 'Our GEO agent',
        body: 'Set up on your catalogue, it rewrites your product pages so AI tools can quote them. Then it keeps watch as new pages are added.',
      },
      {
        name: 'Measured, before and after',
        body: 'The same buying questions asked several times to each AI tool, before the work and after it. Traffic from AI tools followed in GA4.',
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
    title: 'Be in the answer. Then stay there.',
    intro:
      'The work is your brand’s visibility in AI answers. Being cited, and described correctly. Our own agent does much of it. It is set up on your catalogue during the programme, then keeps watch in the monthly follow-up.',
    tags: { geo: 'GEO', ai: 'AI agent' },
    items: [
      {
        tag: 'GEO',
        title: 'Audit',
        page: 'geo',
        body: 'What ChatGPT, Gemini, Perplexity and Claude say about your brand and your competitors, measured over repeated runs on real buying questions.',
      },
      {
        tag: 'GEO',
        title: 'Improve',
        page: 'geo',
        body: 'Product pages an AI can quote while they still sell to a buyer, and wrong information corrected at the source. Much of it done by our own agent.',
      },
      {
        tag: 'GEO',
        title: 'Measure',
        page: 'geo',
        body: 'GA4 set up to show the traffic that comes from AI tools and what those visitors do on your site.',
      },
      {
        tag: 'AI agent',
        title: 'Set up on your catalogue',
        page: 'agents',
        body: 'In the programme, our agent rewrites your product pages so AI tools can quote them while they still sell to a human buyer, with their structured data.',
      },
      {
        tag: 'AI agent',
        title: 'On watch every month',
        page: 'agents',
        body: 'In the monthly follow-up, it reworks new product pages as they are added and flags wrong information about your brand.',
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
    title: 'A free audit, a fixed-scope programme, then a follow-up over time.',
    claim: 'Request my audit →',
    steps: [
      {
        step: '01',
        name: 'GEO audit',
        price: 'Free',
        body: 'We ask ChatGPT, Gemini, Perplexity and Claude 4 buying questions from your category, 5 times each, and measure whether your brand is cited, which brands replace it, and how it is described. Three priority actions, as a 3 to 4 page PDF, within 3 working days. The document is yours.',
      },
      {
        step: '02',
        name: 'Programme',
        price: 'Fixed scope',
        body: 'Our agent is set up on your catalogue and rewrites your product pages so AI tools can quote them. Around it we add structured data, pages that answer buying questions, corrected information and presence on the sources AI tools consult. Six weeks, or three for young brands, scope and price agreed up front.',
      },
      {
        step: '03',
        name: 'Monitoring',
        price: 'Monthly',
        body: 'The agent keeps watch. It reworks new product pages as they are added and flags wrong information about your brand. The same questions are asked again every month and traffic from AI tools is followed in GA4. Corroboration is won slowly, which is where the results compound.',
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
        body: 'Our audits and our reporting run on agents we built, the same kind we set up for you. You get faster turnaround, and proof that what we sell works.',
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
      'Start with a free audit. Then a fixed-scope programme sets our agent up on your catalogue, and the monthly follow-up keeps it running. The follow-up runs a 3-month minimum, which is how long a change takes to become measurable.',
    mostRequested: 'Most requested',
    // One offer, GEO, in two groups: the audits, then the work done with the
    // agent. `action` is resolved to a URL in the component: 'audit' is the
    // form on this page, 'call' the call page. The free audit stays first:
    // the structured data reads it as groups[0].items[0].
    groups: [
      {
        heading: 'Audit',
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
            price: '€900 to €1,500',
            meta: '10 working days',
            desc: '20 buying questions, 4 AI tools, 5 runs. Competitors cited, the sources AI tools rely on in your category, a prioritised roadmap. Deducted from the programme if it follows.',
            cta: 'Book a call',
            action: 'call',
            featured: false,
            badge: false,
          },
        ],
      },
      {
        heading: 'Programme and follow-up, with our agent',
        items: [
          {
            name: 'Essential GEO programme',
            price: '€1,500 to €2,500',
            meta: '3 weeks, fixed scope',
            desc: 'For young brands, €250k to €1M of annual revenue. AI crawlers let in and product structured data in place. Our agent set up on your 10 to 20 best-selling product pages. Before and after measured on the free audit’s 4 questions.',
            cta: 'Book a call',
            action: 'call',
            featured: false,
            badge: false,
          },
          {
            name: 'GEO programme',
            price: '€3,500 to €6,000',
            meta: '6 weeks, fixed scope',
            desc: 'Our agent set up on your catalogue, product pages rewritten so AI tools can quote them while they still sell to a buyer. Plus pages that answer buying questions, wrong information corrected and AI traffic measured in GA4. Before and after measured on the audit’s questions.',
            cta: 'Book a call',
            action: 'call',
            featured: false,
            badge: false,
          },
          {
            name: 'Monthly GEO follow-up',
            price: '€1,000 to €2,000',
            meta: 'Per month, 3-month minimum',
            desc: 'Our agent keeps watch. New product pages reworked as they are added, wrong information about your brand flagged. The same questions asked again every month, with a progress report.',
            cta: 'Book a call',
            action: 'call',
            featured: false,
            badge: false,
          },
        ],
      },
    ],
    footnote: 'Indicative ranges, price agreed before we start.',
  },

  // The free GEO audit: the one hook on the site.
  audit: {
    eyebrow: 'Free GEO audit',
    title: 'Find out whether your brand is in the answer.',
    intro:
      'Give us your store’s address and your category. Within 3 working days you get a 3 to 4 page PDF: the 4 buying questions we asked ChatGPT, Gemini, Perplexity and Claude (5 times each), how often each one cites your brand, the brands cited instead of you, how you are described, and the three actions to start with. Free, and the document is yours.',
    points: [
      '4 real buying questions from your category, asked 5 times to 4 AI tools: a frequency, not a screenshot',
      'The brands cited instead of you, and why',
      'A 3 to 4 page PDF within 3 working days',
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
        a: 'Yes. We ask ChatGPT, Gemini, Perplexity and Claude 4 buying questions from your category, 5 times each, and send you a 3 to 4 page PDF within 3 working days: your presence, the brands cited instead of you, and three priority actions. No charge and no obligation. If the actions are worth it, we can talk about them; the document is yours either way.',
      },
      {
        q: 'Who do you work with?',
        a: 'Ecommerce brands selling in France and French-speaking markets (Belgium, Switzerland), from €250k to €20M of annual revenue with a focus on €1M to €20M, typically on Shopify or WooCommerce. We focus on French-speaking markets because an AI answers a question asked in French from sources in French, and that’s the ground we know. Brands based elsewhere that sell into France are welcome.',
      },
      {
        q: 'Do you actually build the AI agent, or just resell a tool?',
        a: 'We build it. In the GEO programme, our agent is set up on your catalogue, tested and documented. In the monthly follow-up, we keep it running. The rewritten pages and the data it produces are yours, and the agent stays our tool. It touches only the systems you list, and anything going to a customer stays a draft a person approves until you decide otherwise. We run the studio on the same agents, so we only ship what we trust ourselves.',
      },
      {
        q: 'How fast will I see results?',
        a: 'What depends on your own site (structured data, product pages an AI can quote, corrected information) is in place within weeks. The Essential programme runs three weeks, the full programme six. Corroboration by other sources is won over several months, which is why the follow-up runs a 3-month minimum.',
      },
      {
        q: 'How do you measure success?',
        a: 'With figures you can check. The share of AI answers where your brand appears, on the same questions before and after, and the traffic coming from AI tools and what it buys. If we can’t measure it, we don’t claim it.',
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
      'Leave your number and we’ll call you back: 15 minutes on how AI tools talk about your brand and what to do about it. No obligation.',
    back: '← Back to home',
    eyebrow: 'Request a call',
    title: 'Leave us your number.',
    titleAccent: 'We’ll call you.',
    subtitle:
      'Tell us the best time to reach you. We’ll call within one working day for a direct conversation about your presence in AI answers and where to start.',
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
      topics: ['Visibility in AI answers (GEO)', 'The GEO agent', 'Not sure yet'],
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
    metaTitle: 'See your product page as an AI assistant reads it - Maubourg Studio',
    metaDescription:
      'Paste one product page from your store. In about 30 seconds an agent shows what AI assistants like ChatGPT and Perplexity can read on it, and rewrites the description so an AI can quote it. Free.',
    back: '← Back to home',
    eyebrow: 'Live GEO agent demo',
    title: 'See your product page',
    titleAccent: 'the way an AI assistant reads it.',
    subtitle:
      'Paste a product page from your own store. An agent checks what ChatGPT, Perplexity or Claude can actually read on it and names what keeps them from quoting it. Then it rewrites the description so an AI can quote it and a buyer still wants the product. About 30 seconds.',
    form: {
      label: 'Product page URL',
      placeholder: 'brand.com/products/your-product',
      submit: 'Run the agent →',
      running: 'Running…',
      note: 'Free. About 30 seconds. The diagnosis opens here, no email needed.',
      privacy:
        'The URL is used only to produce this result and is never written to a database. The result is held in memory for 30 minutes.',
    },
    loading: {
      steps: [
        'Reading your product page and your robots.txt…',
        'Checking what an AI crawler gets from it…',
        'Writing the new description…',
      ],
    },
    what: {
      heading: 'What you are looking at',
      items: [
        {
          title: 'One agent, one task',
          body: 'It reads one live page and rewrites one description. Nothing is ever written to your store.',
        },
        {
          title: 'It answers in your language',
          body: 'The output follows the language of the page you submit, not the language of this site.',
        },
      ],
    },
    checks: {
      heading: 'What an AI tool gets from this page',
      intro: 'Measured by code on your page as it is online. The agent does not guess these.',
      crawler: {
        title: 'What an AI crawler sees',
        intro:
          'Most AI crawlers read the HTML of a page without running JavaScript. We fetched your page the same way.',
        facts: {
          name: 'Product name',
          price: 'Price',
          availability: 'Availability',
          description: 'Description',
        },
        places: {
          text: 'In the page text',
          meta: 'Only in structured data or meta tags',
          absent: 'Not in the HTML',
        },
        words: '{n} words',
        short: '{n} words, little to quote',
        absentNote:
          'A fact that is not in the HTML is most likely added by JavaScript. An AI crawler that does not run it never sees that fact.',
      },
      robots: {
        title: 'AI bots your robots.txt lets in',
        intro: 'robots.txt is one file for your whole site. It tells each bot which pages it may read.',
        fileRead: 'File read: {host}/robots.txt, applied to this page address.',
        answerGroup: 'Bots that read a page to answer a question',
        answerNote: 'Blocking one of these stops that assistant from reading your page when it answers.',
        trainingGroup: 'Bots that collect pages to train a model',
        trainingNote: 'Blocking these does not stop your page being cited in answers.',
        allowed: 'Allowed',
        blocked: 'Blocked',
        byRule: 'by the rule',
        missing: 'Your site has no robots.txt (the server answered {status}), so every AI bot is allowed.',
        unreadable: 'We could not read your robots.txt ({reason}). We report nothing we could not read.',
        reasonStatus: 'the server answered {status}',
        reasonNoAnswer: 'no answer in time',
        firewall:
          'This reads robots.txt only. A firewall or a CDN setting can still turn a bot away, and that does not show here.',
      },
      structured: {
        title: 'Product structured data',
        intro: 'A JSON-LD Product block states the product facts in a form a machine reads without guessing.',
        fields: {
          name: 'Name',
          price: 'Price and currency',
          availability: 'Availability',
          brand: 'Brand',
          identifier: 'SKU or GTIN',
          rating: 'Rating',
          shipping: 'Shipping details',
          returns: 'Return policy',
        },
        present: 'Present',
        missing: 'Missing',
        none: 'No Product structured data found on this page.',
        invalid: 'This page has a Product block, but it is not valid JSON, so a machine cannot read it.',
        microdata:
          'No JSON-LD Product block. The page marks the product up as microdata instead, which this check does not read field by field.',
      },
    },
    gate: {
      ready: 'Your new description is ready.',
      productLabel: 'Product',
      verdictLabel: 'The verdict starts',
      gapsFound: '{n} issues found on this page',
      gapsFoundOne: '1 issue found on this page',
      whatOpens: [
        'The description rewritten so an AI can quote it, ready to paste.',
        'A Product block built from the facts on your page, ready to paste.',
      ],
      // The reward, named at the point of the ask. Withheld when the
      // substitution did not work, because promising a page we cannot show is
      // the one thing worse than not promising it.
      previewPromise:
        'Your own product page has also been rebuilt with the new description in place of the old one. It opens here, and you can download it.',
      // When the page HTML has no description to replace. Never "in place of".
      previewPromiseInserted:
        'Your page has no description in its HTML text, so an AI crawler reads none. We rebuilt your page with the new description added under the product title. It opens here, and you can download it.',
      intro: 'Tell us where to send it. It opens here as soon as you do.',
      name: 'Your name',
      namePlaceholder: 'Jane Doe',
      email: 'Email',
      emailPlaceholder: 'jane@brand.com',
      consent: 'Send me occasional emails about visibility in AI answers. Unsubscribe anytime.',
      submit: 'Show me the new description →',
      submitting: 'Opening…',
      use: 'We use your name and email to send you a copy of this result and to reply if you write back.',
      privacyLink: 'How we handle it',
    },
    result: {
      verdictLabel: 'The verdict',
      beforeLabel: 'Your current description',
      afterLabel: 'The new description',
      gapsLabel: 'What keeps AI assistants from quoting it',
      copy: 'Copy the new description',
      copied: 'Copied',
      previewLabel: 'Your page, with the new description in it',
      previewNote:
        'This is your own product page, your design and your images, with the new description where the old one was. It runs with all scripts removed, so parts that need JavaScript may look different. Nothing was written to your store.',
      previewMarker: 'New description',
      previewLabelInserted: 'Your page, with the new description added',
      previewNoteInserted:
        'This is your own product page, your design and your images. Its HTML had no description in the text to replace. If your page shows one, a script adds it, and an AI crawler runs no scripts. So the new description is added under the product title, where a crawler reads it. The page runs with all scripts removed, so parts that need JavaScript may look different. Nothing was written to your store.',
      previewMarkerInserted: 'Added by the agent',
      previewOpen: 'Open in a new tab',
      previewDownload: 'Download the HTML',
      previewExpires: 'This page stays available for an hour, then the copy on our side is dropped.',
      previewUnavailable:
        'We could not place the new description back into this page with certainty, so we did not rebuild it. Rather than risk showing you a broken version of your own store, here is the new description on its own.',
      previewUnavailableNoHtml:
        'Your page HTML has no description in its text and no product title to put one under. The product area is most likely drawn by JavaScript, so there is no page to rebuild. An AI crawler gets the same empty page. Here is the new description on its own.',
      emailed: 'A copy is on its way to your inbox.',
      lowConfidence:
        'This page was hard to read automatically, so the new description may be based on partial content.',
      again: 'Try another product page',
    },
    productBlock: {
      label: 'Product block, ready to paste',
      intro:
        'Built from the facts on your page and the new description. It goes in the HTML of this product page. If your theme already prints a Product block, replace that one rather than adding a second.',
      copy: 'Copy the block',
      copied: 'Copied',
      toComplete: 'Left out because your page does not state it. Add a field only if it is true.',
      complete: 'Every field we check is filled from your page.',
      fields: {
        price: 'Price and currency',
        availability: 'Availability',
        brand: 'Brand',
        image: 'Image',
        sku: 'SKU',
        gtin: 'GTIN (the barcode number)',
        rating: 'Rating, from real reviews only',
        shipping: 'Shipping details',
        returns: 'Return policy',
      },
    },
    frame: {
      title: 'That was one agent doing one task, in about 30 seconds.',
      body: 'On a full catalogue, the agent we set up does this on every product page and keeps watch as new ones are added. It also flags wrong information about your brand.',
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
      subject: 'What AI assistants read on {product}',
      intro:
        '{name}, here is what our agent found on your page for {product}, as it was online when you ran it.',
      verdictLabel: 'The verdict',
      gapsLabel: 'What keeps AI assistants from quoting it',
      checksLabel: 'What an AI tool gets from this page',
      beforeLabel: 'Your current description',
      afterLabel: 'The new description',
      blockLabel: 'Product block, ready to paste',
      blockNote:
        'It goes in the HTML of this product page. If your theme already prints a Product block, replace that one rather than adding a second.',
      toCompleteLabel: 'Left out because your page does not state it',
      previewNote:
        'Your page with the new description already in it is open in the browser tab you ran this from, for the next hour. It is a rebuilt copy for you to look at. Nothing was changed on your store.',
      frame:
        'That was one agent doing one task. On a full catalogue, the agent we set up does this on every product page and keeps watch as new ones are added. If you want to see what that would look like on yours, book 15 minutes.',
      cta: 'Book a 15-minute call',
      footer:
        'Sent by Maubourg Studio because you asked for this result on maubourg.studio. Reply to this email and a human reads it.',
    },
  },

  privacy: {
    metaTitle: 'Privacy - Maubourg Studio',
    metaDescription:
      'What we collect when you request a teardown, a call or an agent demo, what we do with it, and how to have it deleted.',
    back: '← Back to home',
    eyebrow: 'Privacy',
    title: 'What we collect, and why.',
    updated: 'Last updated: October 2026',
    intro:
      'Maubourg Studio is a one-person studio based in Paris. This page says plainly what happens to what you type into this site. If something here is unclear, email us and ask.',
    sections: [
      {
        title: 'When you request a teardown or a call',
        body: 'We keep your name, email, phone number, store URL and anything you wrote in the message field. We use them to write your teardown, to call you back, and to follow up once. They are stored on our own server in the EU and are not sold or shared.',
      },
      {
        title: 'When you run the agent demo',
        body: 'You give us the URL of a product page. The diagnosis and the checks open on the page without asking you for anything else. To open the new description and the Product block, you give us your name and your email. We use them to send you a copy of the result and to reply if you write back. If you tick the box under the form, we also send you occasional emails about visibility in AI answers.',
      },
      {
        title: 'How long the demo keeps it',
        body: "The URL, the content of the page and the result are held in our server's memory and never written to a database. A result you do not open is dropped after 30 minutes. The rebuilt copy of your page is dropped one hour after you open it. Both also disappear whenever the site restarts. When you give your name and email, two emails go out. One carries the result to you. The other tells us who ran the demo, with your name, your email, the URL and the result. That one is kept in our mailbox for 12 months, then deleted, or sooner if you ask us to.",
      },
      {
        title: 'Who receives it',
        body: 'Only Maubourg Studio reads what you send, and nothing is sold or shared. A few providers handle it on our behalf. Railway runs the server the site lives on. Resend sends the emails. Google hosts our mailbox. Anthropic provides the model that writes the new description and receives the text of the page you submitted, never your name or email, because the model has finished before you are asked for them.',
      },
      {
        title: 'Mailing lists',
        body: 'The demo adds you to a list only if you tick the box under the form. Without it, the only emails you get are the copy of your result and replies to what you write. Either way, one line from you is enough to make them stop.',
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

  // The service pages. Each has its own shape rather than a shared template,
  // because each argument is made differently: GEO with a retrieval chain and
  // three blocks of work, the agent with a live demo. fr.ts mirrors this key
  // for key.
  verticals: {
    shared: {
      navHeading: 'Services',
      navBlurb: 'GEO, and the agent we deliver it with.',
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

    geo: {
      nav: { label: 'LLM visibility (GEO)', blurb: 'Be the brand AI tools cite.' },
      meta: {
        title: 'LLM visibility (GEO) - Maubourg Studio',
        description:
          'Audit, improve and measure how ChatGPT, Gemini, Perplexity and Claude cite your brand, with our own agent on your catalogue. For ecommerce brands selling in France and French-speaking markets.',
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
        title: 'Audit, improve, measure.',
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
            price: 'Free, or €900 to €1,500 for the in-depth audit',
            lead: 'What ChatGPT, Gemini, Perplexity and Claude say about your brand and your competitors, measured over repeated runs on real buying questions.',
            body: 'You get the questions we ran, how often each tool named you, which brands were named instead, and how your brand was described when it came up. The same questions are asked again later, so the second report is comparable to the first. The in-depth audit runs 20 questions over 10 working days. It adds the sources AI tools rely on in your category and a prioritised roadmap, and its price is deducted from the programme if one follows.',
          },
          {
            title: 'Improve',
            price: 'GEO programme, €3,500 to €6,000 over 6 weeks. Essential programme, €1,500 to €2,500 over 3 weeks.',
            lead: 'Our agent set up on your catalogue. Your product pages rewritten so AI tools can quote them while they still sell to a human buyer, with their structured data.',
            body: 'Around the agent, the programme adds pages that answer buying questions and corrects wrong information at the source. It opens your site to AI crawlers, plans your presence on third-party sources and sets up GA4 to measure AI traffic. The before and after is measured on the audit’s questions. For young brands (€250k to €1M of annual revenue), the Essential programme covers AI crawler access and product structured data, with the agent on your 10 to 20 best-selling product pages, measured on the free audit’s 4 questions.',
          },
          {
            title: 'Measure',
            price: 'Included in the programme. Monthly follow-up, €1,000 to €2,000 / month, 3-month minimum.',
            lead: 'GA4 set up to show the traffic that comes from AI tools, and the same questions asked again every month.',
            body: 'In the monthly follow-up, our agent keeps watch. It reworks new product pages as they are added and flags wrong information about your brand. Each month you get a progress report, the work on third-party sources continues, and we iterate on what moved. Part of AI traffic carries no trace of where it came from, so we say each time how much the figure may undercount.',
          },
        ],
      },
      // What we actually change on a store, so the offer stops being abstract.
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
          page: 'agents',
          text: 'The agent that does much of this work. You can run it on one of your own product pages.',
        },
      ],
    },

    agents: {
      nav: { label: 'AI agents', blurb: 'How we do the GEO work. Try it now.' },
      meta: {
        title: 'AI agents for GEO - Maubourg Studio',
        description:
          'Our AI agent does the GEO work on your catalogue. It rewrites product pages so AI tools can quote them, then keeps watch every month. Try it on your own product page.',
      },
      hero: {
        eyebrow: 'AI agents',
        title: 'Your product pages, rewritten for AI answers,',
        titleAccent: 'and kept that way.',
        subtitle:
          'The agent is how we deliver GEO, not a product sold on its own. In the programme it is set up on your catalogue. In the monthly follow-up it keeps watch. It is easier to show than to describe, so one is running further down this page.',
        ctaPrimary: 'Try one on your product page ↓',
        ctaSecondary: 'Book a 15-minute call',
      },
      demoIntro: {
        eyebrow: 'A demonstration, not a promise',
        title: 'Give it one of your product pages.',
        body: 'It reads the page the way an AI crawler does and rewrites the description so an AI can quote it. About thirty seconds. The diagnosis opens here with no email. The new description asks for one. It is an agent deliberately limited to one task. The one we set up for clients works across a whole catalogue.',
      },
      families: {
        eyebrow: 'What it does',
        title: 'Set up in the programme, then on watch every month.',
        items: [
          {
            title: 'Set up on your catalogue',
            body: 'Part of the GEO programme. The agent rewrites your product pages so AI tools can quote them while they still sell to a human buyer, and gives each page its structured data. It is delivered once, tested and documented.',
            examples: [
              'Product pages rewritten for AI answers',
              'Structured data that matches the page',
              'Your 10 to 20 best-selling pages in the Essential programme',
              'Tested and documented',
            ],
          },
          {
            title: 'On watch every month',
            body: 'Part of the monthly follow-up. As you add product pages, the agent reworks them the same way. When it finds wrong information about your brand, it flags it so it can be corrected at the source.',
            examples: [
              'New product pages reworked as they are added',
              'Wrong information about your brand flagged',
              'Reported to you every month',
            ],
          },
        ],
      },
      workflow: {
        eyebrow: 'How one is built',
        title: 'How we build an agent.',
        nodes: [
          { label: 'Trigger', note: 'A product page is added or changed' },
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
        body: 'The studio runs on its own agents, from the audits to the reporting. It is part of the proof that what we sell works, and what lets a studio our size carry this workload.',
      },
      // No agent price: it comes with the programme and the follow-up.
      price: {
        label: 'Price',
        value: 'No separate price',
        note: 'The agent comes with the GEO programme, which sets it up, and with the monthly follow-up, which keeps it running.',
        link: 'See the prices →',
      },
      // This page keeps its own closing block: after a working demo the right
      // ask is a call, not the GEO audit.
      cta: {
        title: 'Want to see it on your catalogue?',
        primary: 'Book 15 minutes →',
        secondary: 'Or try the agent on one of your product pages ↑',
      },
      related: [
        {
          page: 'geo',
          text: 'The rest of the GEO work, starting with the free audit.',
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
        'Plain answers to the questions ecommerce owners ask about being visible in ChatGPT, Perplexity, Gemini and AI search.',
    },
    index: {
      eyebrow: 'Blog',
      title: 'The questions store owners actually ask.',
      intro:
        'Short pieces on how a brand shows up in ChatGPT, Perplexity and Gemini answers. One question each, answered in the first paragraph.',
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
        body: 'Every audit starts from your store, not a standard template.',
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
      'Maubourg Studio, in Paris, makes ecommerce brands visible and correctly described in the answers of ChatGPT, Gemini, Perplexity and Claude, with its own AI agents doing the work. For brands selling in France and French-speaking markets.',
  },
};

export type Dictionary = typeof en;
