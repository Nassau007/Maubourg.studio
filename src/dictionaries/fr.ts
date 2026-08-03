import type { Dictionary } from './en';

export const fr: Dictionary = {
  nav: {
    links: [
      { label: 'Le problème', hash: '#problem' },
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
      { name: 'Visibilité LLM', body: 'Rendre votre boutique lisible et citée par ChatGPT, Perplexity et Gemini, pas seulement classée sur Google.' },
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
      'La plupart des agences ne pilotent qu’un canal. Nous pilotons le système qui transforme le trafic en revenus récurrents : conversion, rétention, campagnes payantes et le tracking en dessous, avec des agents IA qui prennent en charge le travail répétitif derrière et votre boutique rendue lisible par les assistants que les acheteurs interrogent désormais en premier. La boutique n’est refondue que lorsque ce sont les fondations qui vous freinent.',
    tags: { core: 'Cœur', ai: 'Agents IA', foundation: 'Fondations', included: 'Inclus' },
    items: [
      {
        tag: 'Cœur',
        title: 'Optimisation du taux de conversion',
        page: 'conversion',
        body: 'Tests A/B continus sur les fiches produit, le panier et le checkout, les fuites les plus rentables d’abord. Vous voyez l’impact sur le chiffre d’affaires, pas des indicateurs de vanité.',
      },
      {
        tag: 'Cœur',
        title: 'Rétention e-mail & SMS',
        page: 'acquisition',
        body: 'Des scénarios lifecycle dans Klaviyo qui récupèrent les paniers et font revenir les acheteurs. Souvent 20 à 40 % du chiffre d’affaires, et généralement le plus négligé.',
      },
      {
        tag: 'Cœur',
        title: 'Gestion des campagnes payantes',
        page: 'acquisition',
        body: 'Budgets Meta, Google et TikTok pilotés vers un retour cible pour réduire le coût d’acquisition.',
      },
      {
        tag: 'Cœur',
        title: 'Visibilité sur les LLMs (GEO)',
        page: 'geo',
        body: 'Être la boutique qu’un assistant cite quand un acheteur l’interroge au lieu de Google. Des réponses lisibles, des données structurées justes, et une présence mesurée sur de vraies questions d’achat.',
      },
      {
        tag: 'Agents IA',
        title: 'Agents sur mesure pour vos opérations',
        page: 'agents',
        body: 'Nous construisons des agents qui déchargent votre équipe du travail répétitif : traitement des commandes, relances fournisseurs, retours, reporting interne. Calibrés sur votre vrai workflow, pas un chatbot générique.',
      },
      {
        tag: 'Agents IA',
        title: 'Agent catalogue & merchandising',
        page: 'agents',
        body: 'Un agent qui rédige et actualise vos fiches produit, comble les métadonnées manquantes et signale les annonces et pages produit qui sous-performent.',
      },
      {
        tag: 'Agents IA',
        title: 'Agent support & avant-vente',
        page: 'agents',
        body: 'Il répond aux questions qui bloquent un achat : tailles, stock, livraison, retours etc. dans la voix de votre marque, avec un passage de relais propre à un humain quand c’est nécessaire.',
      },
      {
        tag: 'Fondations',
        title: 'Créations & refontes de boutique',
        page: 'foundations',
        body: 'Créations et migrations Shopify prêtes à convertir, périmètre fixe, quand les fondations actuelles freinent les ventes.',
      },
      {
        tag: 'Fondations',
        title: 'Analytics & tracking',
        page: 'conversion',
        body: 'GA4, tracking côté serveur et consent mode configurés correctement pour que chaque conversion soit mesurable et conforme au RGPD.',
      },
      {
        tag: 'Inclus',
        title: 'Reporting piloté par agents',
        page: 'agents',
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
      navBlurb: 'Cinq métiers, et ce que chacun rapporte.',
      breadcrumb: 'Services',
      backHome: '← Retour à l’accueil',
      relatedHeading: 'La suite logique',
      ctaEyebrow: 'Commencez ici',
      ctaTitle: 'Commencez par un diagnostic offert.',
      ctaBody:
        'Nous regardons votre boutique, nommons les cinq correctifs qui rapportent le plus, et vous les envoyons. Aucun appel nécessaire pour l’obtenir, et rien à devoir si vous le prenez et partez.',
      ctaPrimary: 'Recevoir le diagnostic →',
      ctaSecondary: 'Réserver 15 minutes',
      priceNote:
        'Fourchettes indicatives. Nous facturons le revenu en jeu, pas les heures passées.',
    },

    conversion: {
      nav: {
        label: 'Conversion & mesure',
        blurb: 'Réparer ce qui fait perdre la vente, et le mesurer correctement.',
      },
      meta: {
        title: 'Conversion & mesure - Maubourg Studio',
        description:
          'Tests A/B sur les fiches produit, le panier et le checkout, avec le tracking GA4 et côté serveur qui rend le résultat lisible. Pour les marques e-commerce européennes.',
      },
      hero: {
        eyebrow: 'Conversion & mesure',
        title: 'Vous avez déjà payé ce trafic.',
        titleAccent: 'Faites-en des acheteurs.',
        subtitle:
          'La conversion et la mesure sont un seul métier, pas deux. Un test que vous ne pouvez pas lire est une intuition déguisée, et un tableau de bord impeccable sur une boutique qui fuit ne fait que montrer la fuite en meilleure résolution.',
        stat: '+1 point',
        statNote:
          'de conversion sur 20 000 sessions à 60€ représente environ 12 000€ par mois, à budget publicitaire identique.',
      },
      funnel: {
        eyebrow: 'Où ça part',
        title: 'Cinq étapes, quatre endroits pour perdre l’acheteur.',
        intro:
          'Toutes les boutiques perdent leurs visiteurs aux mêmes jointures. Tout l’intérêt d’un audit est de trouver laquelle vous coûte le plus, parce que corriger la troisième pire en premier, c’est comment six mois disparaissent.',
        steps: [
          { label: 'Sessions', note: 'Le trafic que vous payez déjà' },
          { label: 'Fiche produit', note: 'La majorité s’arrête là. Texte, preuve, livraison' },
          { label: 'Panier', note: 'Frais de port révélés trop tard' },
          { label: 'Checkout', note: 'Compte obligatoire, trop de champs' },
          { label: 'Achat', note: 'Ce sur quoi tout le reste est jugé' },
        ],
        caption: 'À titre indicatif. Vos vrais chiffres sortent du diagnostic.',
      },
      leaks: {
        eyebrow: 'Ce que nous trouvons vraiment',
        title: 'Les mêmes fuites, boutique après boutique.',
        intro:
          'Ce ne sont pas des hypothèses. Ce sont les constats qui reviennent le plus souvent dans les diagnostics que nous produisons, chacun vérifié sur une capture de la vraie page avant d’entrer dans un rapport.',
        columns: { leak: 'Le constat', cost: 'Ce que ça coûte', fix: 'Ce que nous faisons' },
        rows: [
          {
            leak: 'Conditions de livraison loin du prix',
            cost: 'La question la plus fréquente au moment de décider reste sans réponse, alors l’acheteur part la chercher ailleurs.',
            fix: 'Remonter les conditions à côté du prix, puis tester la formulation et pas seulement l’emplacement.',
          },
          {
            leak: 'Une fiche qui ouvre sur les caractéristiques',
            cost: 'La première ligne dépense la seule attention disponible sur des détails dont l’acheteur ne peut pas encore se soucier.',
            fix: 'Réécrire en partant du bénéfice, et garder la caractéristique dessous comme preuve.',
          },
          {
            leak: 'Un compte obligatoire pour commander',
            cost: 'Le passage en invité est souvent la plus grosse perte récupérable d’une boutique.',
            fix: 'Ouvrir la commande en invité, puis mesurer l’effet au lieu de le supposer.',
          },
          {
            leak: 'Aucun repère de taille ni de coupe',
            cost: 'Le doute devient un panier abandonné ou un retour, et les deux vous coûtent.',
            fix: 'Mettre le repère là où naît le doute, sur la page, pas dans une FAQ.',
          },
          {
            leak: 'Une preuve qui arrive après la décision',
            cost: 'Des avis sous la ligne de flottaison convainquent ceux qui ont déjà dépassé le bouton d’achat.',
            fix: 'Remonter la preuve la plus forte, et tester la place qu’elle mérite vraiment.',
          },
        ],
      },
      measure: {
        eyebrow: 'La moitié qu’on ne vous vend pas',
        title: 'Un test illisible n’est pas un test.',
        body: 'La mesure est ce qui fait que le travail de conversion se cumule au lieu de repartir de zéro chaque trimestre. C’est aussi là que la plupart des boutiques sont silencieusement cassées : le tag part avant le consentement, le même événement arrive deux fois, l’étape du tunnel qui compte n’a jamais été instrumentée. Rien de tout cela n’est visible depuis le tableau de bord, et c’est précisément le problème.',
        chain: [
          { step: 'Visiteur', note: 'Un vrai navigateur, un vrai choix de consentement' },
          { step: 'Consentement', note: 'Répondu avant tout déclenchement, sinon la donnée ne vous appartient pas' },
          { step: 'Tags', note: 'Un par plateforme. Deux est un chiffre auquel on ne peut pas se fier' },
          { step: 'Côté serveur', note: 'Ce qui survit à un navigateur qui bloque' },
          { step: 'Rapport', note: 'Un tunnel, pas un total quotidien' },
        ],
        checks: [
          'GA4 configuré pour que les étapes de votre tunnel soient séparables, et pas seulement les sessions et le chiffre d’affaires.',
          'Tracking côté serveur là où le navigateur n’est plus fiable.',
          'Consent mode réglé pour que la mesure et le RGPD ne s’opposent pas.',
          'Tags en double ou morts supprimés, ce qui se règle souvent dans la semaine.',
        ],
        caveat:
          'Une précision honnête : vue de l’extérieur, une boutique au tracking serveur impeccable ressemble exactement à une boutique cassée. Nous vous disons ce que nous avons vu et ce que nous n’avons pas pu voir, jamais l’inverse.',
      },
      how: {
        eyebrow: 'Comment ça se déroule',
        title: 'Diagnostic, sprint, puis effet cumulé.',
        steps: [
          {
            name: 'Diagnostic',
            price: 'Offert',
            body: 'Cinq correctifs classés par ce qu’ils valent. Il est à vous, que l’on travaille ensemble ou non.',
          },
          {
            name: 'Sprint',
            price: '1 500€ à 3 500€',
            body: 'Deux à trois semaines, périmètre fixe, les constats prioritaires livrés et mesurés.',
          },
          {
            name: 'Accompagnement',
            price: 'à partir de 1 000€ / mois',
            body: 'Tests en continu, trois mois minimum, parce qu’un test a besoin de temps pour être vrai.',
          },
        ],
      },
      related: [
        {
          page: 'acquisition',
          text: 'Une boutique qui convertit mieux fait travailler chaque euro de publicité plus loin.',
        },
        {
          page: 'foundations',
          text: 'Quand la plateforme elle-même bloque, tester autour revient à gaspiller le budget.',
        },
      ],
    },

    acquisition: {
      nav: {
        label: 'Acquisition',
        blurb: 'Publicité et scénarios lifecycle, pilotés vers un chiffre.',
      },
      meta: {
        title: 'Acquisition - Maubourg Studio',
        description:
          'Meta, Google et TikTok pilotés vers un retour cible, et les scénarios Klaviyo qui transforment un achat en trois. Pour les marques e-commerce européennes.',
      },
      hero: {
        eyebrow: 'Acquisition',
        title: 'Un trafic moins cher vient plutôt',
        titleAccent: 'd’une meilleure boutique que d’un plus gros budget.',
        subtitle:
          'Deux moteurs qui tirent dans le même sens : de la publicité qui achète de l’attention face à un retour cible, et des scénarios qui évitent de payer deux fois le même client. Les deux se justifient mal quand la boutique visée fuit, et c’est pourquoi nous commençons rarement ici.',
        stat: '20 à 40%',
        statNote:
          'du chiffre d’affaires se joue dans la rétention sur une boutique type, et c’est en général la partie la moins entretenue.',
      },
      engines: {
        eyebrow: 'Deux moteurs',
        title: 'L’un les amène. L’autre les fait revenir.',
        paid: {
          title: 'Publicité payante',
          body: 'Des budgets Meta, Google et TikTok pilotés face à un retour que vous fixez, pas face à des impressions. Le travail est ingrat : des créas qu’on teste, des audiences qu’on coupe, du budget qui glisse vers ce qui paie.',
          bullets: [
            'Un retour cible arrêté avant le premier euro dépensé',
            'Des créas testées en file, pas lancées en lot',
            'Un budget réalloué chaque semaine, rapporté chaque mois',
            'Jugé sur le tracking de votre site, pas seulement sur ce que la plateforme dit d’elle-même',
          ],
        },
        retention: {
          title: 'Rétention e-mail & SMS',
          body: 'Des scénarios Klaviyo qui récupèrent les paniers déjà perdus et font revenir les acheteurs sans les racheter. C’est la partie la plus systématiquement sous-construite des boutiques que nous voyons.',
          bullets: [
            'Une séquence de bienvenue qui va chercher le premier achat',
            'Récupération panier et navigation, minutée plutôt qu’envoyée en masse',
            'Un scénario post-achat qui prépare la deuxième commande',
            'Une relance pour ceux qui ont discrètement arrêté',
          ],
        },
      },
      loop: {
        eyebrow: 'Pourquoi l’ordre compte',
        title: 'La boucle ne paie que si le milieu tient.',
        intro:
          'L’acquisition et la conversion sont le même calcul vu des deux bouts. Doubler le budget sur une boutique qui convertit à 1% achète deux fois plus du même problème. Relever le milieu divise votre coût par client sans toucher au budget.',
        nodes: [
          { label: 'Budget', note: 'Meta, Google, TikTok' },
          { label: 'Visite', note: 'Le trafic que vous avez acheté' },
          { label: 'Achat', note: 'Là où le travail de conversion paie' },
          { label: 'Scénarios', note: 'L’e-mail et le SMS prennent le relais' },
          { label: 'Rachat', note: 'L’achat que vous n’avez pas payé' },
        ],
        caption:
          'Le client le moins cher que vous obtiendrez jamais est celui qui a déjà acheté chez vous.',
      },
      flows: {
        eyebrow: 'Ce qui se construit',
        title: 'Les scénarios qui portent le chiffre.',
        columns: { name: 'Scénario', trigger: 'Se déclenche', purpose: 'À quoi il sert' },
        items: [
          {
            name: 'Bienvenue',
            trigger: 'À l’inscription',
            purpose: 'Transformer l’intérêt en première commande pendant que l’intention est encore chaude.',
          },
          {
            name: 'Panier abandonné',
            trigger: 'À l’abandon',
            purpose: 'Répondre à l’objection qui a bloqué, au lieu de répéter l’offre plus fort.',
          },
          {
            name: 'Navigation abandonnée',
            trigger: 'À la vue produit',
            purpose: 'Rattraper le visiteur qui était proche mais n’a rien ajouté.',
          },
          {
            name: 'Post-achat',
            trigger: 'Après livraison',
            purpose: 'Réduire les retours, obtenir l’avis, préparer la deuxième commande.',
          },
          {
            name: 'Relance',
            trigger: 'À l’inactivité',
            purpose: 'Toucher l’acheteur qui a arrêté avant qu’un concurrent ne le touche.',
          },
        ],
      },
      related: [
        {
          page: 'conversion',
          text: 'La conversion est le multiplicateur de tout ce que vous dépensez. Commencez là si ce n’est pas fait.',
        },
        {
          page: 'geo',
          text: 'Les assistants deviennent un canal à part entière, et sur celui-là on n’enchérit pas.',
        },
      ],
    },

    geo: {
      nav: { label: 'Visibilité LLM', blurb: 'Être la boutique qu’un assistant recommande.' },
      meta: {
        title: 'Visibilité sur les LLMs (GEO) - Maubourg Studio',
        description:
          'Generative engine optimization pour l’e-commerce européen : être trouvé, lu et cité quand un acheteur interroge ChatGPT ou Gemini plutôt que Google.',
      },
      hero: {
        eyebrow: 'Generative engine optimization',
        title: 'Les acheteurs interrogent un assistant',
        titleAccent: 'avant d’interroger un moteur de recherche.',
        subtitle:
          'Demandez la meilleure chemise en lin sous 120€ et un assistant répond à partir d’une poignée de sources qu’il a récupérées et jugées fiables. Être l’une de ces sources n’a rien à voir avec se classer sur Google, et la plupart des boutiques n’ont rien fait pour.',
        stat: 'Un nouveau canal',
        statNote:
          'sur lequel on n’enchérit pas, qu’on n’achète pas, et qui n’apparaît pas dans vos statistiques.',
      },
      what: {
        eyebrow: 'De quoi il s’agit vraiment',
        title: 'Pas un classement. Une citation.',
        body: 'La recherche vous tend une liste et laisse le visiteur choisir. Un assistant lit les sources, tranche, et donne une réponse. Il n’y a pas de deuxième page : l’écart entre être cité et être absent est donc le résultat tout entier. Le travail consiste à rendre votre boutique lisible par une machine qui lit plutôt qu’elle n’explore : des réponses claires aux questions que les acheteurs posent vraiment, des données structurées qui disent ce qu’est une page, et assez de mentions ailleurs pour être corroboré hors de votre propre domaine.',
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
            step: 'Récupération',
            note: 'Le modèle rassemble les sources qu’il sait lire et analyser',
            influence: 'C’est là que le travail se fait',
          },
          {
            step: 'Confiance',
            note: 'Il pèse la corroboration : avis, mentions, cohérence',
            influence: 'Se gagne, lentement',
          },
          {
            step: 'La réponse',
            note: 'Une recommandation, pas de deuxième page',
            influence: 'Aucun',
          },
        ],
        caption:
          'Récupération et confiance sont les deux que vous pouvez bouger. Tout ici vise celles-là.',
      },
      levers: {
        eyebrow: 'Ce qui bouge l’aiguille',
        title: 'Le travail, concrètement.',
        items: [
          {
            title: 'Répondre en texte aux questions d’achat',
            body: 'Tailles, coupe, matières, livraison, retours, comparaisons. Si la réponse vit dans une image, un PDF ou un onglet rendu par script, elle n’est pas dans la réponse que l’assistant donne.',
          },
          {
            title: 'Des données structurées réellement justes',
            body: 'Balisage produit, offre, avis et organisation, cohérent avec ce que dit la page. Un balisage faux est pire que rien : il apprend au modèle une contre-vérité signée de votre nom.',
          },
          {
            title: 'Laisser entrer les robots d’IA, volontairement',
            body: 'Un fichier robots et un sitemap qui décident quel agent peut lire quoi, plus un résumé en texte brut du catalogue pour ceux qui le préfèrent.',
          },
          {
            title: 'Être corroboré hors de votre site',
            body: 'Une affirmation que vous seul faites reste une affirmation. La même sur une plateforme d’avis, une marketplace ou dans la presse devient une preuve.',
          },
          {
            title: 'Mesurer en posant la question',
            body: 'Il n’y a pas de rapport de positions ici. Nous suivons dans le temps un jeu de vraies questions d’achat et notons si vous apparaissez, et comment vous êtes décrit quand c’est le cas.',
          },
        ],
      },
      honest: {
        title: 'Ce que nous ne vous dirons pas là-dessus.',
        body: 'Personne ne peut promettre une place dans une réponse générée, et quiconque le promet vend ce qu’il ne peut pas livrer. Les mécanismes sont jeunes, ils changent sans prévenir, et il n’existe aucun tableau de positions à montrer. Ce que nous pouvons faire : rendre votre boutique lisible et corroborée, puis mesurer votre présence sur de vraies questions pour que vous voyiez bouger les choses au lieu de nous croire.',
      },
      ourown: {
        title: 'Nous l’avons d’abord fait sur notre propre site.',
        body: 'Cette page, comme toutes les autres ici, embarque des données structurées, un sitemap lisible par machine, une politique explicite pour les robots d’IA et un résumé en texte brut de ce que fait le studio. C’est la démonstration la moins chère possible : vous lisez ce que nous construirions pour vous.',
      },
      related: [
        {
          page: 'conversion',
          text: 'Être recommandé vaut moins si la page d’arrivée ne vend pas.',
        },
        {
          page: 'agents',
          text: 'Le catalogue structuré qu’un assistant lit est celui qu’un agent maintient.',
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
        description:
          'Des agents calibrés sur un vrai workflow : tenue du catalogue, traitement des commandes, réponses avant-vente. Essayez-en un sur votre fiche produit, sans e-mail à laisser.',
      },
      hero: {
        eyebrow: 'Agents IA',
        title: 'Ce que votre équipe fait deux fois',
        titleAccent: 'n’a pas besoin d’une personne la seconde.',
        subtitle:
          'Pas un chatbot vissé dans un coin du site. Un agent calibré sur un workflow que vous pouvez nommer, avec les outils pour le faire, une limite qu’il ne franchit pas et un passage de relais propre à un humain quand il doit s’arrêter. Plus simple à montrer qu’à décrire : il y en a un qui tourne plus bas sur cette page.',
        ctaPrimary: 'Essayer sur votre fiche produit ↓',
        ctaSecondary: 'Réserver 15 minutes',
      },
      demoIntro: {
        eyebrow: 'Une preuve, pas un slide',
        title: 'Donnez-lui une de vos fiches produit.',
        body: 'Il lit la page, nomme ce qui vous coûte la vente, et réécrit la description. Environ trente secondes, et nous ne demandons rien en échange : ni e-mail, ni inscription, le résultat s’affiche ici. C’est un petit agent qui fait une seule tâche, et c’est bien le point : ceux que nous construisons tournent en continu sur tout un catalogue.',
      },
      families: {
        eyebrow: 'Ce que nous construisons',
        title: 'Trois formes, toutes calibrées sur votre workflow.',
        items: [
          {
            title: 'Opérations',
            body: 'Décharge votre équipe du travail répétitif : tri des commandes, relances fournisseurs, retours, le rapport interne que quelqu’un refait à la main chaque lundi.',
            examples: [
              'Tri des commandes et exceptions',
              'Relances fournisseurs',
              'Traitement des retours',
              'Reporting interne',
            ],
          },
          {
            title: 'Catalogue & merchandising',
            body: 'Rédige et actualise les fiches produit, comble les métadonnées que personne n’a eu le temps de remplir, et signale les annonces et pages qui sous-performent avant que vous ne le voyiez.',
            examples: [
              'Rédaction et mise à jour des fiches',
              'Métadonnées manquantes',
              'Annonces en sous-performance',
              'Hygiène du flux et du catalogue',
            ],
          },
          {
            title: 'Support & avant-vente',
            body: 'Répond aux questions qui bloquent un achat, dans la voix de votre marque : tailles, stock, livraison, retours. Passe la main dès qu’il le doit.',
            examples: [
              'Tailles et coupe',
              'Stock et livraison',
              'Politique de retour',
              'Relais vers un humain',
            ],
          },
        ],
      },
      workflow: {
        eyebrow: 'Comment on en construit un',
        title: 'Un déclencheur, des outils, et une limite nette.',
        nodes: [
          { label: 'Déclencheur', note: 'Une commande arrive, une page change, un client demande' },
          { label: 'Contexte', note: 'Seulement la donnée dont la tâche a besoin, rien d’autre' },
          { label: 'Outils', note: 'Les systèmes qu’il peut toucher, nommés un par un' },
          { label: 'Garde-fou', note: 'Ce qu’il ne fera jamais sans une personne' },
          { label: 'Relais', note: 'Un humain, avec le contexte déjà rédigé' },
        ],
        caption:
          'Le garde-fou est la partie qui compte pour les clients six mois plus tard, donc il se conçoit en premier.',
      },
      guardrails: {
        title: 'Les règles sous lesquelles nous les construisons.',
        items: [
          'Il n’invente jamais un fait sur vos produits. S’il n’a pas pu le lire, il ne l’affirme pas.',
          'Tout ce qui va au client est rédigé en brouillon et c’est une personne qui envoie, jusqu’à ce que vous en décidiez autrement.',
          'Il touche les systèmes que vous avez listés et aucun autre.',
          'Chaque exécution est journalisée, pour qu’une mauvaise réponse se retrace au lieu de se discuter.',
        ],
      },
      included: {
        title: 'Nous tournons dessus aussi.',
        body: 'Les agents que nous construisons pour nos clients pilotent aussi notre propre exécution : reporting et onboarding standardisés, livraison plus rapide, et rien qui passe entre les mailles. Ce n’est pas un bénéfice annexe, c’est ce qui permet à un petit studio de porter cette charge.',
      },
      price: {
        label: 'Construction d’un agent',
        value: '3 000€ à 8 000€',
        note: 'Un agent, calibré sur un vrai workflow, construit et transmis.',
      },
      related: [
        {
          page: 'conversion',
          text: 'Un agent qui réécrit les fiches vaut plus quand vous pouvez mesurer quelle version a gagné.',
        },
        {
          page: 'geo',
          text: 'Tenir un catalogue à grande échelle, c’est aussi ce qui vous rend lisible par un assistant.',
        },
      ],
    },

    foundations: {
      nav: {
        label: 'Création de boutique',
        blurb: 'Refaire seulement quand la plateforme est le problème.',
      },
      meta: {
        title: 'Créations et refontes de boutique - Maubourg Studio',
        description:
          'Créations et migrations Shopify prêtes à convertir, à périmètre fixe, quand les fondations actuelles freinent les ventes.',
      },
      hero: {
        eyebrow: 'Fondations',
        title: 'Une refonte est la bonne réponse',
        titleAccent: 'moins souvent qu’on vous le dit.',
        subtitle:
          'Une nouvelle boutique est la façon la plus chère de régler un problème qui n’a jamais tenu à la boutique. Alors nous commençons par essayer de vous en dissuader, et si les fondations bloquent réellement, nous construisons à périmètre fixe avec la mesure câblée dès le premier jour.',
        stat: 'Périmètre fixe',
        statNote: 'arrêté avant de commencer, pour que le montant validé soit le montant payé.',
      },
      gate: {
        eyebrow: 'Avant toute chose',
        title: 'Deux listes. Soyez honnête sur celle où vous êtes.',
        rebuild: {
          title: 'Une refonte est probablement justifiée',
          items: [
            'La plateforme ne sait plus faire ce dont l’activité a besoin, et aucun thème n’y change rien.',
            'Le checkout ou les performances sont cassés d’une façon que les rustines recassent.',
            'Vous quittez la plateforme de toute façon, pour son coût ou son support.',
            'Le code est si emmêlé que chaque changement coûte trois fois son prix.',
          ],
        },
        dont: {
          title: 'Une refonte n’est probablement pas la réponse',
          items: [
            'La conversion est faible mais la boutique marche. C’est un sujet de tests, pas de refonte.',
            'Le design ne vous plaît plus. Le goût compte, mais c’est rarement là qu’est l’argent.',
            'Un concurrent vient de refaire son site. Sa refonte n’est peut-être pas rentable non plus.',
            'Vous n’avez jamais mesuré où les ventes se perdent. Commencez par le savoir, c’est gratuit.',
          ],
        },
        note: 'Si vous êtes sur la seconde liste, le diagnostic vous le dira et ne vous coûtera rien.',
      },
      phases: {
        eyebrow: 'Comment se déroule une refonte',
        title: 'Cinq phases, un périmètre fixe.',
        items: [
          {
            n: '01',
            title: 'Audit',
            body: 'Ce que la boutique actuelle fait assez bien pour être gardé, et ce qui porte réellement le chiffre. Reproduire fidèlement une erreur est l’échec habituel.',
          },
          {
            n: '02',
            title: 'Structure',
            body: 'Navigation, gabarits et chemin vers l’achat décidés avant qu’un pixel ne soit dessiné.',
          },
          {
            n: '03',
            title: 'Construction',
            body: 'Une boutique Shopify prête à convertir. Périmètre fixe, et tout ajout part en phase deux plutôt que discrètement dans celle-ci.',
          },
          {
            n: '04',
            title: 'Migration',
            body: 'Produits, contenus, redirections et historique déplacés sans perdre les positions déjà gagnées.',
          },
          {
            n: '05',
            title: 'Mesure',
            body: 'Analytics, tracking côté serveur et consentement configurés au lancement, pour que la nouvelle boutique soit lisible dès le premier jour.',
          },
        ],
      },
      included: {
        title: 'Ce qui vient avec, dans tous les cas.',
        items: [
          'Analytics et tracking configurés correctement, pas remis à plus tard.',
          'Redirections cartographiées pour qu’une migration ne coûte pas vos positions.',
          'Une boutique que votre équipe peut modifier sans nous appeler pour changer un texte.',
          'La courte liste de ce que nous n’avons volontairement pas construit, et pourquoi.',
        ],
      },
      price: {
        label: 'Refonte ou changement de plateforme',
        value: '4 000€ à 12 000€+',
        note: 'Périmètre fixe, arrêté avant de commencer.',
      },
      related: [
        {
          page: 'conversion',
          text: 'Une nouvelle boutique est une ligne de départ. Ce sont les tests qui la font rapporter.',
        },
        {
          page: 'acquisition',
          text: 'Une fois les fondations solides, la publicité a enfin quelque chose à viser.',
        },
      ],
    },
  },

  // Le blog. Seules les pages françaises sont construites aujourd’hui :
  // c’est la langue dans laquelle les articles sont écrits.
  articles: {
    meta: {
      title: 'Blog - Maubourg Studio',
      description:
        'Des réponses claires aux questions que se posent les marques e-commerce : conversion, acquisition, mesure, agents IA et visibilité auprès des assistants.',
    },
    index: {
      eyebrow: 'Blog',
      title: 'Les questions que les marques posent vraiment.',
      intro:
        'Des textes courts sur la conversion, l’acquisition, la mesure et le reste de l’opération commerciale. Une question par texte, la réponse dès le premier paragraphe.',
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
