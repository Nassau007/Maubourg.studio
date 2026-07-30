import type { Dictionary } from './en';

export const fr: Dictionary = {
  nav: {
    links: [
      { label: 'Le problème', hash: '#problem' },
      { label: 'Ce que nous faisons', hash: '#work' },
      { label: 'Méthode', hash: '#process' },
      { label: 'Tarifs', hash: '#pricing' },
    ],
    cta: 'Diagnostic gratuit',
    ctaShort: 'Diagnostic offert',
    languageLabel: 'Langue',
  },

  hero: {
    badge: 'Studio RevOps IA · E-commerce européen',
    title: 'Votre boutique a déjà du trafic.',
    titleAccent: 'Transformons-le en ventes. Et automatisons le reste.',
    subtitle:
      'Nous aidons les marques e-commerce européennes à tirer plus de revenus des visiteurs qu’elles paient déjà, en pilotant toute l’opération de revenus, de la conversion et la rétention jusqu’aux agents IA qui la font tourner.',
    ctaPrimary: 'Recevez un diagnostic gratuit →',
    note: '5 correctifs classés par impact, en PDF de 3 à 4 pages, sous 3 jours ouvrés. Sans engagement, sans argumentaire.',
    talkPrefix: 'Vous préférez en parler d’abord ?',
    ctaSecondary: 'Réserver un appel de 15 min →',
    skillsHeading: 'Ce que nous pilotons pour vous',
    skills: [
      { name: 'Conversion', body: 'Tests A/B sur les fiches produit, le panier et le paiement, en commençant par les fuites les plus coûteuses.' },
      { name: 'Rétention', body: 'Scénarios e-mail et SMS Klaviyo qui récupèrent les paniers et font revenir les acheteurs.' },
      { name: 'Publicité', body: 'Budgets Meta, Google et TikTok pilotés sur un objectif de retour.' },
      { name: 'Agents IA', body: 'Construits pour vos opérations, votre catalogue et les questions qui bloquent une vente.' },
    ],
  },

  marquee: {
    heading: 'La stack sur laquelle nous construisons',
    items: [
      'Shopify',
      'WooCommerce',
      'Klaviyo',
      'Agents IA',
      'Automatisation des workflows',
      'GA4 & tracking côté serveur',
      'Meta & Google Ads',
      'Tests A/B',
      'Optimisation du checkout',
      'Conforme UE / RGPD',
    ],
  },

  problem: {
    eyebrow: 'Le problème',
    title: 'Plus de budget pub ne réparera pas une boutique qui fuit.',
    pains: [
      {
        title: 'Vous payez pour du trafic qui repart',
        body: 'Les dépenses en publicité et en SEO grimpent, mais trop de visiteurs arrivent, regardent et repartent sans jamais ajouter au panier.',
      },
      {
        title: 'Vous soupçonnez une fuite - sans voir où',
        body: 'La perte se situe quelque part entre la fiche produit et le paiement. Deviner coûte cher, tester à l’aveugle encore plus.',
      },
      {
        title: 'Ce chiffre d’affaires est déjà à portée',
        body: 'Vous n’avez pas besoin de plus de trafic pour croître. Une boutique qui convertit mieux gagne plus avec exactement les mêmes visiteurs, au même coût publicitaire.',
      },
    ],
  },

  services: {
    eyebrow: 'Ce que nous faisons',
    title: 'Tout votre RevOps - pas un seul canal.',
    intro:
      'La plupart des agences ne pilotent qu’un canal. Nous pilotons le système qui transforme le trafic en revenus récurrents : conversion, rétention, campagnes payantes et le tracking en dessous, avec des agents IA qui prennent en charge le travail répétitif derrière. La boutique n’est refondue que lorsque ce sont les fondations qui vous freinent.',
    tags: { core: 'Cœur', ai: 'Agents IA', foundation: 'Fondations', included: 'Inclus' },
    items: [
      {
        tag: 'Cœur',
        title: 'Optimisation du taux de conversion',
        body: 'Tests A/B continus sur les fiches produit, le panier et le checkout, les fuites les plus rentables d’abord. Vous voyez l’impact sur le chiffre d’affaires, pas des indicateurs de vanité.',
      },
      {
        tag: 'Cœur',
        title: 'Rétention e-mail & SMS',
        body: 'Des scénarios lifecycle dans Klaviyo qui récupèrent les paniers et font revenir les acheteurs. Souvent 20 à 40 % du chiffre d’affaires, et généralement le plus négligé.',
      },
      {
        tag: 'Cœur',
        title: 'Gestion des campagnes payantes',
        body: 'Budgets Meta, Google et TikTok pilotés vers un retour cible pour réduire le coût d’acquisition.',
      },
      {
        tag: 'Agents IA',
        title: 'Agents sur mesure pour vos opérations',
        body: 'Nous construisons des agents qui déchargent votre équipe du travail répétitif : traitement des commandes, relances fournisseurs, retours, reporting interne. Calibrés sur votre vrai workflow, pas un chatbot générique.',
      },
      {
        tag: 'Agents IA',
        title: 'Agent catalogue & merchandising',
        body: 'Un agent qui rédige et actualise vos fiches produit, comble les métadonnées manquantes et signale les annonces et pages produit qui sous-performent.',
      },
      {
        tag: 'Agents IA',
        title: 'Agent support & avant-vente',
        body: 'Il répond aux questions qui bloquent un achat : tailles, stock, livraison, retours etc. dans la voix de votre marque, avec un passage de relais propre à un humain quand c’est nécessaire.',
      },
      {
        tag: 'Fondations',
        title: 'Créations & refontes de boutique',
        body: 'Créations et migrations Shopify prêtes à convertir, périmètre fixe, quand les fondations actuelles freinent les ventes.',
      },
      {
        tag: 'Fondations',
        title: 'Analytics & tracking',
        body: 'GA4, tracking côté serveur et consent mode configurés correctement pour que chaque conversion soit mesurable et conforme au RGPD.',
      },
      {
        tag: 'Inclus',
        title: 'Reporting piloté par agents',
        body: 'Les agents que nous construisons pour nos clients pilotent aussi notre propre exécution : reporting et onboarding standardisés, livraison plus rapide, et rien qui passe entre les mailles.',
      },
    ],
  },

  process: {
    eyebrow: 'Comment ça marche',
    title: 'Commencez gratuitement. Corrigez ce qui rapporte. Puis capitalisez.',
    claim: 'Demandez le vôtre →',
    steps: [
      {
        step: '01',
        name: 'Diagnostic',
        price: 'Gratuit',
        body: 'Nous auditons votre boutique en ligne et repérons précisément où les ventes fuient : 5 correctifs classés par impact, en PDF de 3 à 4 pages sous 3 jours ouvrés. À vous de le garder, que l’on travaille ensemble ou non.',
      },
      {
        step: '02',
        name: 'Sprint',
        price: 'Périmètre fixe',
        body: 'Nous livrons d’abord les correctifs au meilleur ROI, en un sprint concentré de 2 à 3 semaines, ou nous refondons la boutique quand les fondations ne tiennent plus. Adapté à votre trésorerie, sans engagement long pour démarrer.',
      },
      {
        step: '03',
        name: 'Accompagnement',
        price: 'Mensuel',
        body: 'Nous menons des tests A/B en continu pour faire progresser la conversion mois après mois. C’est là que se jouent les vrais gains, et la vraie relation.',
      },
    ],
  },

  whyMe: {
    eyebrow: 'Pourquoi Maubourg',
    quoteBefore:
      'Les visiteurs que vous payez déjà sont la croissance la moins chère que vous puissiez acheter. Nous aidons simplement davantage d’entre eux à',
    quoteAccent: 'dire oui.',
    points: [
      {
        title: 'Focalisés sur l’Europe',
        body: 'Nous travaillons uniquement avec des boutiques européennes existantes, nous connaissons donc votre marché, vos acheteurs et vos obligations de conformité dès le premier appel.',
      },
      {
        title: 'Tout est mesuré',
        body: 'Vous voyez l’impact de chaque changement sur le chiffre d’affaires : « conversion passée de X % à Y %, +Z €/mois au même budget pub ». Jamais d’indicateurs de vanité.',
      },
      {
        title: 'Nous tournons avec les agents que nous construisons',
        body: 'Notre propre exécution (audits, reporting, contrôle des tests) est pilotée par des agents IA que nous avons construits nous-mêmes. Vous y gagnez en rapidité, et la preuve que ce que nous vous vendons fonctionne vraiment.',
      },
    ],
  },

  founder: {
    name: 'Nathan Alcotte',
    role: 'Fondateur, Maubourg Studio',
    photoAlt: 'Nathan Alcotte, fondateur de Maubourg Studio',
    initials: 'NA',
    blurb: 'Opérations e-commerce et automatisation. Basé à Paris. C’est moi qui lis votre boutique.',
  },

  pricing: {
    eyebrow: 'Tarifs',
    title: 'Un prix indexé sur le chiffre d’affaires généré.',
    intro:
      'Démarrez par un diagnostic ou un projet ponctuel, puis poursuivez avec l’optimisation mensuelle. Chaque accompagnement court sur 3 mois minimum, le temps que les tests fassent leurs preuves.',
    entry: [
      {
        name: 'Diagnostic gratuit',
        price: '0 €',
        desc: '5 correctifs de conversion classés par impact. Le moyen le plus rapide de voir si nous sommes faits pour travailler ensemble.',
        cta: 'Demander le diagnostic',
      },
      {
        name: 'Audit approfondi payant',
        price: '500–1 500 €',
        desc: 'Rapport complet et feuille de route priorisée. Déduit de votre premier sprint ou accompagnement.',
        cta: 'Réserver un appel',
      },
    ],
    project: [
      {
        name: 'Sprint d’optimisation',
        price: '1 500–3 500 €',
        desc: 'Correction en 2 à 3 semaines, périmètre fixe, des principaux points de l’audit.',
      },
      {
        name: 'Développement d’agent IA',
        price: '3 000–8 000 €',
        desc: 'Un agent, calibré sur un workflow réel, construit et livré.',
      },
      {
        name: 'Refonte / migration',
        price: '4 000–12 000 €+',
        desc: 'Nouvelle boutique Shopify prête à convertir, périmètre fixe.',
      },
    ],
    retainersHeading: 'Accompagnements mensuels : là où tout se capitalise',
    mostPopular: 'Le plus choisi',
    retainerCta: 'Commencer par un diagnostic',
    perMonth: '/mois',
    retainers: [
      {
        tier: 'Starter',
        price: '1 000–1 500 €',
        features: ['1–2 tests / mois', 'Reporting mensuel', 'Petits correctifs inclus'],
      },
      {
        tier: 'Growth',
        price: '2 000–3 500 €',
        features: ['Tests A/B continus', 'Travail fiche produit & checkout', 'Support des scénarios e-mail'],
      },
      {
        tier: 'Scale',
        price: '4 000–6 000 €+',
        features: ['Programme CRO complet', 'Plusieurs tests en parallèle', 'Priorité + appels stratégie'],
      },
    ],
    footnote: 'Fourchettes indicatives pour le marché européen.',
  },

  teardown: {
    eyebrow: 'Diagnostic gratuit',
    title: 'Recevez 5 correctifs classés par impact sur le chiffre d’affaires.',
    intro:
      'Donnez-nous l’adresse de votre boutique et vous recevrez un PDF de 3 à 4 pages sous 3 jours ouvrés avec notre analyse : les pertes les plus rentables à corriger en premier, et les deux ou trois actions applicables dès cette semaine. C’est gratuit, et le document vous appartient.',
    points: [
      'Un vrai audit de votre boutique en ligne, pas une checklist générique',
      'Des points classés par impact × effort, pour savoir par où commencer',
      'Un PDF de 3 à 4 pages dans votre boîte mail sous 3 jours ouvrés',
      'Sans engagement : prenez la liste et foncez, ou parlons-en',
    ],
    sampleTitle: 'Voyez un vrai diagnostic avant de demander le vôtre.',
    sampleBody: 'Un diagnostic complet réalisé sur une boutique en ligne européenne, dont le nom a été retiré.',
    sampleLink: 'Lire le diagnostic d’exemple (PDF) →',
    talkPrefix: 'Vous préférez d’abord échanger ?',
    talkLink: 'Réserver un appel de 15 minutes →',
    form: {
      step1Of2: 'Étape 1 sur 2',
      step2Of2: 'Étape 2 sur 2',
      step1Title: 'Où se trouve votre boutique ?',
      step2Title: 'Presque terminé.',
      step2Intro: 'Deux détails rapides pour que le diagnostic arrive dans la bonne boîte mail, à votre nom.',
      continue: 'Continuer →',
      back: '← Retour',
      name: 'Votre nom',
      namePlaceholder: 'Marie Dupont',
      email: 'E-mail',
      emailPlaceholder: 'marie@marque.com',
      storeUrl: 'URL de la boutique',
      storeUrlPlaceholder: 'marque.com',
      platform: 'Plateforme',
      monthlyRevenue: 'Chiffre d’affaires mensuel',
      revenueHelp: 'Sert uniquement à calibrer les estimations de chiffre d’affaires de votre diagnostic.',
      select: 'Sélectionner…',
      message: 'Un point précis ?',
      optional: '(facultatif)',
      messagePlaceholder: 'Où pensez-vous perdre des ventes ?',
      submit: 'Recevoir mon diagnostic gratuit →',
      submitting: 'Envoi…',
      privacy:
        'Pas de spam. Nous utilisons votre e-mail uniquement pour vous envoyer votre diagnostic et vous relancer une fois.',
      revenueBands: [
        'Moins de 10 k€ / mois',
        '10 k€–50 k€ / mois',
        '50 k€–200 k€ / mois',
        '200 k€–500 k€ / mois',
        '500 k€+ / mois',
      ],
      platforms: ['Shopify', 'WooCommerce', 'Autre'],
    },
    success: {
      title: 'Demande reçue.',
      body: 'Nous allons analyser votre boutique et vous envoyer votre diagnostic en PDF sous 3 jours ouvrés. Surveillez votre boîte de réception.',
      again: 'Envoyer une autre boutique',
    },
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Vos questions, nos réponses.',
    items: [
      {
        q: 'Que veut dire « studio RevOps IA » concrètement ?',
        a: 'RevOps (revenue operations) signifie piloter l’ensemble du système qui transforme le trafic en revenus récurrents, plutôt qu’une seule partie : conversion, rétention, campagnes payantes et le tracking en dessous. La partie IA, c’est que nous construisons des agents pour prendre en charge les tâches répétitives. Concrètement : moins d’agences à coordonner, et une seule équipe responsable du résultat.',
      },
      {
        q: 'Le diagnostic est-il vraiment gratuit ?',
        a: 'Oui. Nous auditons votre boutique en ligne et vous renvoyons un PDF de 3 à 4 pages avec 5 correctifs classés par impact, sous 3 jours ouvrés, sans frais ni engagement. Un exemple est consultable sur cette page si vous voulez en voir un avant de demander le vôtre. Si les correctifs valent la peine, nous pouvons parler de les mener ensemble, mais la liste est à vous dans tous les cas.',
      },
      {
        q: 'Avec qui travaillez-vous ?',
        a: 'Des marques e-commerce européennes existantes, généralement des boutiques Shopify ou WooCommerce qui génèrent déjà un trafic et un chiffre d’affaires significatifs. Nous nous concentrons sur l’Europe pour connaître votre marché et vos obligations de conformité.',
      },
      {
        q: 'Construisez-vous vraiment les agents IA, ou revendez-vous un outil ?',
        a: 'Nous les construisons. Chaque agent est calibré sur un workflow réel de votre entreprise, développé sur vos systèmes, testé, puis livré avec sa documentation. Il vous appartient. Nous utilisons les mêmes agents pour notre propre exécution : nous ne livrons donc que ce en quoi nous avons nous-mêmes confiance.',
      },
      {
        q: 'Ai-je besoin d’une refonte ?',
        a: 'Le plus souvent, non. Nous commençons par l’optimisation de la conversion car elle rapporte davantage avec la boutique que vous avez déjà. Nous ne recommandons une refonte ou une migration que lorsque ce sont les fondations elles-mêmes qui freinent les ventes.',
      },
      {
        q: 'En combien de temps verrai-je des résultats ?',
        a: 'Les gains rapides d’un sprint peuvent être déployés en quelques semaines. Les gains cumulés viennent des tests continus dans l’accompagnement, c’est pourquoi nous demandons 3 mois minimum, le temps que les tests fassent leurs preuves.',
      },
      {
        q: 'Comment mesurez-vous le succès ?',
        a: 'Par le chiffre d’affaires, pas par des indicateurs de vanité. Chaque changement est rattaché à un chiffre : taux de conversion amélioré, revenu ajouté au même budget pub. Si nous ne pouvons pas le mesurer, nous ne le revendiquons pas.',
      },
    ],
  },

  footer: {
    ctaTitle: 'Commencez par un diagnostic gratuit. Si les correctifs en valent la peine,',
    ctaAccent: 'on démarre ce mois-ci.',
    ctaPrimary: 'Recevoir mon diagnostic gratuit →',
    ctaNote: '5 correctifs classés par impact, en PDF de 3 à 4 pages, sous 3 jours ouvrés.',
    talkPrefix: 'Vous préférez en parler d’abord ?',
    ctaSecondary: 'Réserver un appel de 15 min →',
    tagline: 'Studio RevOps IA pour l’e-commerce européen',
    rights: 'Tous droits réservés.',
    privacy: 'Confidentialité',
  },

  call: {
    metaTitle: 'Demander un appel - Maubourg Studio',
    metaDescription:
      'Laissez votre numéro et nous vous rappelons : un vrai échange de 15 minutes sur la conversion de votre boutique, sans engagement.',
    back: '← Retour à l’accueil',
    eyebrow: 'Demander un appel',
    title: 'Parlons de votre boutique.',
    titleAccent: 'nous vous rappelons.',
    subtitle:
      'Laissez votre numéro et le meilleur moment pour vous joindre. Nous vous rappelons sous un jour ouvré pour un échange rapide et sans pression sur les points où votre conversion fuit.',
    points: [
      {
        title: 'Un vrai échange, pas une démo',
        body: '15 minutes sur les endroits où votre boutique perd des ventes et ce qu’il vaut la peine de corriger en premier, utile que l’on travaille ensemble ou non.',
      },
      {
        title: 'Nous vous appelons, à votre rythme',
        body: 'Choisissez le créneau qui vous convient. Pas de ping-pong d’agendas, pas de formulaires à rallonge.',
      },
      {
        title: 'Sans engagement, sans forcing',
        body: 'S’il y a un fit, nous vous le dirons. Sinon, vous repartez quand même avec quelque chose d’utile.',
      },
    ],
    teardownPrefix: 'Vous préférez d’abord des correctifs par écrit ?',
    teardownLink: 'Recevez un diagnostic gratuit →',
    form: {
      name: 'Votre nom',
      namePlaceholder: 'Marie Dupont',
      phone: 'Numéro de téléphone',
      phonePlaceholder: '+33 6 12 34 56 78',
      preferredTime: 'Meilleur moment pour appeler',
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
      note: 'Un vrai appel de 15 minutes. Sans engagement, sans forcing.',
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
      'Collez l’adresse d’une fiche produit de votre boutique. Un agent la lit, nomme ce qui vous coûte le plus de ventes et rédige une nouvelle description prête à coller. 30 secondes environ, sans inscription.',
    form: {
      label: 'URL de la fiche produit',
      placeholder: 'marque.fr/products/votre-produit',
      submit: 'Lancer l’agent →',
      running: 'En cours…',
      note: 'Gratuit. 30 secondes environ. Aucune inscription pour l’essayer.',
      privacy:
        'L’URL sert uniquement à produire ce résultat. Nous ne conservons pas le contenu de la page.',
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
      emailed: 'Une copie part vers votre boîte mail.',
      lowConfidence:
        'Cette page a été difficile à lire automatiquement : la réécriture peut reposer sur un contenu partiel.',
      again: 'Tester une autre fiche produit',
    },
    frame: {
      title: 'C’était un agent, une tâche, en 30 secondes environ.',
      body: 'Ceux que nous construisons tournent en continu sur un catalogue entier : rédaction et mise à jour des textes, métadonnées manquantes, et repérage des fiches qui perdent des ventes sans bruit.',
      ctaPrimary: 'Réserver un appel de 15 min →',
      teardownPrefix: 'Vous préférez d’abord des correctifs à l’écrit ?',
      teardownLink: 'Recevoir mon diagnostic gratuit →',
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
        'La démo a atteint sa limite du jour : elle tourne sur un petit budget. Réservez 15 minutes ou demandez un diagnostic gratuit à la place.',
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
        body: 'Vous nous donnez l’URL d’une fiche produit et, pour voir le résultat, un nom et un e-mail. L’échange est assumé : le résultat est ce que vous obtenez, l’e-mail est ce que nous demandons en retour. Nous vous envoyons le résultat et conservons votre adresse pour pouvoir vous relancer. L’URL et le contenu de la page restent en mémoire 30 minutes puis disparaissent, sans jamais être écrits en base.',
      },
      {
        title: 'La case marketing',
        body: 'Elle est décochée par défaut et ne change rien au résultat que vous recevez. Cochée, elle nous autorise à vous envoyer occasionnellement des e-mails sur la conversion e-commerce. Laissée vide, nous ne vous répondons que sur ce que vous avez demandé.',
      },
      {
        title: 'L’agent et le modèle',
        body: 'Le texte de la page soumise est transmis à Anthropic, fournisseur du modèle qui rédige la nouvelle version, le temps de produire la réponse. Votre nom et votre e-mail ne sont jamais transmis avec.',
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

  errors: {
    name: 'Merci d’indiquer votre nom.',
    email: 'Merci d’indiquer un e-mail valide.',
    emailOptional: 'Cet e-mail semble incorrect.',
    storeUrl: 'Merci d’indiquer l’URL de votre boutique.',
    phone: 'Merci d’indiquer un numéro de téléphone valide.',
    form: 'Merci de vérifier le formulaire.',
    generic: 'Une erreur est survenue. Merci de réessayer.',
    server: 'Une erreur est survenue de notre côté. Merci de nous écrire directement.',
    network: 'Erreur réseau. Réessayez, ou écrivez-nous directement.',
  },

  meta: {
    homeTitle: 'Maubourg Studio - Studio RevOps IA pour l’e-commerce européen',
    homeDescription:
      'Votre boutique a déjà du trafic. Transformons-le en ventes. Et automatisons le reste. Nous pilotons toute l’opération de revenus des marques e-commerce européennes : conversion, rétention, campagnes payantes et les agents IA derrière.',
  },
};
