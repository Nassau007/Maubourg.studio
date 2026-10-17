---
title: "Le balisage Schema.org (Product, Organization) améliore-t-il vraiment ma visibilité sur les IA"
slug: "le-balisage-schema-org-product-organization-ameliore-t-il-vraiment-ma-visibilite-sur-les-ia"
description: "Pas à lui seul : aucun éditeur d'IA ne montre qu'un champ Schema.org fait choisir une boutique."
question: "Le balisage Schema.org (Product, Organization) améliore-t-il vraiment ma visibilité sur les IA ?"
category: "Visibilité sur les IA génératives (GEO)"
date: 2026-10-15
lang: fr
readingTime: 4
draft: false
---
# Le balisage Schema.org (Product, Organization) améliore-t-il vraiment ma visibilité sur les IA

_Maubourg Studio, mis à jour le 15 octobre 2026_

Pas à lui seul : aucun éditeur d'IA ne montre qu'un champ Schema.org fait choisir une boutique. Le balisage rend lisibles prix, stock, livraison et retours ; sur Shopify, les deux derniers manquent, et une partie se corrige depuis l'admin.

## En bref

- Google a écrit qu'aucune donnée structurée particulière n'est à ajouter pour AI Overviews et AI Mode (source : Google Search Central, décembre 2025).
- ChatGPT et Perplexity lisent le JSON-LD comme du simple texte, valide ou non (source : test de Mark Williams-Cook, Search Engine Roundtable, février 2026).
- L'exemple de Product du filtre structured_data de Shopify n'a ni `shippingDetails` ni `hasMerchantReturnPolicy` (source : documentation Shopify, octobre 2026).
- Une boutique Shopify, même basée en France, n'arrive dans ChatGPT par Shopify Catalog que si elle vend à des clients aux États-Unis (source : centre d'aide Shopify, octobre 2026).

## Ce que les éditeurs d'IA en disent

Google a écrit qu'aucune donnée structurée particulière n'est à ajouter pour ses fonctionnalités IA, et recommande qu'elle corresponde au texte visible (source : Google Search Central, décembre 2025).

Fabrice Canel, alors chez Microsoft Bing, a déclaré en mars 2025 que le schema aide les modèles de Bing et Copilot à comprendre le contenu (source : SMX Munich, rapporté par Search Engine Land).

Selon le test de Mark Williams-Cook, ChatGPT et Perplexity lisent le JSON-LD comme du simple texte, valide ou non (source : Search Engine Roundtable, février 2026).

Le flux produit d'OpenAI accepte des champs de livraison et de retour, facultatifs, vise par défaut les États-Unis et ne dit rien de leur effet sur la sélection (source : documentation développeurs OpenAI, octobre 2026).

Aucune source ne montre qu'un champ balisé fait recommander un produit. Ce qui est établi : ces informations sont lues, et doivent concorder avec la page.

## Ce que Shopify fournit

| Champ schema.org | Question d'acheteur | Dans l'exemple Shopify |
|---|---|---|
| `name`, `brand` | « quelle marque propose... » | Oui |
| `price` | « moins de 80 € » | Oui |
| `availability` | « en stock maintenant » | Oui |
| `shippingDetails` | « livré avant vendredi » | Non |
| `hasMerchantReturnPolicy` | « retour gratuit sous 30 jours » | Non |

Exemple de la documentation Shopify, à vérifier sur son thème.

## Livraison et retours depuis l'admin

Zones, tarifs et délais de livraison se règlent dans Paramètres > Expédition et livraison ; délai et frais de retour dans Paramètres > Politiques, section des règles de retour (source : centre d'aide Shopify, octobre 2026).

Dans l'app Google & YouTube, Paramètres > Informations de livraison > « Importer automatiquement les informations de livraison » envoie ces réglages à Merchant Center. Les retours se saisissent à part, dans Livraison et retours > Conditions de retour (source : aide Google Merchant Center pour Shopify, octobre 2026).

Pour Google, les réglages de Merchant Center passent avant le balisage de la fiche (source : Google Search Central, septembre 2026).

Mettre les deux champs dans le JSON-LD de la fiche demande de modifier le code du thème ou d'installer une application dédiée.

## Par quoi commencer

1. Le texte visible : délais d'expédition et de retour identiques sur la fiche et dans les politiques. Pour l'accès à ChatGPT, Shopify exige trois politiques remplies dans Paramètres > Politiques : conditions d'utilisation, confidentialité, retour et remboursement (source : centre d'aide Shopify, octobre 2026).
2. Si vous vendez aux États-Unis : vérifier dans Canaux de vente, section Agentic, que ChatGPT a accès au catalogue. Shopify demande aussi des produits éligibles à Shopify Catalog et l'acceptation des conditions supplémentaires Agentic (source : centre d'aide Shopify, octobre 2026). Vendre seulement en Europe exclut cette voie.
3. Google : import de la livraison, retours saisis dans Merchant Center.
4. Le JSON-LD du thème, en dernier : pour les réponses des IA, parmi les éditeurs cités ici, seul Microsoft en affirme un bénéfice.
5. Le bloc Organization de l'accueil, avec `sameAs` vers les vrais profils : il aide Google à distinguer l'entreprise (source : Google Search Central, septembre 2026).

## Exemple illustratif

Thés Ostrova, marque fictive de thés en vrac sur Shopify :

1. Comparer les retours annoncés sur sa meilleure fiche aux règles de Paramètres > Politiques.
2. Passer la fiche dans le Test des résultats enrichis, noter les champs absents.
3. Activer l'import de la livraison, saisir le même délai de retour dans Merchant Center.
4. Confier au développeur les deux blocs manquants, avec les valeurs déjà déclarées.

Le programme GEO de Maubourg Studio traite ce balisage sur tout le catalogue ; pour une fiche, la démo de la page agents IA en contrôle les données structurées et propose un bloc Product prêt à coller.
