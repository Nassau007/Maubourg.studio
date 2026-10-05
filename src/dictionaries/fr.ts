import type { Dictionary } from './en';

export const fr: Dictionary = {
  nav: {
    links: [
      { label: 'Pourquoi le GEO', hash: '#problem' },
      { label: 'Méthode', hash: '#process' },
      { label: 'Tarifs', hash: '#pricing' },
    ],
    blog: 'Blog',
    observatory: 'Observatoire',
    // Un seul libellé sur ordinateur et sur mobile.
    cta: 'Audit GEO gratuit',
    ctaShort: 'Audit GEO gratuit',
    languageLabel: 'Langue',
  },

  hero: {
    badge: 'Studio GEO et agents IA pour l’e-commerce',
    title: 'Quand un acheteur demande à ChatGPT quoi acheter,',
    titleAccent: 'votre marque est-elle dans la réponse ?',
    subtitle:
      'Nous faisons citer votre marque, et décrire correctement, dans les réponses de ChatGPT, Gemini, Perplexity et Claude. Notre propre agent IA fait le travail sur vos fiches produit, puis le tient à jour.',
    ctaPrimary: 'Demander un audit GEO gratuit →',
    talkPrefix: 'Vous préférez en parler d’abord ?',
    ctaSecondary: 'Réserver un appel de 15 min →',
    skillsHeading: 'Une offre, menée avec notre propre agent',
    skills: [
      {
        name: 'Visibilité LLM (GEO)',
        body: 'Faire citer votre marque, et la faire décrire correctement, quand un acheteur interroge ChatGPT, Gemini, Perplexity ou Claude. Puis mesurer ce que ce canal rapporte.',
      },
      {
        name: 'Notre agent GEO',
        body: 'Installé sur votre catalogue, il réécrit vos fiches produit pour que les IA puissent les citer. Puis il veille à mesure que de nouvelles fiches arrivent.',
      },
      {
        name: 'Mesuré, avant et après',
        body: 'Les mêmes questions d’achat posées plusieurs fois à chaque IA, avant le travail et après. Le trafic venu des IA suivi dans GA4.',
      },
    ],
  },

  marquee: {
    heading: 'Nos outils',
    items: [
      'Shopify',
      'WooCommerce',
      'ChatGPT',
      'Gemini',
      'Perplexity',
      'Claude',
      'GA4',
    ],
    note: 'Conforme UE / RGPD.',
  },

  problem: {
    eyebrow: 'Pourquoi le GEO',
    title: 'Les acheteurs interrogent une IA avant de chercher.',
    pains: [
      {
        title: 'Votre marque n’est pas dans la réponse',
        body: 'De plus en plus d’acheteurs demandent une recommandation à ChatGPT, Gemini ou Perplexity. La réponse cite quelques marques. Pour l’acheteur, les autres n’existent pas.',
      },
      {
        title: 'Vos statistiques ne le montrent pas',
        body: 'L’essentiel se joue sans clic. Les visites qui en découlent sont le plus souvent classées en trafic direct dans vos outils. Vous ne voyez donc ni ce que ce canal vous rapporte, ni ce qu’il vous fait perdre.',
      },
      {
        title: 'Votre SEO n’y répond pas',
        body: 'Une IA ne classe pas des pages, elle lit des sources et vérifie qu’elles se recoupent. Être premier sur Google aide, mais ne garantit pas d’être cité. Le travail à faire est différent, et la plupart des boutiques ne l’ont pas commencé.',
      },
    ],
  },

  aiChoice: {
    // REVIEW-FR: seul le sur-titre est de nous, le reste vient de la revue.
    eyebrow: 'Le mécanisme',
    title: 'Comment une IA choisit une marque',
    subtitle: 'Quatre étapes. Vous n’en influencez que deux.',
    conclusion: 'Tout notre travail porte sur les deux étapes que vous pouvez influencer.',
    link: 'Comprendre notre approche →',
  },

  services: {
    eyebrow: 'Ce que nous faisons',
    title: 'Être dans la réponse. Puis y rester.',
    intro:
      'Le travail porte sur la visibilité de votre marque dans les réponses des IA. Être cité, et correctement décrit. Notre propre agent en fait une grande partie. Il est installé sur votre catalogue pendant le programme, puis il veille pendant le suivi mensuel.',
    tags: { geo: 'GEO', ai: 'Agent IA' },
    items: [
      {
        tag: 'GEO',
        title: 'Audit',
        page: 'geo',
        body: 'Ce que ChatGPT, Gemini, Perplexity et Claude disent de votre marque et de vos concurrents, mesuré sur des séries de vraies questions d’achat.',
      },
      {
        tag: 'GEO',
        title: 'Amélioration',
        page: 'geo',
        body: 'Des fiches produit qu’une IA peut citer et qui donnent toujours envie d’acheter, et des informations erronées corrigées à la source. En grande partie mené par notre propre agent.',
      },
      {
        tag: 'GEO',
        title: 'Mesure',
        page: 'geo',
        body: 'GA4 configuré pour montrer le trafic qui vient des IA et ce que ces visiteurs font sur votre site.',
      },
      {
        tag: 'Agent IA',
        title: 'Installé sur votre catalogue',
        page: 'agents',
        body: 'Pendant le programme, notre agent réécrit vos fiches produit pour que les IA puissent les citer tout en donnant envie à un acheteur, avec leurs données structurées.',
      },
      {
        tag: 'Agent IA',
        title: 'En veille chaque mois',
        page: 'agents',
        body: 'Pendant le suivi mensuel, il retravaille les nouvelles fiches à mesure qu’elles sont ajoutées et signale les informations fausses sur votre marque.',
      },
    ],
  },

  proof: {
    // REVIEW-FR: sur-titre de nous, texte repris de la revue.
    eyebrow: 'Preuve',
    title: 'Nous l’avons d’abord fait sur notre propre site.',
    body: 'Chaque page de ce site embarque des données structurées, un sitemap lisible par machine, une politique explicite pour les robots d’IA et un résumé en texte brut de ce que fait le studio. Vous lisez ce que nous mettrions en place pour vous.',
  },

  process: {
    eyebrow: 'Comment ça marche',
    title: 'Un audit gratuit, un programme à périmètre fixe, puis un suivi dans la durée.',
    claim: 'Demander mon audit →',
    steps: [
      {
        step: '01',
        name: 'Audit GEO',
        price: 'Gratuit',
        body: 'Nous posons 4 questions d’achat de votre catégorie à ChatGPT, Gemini, Perplexity et Claude, 5 fois chacune, et mesurons si votre marque est citée, par qui elle est remplacée, et comment elle est décrite. Trois actions prioritaires, en PDF de 3 à 4 pages, sous 3 jours ouvrés. Le document vous appartient.',
      },
      {
        step: '02',
        name: 'Programme',
        price: 'Périmètre fixe',
        body: 'Notre agent est installé sur votre catalogue et réécrit vos fiches produit pour que les IA puissent les citer. Autour, nous ajoutons les données structurées, des pages qui répondent aux questions d’achat, les informations corrigées et une présence sur les sources que les IA consultent. Six semaines, ou trois pour les jeunes marques, périmètre et prix fixés à l’avance.',
      },
      {
        step: '03',
        name: 'Suivi',
        price: 'Mensuel',
        body: 'L’agent veille. Il retravaille les nouvelles fiches à mesure qu’elles arrivent et signale les informations fausses sur votre marque. Les mêmes questions sont reposées chaque mois et le trafic venu des IA est suivi dans GA4. La corroboration se gagne lentement, et c’est là que les résultats se cumulent.',
      },
    ],
  },

  whyMe: {
    eyebrow: 'Pourquoi Maubourg',
    // REVIEW-FR: titre de section et deux premiers points réécrits.
    title: 'Trois choses à savoir avant de nous parler.',
    points: [
      {
        title: 'Centrés sur le marché francophone',
        body: 'Une IA répond à une question posée en français à partir de sources en français : presse, forums, sites d’avis. Nous ne travaillons qu’avec des marques qui vendent en France et sur les marchés francophones. Nous savons donc quelles sources comptent dans votre catégorie.',
      },
      {
        title: 'Des chiffres que vous pouvez vérifier',
        body: 'Chaque chiffre de visibilité que nous donnons vient de la même question posée plusieurs fois, dans les outils que vos acheteurs utilisent. Jamais d’une capture d’écran isolée.',
      },
      {
        title: 'Nos propres agents font tourner le studio',
        body: 'Nos audits et notre reporting reposent sur des agents que nous avons construits, du même type que celui que nous installons chez vous. Vous y gagnez en rapidité, et la preuve que ce que nous vendons fonctionne.',
      },
    ],
  },

  founder: {
    name: 'Nathan Alcotte',
    role: 'Fondateur, Maubourg Studio',
    photoAlt: 'Nathan Alcotte, fondateur de Maubourg Studio',
    initials: 'NA',
    blurb: 'Opérations e-commerce et automatisation, à Paris. C’est moi qui réalise votre audit.',
  },

  pricing: {
    eyebrow: 'Tarifs',
    title: 'Des fourchettes claires, un engagement court.',
    intro:
      'Commencez par un audit gratuit. Un programme à périmètre fixe installe ensuite notre agent sur votre catalogue, et le suivi mensuel le fait tourner. Le suivi dure 3 mois minimum : c’est le temps qu’il faut pour qu’une évolution soit mesurable.',
    mostRequested: 'Le plus demandé',
    groups: [
      {
        heading: 'Audit',
        items: [
          {
            name: 'Audit GEO gratuit',
            price: '0 €',
            meta: 'Sous 3 jours ouvrés',
            desc: '4 questions d’achat, 4 IA, 5 passages chacune. Votre taux de citation, les marques citées à votre place, trois actions prioritaires.',
            cta: 'Demander mon audit',
            action: 'audit',
            featured: true,
            badge: false,
          },
          {
            name: 'Audit GEO approfondi',
            price: '900 à 1 500 €',
            meta: 'Sous 10 jours ouvrés',
            desc: '20 questions d’achat, 4 IA, 5 passages. Concurrents cités, sources sur lesquelles les IA s’appuient dans votre catégorie, feuille de route priorisée. Déduit du programme s’il suit.',
            cta: 'Réserver un appel',
            action: 'call',
            featured: false,
            badge: false,
          },
        ],
      },
      {
        heading: 'Programme et suivi, avec notre agent',
        items: [
          {
            name: 'Programme GEO Essentiel',
            price: '1 500 à 2 500 €',
            meta: '3 semaines, périmètre fixe',
            desc: 'Pour les jeunes marques, de 250 k€ à 1 M€ de chiffre d’affaires annuel. Les robots d’IA autorisés et les données structurées produit en place. Notre agent installé sur vos 10 à 20 fiches les plus vendues. Avant / après mesuré sur les 4 questions de l’audit gratuit.',
            cta: 'Réserver un appel',
            action: 'call',
            featured: false,
            badge: false,
          },
          {
            name: 'Programme GEO',
            price: '3 500 à 6 000 €',
            meta: '6 semaines, périmètre fixe',
            desc: 'Notre agent installé sur votre catalogue, vos fiches réécrites pour que les IA puissent les citer tout en donnant envie à un acheteur. En plus, des pages qui répondent aux questions d’achat, les informations erronées corrigées et le trafic IA mesuré dans GA4. Avant / après mesuré sur les questions de l’audit.',
            cta: 'Réserver un appel',
            action: 'call',
            featured: false,
            badge: false,
          },
          {
            name: 'Suivi GEO mensuel',
            price: '1 000 à 2 000 €',
            meta: 'Par mois, 3 mois minimum',
            desc: 'Notre agent veille. Les nouvelles fiches retravaillées à mesure qu’elles arrivent, les informations fausses sur votre marque signalées. Les mêmes questions reposées chaque mois, avec un rapport de progression.',
            cta: 'Réserver un appel',
            action: 'call',
            featured: false,
            badge: false,
          },
        ],
      },
    ],
    footnote: 'Fourchettes indicatives, prix fixé avant de démarrer.',
  },

  audit: {
    eyebrow: 'Audit GEO gratuit',
    title: 'Sachez si votre marque est dans la réponse.',
    intro:
      'Indiquez l’adresse de votre boutique et votre catégorie. Sous 3 jours ouvrés, vous recevez un PDF de 3 à 4 pages : les 4 questions d’achat que nous avons posées à ChatGPT, Gemini, Perplexity et Claude (5 fois chacune), la fréquence à laquelle chacun cite votre marque, les marques citées à votre place, la façon dont vous êtes décrit, et les trois actions à lancer en premier. C’est gratuit, et le document vous appartient.',
    points: [
      '4 vraies questions d’achat de votre catégorie, posées 5 fois à 4 IA : une fréquence, pas une capture d’écran',
      'Les marques citées à votre place, et pourquoi',
      'Un PDF de 3 à 4 pages sous 3 jours ouvrés',
      'Sans engagement : appliquez les actions vous-même, ou parlons-en',
    ],
    talkPrefix: 'Vous préférez en parler d’abord ?',
    talkLink: 'Réserver un appel de 15 minutes →',
    form: {
      step1Of2: 'Étape 1 sur 2',
      step2Of2: 'Étape 2 sur 2',
      step1Title: 'Quelle est l’adresse de votre boutique ?',
      step2Title: 'Presque terminé.',
      step2Intro: 'Deux informations pour que l’audit vous parvienne, à votre nom.',
      continue: 'Continuer →',
      back: '← Retour',
      name: 'Votre nom',
      namePlaceholder: 'Jeanne Dupont',
      email: 'E-mail',
      emailPlaceholder: 'jeanne@marque.fr',
      storeUrl: 'Adresse de la boutique',
      storeUrlPlaceholder: 'marque.fr',
      category: 'Votre catégorie de produits',
      categoryPlaceholder: 'ex. chemises en lin, compléments alimentaires, mobilier d’extérieur',
      categoryHelp: 'Sert à formuler les 4 questions d’achat que nous poserons aux IA.',
      platform: 'Plateforme',
      monthlyRevenue: 'Chiffre d’affaires mensuel',
      revenueHelp: 'Sert uniquement à calibrer les estimations chiffrées de votre audit.',
      select: 'Choisir…',
      message: 'Un concurrent ou une question en particulier ?',
      optional: '(facultatif)',
      messagePlaceholder: 'Ce que vous aimeriez que nous regardions.',
      submit: 'Recevoir mon audit GEO gratuit →',
      submitting: 'Envoi…',
      privacy:
        'Pas de spam. Votre e-mail sert uniquement à vous envoyer l’audit, et à vous relancer une fois.',
      revenueBands: [
        'Moins de 10 k€ / mois',
        '10–50 k€ / mois',
        '50–200 k€ / mois',
        '200–500 k€ / mois',
        '500 k€+ / mois',
      ],
      platforms: ['Shopify', 'WooCommerce', 'Autre'],
    },
    success: {
      // REVIEW-FR: message de confirmation réécrit pour l’audit GEO.
      title: 'Demande reçue.',
      body: 'Nous posons les questions d’achat de votre catégorie aux quatre IA et vous envoyons votre audit en PDF sous 3 jours ouvrés. Surveillez votre boîte mail.',
      again: 'Envoyer une autre boutique',
    },
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Questions fréquentes',
    items: [
      {
        q: 'Qu’est-ce que le GEO ?',
        a: 'Le GEO (generative engine optimization) consiste à faire citer votre marque, et à la faire décrire correctement, quand quelqu’un demande une recommandation à une IA comme ChatGPT ou Perplexity. Cela recoupe le SEO, mais dépend surtout de ce que les autres sites disent de vous.',
      },
      {
        q: 'Pouvez-vous garantir que ChatGPT nous recommandera ?',
        a: 'Non, et personne ne peut l’affirmer honnêtement. Les réponses des IA varient d’une question à l’autre. Ce que nous pouvons faire : mesurer où vous en êtes aujourd’hui, corriger ce qui dépend de vous, et vous montrer l’évolution dans le temps avec la même méthode.',
      },
      {
        q: 'Comment mesurez-vous le trafic venu des IA ?',
        a: 'Nous configurons GA4 pour que les visites venues de ChatGPT, Perplexity et des autres IA apparaissent comme un canal à part, avec le comportement de ces visiteurs sur le site. Une partie de ce trafic arrive sans trace de sa provenance : nous indiquons donc toujours de combien les chiffres peuvent sous-estimer la réalité.',
      },
      {
        q: 'L’audit GEO est-il vraiment gratuit ?',
        a: 'Oui. Nous posons 4 questions d’achat de votre catégorie à ChatGPT, Gemini, Perplexity et Claude, 5 fois chacune, et vous envoyons sous 3 jours ouvrés un PDF de 3 à 4 pages : votre présence, les marques citées à votre place, et trois actions prioritaires. Sans frais ni engagement. Si les actions en valent la peine, nous pouvons en parler ; le document vous appartient dans tous les cas.',
      },
      {
        q: 'Avec qui travaillez-vous ?',
        a: 'Des marques e-commerce qui vendent en France et sur les marchés francophones (Belgique, Suisse), de 250 k€ à 20 M€ de chiffre d’affaires annuel avec une priorité pour 1 à 20 M€, généralement sur Shopify ou WooCommerce. Nous nous concentrons sur les marchés francophones parce qu’une IA répond à une question posée en français à partir de sources en français, et que c’est le terrain que nous connaissons. Les marques basées ailleurs qui vendent en France sont les bienvenues.',
      },
      {
        q: 'Construisez-vous vraiment l’agent IA, ou revendez-vous un outil ?',
        a: 'Nous le construisons. Pendant le programme GEO, notre agent est installé sur votre catalogue, testé et documenté. Pendant le suivi mensuel, nous le faisons tourner. Les fiches réécrites et les données produites vous appartiennent, l’agent reste notre outil. Il ne touche que les systèmes que vous avez listés, et tout message destiné à un client reste un brouillon qu’une personne valide, tant que vous n’en décidez pas autrement. Le studio tourne sur les mêmes agents : nous ne livrons que ce en quoi nous avons nous-mêmes confiance.',
      },
      {
        q: 'En combien de temps verrai-je des résultats ?',
        a: 'Ce qui dépend de votre site (données structurées, fiches qu’une IA peut citer, informations corrigées) est en place en quelques semaines. Le programme Essentiel dure trois semaines, le programme complet six. La corroboration par d’autres sources se gagne sur plusieurs mois, d’où un suivi de 3 mois minimum.',
      },
      {
        q: 'Comment mesurez-vous le succès ?',
        a: 'Par des chiffres que vous pouvez vérifier. La part des réponses d’IA où votre marque apparaît, sur les mêmes questions avant et après, et le trafic venu des IA et ce qu’il achète. Si nous ne pouvons pas le mesurer, nous ne le revendiquons pas.',
      },
    ],
  },

  footer: {
    // REVIEW-FR: bloc de clôture inversé, l’appel devient l’action principale.
    ctaTitle: 'Commencez par un',
    ctaAccent: 'audit GEO gratuit.',
    ctaPrimary: 'Demander mon audit →',
    talkPrefix: 'Vous préférez en parler d’abord ?',
    ctaSecondary: 'Réserver un appel de 15 min →',
    ctaNote: 'Quinze minutes, sans présentation commerciale, sans engagement.',
    tagline: 'Studio GEO et agents IA pour l’e-commerce',
    market: 'France et marchés francophones',
    rights: 'Tous droits réservés.',
    privacy: 'Confidentialité',
    cookieSettings: 'Gérer les cookies',
  },

  call: {
    metaTitle: 'Demander un appel - Maubourg Studio',
    metaDescription:
      'Laissez votre numéro et nous vous rappelons : 15 minutes sur ce que les IA disent de votre marque et ce qu’on peut y faire. Sans engagement.',
    back: '← Retour à l’accueil',
    eyebrow: 'Demander un appel',
    title: 'Laissez-nous votre numéro.',
    titleAccent: 'Nous vous rappelons.',
    subtitle:
      'Indiquez le meilleur moment pour vous joindre. Nous vous rappelons sous un jour ouvré pour un échange direct sur votre présence dans les réponses des IA et par où commencer.',
    points: [
      {
        title: 'Un vrai échange, pas une démo',
        body: '15 minutes sur votre situation et ce qu’il vaut la peine de traiter en premier. Utile, que nous travaillions ensemble ou non.',
      },
      {
        title: 'Nous vous appelons, à votre rythme',
        body: 'Choisissez le créneau qui vous convient. Pas d’échanges d’agendas, pas de formulaire à rallonge.',
      },
      {
        title: 'Sans engagement, sans insistance',
        body: 'Si nous pouvons vous aider, nous vous le dirons. Sinon, vous repartez quand même avec quelque chose d’utile.',
      },
    ],
    teardownPrefix: 'Vous préférez commencer par un document ?',
    teardownLink: 'Demander un audit GEO gratuit →',
    form: {
      name: 'Votre nom',
      namePlaceholder: 'Marie Dupont',
      phone: 'Numéro de téléphone',
      phonePlaceholder: '+33 6 12 34 56 78',
      topic: 'C’est à quel sujet ?',
      topics: ['Visibilité dans les IA (GEO)', 'L’agent GEO', 'Je ne sais pas encore'],
      preferredTime: 'Meilleur moment pour vous joindre',
      email: 'E-mail',
      emailPlaceholder: 'marie@marque.com',
      storeUrl: 'URL de la boutique',
      storeUrlPlaceholder: 'marque.com',
      message: 'Qu’avez-vous en tête ?',
      optional: '(facultatif)',
      messagePlaceholder: 'Une ligne sur ce dont vous aimeriez parler.',
      select: 'Sélectionner…',
      submit: 'Demander mon appel →',
      submitting: 'Envoi…',
      note: 'Un appel de 15 minutes. Sans engagement, sans insistance.',
      times: [
        'En semaine, le matin',
        'En semaine, l’après-midi',
        'En semaine, en soirée',
        'Dès que possible',
      ],
    },
    success: {
      title: 'Nous vous rappelons.',
      body: 'Merci, nous avons vos coordonnées et vous rappellerons sous un jour ouvré au moment choisi. Pas d’argumentaire, juste un échange utile.',
      again: 'Demander un autre appel',
    },
  },

  agentDemo: {
    metaTitle: 'Votre fiche produit vue par une IA - Maubourg Studio',
    metaDescription:
      'Collez l’URL d’une fiche produit de votre boutique. En 30 secondes environ, un agent montre ce que ChatGPT ou Perplexity peuvent y lire, et réécrit la description pour qu’une IA puisse la citer. Gratuit.',
    back: '← Retour à l’accueil',
    eyebrow: 'Démo d’agent GEO en direct',
    title: 'Voyez votre fiche produit',
    titleAccent: 'comme une IA la lit.',
    subtitle:
      'Collez l’adresse d’une fiche produit de votre boutique. Un agent vérifie ce que ChatGPT, Perplexity ou Claude peuvent vraiment y lire et nomme ce qui les empêche de la citer. Puis il réécrit la description pour qu’une IA puisse la reprendre, sans qu’elle perde l’envie d’acheter. 30 secondes environ.',
    form: {
      label: 'URL de la fiche produit',
      placeholder: 'marque.fr/products/votre-produit',
      submit: 'Lancer l’agent →',
      running: 'En cours…',
      note: 'Gratuit. 30 secondes environ. Le diagnostic s’affiche ici, sans e-mail.',
      privacy:
        'L’URL sert uniquement à produire ce résultat et n’est jamais écrite en base. Le résultat reste en mémoire 30 minutes.',
    },
    loading: {
      steps: [
        'Lecture de votre fiche produit et de votre robots.txt…',
        'Vérification de ce qu’un robot d’IA en récupère…',
        'Rédaction de la nouvelle description…',
      ],
    },
    what: {
      heading: 'Ce que vous avez sous les yeux',
      items: [
        {
          title: 'Un agent, une tâche',
          body: 'Il lit une page en ligne et réécrit une description. Rien n’est jamais écrit dans votre boutique.',
        },
        {
          title: 'Il répond dans votre langue',
          body: 'Le résultat suit la langue de la page envoyée, pas celle de ce site.',
        },
      ],
    },
    checks: {
      heading: 'Ce qu’un outil d’IA récupère de cette page',
      intro: 'Mesuré par du code sur votre page telle qu’elle est en ligne. L’agent ne devine rien ici.',
      crawler: {
        title: 'Ce que voit un robot d’IA',
        intro:
          'La plupart des robots d’IA lisent le HTML d’une page sans exécuter le JavaScript. Nous avons récupéré votre page de la même façon.',
        facts: {
          name: 'Nom du produit',
          price: 'Prix',
          availability: 'Disponibilité',
          description: 'Description',
        },
        places: {
          text: 'Dans le texte de la page',
          meta: 'Seulement dans les données structurées ou les balises meta',
          absent: 'Absent du HTML',
        },
        words: '{n} mots',
        short: '{n} mots, peu à citer',
        absentNote:
          'Une information absente du HTML est très probablement ajoutée par JavaScript. Un robot d’IA qui ne l’exécute pas ne la voit jamais.',
      },
      robots: {
        title: 'Les robots d’IA que votre robots.txt laisse entrer',
        intro: 'Le robots.txt est un seul fichier pour tout votre site. Il dit à chaque robot quelles pages il peut lire.',
        fileRead: 'Fichier lu : {host}/robots.txt, appliqué à l’adresse de cette page.',
        answerGroup: 'Les robots qui lisent une page pour répondre à une question',
        answerNote: 'En bloquer un empêche cet assistant de lire votre page quand il répond.',
        trainingGroup: 'Les robots qui collectent des pages pour entraîner un modèle',
        trainingNote: 'Les bloquer n’empêche pas votre page d’être citée dans les réponses.',
        allowed: 'Autorisé',
        blocked: 'Bloqué',
        byRule: 'par la règle',
        missing: 'Votre site n’a pas de robots.txt (le serveur a répondu {status}), donc tous les robots d’IA sont autorisés.',
        unreadable: 'Nous n’avons pas pu lire votre robots.txt ({reason}). Nous ne rapportons rien de ce que nous n’avons pas lu.',
        reasonStatus: 'le serveur a répondu {status}',
        reasonNoAnswer: 'pas de réponse à temps',
        firewall:
          'Ce test lit uniquement le robots.txt. Un pare-feu ou un réglage du CDN peut encore refouler un robot, et cela n’apparaît pas ici.',
      },
      structured: {
        title: 'Données structurées Product',
        intro: 'Un bloc JSON-LD Product donne les informations du produit sous une forme qu’une machine lit sans deviner.',
        fields: {
          name: 'Nom',
          price: 'Prix et devise',
          availability: 'Disponibilité',
          brand: 'Marque',
          identifier: 'SKU ou GTIN',
          rating: 'Note',
          shipping: 'Livraison',
          returns: 'Politique de retour',
        },
        present: 'Présent',
        missing: 'Absent',
        none: 'Aucune donnée structurée Product sur cette page.',
        invalid: 'Cette page a un bloc Product, mais son JSON n’est pas valide, donc une machine ne peut pas le lire.',
        microdata:
          'Pas de bloc JSON-LD Product. La page balise le produit en microdonnées, que ce test ne lit pas champ par champ.',
      },
    },
    gate: {
      ready: 'Votre nouvelle description est prête.',
      productLabel: 'Produit',
      verdictLabel: 'Le verdict commence par',
      gapsFound: '{n} problèmes trouvés sur cette page',
      gapsFoundOne: '1 problème trouvé sur cette page',
      whatOpens: [
        'La description réécrite pour qu’une IA puisse la citer, prête à coller.',
        'Un bloc Product construit avec les informations de votre page, prêt à coller.',
      ],
      previewPromise:
        'Votre fiche produit a aussi été reconstruite avec la nouvelle description à la place de l’ancienne. Elle s’ouvre ici, et vous pouvez la télécharger.',
      previewPromiseInserted:
        'Le texte HTML de votre page ne contient aucune description : un robot d’IA n’en lit donc aucune. Nous avons reconstruit votre page avec la nouvelle description ajoutée sous le titre du produit. Elle s’ouvre ici, et vous pouvez la télécharger.',
      intro: 'Dites-nous où l’envoyer. Elle s’ouvre ici dans la foulée.',
      name: 'Votre nom',
      namePlaceholder: 'Camille Martin',
      email: 'E-mail',
      emailPlaceholder: 'camille@marque.fr',
      consent:
        'Recevoir de temps en temps des e-mails sur la visibilité dans les réponses des IA. Désinscription à tout moment.',
      submit: 'Voir la nouvelle description →',
      submitting: 'Ouverture…',
      use: 'Votre nom et votre e-mail servent à vous envoyer une copie de ce résultat et à vous répondre si vous écrivez.',
      privacyLink: 'Ce que nous en faisons',
    },
    result: {
      verdictLabel: 'Le verdict',
      beforeLabel: 'Votre description actuelle',
      afterLabel: 'La nouvelle description',
      gapsLabel: 'Ce qui empêche les IA de la citer',
      copy: 'Copier la nouvelle description',
      copied: 'Copié',
      previewLabel: 'Votre page, avec la nouvelle description dedans',
      previewNote:
        'C’est votre fiche produit, votre design et vos images, avec la nouvelle description à la place de l’ancienne. Elle tourne sans aucun script : les éléments qui dépendent du JavaScript peuvent s’afficher autrement. Rien n’a été écrit dans votre boutique.',
      previewMarker: 'Nouvelle description',
      previewLabelInserted: 'Votre page, avec la nouvelle description ajoutée',
      previewNoteInserted:
        'C’est votre fiche produit, votre design et vos images. Son HTML ne contenait aucune description à remplacer dans le texte. Si votre page en affiche une, c’est un script qui l’ajoute, et un robot d’IA n’exécute aucun script. La nouvelle description est donc ajoutée sous le titre du produit, là où un robot la lit. La page tourne sans aucun script : les éléments qui dépendent du JavaScript peuvent s’afficher autrement. Rien n’a été écrit dans votre boutique.',
      previewMarkerInserted: 'Ajoutée par l’agent',
      previewOpen: 'Ouvrir dans un nouvel onglet',
      previewDownload: 'Télécharger le HTML',
      previewExpires: 'Cette page reste disponible une heure, puis notre copie est supprimée.',
      previewUnavailable:
        'Nous n’avons pas pu replacer la nouvelle description dans cette page avec certitude, donc nous ne l’avons pas reconstruite. Plutôt que de vous montrer une version cassée de votre propre boutique, voici la nouvelle description seule.',
      previewUnavailableNoHtml:
        'Le HTML de votre page ne contient ni description dans le texte, ni titre de produit sous lequel en placer une. La zone produit est très probablement dessinée par JavaScript : il n’y a donc pas de page à reconstruire. Un robot d’IA récupère la même page vide. Voici la nouvelle description seule.',
      emailed: 'Une copie part vers votre boîte mail.',
      lowConfidence:
        'Cette page a été difficile à lire automatiquement : la nouvelle description peut reposer sur un contenu partiel.',
      again: 'Tester une autre fiche produit',
    },
    productBlock: {
      label: 'Bloc Product, prêt à coller',
      intro:
        'Construit avec les informations de votre page et la nouvelle description. Il se place dans le HTML de cette fiche produit. Si votre thème affiche déjà un bloc Product, remplacez-le plutôt que d’en ajouter un second.',
      copy: 'Copier le bloc',
      copied: 'Copié',
      toComplete: 'Laissé de côté parce que votre page ne le dit pas. N’ajoutez un champ que s’il est vrai.',
      complete: 'Tous les champs que nous vérifions sont remplis avec votre page.',
      fields: {
        price: 'Prix et devise',
        availability: 'Disponibilité',
        brand: 'Marque',
        image: 'Image',
        sku: 'SKU',
        gtin: 'GTIN (le numéro du code-barres)',
        rating: 'Note, issue de vrais avis uniquement',
        shipping: 'Livraison',
        returns: 'Politique de retour',
      },
    },
    frame: {
      title: 'C’était un agent, une tâche, en 30 secondes environ.',
      body: 'Sur un catalogue entier, l’agent que nous installons fait ce travail sur chaque fiche produit et surveille les nouvelles à mesure qu’elles arrivent. Il signale aussi les informations fausses sur votre marque.',
      ctaPrimary: 'Réserver un appel de 15 min →',
      teardownPrefix: 'Vous préférez commencer par un document ?',
      teardownLink: 'Demander un audit GEO gratuit →',
    },
    errors: {
      BAD_REQUEST: 'Cette requête n’est pas passée. Merci de réessayer.',
      INVALID_URL:
        'Cela ne ressemble pas à une adresse web. Collez l’URL complète d’une fiche produit.',
      BLOCKED_URL:
        'Cette adresse n’est pas joignable depuis ici. Collez l’URL publique d’une fiche produit.',
      INVALID_EMAIL: 'Merci d’indiquer un e-mail valide.',
      FETCH_FAILED:
        'Nous n’avons pas pu ouvrir cette page. Elle est peut-être protégée contre les visites automatisées. Essayez une autre fiche produit.',
      NOT_A_PRODUCT:
        'Nous n’avons trouvé aucun produit sur cette page. Collez l’URL d’une fiche produit, pas d’une page d’accueil ni d’une collection.',
      TOKEN_EXPIRED: 'Ce résultat a expiré. Relancez l’agent sur la même URL, c’est gratuit.',
      RATE_LIMITED:
        'La démo a atteint sa limite du jour : elle tourne sur un petit budget. Réservez 15 minutes ou demandez un audit GEO gratuit à la place.',
      MODEL_ERROR: 'L’agent n’a pas pu terminer celle-ci. Réessayez dans un instant.',
    },
    resultEmail: {
      subject: 'Ce que les IA lisent sur {product}',
      intro:
        '{name}, voici ce que notre agent a trouvé sur votre page {product}, telle qu’elle était en ligne quand vous l’avez lancé.',
      verdictLabel: 'Le verdict',
      gapsLabel: 'Ce qui empêche les IA de la citer',
      checksLabel: 'Ce qu’un outil d’IA récupère de cette page',
      beforeLabel: 'Votre description actuelle',
      afterLabel: 'La nouvelle description',
      blockLabel: 'Bloc Product, prêt à coller',
      blockNote:
        'Il se place dans le HTML de cette fiche produit. Si votre thème affiche déjà un bloc Product, remplacez-le plutôt que d’en ajouter un second.',
      toCompleteLabel: 'Laissé de côté parce que votre page ne le dit pas',
      previewNote:
        'Votre page avec la nouvelle description déjà dedans reste ouverte pendant une heure dans l’onglet où vous avez lancé la démo. C’est une copie reconstruite, à regarder. Rien n’a été modifié dans votre boutique.',
      frame:
        'C’était un agent, une tâche. Sur un catalogue entier, l’agent que nous installons fait ce travail sur chaque fiche produit et surveille les nouvelles à mesure qu’elles arrivent. Pour voir ce que cela donnerait chez vous, réservez 15 minutes.',
      cta: 'Réserver un appel de 15 minutes',
      footer:
        'Envoyé par Maubourg Studio parce que vous avez demandé ce résultat sur maubourg.studio. Répondez à cet e-mail, un humain le lit.',
    },
  },

  privacy: {
    metaTitle: 'Confidentialité - Maubourg Studio',
    metaDescription:
      'Ce que nous collectons quand vous demandez un diagnostic, un appel ou une démo d’agent, ce que nous en faisons, et comment le faire supprimer.',
    back: '← Retour à l’accueil',
    eyebrow: 'Confidentialité',
    title: 'Ce que nous collectons, et pourquoi.',
    updated: 'Dernière mise à jour : octobre 2026',
    intro:
      'Maubourg Studio est un studio d’une personne, basé à Paris. Cette page dit simplement ce que deviennent les informations que vous saisissez ici. Si un point reste flou, écrivez-nous.',
    sections: [
      {
        title: 'Quand vous demandez un diagnostic ou un appel',
        body: 'Nous conservons votre nom, votre e-mail, votre téléphone, l’URL de votre boutique et ce que vous avez écrit dans le message. Ils servent à rédiger votre diagnostic, à vous rappeler et à faire une relance. Ils sont stockés sur notre propre serveur dans l’Union européenne, ni vendus ni partagés.',
      },
      {
        title: 'Quand vous lancez la démo d’agent',
        body: 'Vous nous donnez l’URL d’une fiche produit. Le diagnostic et les vérifications s’affichent sur la page sans rien vous demander d’autre. Pour ouvrir la nouvelle description et le bloc Product, vous nous donnez votre nom et votre e-mail. Ils servent à vous envoyer une copie du résultat et à vous répondre si vous écrivez. Si vous cochez la case sous le formulaire, nous vous envoyons aussi de temps en temps des e-mails sur la visibilité dans les réponses des IA.',
      },
      {
        title: 'Combien de temps la démo les garde',
        body: 'L’URL, le contenu de la page et le résultat restent dans la mémoire de notre serveur, sans jamais être écrits en base. Un résultat que vous n’ouvrez pas disparaît au bout de 30 minutes. La copie reconstruite de votre page disparaît une heure après son ouverture. Les deux disparaissent aussi à chaque redémarrage du site. Quand vous donnez votre nom et votre e-mail, deux e-mails partent. L’un vous apporte le résultat. L’autre nous dit qui a lancé la démo, avec votre nom, votre e-mail, l’URL et le résultat. Celui-là est conservé 12 mois dans notre boîte mail, puis supprimé, ou plus tôt si vous nous le demandez.',
      },
      {
        title: 'Qui les reçoit',
        body: 'Seul Maubourg Studio lit ce que vous envoyez, et rien n’est vendu ni partagé. Quelques prestataires s’en occupent pour notre compte. Railway fait tourner le serveur du site. Resend envoie les e-mails. Google héberge notre boîte mail. Anthropic fournit le modèle qui rédige la nouvelle description et reçoit le texte de la page soumise, jamais votre nom ni votre e-mail, puisque le modèle a terminé avant qu’on vous les demande.',
      },
      {
        title: 'Listes de diffusion',
        body: 'La démo ne vous inscrit sur une liste que si vous cochez la case sous le formulaire. Sans elle, vous ne recevez que la copie de votre résultat et nos réponses à ce que vous écrivez. Dans tous les cas, une ligne de votre part suffit pour que cela s’arrête.',
      },
      {
        title: 'Mesure d’audience, seulement avec votre accord',
        body: 'Si vous cliquez sur Accepter dans le bandeau, le site charge Google Analytics 4, un outil de Google qui compte les visites. Nous nous en servons pour voir quelles pages aident les visiteurs et lesquelles améliorer. Il enregistre les pages vues, la page d’où vous venez, votre type d’appareil et de navigateur, et votre pays approximatif. Nous comptons aussi les clics sur le bouton d’audit gratuit et sur le bouton d’appel. Il dépose des cookies dont le nom commence par _ga, pour reconnaître le même navigateur d’une visite à l’autre. Ils expirent au bout de 13 mois au plus. Google conserve les données de visite 14 mois, puis les supprime. Google Ireland fournit l’outil, et les données peuvent être traitées hors de l’Union européenne, notamment aux États-Unis. Rien ne sert à la publicité. Si vous refusez, ou si vous ne répondez pas, Google Analytics n’est jamais chargé. Votre choix est gardé dans votre navigateur pendant 13 mois. Vous pouvez le changer à tout moment avec le lien Gérer les cookies en bas de chaque page. Retirer votre accord arrête la mesure et supprime ces cookies.',
      },
      {
        title: 'Ce que nous ne faisons pas',
        body: 'Aucun cookie publicitaire, et aucune mesure sans votre accord. Nous comptons les lancements et les résultats côté serveur sans identifier personne : les adresses IP sont hachées pour la limitation d’usage et jamais conservées en clair.',
      },
      {
        title: 'Vos droits',
        body: 'Vous pouvez demander ce que nous détenons sur vous, en obtenir une copie, ou nous demander de le supprimer. Écrivez-nous : c’est fait sous quelques jours, sans formulaire et sans question. Vous pouvez aussi saisir la CNIL si vous estimez que nous nous y sommes mal pris.',
      },
    ],
    contactPrefix: 'Une question, ou envie que l’on supprime vos données ? Écrivez à',
  },

  verticals: {
    shared: {
      navHeading: 'Services',
      navBlurb: 'Le GEO, et l’agent avec lequel nous le menons.',
      breadcrumb: 'Services',
      backHome: '← Retour à l’accueil',
      relatedHeading: 'La suite logique',
      ctaEyebrow: 'Commencez ici',
      ctaTitle: 'Commencez par un audit GEO gratuit.',
      ctaBody:
        'Nous posons 4 questions d’achat de votre catégorie à ChatGPT, Gemini, Perplexity et Claude, 5 fois chacune, et vous envoyons votre taux de citation et trois actions prioritaires sous 3 jours ouvrés. Sans appel préalable, sans contrepartie.',
      ctaPrimary: 'Demander mon audit →',
      ctaSecondary: 'Réserver 15 minutes',
      priceNote: 'Fourchettes indicatives. Le prix dépend de l’enjeu, pas des heures passées.',
    },

    geo: {
      nav: { label: 'Visibilité LLM (GEO)', blurb: 'Être la marque que les IA citent.' },
      meta: {
        title: 'Visibilité sur les LLMs (GEO) - Maubourg Studio',
        description:
          'Auditer, améliorer et mesurer la façon dont ChatGPT, Gemini, Perplexity et Claude citent votre marque, avec notre propre agent sur votre catalogue. Pour les marques e-commerce qui vendent en France et sur les marchés francophones.',
      },
      hero: {
        eyebrow: 'Generative engine optimization',
        title: 'Les acheteurs interrogent une IA',
        titleAccent: 'avant d’interroger un moteur de recherche.',
        subtitle:
          'Demandez la meilleure chemise en lin à moins de 120 € : une IA répond à partir d’une poignée de sources qu’elle a retenues et jugées fiables. Être l’une de ces sources n’a rien à voir avec se classer sur Google, et rares sont les boutiques qui s’y sont préparées.',
        stat: 'Un nouveau canal',
        statNote: 'qui ne s’achète pas, et qui n’apparaît pas dans vos statistiques.',
        ctaPrimary: 'Demander un audit GEO gratuit →',
        ctaSecondary: 'Réserver 15 minutes',
      },
      what: {
        eyebrow: 'De quoi il s’agit vraiment',
        title: 'Pas un classement. Une citation.',
        body: 'Un moteur de recherche propose une liste et laisse le visiteur choisir. Une IA lit les sources, tranche, et donne une réponse. Il n’y a pas de deuxième page : être cité ou absent, c’est tout le résultat. Le travail consiste donc à rendre votre boutique lisible par une machine qui lit au lieu d’explorer : des réponses nettes aux questions que les acheteurs posent, des données structurées qui décrivent chaque page, et suffisamment de mentions ailleurs pour être corroboré hors de votre domaine.',
      },
      chain: {
        eyebrow: 'Comment la réponse se fabrique',
        title: 'Quatre étapes, et vous n’en déplacez que deux.',
        query: '« Meilleure chemise en lin sous 120€ pour la chaleur ? »',
        influenceLabel: 'Votre levier',
        steps: [
          {
            step: 'La question',
            note: 'Conversationnelle, précise, souvent avec un budget',
            influence: 'Aucun',
          },
          {
            step: 'Sélection des sources',
            note: 'L’IA rassemble les sources qu’elle sait lire et comprendre',
            influence: 'C’est là que le travail se fait',
          },
          {
            step: 'Confiance',
            note: 'Elle pèse la corroboration : avis, mentions, cohérence entre les sources',
            influence: 'Se gagne, lentement',
          },
          {
            step: 'La réponse',
            note: 'Une recommandation, pas de deuxième page',
            influence: 'Aucun',
          },
        ],
        caption:
          'Sélection des sources et confiance : ce sont les deux que vous pouvez faire bouger. Tout notre travail porte sur celles-là.',
      },
      blocks: {
        eyebrow: 'En quoi consiste le travail',
        title: 'Auditer, améliorer, mesurer.',
        priceLabel: 'Prix',
        auditBox: {
          title: 'Ce que contient l’audit gratuit',
          items: [
            '4 questions d’achat de votre catégorie',
            'Posées 5 fois à ChatGPT, Gemini, Perplexity et Claude',
            'Votre taux de citation, les marques citées à votre place, la façon dont vous êtes décrit',
            '3 actions prioritaires, en PDF sous 3 jours ouvrés',
          ],
          cta: 'Demander mon audit →',
        },
        items: [
          {
            title: 'Audit',
            price: 'Gratuit, ou 900 à 1 500 € pour l’audit approfondi',
            lead: 'Ce que ChatGPT, Gemini, Perplexity et Claude disent de votre marque et de vos concurrents, mesuré sur des séries de vraies questions d’achat.',
            body: 'Vous recevez les questions posées, la fréquence à laquelle chaque outil vous cite, les marques citées à votre place, et la façon dont votre marque est décrite quand elle apparaît. Les mêmes questions sont reposées plus tard, donc le deuxième rapport se compare au premier. L’audit approfondi porte sur 20 questions, en 10 jours ouvrés. Il ajoute les sources sur lesquelles les IA s’appuient dans votre catégorie et une feuille de route priorisée, et son prix est déduit du programme s’il suit.',
          },
          {
            title: 'Amélioration',
            price: 'Programme GEO, 3 500 à 6 000 € sur 6 semaines. Programme Essentiel, 1 500 à 2 500 € sur 3 semaines.',
            lead: 'Notre agent installé sur votre catalogue. Vos fiches produit réécrites pour que les IA puissent les citer tout en donnant envie à un acheteur, avec leurs données structurées.',
            body: 'Autour de l’agent, le programme ajoute des pages qui répondent aux questions d’achat et corrige les informations erronées à la source. Il ouvre votre site aux robots d’IA, prépare votre présence sur les sources tierces et configure GA4 pour mesurer le trafic venu des IA. L’avant / après se mesure sur les questions de l’audit. Pour les jeunes marques (250 k€ à 1 M€ de chiffre d’affaires annuel), le programme Essentiel couvre l’accès des robots d’IA et les données structurées produit, avec l’agent sur vos 10 à 20 fiches les plus vendues, mesuré sur les 4 questions de l’audit gratuit.',
          },
          {
            title: 'Mesure',
            price: 'Incluse dans le programme. Suivi mensuel, 1 000 à 2 000 € / mois, 3 mois minimum.',
            lead: 'GA4 configuré pour montrer le trafic qui vient des IA, et les mêmes questions reposées chaque mois.',
            body: 'Pendant le suivi mensuel, notre agent veille. Il retravaille les nouvelles fiches à mesure qu’elles arrivent et signale les informations fausses sur votre marque. Chaque mois, vous recevez un rapport de progression, le travail sur les sources tierces continue, et nous itérons sur ce qui a bougé. Une partie du trafic venu des IA ne porte aucune trace de sa provenance : nous indiquons à chaque fois de combien le chiffre peut sous-estimer la réalité.',
          },
        ],
      },
      changes: {
        eyebrow: 'Ce que nous changeons concrètement',
        title: 'À quoi cela ressemble sur une vraie boutique.',
        intro:
          'Cinq constats qui reviennent sur presque toutes les boutiques que nous regardons. Chacun est vérifié sur les pages en ligne avant d’entrer dans un rapport.',
        columns: { finding: 'Le constat', cost: 'Ce que ça coûte', fix: 'Ce que nous faisons' },
        rows: [
          {
            finding: 'Une fiche produit qui ne répond à aucune question d’usage',
            cost: 'L’IA n’a rien à citer sur les tailles, les matières ou l’entretien : elle cite un concurrent qui, lui, répond.',
            fix: 'Répondre aux questions d’achat en texte sur la page, là où une machine peut les lire.',
          },
          {
            finding: 'Données structurées absentes, ou en contradiction avec la page',
            cost: 'Un balisage faux apprend à une IA quelque chose d’inexact à votre nom. Un balisage absent laisse la page ambiguë.',
            fix: 'Un balisage produit, offre et avis conforme à ce que dit réellement la page.',
          },
          {
            finding: 'Marque absente des comparatifs et sites d’avis de la catégorie',
            cost: 'Une affirmation que vous êtes seul à faire reste une affirmation. Une IA cherche la corroboration et n’en trouve pas.',
            fix: 'Un plan de présence sur les sources dont votre catégorie est réellement lue.',
          },
          {
            finding: 'Prix ou conditions de livraison erronés repris par une IA',
            cost: 'L’acheteur lit une information périmée : il part, ou il arrive avec une attente fausse.',
            fix: 'Trouver où vit l’information périmée et la corriger à la source.',
          },
          {
            finding: 'Robots d’IA bloqués dans le robots.txt',
            cost: 'La boutique ne peut pas être citée parce qu’elle ne peut pas être lue. La perte la moins chère à éviter.',
            fix: 'Ouvrir délibérément les robots souhaités, et préciser ce qu’ils peuvent lire.',
          },
        ],
      },
      reading: {
        heading: 'Sur le sujet, dans notre blog',
        note: 'Articles en français.',
      },
      honest: {
        title: 'Ce que nous ne vous promettrons pas.',
        body: 'Personne ne peut garantir une place dans une réponse d’IA, et quiconque le promet vend ce qu’il ne peut pas livrer. Les mécanismes sont récents, ils changent sans prévenir, et il n’existe aucun classement à afficher. Ce que nous pouvons faire : rendre votre boutique lisible et corroborée, puis mesurer votre présence sur de vraies questions, pour que vous constatiez l’évolution au lieu de nous croire sur parole.',
      },
      ourown: {
        title: 'Nous l’avons d’abord fait sur notre propre site.',
        body: 'Cette page, comme toutes les autres ici, embarque des données structurées, un sitemap lisible par machine, une politique explicite pour les robots d’IA et un résumé en texte brut de ce que fait le studio. Vous lisez ce que nous mettrions en place pour vous.',
      },
      related: [
        {
          page: 'agents',
          text: 'L’agent qui fait une grande partie de ce travail. Vous pouvez le lancer sur une de vos fiches produit.',
        },
      ],
    },

    agents: {
      nav: {
        label: 'Agents IA',
        blurb: 'Comment nous faisons le travail GEO. Essayez-le.',
      },
      meta: {
        title: 'Agents IA pour le GEO - Maubourg Studio',
        description:
          'Notre agent IA fait le travail GEO sur votre catalogue. Il réécrit les fiches produit pour que les IA puissent les citer, puis veille chaque mois. Essayez-le sur votre fiche produit.',
      },
      hero: {
        eyebrow: 'Agents IA',
        title: 'Vos fiches produit réécrites pour les réponses des IA,',
        titleAccent: 'et tenues à jour.',
        subtitle:
          'L’agent est notre façon de mener le GEO, pas un produit vendu à part. Pendant le programme, il est installé sur votre catalogue. Pendant le suivi mensuel, il veille. Plus simple à montrer qu’à décrire : un agent tourne plus bas sur cette page.',
        ctaPrimary: 'Essayer sur votre fiche produit ↓',
        ctaSecondary: 'Réserver 15 minutes',
      },
      demoIntro: {
        eyebrow: 'Une démonstration, pas une promesse',
        title: 'Donnez-lui une de vos fiches produit.',
        body: 'Il lit la page comme un robot d’IA et réécrit la description pour qu’une IA puisse la citer. Environ trente secondes. Le diagnostic s’affiche ici sans e-mail. La nouvelle description en demande un. C’est un agent volontairement limité à une tâche. Celui que nous installons chez nos clients travaille sur tout un catalogue.',
      },
      families: {
        eyebrow: 'Ce qu’il fait',
        title: 'Installé pendant le programme, puis en veille chaque mois.',
        items: [
          {
            title: 'Installé sur votre catalogue',
            body: 'Il fait partie du programme GEO. L’agent réécrit vos fiches produit pour que les IA puissent les citer tout en donnant envie à un acheteur, et donne à chaque page ses données structurées. Il est livré une fois, testé et documenté.',
            examples: [
              'Fiches réécrites pour les réponses des IA',
              'Données structurées conformes à la page',
              'Vos 10 à 20 fiches les plus vendues dans le programme Essentiel',
              'Testé et documenté',
            ],
          },
          {
            title: 'En veille chaque mois',
            body: 'Il fait partie du suivi mensuel. À mesure que vous ajoutez des fiches, l’agent les retravaille de la même façon. Quand il trouve une information fausse sur votre marque, il la signale pour qu’elle soit corrigée à la source.',
            examples: [
              'Nouvelles fiches retravaillées à mesure qu’elles arrivent',
              'Informations fausses sur votre marque signalées',
              'Un compte rendu chaque mois',
            ],
          },
        ],
      },
      workflow: {
        eyebrow: 'Comment on en construit un',
        title: 'Comment nous construisons un agent.',
        nodes: [
          { label: 'Déclencheur', note: 'Une fiche produit est ajoutée ou modifiée' },
          { label: 'Contexte', note: 'Seulement la donnée dont la tâche a besoin, rien d’autre' },
          { label: 'Outils', note: 'Les systèmes qu’il peut toucher, nommés un par un' },
          { label: 'Garde-fou', note: 'Ce qu’il ne fera jamais sans une personne' },
          { label: 'Relais', note: 'Un humain, avec le contexte déjà rédigé' },
        ],
        caption:
          'C’est le garde-fou qui compte encore six mois plus tard. Nous le concevons en premier.',
      },
      guardrails: {
        title: 'Les règles sous lesquelles nous les construisons.',
        items: [
          'Il n’invente jamais un fait sur vos produits. S’il n’a pas pu le lire, il ne l’affirme pas.',
          'Tout message destiné à un client reste un brouillon qu’une personne valide, tant que vous n’en décidez pas autrement.',
          'Il touche les systèmes que vous avez listés et aucun autre.',
          'Chaque exécution est journalisée : une erreur se retrace, elle ne se débat pas.',
        ],
      },
      included: {
        title: 'Nous les utilisons nous-mêmes.',
        body: 'Le studio tourne sur ses propres agents, des audits au reporting. C’est une partie de la preuve que ce que nous vendons fonctionne, et ce qui permet à un studio de notre taille d’assurer cette charge.',
      },
      price: {
        label: 'Prix',
        value: 'Pas de prix à part',
        note: 'L’agent est compris dans le programme GEO, qui l’installe, et dans le suivi mensuel, qui le fait tourner.',
        link: 'Voir les tarifs →',
      },
      cta: {
        title: 'Vous voulez le voir sur votre catalogue ?',
        primary: 'Réserver 15 minutes →',
        secondary: 'Ou essayez l’agent sur une de vos fiches produit ↑',
      },
      related: [
        {
          page: 'geo',
          text: 'Le reste du travail GEO, à commencer par l’audit gratuit.',
        },
      ],
    },

  },

  observatory: {
    // REVIEW-FR: libellés de structure écrits ici, aucun chiffre ni promesse.
    nav: 'Observatoire de visibilité IA',
    eyebrow: 'Observatoire',
    title: 'Ce que les IA répondent sur les marques e-commerce françaises.',
    intro:
      'Le studio pose le même panel de questions d’achat à ChatGPT, Gemini, Perplexity et Claude, plusieurs fois par question, et publie ce qui revient. Chaque chiffre porte la question dont il vient et la campagne qui l’a produit.',
    meta: {
      title: 'Observatoire de visibilité IA - Maubourg Studio',
      description:
        'La recherche du studio sur la façon dont les marques e-commerce françaises apparaissent dans les réponses de ChatGPT, Gemini, Perplexity et Claude : méthode, chiffres par secteur, éditions archivées.',
      methodTitle: 'Méthode - Observatoire de visibilité IA - Maubourg Studio',
      methodDescription:
        'Comment les chiffres de l’observatoire sont produits : le panel de questions, les quatre moteurs, le nombre de passages par question, et ce que les chiffres ne disent pas.',
    },
    empty: {
      title: 'Aucune édition publiée pour l’instant.',
      body: 'La première campagne est en cours. Une édition est publiée ici une fois le panel complet passé, et n’est jamais modifiée ensuite.',
    },
    methodHeading: 'Méthode',
    verticalsHeading: 'Par secteur',
    editionsHeading: 'Éditions',
    methodLink: 'Comment ces chiffres sont produits →',
    backToIndex: '← Observatoire',
    facts: {
      campaign: 'Campagne',
      engines: 'Moteurs',
      queries: 'Questions',
      runsPerQuery: 'Passages par question',
      download: 'Télécharger le tableau agrégé →',
    },
    verticals: {
      LIT: 'Literie',
      COS: 'Cosmétique clean',
      CHA: 'Chaussures confort',
    },
    licence: 'Les chiffres peuvent être cités avec un lien vers cette page.',
  },

  // Le blog. Seules les pages françaises sont construites aujourd’hui :
  // c’est la langue dans laquelle les articles sont écrits.
  articles: {
    meta: {
      title: 'Blog - Maubourg Studio',
      // REVIEW-FR: description et intro du blog réécrites.
      description:
        'Des réponses claires aux questions que se posent les marques e-commerce sur leur visibilité dans ChatGPT, Perplexity, Gemini et les recherches par IA.',
    },
    index: {
      eyebrow: 'Blog',
      title: 'De nouveaux articles chaque semaine pour aider votre marque à être recommandée par les IA.',
      intro:
        'Nous partons de vraies questions posées par les marques et y répondons le plus simplement possible. Les articles sont mis à jour quand les faits changent.',
      empty: 'Rien de publié pour l’instant.',
    },
    backToIndex: '← Tous les articles',
    source: 'Maubourg Studio',
    readingTime: '{n} min de lecture',
    cta: {
      title: 'C’est un sujet que nous traitons.',
      body: 'Comment ça se déroule, ce que ça coûte, et où ça s’arrête.',
      button: '{service} →',
    },
    relatedHeading: 'À lire aussi',
    // Closing CTA, narrative and citation templates only. `question`'s
    // headline is the article's own `question` field, not written here.
    closing: {
      question: {
        body: 'On regarde ça sur votre boutique, pas sur une moyenne du secteur.',
        button: '{service} →',
      },
      minimal: {
        prefix: 'Vous voulez qu’on regarde ça sur votre boutique ?',
        button: '{service} →',
      },
      conversational: {
        title: 'Et si votre cas est différent ?',
        body: 'Chaque audit part de votre boutique, pas d’un modèle standard.',
        button: '{service} →',
      },
    },
    // Citation template only: the label above the pulled-out description.
    citationLabel: 'La phrase à retenir',
  },

  errors: {
    name: 'Merci d’indiquer votre nom.',
    email: 'Merci d’indiquer un e-mail valide.',
    emailOptional: 'Cet e-mail semble incorrect.',
    storeUrl: 'Merci d’indiquer l’URL de votre boutique.',
    category: 'Merci d’indiquer votre catégorie de produits.',
    phone: 'Merci d’indiquer un numéro de téléphone valide.',
    form: 'Merci de vérifier le formulaire.',
    generic: 'Une erreur est survenue. Merci de réessayer.',
    server: 'Une erreur est survenue de notre côté. Merci de nous écrire directement.',
    network: 'Erreur réseau. Réessayez, ou écrivez-nous directement.',
  },

  meta: {
    homeTitle: 'Maubourg Studio - Studio GEO et agents IA pour l’e-commerce',
    homeDescription:
      'Maubourg Studio, à Paris, rend les marques e-commerce visibles et correctement décrites dans les réponses de ChatGPT, Gemini, Perplexity et Claude, avec ses propres agents IA pour faire le travail. Pour les marques qui vendent en France et sur les marchés francophones.',
    shareTitle: 'Studio GEO et agents IA pour l’e-commerce',
    shareLine: 'Votre marque citée, et bien décrite, dans les réponses de ChatGPT, Gemini, Perplexity et Claude.',
    shareAlt: 'Maubourg Studio, studio GEO et agents IA pour l’e-commerce',
  },

  consent: {
    label: 'Cookies',
    text: 'Nous utilisons des cookies pour mesurer l’audience du site et l’améliorer. Vous pouvez les accepter ou les refuser.',
    privacyLink: 'En savoir plus',
    accept: 'Accepter',
    decline: 'Refuser',
  },
};
