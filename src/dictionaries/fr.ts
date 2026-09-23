import type { Dictionary } from './en';

export const fr: Dictionary = {
  nav: {
    links: [
      { label: 'Pourquoi le GEO', hash: '#problem' },
      { label: 'Méthode', hash: '#process' },
      { label: 'Tarifs', hash: '#pricing' },
    ],
    blog: 'Blog',
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
      'Nous faisons entrer votre marque dans les réponses de ChatGPT, Gemini et Perplexity, et nous mesurons ce que ce trafic rapporte. Pour vos opérations, nous construisons des agents IA qui absorbent le travail répétitif de vos équipes.',
    ctaPrimary: 'Demander un audit GEO gratuit →',
    talkPrefix: 'Vous préférez en parler d’abord ?',
    ctaSecondary: 'Réserver un appel de 15 min →',
    skillsHeading: 'Nos trois expertises',
    skills: [
      {
        name: 'Visibilité LLM (GEO)',
        body: 'Faire citer votre marque, et la faire décrire correctement, quand un acheteur interroge ChatGPT, Gemini, Perplexity ou Claude. Puis mesurer ce que ce canal rapporte.',
      },
      {
        name: 'Agents IA',
        body: 'Des agents conçus sur vos processus réels, pour les tâches répétitives qui occupent vos équipes sans créer de valeur.',
      },
      {
        name: 'Conversion',
        body: 'Quand c’est la boutique qui fait perdre la vente : tests A/B sur les fiches produit, le panier et le checkout.',
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
    // REVIEW-FR: titre, intro et six cartes réécrits pour le recentrage.
    title: 'D’abord être dans la réponse. Ensuite, libérer vos équipes.',
    intro:
      'Notre travail commence par la visibilité de votre marque dans les réponses des IA : être cité, et correctement décrit. Il se poursuit avec des agents qui prennent en charge les tâches répétitives de vos équipes. Et quand c’est la boutique elle-même qui fait perdre la vente, nous corrigeons la conversion.',
    tags: { geo: 'GEO', ai: 'Agents IA', conversion: 'Conversion' },
    items: [
      {
        tag: 'GEO',
        title: 'Audit',
        page: 'geo',
        body: 'Ce que ChatGPT, Gemini, Perplexity et Claude disent de votre marque et de vos concurrents, mesuré sur des séries de vraies questions d’achat.',
      },
      {
        tag: 'GEO',
        title: 'Mesure',
        page: 'geo',
        body: 'GA4 configuré pour montrer le trafic qui vient des IA et ce que ces visiteurs font sur votre site.',
      },
      {
        tag: 'GEO',
        title: 'Amélioration',
        page: 'geo',
        body: 'Le travail qui vous fait citer plus souvent : des fiches produit plus lisibles, une présence sur les sites que les IA consultent, des informations erronées corrigées à la source. En grande partie mené par nos propres agents.',
      },
      {
        tag: 'Agents IA',
        title: 'Agents d’opérations',
        page: 'agents',
        body: 'Des agents qui déchargent vos équipes du travail répétitif : traitement des commandes, relances fournisseurs, retours, reporting interne. Calibrés sur votre workflow réel, pas un chatbot générique.',
      },
      {
        tag: 'Agents IA',
        title: 'Agent catalogue',
        page: 'agents',
        body: 'Un agent qui rédige et actualise vos fiches produit, comble les métadonnées manquantes et signale les annonces et pages produit qui sous-performent.',
      },
      {
        tag: 'Conversion',
        title: 'Optimisation du taux de conversion',
        page: 'conversion',
        body: 'Tests A/B continus sur les fiches produit, le panier et le checkout, en commençant par les fuites qui coûtent le plus. Vous voyez l’impact sur le chiffre d’affaires, pas des métriques flatteuses.',
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
        body: 'Nous rendons votre boutique lisible et corroborée : données structurées, pages qui répondent aux questions d’achat, informations erronées corrigées, présence sur les sources que les IA consultent. Six semaines, périmètre et prix fixés à l’avance.',
      },
      {
        step: '03',
        name: 'Suivi',
        price: 'Mensuel',
        body: 'Les mêmes questions sont reposées chaque mois, le trafic venu des IA est suivi dans GA4, et nous itérons sur ce qui a bougé. La corroboration se gagne lentement : c’est là que les résultats se cumulent.',
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
        body: 'Audits, reporting, contrôle des tests : notre propre exécution repose sur des agents que nous avons construits. Vous y gagnez en rapidité, et la preuve que ce que nous vendons fonctionne.',
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
      'Démarrez par un audit gratuit ou un projet à périmètre fixe, puis poursuivez avec un suivi mensuel. Chaque suivi s’étend sur 3 mois minimum : c’est le temps qu’il faut pour qu’une évolution soit mesurable.',
    mostRequested: 'Le plus demandé',
    perMonth: '/mois',
    // REVIEW-FR: libellés de durée (`meta`) écrits ici ; prix et contenus repris de la revue.
    groups: [
      {
        heading: 'Visibilité dans les IA',
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
            price: '900–1 500 €',
            meta: 'Sous 10 jours ouvrés',
            desc: '20 questions d’achat, 4 IA. Concurrents cités, sources dont les IA se servent dans votre catégorie, feuille de route priorisée. Déduit de votre programme.',
            cta: 'Réserver un appel',
            action: 'call',
            featured: false,
            badge: false,
          },
          {
            name: 'Programme GEO',
            price: '3 500–6 000 €',
            meta: 'Six semaines, périmètre fixe',
            desc: 'Votre boutique rendue lisible et corroborée, avec une mesure avant / après sur les mêmes questions.',
            cta: 'Réserver un appel',
            action: 'call',
            featured: false,
            badge: true,
          },
          {
            name: 'Suivi GEO mensuel',
            price: '900–1 800 €',
            meta: 'Par mois, 3 mois minimum',
            desc: 'Les mêmes questions reposées chaque mois, trafic IA suivi dans GA4, itérations.',
            cta: 'Réserver un appel',
            action: 'call',
            featured: false,
            badge: false,
          },
        ],
      },
      {
        heading: 'Agents IA',
        items: [
          {
            name: 'Développement d’agent IA',
            price: '3 000–8 000 €',
            meta: 'Un processus',
            desc: 'Un agent, calibré sur un processus réel, construit, testé et livré avec sa documentation.',
            cta: 'Réserver un appel',
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
            name: 'Diagnostic conversion gratuit',
            price: '0 €',
            meta: 'Sous 3 jours ouvrés',
            desc: '5 correctifs classés par impact sur le chiffre d’affaires.',
            cta: 'Demander le diagnostic',
            action: 'diagnostic',
            featured: false,
            badge: false,
          },
          {
            name: 'Audit conversion approfondi',
            price: '500–1 500 €',
            meta: 'Rapport complet',
            desc: 'Rapport complet et feuille de route priorisée. Déduit de votre premier sprint ou accompagnement.',
            cta: 'Réserver un appel',
            action: 'call',
            featured: false,
            badge: false,
          },
          {
            name: 'Sprint d’optimisation',
            price: '1 500–3 500 €',
            meta: '2 à 3 semaines',
            desc: 'Les principaux points de l’audit corrigés en 2 à 3 semaines, à périmètre fixe.',
            cta: 'Réserver un appel',
            action: 'call',
            featured: false,
            badge: false,
          },
        ],
      },
    ],
    retainersHeading: 'Accompagnement conversion mensuel',
    retainerCta: 'Commencer par un diagnostic',
    retainers: [
      {
        tier: 'Starter',
        price: '1 000–1 500 €',
        features: ['1–2 tests / mois', 'Reporting mensuel', 'Petits correctifs inclus'],
      },
      {
        tier: 'Growth',
        price: '2 000–3 500 €',
        features: ['Tests A/B continus', 'Optimisation des fiches produit et du checkout'],
      },
      {
        tier: 'Scale',
        price: '4 000–6 000 €+',
        features: [
          'Programme de conversion complet',
          'Plusieurs tests en parallèle',
          'Traitement prioritaire et point stratégie mensuel',
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
        a: 'Des marques e-commerce qui vendent en France et sur les marchés francophones (Belgique, Suisse), généralement sur Shopify ou WooCommerce. Nous nous concentrons sur les marchés francophones parce qu’une IA répond à une question posée en français à partir de sources en français, et que c’est le terrain que nous connaissons. Les marques basées ailleurs qui vendent en France sont les bienvenues.',
      },
      {
        q: 'Construisez-vous vraiment les agents IA, ou revendez-vous un outil ?',
        a: 'Nous les construisons. Chaque agent est calibré sur un workflow réel de votre entreprise, développé sur vos systèmes, testé, puis livré avec sa documentation. Il vous appartient. Nous utilisons les mêmes agents pour notre propre exécution : nous ne livrons donc que ce en quoi nous avons nous-mêmes confiance.',
      },
      {
        q: 'En combien de temps verrai-je des résultats ?',
        a: 'Sur la visibilité dans les IA : ce qui dépend de votre site (données structurées, pages réponses, informations corrigées) est en place en quelques semaines ; le programme dure six semaines ; la corroboration par d’autres sources se gagne sur plusieurs mois, d’où un suivi de 3 mois minimum. Sur la conversion : les correctifs d’un sprint sont en ligne en quelques semaines, les gains cumulés viennent de l’accompagnement.',
      },
      {
        q: 'Comment mesurez-vous le succès ?',
        a: 'Par des chiffres que vous pouvez vérifier : part des réponses d’IA où votre marque apparaît, trafic venu des IA et ce qu’il achète, taux de conversion et revenu ajouté à budget publicitaire constant. Si nous ne pouvons pas le mesurer, nous ne le revendiquons pas.',
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
  },

  call: {
    metaTitle: 'Demander un appel - Maubourg Studio',
    metaDescription:
      'Laissez votre numéro et nous vous rappelons : 15 minutes sur votre présence dans les réponses des IA, vos opérations ou votre boutique. Sans engagement.',
    back: '← Retour à l’accueil',
    eyebrow: 'Demander un appel',
    title: 'Laissez-nous votre numéro.',
    titleAccent: 'Nous vous rappelons.',
    subtitle:
      'Indiquez le meilleur moment pour vous joindre. Nous vous rappelons sous un jour ouvré pour un échange direct : votre présence dans les réponses des IA, un processus à automatiser, ou ce qui freine vos ventes.',
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
      topics: [
        'Visibilité dans les IA (GEO)',
        'Agents IA',
        'Conversion',
        'Je ne sais pas encore',
      ],
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
    metaTitle: 'Testez un agent sur votre fiche produit - Maubourg Studio',
    metaDescription:
      'Collez l’URL d’une fiche produit de votre boutique. En 30 secondes environ, un agent la lit, nomme ce qui vous coûte des ventes et réécrit la description, prête à coller. Gratuit.',
    back: '← Retour à l’accueil',
    eyebrow: 'Démo d’agent en direct',
    title: 'Regardez un agent réécrire',
    titleAccent: 'une de vos fiches produit.',
    subtitle:
      'Collez l’adresse d’une fiche produit de votre boutique. Un agent la lit, nomme ce qui vous coûte le plus de ventes et rédige une nouvelle description prête à coller. 30 secondes environ, et le résultat s’affiche sur cette page.',
    form: {
      label: 'URL de la fiche produit',
      placeholder: 'marque.fr/products/votre-produit',
      submit: 'Lancer l’agent →',
      running: 'En cours…',
      note: 'Gratuit. 30 secondes environ. Sans e-mail ni inscription : le résultat s’affiche ici.',
      privacy:
        'L’URL sert uniquement à produire ce résultat. Rien n’est écrit en base, et la page reconstruite est supprimée une heure après.',
    },
    loading: {
      steps: [
        'Lecture de votre fiche produit…',
        'Analyse du texte…',
        'Rédaction de la nouvelle version…',
      ],
    },
    what: {
      heading: 'Ce que vous avez sous les yeux',
      items: [
        {
          title: 'Un agent, une tâche',
          body: 'Il lit une page en ligne, diagnostique le texte et le réécrit. Rien n’est jamais écrit dans votre boutique.',
        },
        {
          title: 'Il répond dans votre langue',
          body: 'Le résultat suit la langue de la page envoyée, pas celle de ce site.',
        },
        {
          title: 'C’est nous qui l’avons construit',
          body: 'La même main que les agents que nous livrons à nos clients. Celui-ci est volontairement petit, pour que vous puissiez vérifier son travail en une minute.',
        },
      ],
    },
    gate: {
      ready: 'Votre nouvelle fiche est prête.',
      productLabel: 'Produit',
      verdictLabel: 'Le verdict commence par',
      gapsFound: '{n} problèmes trouvés sur cette page',
      gapsFoundOne: '1 problème trouvé sur cette page',
      previewPromise:
        'Votre fiche produit a été reconstruite avec la nouvelle description à la place de l’ancienne. Elle s’ouvre ici, et vous pouvez la télécharger.',
      intro: 'Dites-nous où l’envoyer. Le résultat complet s’ouvre ici dans la foulée.',
      name: 'Votre nom',
      namePlaceholder: 'Camille Martin',
      email: 'E-mail',
      emailPlaceholder: 'camille@marque.fr',
      consent:
        'Recevoir occasionnellement des e-mails sur la conversion e-commerce. Désinscription à tout moment.',
      submit: 'Voir le résultat complet →',
      submitting: 'Ouverture…',
      use: 'Votre e-mail sert à vous envoyer une copie de ce résultat et à vous répondre si vous écrivez.',
      privacyLink: 'Ce que nous en faisons',
    },
    result: {
      verdictLabel: 'Le verdict',
      beforeLabel: 'Votre texte actuel',
      afterLabel: 'La nouvelle version',
      gapsLabel: 'Ce qui manque',
      copy: 'Copier la nouvelle version',
      copied: 'Copié',
      previewLabel: 'Votre page, avec le nouveau texte dedans',
      previewNote:
        'C’est votre fiche produit, votre design et vos images, avec la nouvelle description à la place de l’ancienne. Elle tourne sans aucun script : les éléments qui dépendent du JavaScript peuvent s’afficher autrement. Rien n’a été écrit dans votre boutique.',
      previewMarker: 'Nouveau texte',
      previewOpen: 'Ouvrir dans un nouvel onglet',
      previewDownload: 'Télécharger le HTML',
      previewExpires:
        'Cette page reste disponible une heure, puis notre copie est supprimée.',
      previewUnavailable:
        'Nous n’avons pas pu replacer le nouveau texte dans cette page avec certitude, donc nous ne l’avons pas reconstruite. Plutôt que de vous montrer une version cassée de votre propre boutique, voici la réécriture seule.',
      emailed: 'Une copie part vers votre boîte mail.',
      lowConfidence:
        'Cette page a été difficile à lire automatiquement : la réécriture peut reposer sur un contenu partiel.',
      again: 'Tester une autre fiche produit',
    },
    frame: {
      title: 'C’était un agent, une tâche, en 30 secondes environ.',
      body: 'Ceux que nous construisons tournent en continu sur un catalogue entier : rédaction et mise à jour des textes, métadonnées manquantes, et repérage des fiches qui perdent des ventes sans bruit.',
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
      subject: 'Votre nouvelle fiche : {product}',
      intro:
        '{name}, voici ce que notre agent a trouvé sur votre page {product}, telle qu’elle est en ligne.',
      verdictLabel: 'Le verdict',
      beforeLabel: 'Votre texte actuel',
      afterLabel: 'La nouvelle version',
      gapsLabel: 'Ce qui manque',
      previewNote:
        'Votre page avec le nouveau texte déjà dedans reste ouverte pendant une heure dans l’onglet où vous avez lancé la démo. C’est une copie reconstruite, à regarder : rien n’a été modifié dans votre boutique.',
      frame:
        'C’était un agent, une tâche. Ceux que nous construisons tournent en continu sur un catalogue entier. Pour voir ce que cela donnerait sur le vôtre, réservez 15 minutes.',
      cta: 'Réserver un appel de 15 minutes',
      footer:
        'Envoyé par Maubourg Studio parce que vous avez demandé cette réécriture sur maubourg.studio. Répondez à cet e-mail, un humain le lit.',
    },
  },

  privacy: {
    metaTitle: 'Confidentialité - Maubourg Studio',
    metaDescription:
      'Ce que nous collectons quand vous demandez un diagnostic, un appel ou une démo d’agent, ce que nous en faisons, et comment le faire supprimer.',
    back: '← Retour à l’accueil',
    eyebrow: 'Confidentialité',
    title: 'Ce que nous collectons, et pourquoi.',
    updated: 'Dernière mise à jour : juillet 2026',
    intro:
      'Maubourg Studio est un studio d’une personne, basé à Paris. Cette page dit simplement ce que deviennent les informations que vous saisissez ici. Si un point reste flou, écrivez-nous.',
    sections: [
      {
        title: 'Quand vous demandez un diagnostic ou un appel',
        body: 'Nous conservons votre nom, votre e-mail, votre téléphone, l’URL de votre boutique et ce que vous avez écrit dans le message. Ils servent à rédiger votre diagnostic, à vous rappeler et à faire une relance. Ils sont stockés sur notre propre serveur dans l’Union européenne, ni vendus ni partagés.',
      },
      {
        title: 'Quand vous lancez la démo d’agent',
        body: 'Vous nous donnez l’URL d’une fiche produit, et rien d’autre. Nous ne demandons ni nom ni e-mail, et le résultat complet s’affiche sur la page. L’URL, le contenu de la page et la copie reconstruite restent en mémoire et disparaissent dans l’heure, sans jamais être écrits en base. Nous nous envoyons en revanche une copie de ce que l’agent a répondu, pour voir ce qu’il vaut sur de vraies boutiques.',
      },
      {
        title: 'Listes de diffusion',
        body: 'La démo ne vous inscrit sur aucune liste, puisqu’elle ne demande aucune adresse. Les seuls e-mails que nous envoyons répondent à un diagnostic ou à un appel que vous avez demandé vous-même, et une ligne suffit pour que cela s’arrête.',
      },
      {
        title: 'L’agent et le modèle',
        body: 'Le texte de la page soumise est transmis à Anthropic, fournisseur du modèle qui rédige la nouvelle version, le temps de produire la réponse. Rien qui vous concerne ne part avec : la démo ne vous a rien demandé.',
      },
      {
        title: 'Ce que nous ne faisons pas',
        body: 'Aucun cookie publicitaire, aucune balise de mesure, aucune bannière de consentement, parce qu’il n’y a rien à consentir. Nous comptons les lancements et les résultats côté serveur sans identifier personne : les adresses IP sont hachées pour la limitation d’usage et jamais conservées en clair.',
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
      // REVIEW-FR: trois services au lieu de cinq.
      navBlurb: 'Trois métiers, et ce que chacun rapporte.',
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

    conversion: {
      // REVIEW-FR: page recentrée sur la conversion seule, sans la partie mesure.
      nav: {
        label: 'Conversion',
        blurb: 'Réparer ce qui fait perdre la vente sur la boutique que vous avez déjà.',
      },
      meta: {
        title: 'Optimisation du taux de conversion - Maubourg Studio',
        description:
          'Tests A/B sur les fiches produit, le panier et le checkout, en commençant par les fuites qui coûtent le plus. Pour les marques e-commerce qui vendent en France et sur les marchés francophones.',
      },
      hero: {
        eyebrow: 'Conversion',
        title: 'Vous avez déjà payé ce trafic.',
        titleAccent: 'Faites-en des acheteurs.',
        subtitle:
          'Être recommandé, par une IA ou par qui que ce soit, ne vaut rien si la page d’arrivée fait perdre la vente. Ici, le travail porte sur la boutique elle-même : trouver où les acheteurs décrochent, corriger en priorité, puis tester le correctif au lieu d’en supposer l’effet.',
        ctaPrimary: 'Demander un diagnostic conversion gratuit →',
        ctaSecondary: 'Réserver 15 minutes',
        stat: '+1 point',
        statNote:
          'de conversion sur 20 000 sessions à 60€ représente environ 12 000€ par mois, à budget publicitaire identique.',
      },
      funnel: {
        eyebrow: 'Où la vente se perd',
        title: 'Cinq étapes, quatre endroits pour perdre l’acheteur.',
        intro:
          'Toutes les boutiques perdent leurs visiteurs aux mêmes endroits. L’intérêt d’un audit est de trouver lequel vous coûte le plus : corriger le troisième problème avant le premier, c’est six mois de perdus.',
        steps: [
          { label: 'Sessions', note: 'Le trafic que vous payez déjà' },
          { label: 'Fiche produit', note: 'La majorité s’arrête là. Texte, preuve, livraison' },
          { label: 'Panier', note: 'Frais de port révélés trop tard' },
          { label: 'Checkout', note: 'Compte obligatoire, trop de champs' },
          { label: 'Achat', note: 'Ce sur quoi tout le reste est jugé' },
        ],
        caption: 'À titre indicatif. Vos chiffres réels sortent du diagnostic.',
      },
      leaks: {
        eyebrow: 'Ce que nous trouvons le plus souvent',
        title: 'Les mêmes fuites, boutique après boutique.',
        intro:
          'Ce ne sont pas des hypothèses : ce sont les constats qui reviennent le plus souvent dans nos diagnostics, chacun vérifié sur une capture de la page réelle avant d’entrer dans un rapport.',
        columns: { leak: 'Le constat', cost: 'Ce que ça coûte', fix: 'Ce que nous faisons' },
        rows: [
          {
            leak: 'Conditions de livraison loin du prix',
            cost: 'La question la plus fréquente au moment de décider reste sans réponse ; l’acheteur part la chercher ailleurs.',
            fix: 'Remonter les conditions à côté du prix, puis tester la formulation et pas seulement l’emplacement.',
          },
          {
            leak: 'Une fiche qui ouvre sur les caractéristiques',
            cost: 'La première ligne dépense la seule attention disponible sur des détails qui ne comptent pas encore pour l’acheteur.',
            fix: 'Réécrire en partant du bénéfice, et garder la caractéristique dessous comme preuve.',
          },
          {
            leak: 'Un compte obligatoire pour commander',
            cost: 'L’absence de commande en invité est souvent la plus grosse perte récupérable d’une boutique.',
            fix: 'Ouvrir la commande en invité, puis mesurer l’effet au lieu de le supposer.',
          },
          {
            leak: 'Aucun repère de taille ni de coupe',
            cost: 'Le doute devient un panier abandonné ou un retour, et les deux vous coûtent.',
            fix: 'Mettre le repère là où naît le doute, sur la page, pas dans une FAQ.',
          },
          {
            leak: 'Une preuve qui arrive après la décision',
            cost: 'Des avis placés sous la ligne de flottaison ne convainquent que ceux qui ont déjà dépassé le bouton d’achat.',
            fix: 'Remonter la preuve la plus forte, et tester la place qu’elle mérite vraiment.',
          },
        ],
      },
      how: {
        eyebrow: 'Comment ça se déroule',
        title: 'Diagnostic, sprint, puis effet cumulé.',
        steps: [
          {
            name: 'Diagnostic',
            price: 'Offert',
            body: 'Cinq correctifs classés par impact. Le document vous appartient, que nous travaillions ensemble ou non.',
          },
          {
            name: 'Sprint',
            price: '1 500€ à 3 500€',
            body: 'Deux à trois semaines, périmètre fixe, les constats prioritaires livrés et mesurés.',
          },
          {
            name: 'Accompagnement',
            price: 'à partir de 1 000€ / mois',
            body: 'Tests en continu, trois mois minimum, le temps qu’un test soit significatif.',
          },
        ],
      },
      diagnostic: {
        eyebrow: 'Diagnostic conversion gratuit',
        title: 'Recevez 5 correctifs classés par impact sur le chiffre d’affaires.',
        intro:
          'Donnez-nous l’adresse de votre boutique. Sous 3 jours ouvrés, vous recevez un PDF de 3 à 4 pages : les pertes qui vous coûtent le plus à corriger en premier, et les deux ou trois actions applicables dès cette semaine. C’est gratuit, et le document vous appartient.',
        points: [
          'Un vrai audit de votre boutique en ligne, pas une checklist générique',
          'Des constats classés par impact et par effort, pour savoir par où commencer',
          'Un PDF de 3 à 4 pages sous 3 jours ouvrés',
          'Sans engagement : appliquez les correctifs vous-même, ou parlons-en',
        ],
        sampleTitle: 'Voyez un audit réel avant de demander le vôtre.',
        sampleBody: 'Un audit complet réalisé pour une marque réelle, anonymisé.',
        sampleLink: 'Lire l’audit d’exemple (PDF) →',
        submit: 'Recevoir mon diagnostic gratuit →',
        success: {
          title: 'Demande reçue.',
          body: 'Nous passons votre boutique en revue et vous envoyons votre diagnostic en PDF sous 3 jours ouvrés. Surveillez votre boîte mail.',
          again: 'Envoyer une autre boutique',
        },
      },
      cta: {
        title: 'Commencez par un diagnostic conversion gratuit.',
        body: 'Nous analysons votre boutique et vous envoyons les cinq correctifs qui rapportent le plus. Sans appel préalable, sans contrepartie.',
        primary: 'Demander le diagnostic →',
      },
      related: [
        {
          page: 'geo',
          text: 'Être cité dans une réponse d’IA amène des acheteurs sur la page que ce travail répare.',
        },
        {
          page: 'agents',
          text: 'Un agent réécrit un catalogue plus vite qu’une équipe ne teste une page.',
        },
      ],
    },

    geo: {
      nav: { label: 'Visibilité LLM (GEO)', blurb: 'Être la marque que les IA citent.' },
      meta: {
        title: 'Visibilité sur les LLMs (GEO) - Maubourg Studio',
        // REVIEW-FR: description réécrite.
        description:
          'Auditer, mesurer et améliorer la façon dont ChatGPT, Gemini, Perplexity et Claude citent votre marque. Pour les marques e-commerce qui vendent en France et sur les marchés francophones.',
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
        // REVIEW-FR: les cinq leviers deviennent les trois blocs audit, mesure, amélioration.
        eyebrow: 'En quoi consiste le travail',
        title: 'Auditer, mesurer, améliorer.',
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
            price: 'Gratuit, ou 900–1 500 € pour l’audit approfondi',
            lead: 'Ce que ChatGPT, Gemini, Perplexity et Claude disent de votre marque et de vos concurrents, mesuré sur des séries de vraies questions d’achat.',
            body: 'Vous recevez les questions posées, la fréquence à laquelle chaque outil vous cite, les marques citées à votre place, et la façon dont votre marque est décrite quand elle apparaît. Les mêmes questions sont reposées plus tard, donc le deuxième rapport se compare au premier.',
          },
          {
            title: 'Mesure',
            price: 'Incluse dans le programme et dans le suivi, 900–1 800 € / mois',
            lead: 'GA4 configuré pour montrer le trafic qui vient des IA et ce que ces visiteurs font sur votre site.',
            body: 'Le trafic venu des IA apparaît comme un canal à part dans GA4, avec le comportement de ces visiteurs une fois sur le site. Une partie de ce trafic ne porte aucune trace de sa provenance : nous indiquons à chaque fois de combien le chiffre peut sous-estimer la réalité.',
          },
          {
            title: 'Amélioration',
            price: 'Programme GEO, 3 500–6 000 €',
            lead: 'Le travail qui vous fait citer plus souvent : des fiches produit plus lisibles, une présence sur les sites que les IA consultent, des informations erronées corrigées à la source. En grande partie mené par nos propres agents.',
            body: 'Vous recevez une liste priorisée de ce qu’il faut changer, puis le travail lui-même : des pages qui répondent clairement aux questions d’achat, des données structurées cohérentes avec le contenu, les informations erronées corrigées là où une IA les répète, et une présence sur les sites d’où votre catégorie est lue. Nous rapportons ce qui a bougé, et ce qui n’a pas bougé.',
          },
        ],
      },
      changes: {
        // REVIEW-FR: tableau entièrement rédigé ici, sur le modèle de la page Conversion.
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
          page: 'conversion',
          text: 'Être recommandé vaut moins si la page d’arrivée ne vend pas.',
        },
        {
          page: 'agents',
          text: 'Un catalogue lisible par une IA est un catalogue tenu à jour. C’est le travail d’un agent.',
        },
      ],
    },

    agents: {
      nav: {
        label: 'Agents IA',
        blurb: 'Des logiciels qui font le travail répétitif. Essayez-en un.',
      },
      meta: {
        title: 'Agents IA pour l’e-commerce - Maubourg Studio',
        // REVIEW-FR: mention avant-vente retirée.
        description:
          'Des agents IA calibrés sur vos processus réels : traitement des commandes, relances fournisseurs, tenue du catalogue. Essayez-en un sur votre fiche produit.',
      },
      hero: {
        eyebrow: 'Agents IA',
        title: 'Ce que vos équipes refont chaque semaine,',
        titleAccent: 'un agent peut le faire à leur place.',
        subtitle:
          'Pas un chatbot posé dans un coin du site. Un agent conçu pour un processus précis, avec les outils nécessaires, des limites qu’il ne franchit pas, et une passation à un humain quand il doit s’arrêter. Plus simple à montrer qu’à décrire : un agent tourne plus bas sur cette page.',
        ctaPrimary: 'Essayer sur votre fiche produit ↓',
        ctaSecondary: 'Réserver 15 minutes',
      },
      demoIntro: {
        eyebrow: 'Une démonstration, pas une promesse',
        title: 'Donnez-lui une de vos fiches produit.',
        body: 'Il lit la page, identifie ce qui vous coûte la vente, et réécrit la description. Environ trente secondes, sans e-mail ni inscription : le résultat s’affiche ici. C’est un agent volontairement limité à une tâche. Ceux que nous construisons tournent en continu sur tout un catalogue.',
      },
      families: {
        eyebrow: 'Ce que nous construisons',
        // REVIEW-FR: deux familles au lieu de trois, opérations en premier.
        title: 'Deux types d’agents, calibrés sur vos processus.',
        items: [
          {
            title: 'Agents d’opérations',
            body: 'Ce qui occupe vos équipes sans créer de valeur : tri des commandes, relances fournisseurs, retours, le rapport interne que quelqu’un refait à la main chaque lundi.',
            examples: [
              'Tri des commandes et exceptions',
              'Relances fournisseurs',
              'Traitement des retours',
              'Reporting interne',
            ],
          },
          {
            title: 'Catalogue & merchandising',
            body: 'Rédige et actualise les fiches produit, complète les métadonnées que personne n’a eu le temps de remplir, et signale les pages et annonces qui sous-performent avant que vous ne le remarquiez.',
            examples: [
              'Rédaction et mise à jour des fiches',
              'Métadonnées manquantes',
              'Annonces en sous-performance',
              'Qualité du flux et du catalogue',
            ],
          },
        ],
      },
      workflow: {
        eyebrow: 'Comment on en construit un',
        title: 'Comment nous construisons un agent.',
        nodes: [
          { label: 'Déclencheur', note: 'Une commande arrive, une page change, un client demande' },
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
        body: 'Les agents que nous construisons pour nos clients font aussi tourner le studio : reporting et onboarding standardisés, livraison plus rapide, rien qui passe entre les mailles. C’est ce qui permet à un studio de notre taille d’assurer cette charge.',
      },
      price: {
        label: 'Construction d’un agent',
        value: '3 000€ à 8 000€',
        note: 'Un agent, calibré sur un processus réel, construit, testé et livré avec sa documentation.',
      },
      cta: {
        title: 'Vous avez un processus en tête ?',
        primary: 'Réserver 15 minutes →',
        secondary: 'Ou essayez l’agent sur une de vos fiches produit ↑',
      },
      related: [
        {
          page: 'conversion',
          text: 'Un agent qui réécrit les fiches vaut plus quand vous pouvez mesurer quelle version a gagné.',
        },
        {
          page: 'geo',
          text: 'Tenir un catalogue à grande échelle, c’est aussi ce qui vous rend lisible par une IA.',
        },
      ],
    },

  },

  // Le blog. Seules les pages françaises sont construites aujourd’hui :
  // c’est la langue dans laquelle les articles sont écrits.
  articles: {
    meta: {
      title: 'Blog - Maubourg Studio',
      // REVIEW-FR: description et intro du blog réécrites.
      description:
        'Des réponses claires aux questions que se posent les marques e-commerce : visibilité dans les réponses des IA, agents IA et conversion.',
    },
    index: {
      eyebrow: 'Blog',
      title: 'Les questions que les marques posent vraiment.',
      intro:
        'Des textes courts sur la visibilité dans les réponses des IA, les agents IA et la conversion. Une question par texte, la réponse dès le premier paragraphe.',
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
        body: 'Chaque diagnostic part de votre boutique, pas d’un modèle standard.',
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
    // REVIEW-FR: titre et description de la page d’accueil réécrits.
    homeTitle: 'Maubourg Studio - Studio GEO et agents IA pour l’e-commerce',
    homeDescription:
      'Maubourg Studio, à Paris, rend les marques e-commerce visibles dans les réponses de ChatGPT, Gemini et Perplexity, et construit des agents IA pour leurs opérations. Pour les marques qui vendent en France et sur les marchés francophones.',
  },
};
