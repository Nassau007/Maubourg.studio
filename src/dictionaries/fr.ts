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
    languageLabel: 'Langue',
  },

  hero: {
    badge: 'Optimisation de la conversion & refontes · E-commerce européen',
    title: 'Votre boutique a déjà du trafic.',
    titleAccent: 'Transformons-le en ventes.',
    subtitle:
      'Nous aidons les marques e-commerce européennes à tirer plus de revenus des visiteurs qu’elles paient déjà — grâce à l’optimisation de la conversion, et à des refontes complètes quand les fondations ne tiennent plus.',
    ctaPrimary: 'Recevez un diagnostic gratuit →',
    ctaSecondary: 'Réserver un appel de 15 min',
    note: '8 à 10 correctifs classés par impact sur le chiffre d’affaires. Sans engagement, sans argumentaire.',
    metrics: [
      { stat: '20–40 %', label: 'du chiffre d’affaires provient généralement de l’e-mail et du SMS' },
      { stat: 'Chaque 1 %', label: 'de conversion perdue, c’est du trafic déjà payé' },
      {
        stat: '3 mois',
        label: 'd’engagement minimum — le temps que les tests fassent leurs preuves',
      },
    ],
  },

  marquee: {
    heading: 'Les outils que nous optimisons',
    items: [
      'Shopify',
      'WooCommerce',
      'Klaviyo',
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
        body: 'Les dépenses en publicité et en SEO grimpent, mais trop de visiteurs arrivent, regardent et repartent — sans jamais ajouter au panier.',
      },
      {
        title: 'Vous soupçonnez une fuite — sans voir où',
        body: 'La perte se situe quelque part entre la fiche produit et le paiement. Deviner coûte cher ; tester à l’aveugle, c’est pire.',
      },
      {
        title: 'Ce chiffre d’affaires est déjà à portée',
        body: 'Vous n’avez pas besoin de plus de trafic pour croître. Une boutique qui convertit mieux gagne plus avec exactement les mêmes visiteurs, au même coût publicitaire.',
      },
    ],
  },

  services: {
    eyebrow: 'Ce que nous faisons',
    title: 'Un seul objectif : que davantage de votre trafic achète.',
    intro:
      'Nous commençons par la conversion et la rétention — les leviers qui se rentabilisent d’eux-mêmes — et ne refondons la boutique que lorsque ce sont les fondations qui vous freinent.',
    tags: { core: 'Cœur', foundation: 'Fondations', included: 'Inclus' },
    items: [
      {
        tag: 'Cœur',
        title: 'Optimisation du taux de conversion',
        body: 'Tests A/B continus sur les fiches produit, le panier et le checkout — les fuites les plus rentables d’abord. Vous voyez l’impact sur le chiffre d’affaires, pas des indicateurs de vanité.',
      },
      {
        tag: 'Cœur',
        title: 'Rétention e-mail & SMS',
        body: 'Des scénarios lifecycle dans Klaviyo qui récupèrent les paniers et font revenir les acheteurs. Souvent 20 à 40 % du chiffre d’affaires, et généralement le plus négligé.',
      },
      {
        tag: 'Cœur',
        title: 'Gestion des campagnes payantes',
        body: 'Budgets Meta, Google et TikTok pilotés vers un retour cible — pour qu’une boutique qui convertit mieux réduise le coût d’acquisition.',
      },
      {
        tag: 'Fondations',
        title: 'Créations & refontes de boutique',
        body: 'Créations et migrations Shopify prêtes à convertir, périmètre fixe, quand les fondations actuelles freinent les ventes.',
      },
      {
        tag: 'Fondations',
        title: 'Analytics & tracking',
        body: 'GA4, tracking côté serveur et consent mode configurés correctement — pour que chaque gain soit mesurable et conforme au RGPD.',
      },
      {
        tag: 'Inclus',
        title: 'Exécution systématisée',
        body: 'Un processus piloté par l’automatisation : reporting et onboarding standardisés — livraison plus rapide, et rien qui passe entre les mailles.',
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
        body: 'Nous auditons votre boutique et repérons précisément où les ventes fuient — 8 à 10 correctifs classés par impact sur le chiffre d’affaires. À vous de le garder, que l’on travaille ensemble ou non.',
      },
      {
        step: '02',
        name: 'Sprint',
        price: 'Périmètre fixe',
        body: 'Nous livrons d’abord les correctifs au meilleur ROI, en un sprint concentré de 2 à 3 semaines — ou nous refondons la boutique quand les fondations ne tiennent plus. Adapté à votre trésorerie, sans engagement long pour démarrer.',
      },
      {
        step: '03',
        name: 'Accompagnement',
        price: 'Mensuel',
        body: 'Nous menons des tests A/B en continu pour faire progresser la conversion mois après mois. C’est là que se jouent les vrais gains — et la vraie relation.',
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
        body: 'Nous travaillons uniquement avec des boutiques européennes existantes — nous connaissons donc votre marché, vos acheteurs et vos obligations de conformité dès le premier appel.',
      },
      {
        title: 'Tout est mesuré',
        body: 'Vous voyez l’impact de chaque changement sur le chiffre d’affaires — « conversion passée de X % à Y %, +Z €/mois au même budget pub ». Jamais d’indicateurs de vanité.',
      },
      {
        title: 'Systématisé, pas improvisé',
        body: 'Un processus piloté par l’automatisation en coulisses : livraison plus rapide, reporting standardisé, et rien d’oublié.',
      },
    ],
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
        desc: '8 à 10 correctifs de conversion classés par impact. Le moyen le plus rapide de voir si nous sommes faits pour travailler ensemble.',
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
        name: 'Refonte / migration',
        price: '4 000–12 000 €+',
        desc: 'Nouvelle boutique Shopify prête à convertir, périmètre fixe.',
      },
    ],
    retainersHeading: 'Accompagnements mensuels — là où tout se capitalise',
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
    footnote:
      'Fourchettes indicatives pour le marché européen. Tarifs réduits pour les premiers clients en échange d’une étude de cas et d’un témoignage.',
  },

  teardown: {
    eyebrow: 'Diagnostic gratuit',
    title: 'Recevez 8 à 10 correctifs classés par impact sur le chiffre d’affaires.',
    intro:
      'Dites-nous où se trouve votre boutique et nous vous renvoyons un court diagnostic — les fuites au meilleur ROI d’abord, plus les deux ou trois que vous pourriez déployer cette semaine. Gratuit, et à vous de le garder.',
    points: [
      'Un vrai audit de votre boutique en ligne — pas une checklist générique',
      'Des points classés par impact × effort, pour savoir par où commencer',
      'Sans engagement — prenez la liste et foncez, ou parlons-en',
    ],
    talkPrefix: 'Vous préférez d’abord échanger ?',
    talkLink: 'Réserver un appel de 15 minutes →',
    form: {
      name: 'Votre nom',
      namePlaceholder: 'Marie Dupont',
      email: 'E-mail',
      emailPlaceholder: 'marie@marque.com',
      storeUrl: 'URL de la boutique',
      storeUrlPlaceholder: 'marque.com',
      platform: 'Plateforme',
      monthlyRevenue: 'Chiffre d’affaires mensuel',
      select: 'Sélectionner…',
      message: 'Un point précis ?',
      optional: '(facultatif)',
      messagePlaceholder: 'Où pensez-vous perdre des ventes ?',
      submit: 'Recevoir mon diagnostic gratuit →',
      submitting: 'Envoi…',
      privacy:
        'Pas de spam. Nous l’utilisons uniquement pour vous envoyer votre diagnostic et vous relancer une fois.',
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
      body: 'Nous allons analyser votre boutique et vous envoyer votre diagnostic sous quelques jours ouvrés. Surveillez votre boîte de réception.',
      again: 'Envoyer une autre boutique',
    },
  },

  faq: {
    eyebrow: 'FAQ',
    title: 'Vos questions, nos réponses.',
    items: [
      {
        q: 'Le diagnostic est-il vraiment gratuit ?',
        a: 'Oui. Nous auditons votre boutique en ligne et vous renvoyons 8 à 10 correctifs classés par impact, sans frais ni engagement. Si les correctifs valent la peine, nous pouvons parler de les mener ensemble — mais la liste est à vous dans tous les cas.',
      },
      {
        q: 'Avec qui travaillez-vous ?',
        a: 'Des marques e-commerce européennes existantes — généralement des boutiques Shopify ou WooCommerce qui génèrent déjà un trafic et un chiffre d’affaires significatifs. Nous nous concentrons sur l’Europe pour connaître votre marché et vos obligations de conformité.',
      },
      {
        q: 'Ai-je besoin d’une refonte ?',
        a: 'Le plus souvent, non. Nous commençons par l’optimisation de la conversion car elle rapporte davantage avec la boutique que vous avez déjà. Nous ne recommandons une refonte ou une migration que lorsque ce sont les fondations elles-mêmes qui freinent les ventes.',
      },
      {
        q: 'En combien de temps verrai-je des résultats ?',
        a: 'Les gains rapides d’un sprint peuvent être déployés en quelques semaines. Les gains cumulés viennent des tests continus dans l’accompagnement — c’est pourquoi nous demandons 3 mois minimum, le temps que les tests fassent leurs preuves.',
      },
      {
        q: 'Comment mesurez-vous le succès ?',
        a: 'Par le chiffre d’affaires, pas par des indicateurs de vanité. Chaque changement est rattaché à un chiffre — taux de conversion amélioré, revenu ajouté au même budget pub. Si nous ne pouvons pas le mesurer, nous ne le revendiquons pas.',
      },
    ],
  },

  footer: {
    ctaTitle: 'Commencez par un diagnostic gratuit. Si les correctifs en valent la peine,',
    ctaAccent: 'on démarre ce mois-ci.',
    ctaPrimary: 'Recevoir mon diagnostic gratuit →',
    ctaSecondary: 'Réserver un appel de 15 min',
    rights: 'Tous droits réservés.',
  },

  call: {
    metaTitle: 'Demander un appel — Maubourg Studio',
    metaDescription:
      'Laissez votre numéro et nous vous rappelons — un vrai échange de 15 minutes sur la conversion de votre boutique, sans engagement.',
    back: '← Retour à l’accueil',
    eyebrow: 'Demander un appel',
    title: 'Parlons de votre boutique —',
    titleAccent: 'nous vous rappelons.',
    subtitle:
      'Laissez votre numéro et le meilleur moment pour vous joindre. Nous vous rappelons sous un jour ouvré pour un échange rapide et sans pression sur les points où votre conversion fuit.',
    points: [
      {
        title: 'Un vrai échange, pas une démo',
        body: '15 minutes sur les endroits où votre boutique perd des ventes et ce qu’il vaut la peine de corriger en premier — utile que l’on travaille ensemble ou non.',
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
      body: 'Merci — nous avons vos coordonnées et vous rappellerons sous un jour ouvré au moment choisi. Pas d’argumentaire, juste un échange utile.',
      again: 'Demander un autre appel',
    },
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
    network: 'Erreur réseau — réessayez, ou écrivez-nous directement.',
  },

  meta: {
    homeTitle: 'Maubourg Studio — Optimisation de la conversion pour l’e-commerce européen',
    homeDescription:
      'Votre boutique a déjà du trafic. Transformons-le en ventes. Optimisation de la conversion et refontes pour les marques e-commerce européennes — tirez plus des visiteurs que vous payez déjà.',
  },
};
