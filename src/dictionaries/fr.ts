import type { Dictionary } from './en';

export const fr: Dictionary = {
  nav: {
    links: [
      { label: 'Le problème', hash: '#problem' },
      { label: 'Méthode', hash: '#process' },
      { label: 'Tarifs', hash: '#pricing' },
    ],
    blog: 'Blog',
    cta: 'Diagnostic gratuit',
    ctaShort: 'Diagnostic offert',
    languageLabel: 'Langue',
  },

  hero: {
    // REVIEW-FR: bloc réécrit pour le recentrage GEO et agents.
    badge: 'Studio GEO et agents IA pour l’e-commerce',
    title: 'Quand un acheteur demande à ChatGPT quoi acheter,',
    titleAccent: 'votre marque est-elle dans la réponse ?',
    subtitle:
      'Nous faisons citer votre marque dans les réponses des IA et mesurons ce que ce trafic rapporte. Nous construisons aussi des agents qui retirent à vos équipes le travail répétitif.',
    ctaPrimary: 'Réserver un appel de 15 min →',
    talkPrefix: 'Pas encore prêt pour un appel ?',
    ctaSecondary: 'Recevez un diagnostic gratuit →',
    skillsHeading: 'Ce que nous pilotons pour vous',
    skills: [
      {
        name: 'Visibilité LLM (GEO)',
        body: 'Faire citer votre marque quand un acheteur interroge ChatGPT, Gemini, Perplexity ou Claude.',
      },
      {
        name: 'Agents IA',
        body: 'Des agents construits autour de la façon de travailler de vos équipes, pour les tâches qui prennent du temps sans rien apporter.',
      },
      { name: 'Conversion', body: 'Tests A/B sur les fiches produit, le panier et le paiement.' },
    ],
  },

  marquee: {
    heading: 'La stack sur laquelle nous construisons',
    items: [
      'Shopify',
      'WooCommerce',
      // REVIEW-FR: liste de la stack revue pour le recentrage.
      'ChatGPT',
      'Gemini',
      'Perplexity',
      'Claude',
      'GA4',
      'Automatisation des workflows',
      'Tests A/B',
      'Conforme UE / RGPD',
    ],
  },

  problem: {
    eyebrow: 'Le problème',
    // REVIEW-FR: nouveau titre et deux constats, écrits pour cette version.
    title: 'Les acheteurs interrogent une IA avant de chercher.',
    pains: [
      {
        title: 'Votre marque n’est pas dans la réponse',
        body: 'De plus en plus d’acheteurs demandent une recommandation à ChatGPT, Gemini ou Perplexity. La réponse cite quelques marques, et les autres n’existent tout simplement pas à ce moment-là.',
      },
      {
        title: 'Vos statistiques ne le montrent pas',
        body: 'L’essentiel se joue sans clic. Les visites qui arrivent malgré tout se rangent souvent en trafic direct, donc vous ne voyez ni ce que vous gagnez ni ce que vous manquez.',
      },
    ],
  },

  services: {
    eyebrow: 'Ce que nous faisons',
    // REVIEW-FR: titre, intro et six cartes réécrits pour le recentrage.
    title: 'Être dans la réponse. Puis retirer à vos équipes le travail répétitif.',
    intro:
      'Nous travaillons sur deux choses. Rendre votre marque visible et correctement décrite dans les réponses des IA, et construire des agents qui retirent à vos équipes le travail répétitif. La conversion intervient quand c’est la boutique elle-même qui fait perdre la vente.',
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
        body: 'Le travail qui fait citer votre marque plus souvent : des fiches produit plus claires, une présence sur les sites dont les IA se servent, des informations corrigées. En grande partie mené par nos propres agents.',
      },
      {
        tag: 'Agents IA',
        title: 'Agents d’opérations',
        page: 'agents',
        body: 'Ce qui prend du temps à vos équipes sans rien apporter, nous l’automatisons. Nous construisons des agents qui déchargent votre équipe du travail répétitif : traitement des commandes, relances fournisseurs, retours, reporting interne. Calibrés sur votre vrai workflow, pas un chatbot générique.',
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
        body: 'Tests A/B continus sur les fiches produit, le panier et le checkout, les fuites les plus rentables d’abord. Vous voyez l’impact sur le chiffre d’affaires, pas des indicateurs de vanité.',
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
        body: 'Nous livrons d’abord les correctifs au meilleur ROI, en un sprint concentré de 2 à 3 semaines. Adapté à votre trésorerie, sans engagement long pour démarrer.',
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
    // REVIEW-FR: titre de section et deux premiers points réécrits.
    title: 'Trois choses à savoir avant de nous parler.',
    points: [
      {
        title: 'Centrés sur le marché francophone',
        body: 'Une IA répond à une question française à partir de sources françaises : presse française, forums français, sites d’avis français. Nous travaillons uniquement avec des marques qui vendent en France et sur les marchés francophones, donc nous savons quelles sources comptent dans votre catégorie.',
      },
      {
        title: 'Des chiffres que vous pouvez vérifier',
        body: 'Chaque chiffre de visibilité que nous donnons vient de la même question posée plusieurs fois, dans les outils que vos acheteurs utilisent. Jamais d’une capture d’écran isolée.',
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
        features: ['Tests A/B continus', 'Travail fiche produit & checkout'],
      },
      {
        tier: 'Scale',
        price: '4 000–6 000 €+',
        features: ['Programme CRO complet', 'Plusieurs tests en parallèle', 'Priorité + appels stratégie'],
      },
    ],
    // REVIEW-FR: mention du marché européen retirée.
    footnote: 'Fourchettes indicatives.',
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
    // REVIEW-FR: « européenne » retiré.
    sampleBody: 'Un diagnostic complet réalisé sur une boutique en ligne, dont le nom a été retiré.',
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
        // REVIEW-FR: trois questions ajoutées et une réécrite pour le recentrage.
        q: 'Qu’est-ce que le GEO ?',
        a: 'Le GEO (generative engine optimization) consiste à faire citer votre marque, et à la faire décrire correctement, quand quelqu’un demande une recommandation à une IA comme ChatGPT ou Perplexity. Cela recoupe le SEO, mais dépend bien davantage de ce que les autres sites disent de vous.',
      },
      {
        q: 'Pouvez-vous garantir que ChatGPT nous recommandera ?',
        a: 'Non, et personne ne peut l’affirmer honnêtement. Les réponses des IA varient d’une question à l’autre. Ce que nous pouvons faire : mesurer où vous en êtes aujourd’hui, corriger ce qui dépend de vous, et vous montrer l’évolution dans le temps avec la même méthode.',
      },
      {
        q: 'Comment mesurez-vous le trafic venu des IA ?',
        a: 'Nous configurons GA4 pour que les visites venues de ChatGPT, Perplexity et outils similaires apparaissent comme un canal à part, avec ce que ces visiteurs font sur le site. Une partie de ce trafic arrive sans aucune trace de sa provenance : nous disons donc toujours de combien les chiffres peuvent sous-estimer la réalité.',
      },
      {
        q: 'Le diagnostic est-il vraiment gratuit ?',
        a: 'Oui. Nous auditons votre boutique en ligne et vous renvoyons un PDF de 3 à 4 pages avec 5 correctifs classés par impact, sous 3 jours ouvrés, sans frais ni engagement. Un exemple est consultable sur cette page si vous voulez en voir un avant de demander le vôtre. Si les correctifs valent la peine, nous pouvons parler de les mener ensemble, mais la liste est à vous dans tous les cas.',
      },
      {
        q: 'Avec qui travaillez-vous ?',
        a: 'Des marques e-commerce qui vendent en France et sur les marchés francophones (Belgique, Suisse), généralement sur Shopify ou WooCommerce. Nous nous concentrons sur les marchés francophones parce qu’une IA répond à une question française à partir de sources françaises, et que c’est le terrain que nous connaissons. Les marques basées ailleurs qui vendent en France sont les bienvenues.',
      },
      {
        q: 'Construisez-vous vraiment les agents IA, ou revendez-vous un outil ?',
        a: 'Nous les construisons. Chaque agent est calibré sur un workflow réel de votre entreprise, développé sur vos systèmes, testé, puis livré avec sa documentation. Il vous appartient. Nous utilisons les mêmes agents pour notre propre exécution : nous ne livrons donc que ce en quoi nous avons nous-mêmes confiance.',
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
    // REVIEW-FR: bloc de clôture inversé, l’appel devient l’action principale.
    ctaTitle: 'Commencez par un',
    ctaAccent: 'appel de 15 minutes.',
    ctaPrimary: 'Réserver un appel de 15 min →',
    ctaNote: 'Quinze minutes, sans présentation commerciale, sans engagement.',
    talkPrefix: 'Vous préférez lire quelque chose d’abord ?',
    ctaSecondary: 'Recevez un diagnostic gratuit →',
    tagline: 'Studio GEO et agents IA pour l’e-commerce',
    market: 'France et marchés francophones',
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
      // REVIEW-FR: trois services au lieu de cinq.
      navBlurb: 'Trois métiers, et ce que chacun rapporte.',
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
      // REVIEW-FR: page recentrée sur la conversion seule, sans la partie mesure.
      nav: {
        label: 'Conversion',
        blurb: 'Réparer ce qui fait perdre la vente sur la boutique que vous avez déjà.',
      },
      meta: {
        title: 'Optimisation du taux de conversion - Maubourg Studio',
        description:
          'Tests A/B sur les fiches produit, le panier et le checkout, les fuites les plus rentables d’abord, pour les marques e-commerce qui vendent en France et sur les marchés francophones.',
      },
      hero: {
        eyebrow: 'Conversion',
        title: 'Vous avez déjà payé ce trafic.',
        titleAccent: 'Faites-en des acheteurs.',
        subtitle:
          'Être recommandé, par une IA ou par qui que ce soit, ne vaut rien si la page d’arrivée fait perdre la vente. Ici, le travail porte sur la boutique elle-même : trouver où les acheteurs décrochent, corriger cela en premier, puis tester le correctif au lieu de le supposer.',
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
      geoNote: {
        // REVIEW-FR: remplace l’ancien bloc mesure, renvoyé vers la page GEO.
        title: 'Mesurer ce que les IA vous envoient fait partie du GEO.',
        body: 'Configurer GA4 pour que les visites venues de ChatGPT, Perplexity et outils similaires apparaissent comme un canal à part relève de l’offre de visibilité, pas de cette page.',
        link: 'Visibilité LLM (GEO) →',
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
      nav: { label: 'Visibilité LLM', blurb: 'Être la boutique qu’un assistant recommande.' },
      meta: {
        title: 'Visibilité sur les LLMs (GEO) - Maubourg Studio',
        // REVIEW-FR: description réécrite.
        description:
          'Auditer, mesurer et améliorer la façon dont ChatGPT, Gemini, Perplexity et Claude citent votre marque. Pour les marques e-commerce qui vendent en France et sur les marchés francophones.',
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
      blocks: {
        // REVIEW-FR: les cinq leviers deviennent les trois blocs audit, mesure, amélioration.
        eyebrow: 'En quoi consiste le travail',
        title: 'Auditer, mesurer, améliorer.',
        items: [
          {
            title: 'Audit',
            lead: 'Ce que ChatGPT, Gemini, Perplexity et Claude disent de votre marque et de vos concurrents, mesuré sur des séries de vraies questions d’achat.',
            body: 'Vous recevez les questions posées, la fréquence à laquelle chaque outil vous cite, les marques citées à votre place, et la façon dont votre marque est décrite quand elle apparaît. Les mêmes questions sont reposées plus tard, donc le deuxième rapport se compare au premier.',
          },
          {
            title: 'Mesure',
            lead: 'GA4 configuré pour montrer le trafic qui vient des IA et ce que ces visiteurs font sur votre site.',
            body: 'Vous recevez le trafic IA comme un canal à part dans GA4, avec ce que ces visiteurs font une fois arrivés. Une partie de ce trafic ne porte aucune trace de sa provenance : nous disons à chaque fois de combien le chiffre peut sous-estimer la réalité.',
          },
          {
            title: 'Amélioration',
            lead: 'Le travail qui fait citer votre marque plus souvent : des fiches produit plus claires, une présence sur les sites dont les IA se servent, des informations corrigées. En grande partie mené par nos propres agents.',
            body: 'Vous recevez une liste classée de ce qu’il faut changer, puis le travail lui-même : des pages qui répondent en texte aux questions d’achat, des données structurées conformes à ce que dit la page, les informations fausses corrigées là où un outil les répète, et une présence sur les sites d’où votre catégorie est lue. Nous rapportons ce qui a bougé et ce qui n’a pas bougé.',
          },
        ],
      },
      reading: {
        heading: 'Sur le sujet, dans notre blog',
        note: 'Articles en français.',
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
        // REVIEW-FR: mention avant-vente retirée.
        description:
          'Des agents calibrés sur un vrai workflow : traitement des commandes, relances fournisseurs, tenue du catalogue. Essayez-en un sur votre fiche produit, sans e-mail à laisser.',
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
        // REVIEW-FR: deux familles au lieu de trois, opérations en premier.
        title: 'Deux formes, toutes deux calibrées sur votre workflow.',
        items: [
          {
            title: 'Agents d’opérations',
            body: 'Ce qui prend du temps à vos équipes sans rien apporter, nous l’automatisons : tri des commandes, relances fournisseurs, retours, le rapport interne que quelqu’un refait à la main chaque lundi.',
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
      'Maubourg Studio est un studio basé à Paris qui fait citer les marques e-commerce dans les réponses des IA et construit des agents IA pour leurs opérations. Il travaille avec les marques qui vendent en France et sur les marchés francophones.',
  },
};
