---
title: "Comment lancer une première campagne de publicité ChatGPT pour une boutique e-commerce en France"
slug: "comment-lancer-une-premiere-campagne-de-publicite-chatgpt-pour-une-boutique-e-commerce-en-france"
description: "Une boutique française peut lancer seule une campagne sur ads.openai.com depuis le 31 août 2026, en cinq étapes : éligibilité, accès du robot OAI-AdsBot,…"
question: "Comment lancer une première campagne de publicité ChatGPT (ChatGPT Ads) pour une boutique e-commerce en France ?"
category: "Visibilité sur les IA génératives (GEO)"
date: 2026-10-28
lang: fr
readingTime: 5
draft: false
template: "citation"
---
# Comment lancer une première campagne de publicité ChatGPT pour une boutique e-commerce en France

_Maubourg Studio, mis à jour le 28 octobre 2026_

Une boutique française peut lancer seule une campagne sur ads.openai.com depuis le 31 août 2026, en cinq étapes : éligibilité, accès du robot OAI-AdsBot, annonces, budget et règle d'arrêt, suivi des ventes (source : Blog du Modérateur, septembre 2026). Les annonces s'affichent en France depuis le 24 août 2026, sous la réponse, aux seuls utilisateurs Free et Go, sans influencer la réponse (sources : Siècle Digital, août 2026 ; centre d'aide OpenAI, « Ads in ChatGPT », octobre 2026).

## En bref

- Les compléments alimentaires et les produits menstruels ou de grossesse, acceptés aux États-Unis, sont refusés en France (source : tableau d'éligibilité du centre d'aide OpenAI, octobre 2026).
- En euros, le budget quotidien minimum est de 15 euros, une moyenne hebdomadaire qui autorise jusqu'à 30 euros sur une journée (source : centre d'aide OpenAI, « Daily Budgets », octobre 2026).
- Un test B2B mené en France en septembre 2026 a payé le clic 0,16 euro en moyenne, pour un trafic à 95 % mobile aux sessions courtes (source : Alexandre Bougra, Journal du Net, septembre 2026).
- Une page qui renvoie une erreur 403 à OAI-AdsBot bloque la validation de l'annonce (source : centre d'aide OpenAI, « Advertiser Guidance for Allowing OpenAI Web Crawlers », octobre 2026).

## Étape 1 : vérifier l'éligibilité

L'entité facturée doit être établie dans un pays ouvert au libre-service, dont la France en octobre 2026 ; pays, devise et fuseau horaire ne se modifient plus après l'inscription (sources : « Ads Manager Availability », « Ads Manager Account Setup »).

La vérification de l'entreprise peut prendre sept jours ouvrés, et un nouveau compte peut rester limité à son pays jusqu'à vérification et un premier seuil de dépense (sources : « Troubleshooting Common Onboarding and Policy Issues », « Create Campaigns »).

Compléments alimentaires, dispositifs médicaux grand public et produits menstruels ou de grossesse sont acceptés aux États-Unis, refusés ailleurs (source : tableau d'éligibilité, « Troubleshooting Common Onboarding and Policy Issues », octobre 2026).

## Étape 2 : ouvrir la page d'arrivée au robot

Robots.txt : il autorise le robot avec les lignes « User-agent: OAI-AdsBot » et « Allow: / » qu'OpenAI donne en modèle (source : « Advertiser Guidance for Allowing OpenAI Web Crawlers », octobre 2026).

Pare-feu ou CDN : Cloudflare reconnaît OAI-AdsBot comme robot vérifié ; ailleurs, liste blanche par agent utilisateur, plages IP publiées dans openai.com/adsbot.json (même source).

CAPTCHA, défi JavaScript ou mot de passe : la page d'arrivée en est exemptée (même source).

Le test : la page doit répondre avec succès à OAI-AdsBot ; un code 403 signale un blocage de protection, un 429 une limitation de débit (même source).

## Étape 3 : campagne, groupe, annonce

L'annonce tient en un titre de 50 caractères au plus, un texte de 100 et une image carrée de 1 200 pixels maximum (source : « Bulk Upload Campaign Schema Checklist », octobre 2026).

Les indications de contexte du groupe décrivent offre, besoin et situation, sans mot-clé ni consigne de diffusion (source : « Write Context Hints »). Dans l'Espace économique européen, les annonces ne sont pas personnalisées au départ (source : « Ads in ChatGPT »).

L'application ChatGPT Ads pour Shopify était réservée aux boutiques américaines au 21 octobre 2026 (source : « Set up ChatGPT Ads for Shopify »). Une boutique française importe un flux en CSV, par URL hébergée ou SFTP ; les articles expirent après deux semaines, d'où l'URL hébergée recommandée (source : « Create Campaigns from Product Feeds »). Le flux Google Merchant Center fournit titres, prix et images, à remettre aux colonnes de la spécification OpenAI.

| Objectif | Ce qui est facturé | Prérequis |
|---|---|---|
| Views | Les 1 000 impressions (CPM) | Aucun |
| Clicks | Le clic valide (CPC) | Aucun |
| Conversions | Le clic ou les impressions, jamais la conversion | Pixel ou API Conversions |

## Étape 4 : budget, coût et règle d'arrêt

Le budget quotidien démarre à 15 euros, moyenne sur une semaine de dimanche à samedi : une journée peut coûter le double, la semaine jamais plus de sept fois le montant (sources : « Create Campaigns », « Daily Budgets »). Le « aucun budget minimum » de la presse visait l'engagement d'entrée, passé de 200 000 à 50 000 dollars puis supprimé (source : Blog du Modérateur, septembre 2026).

OpenAI n'a pas encore de références de performance (source : FAQ OpenAI Ads, octobre 2026). Les repères divergent : le test B2B cité a obtenu 4,83 % de taux de clic et 0,16 euro par clic en France, contre 3,33 euros aux États-Unis, quand le Blog du Modérateur situait le CPC de marché entre 3 et 5 dollars (sources : Journal du Net ; Blog du Modérateur, septembre 2026).

La règle se fixe donc avant le lancement : deux semaines budgétaires complètes au moins, et un plafond de dépense sans vente égal au prix qu'on accepte de payer une commande. Alexandre Bougra, dont le premier test a reçu 95 % de trafic mobile aux sessions courtes, conseille de juger le temps passé sur le site avant le taux de clic.

## Étape 5 : le suivi des conversions

Le pixel OpenAI relie une vente au clic grâce au paramètre oppref ajouté à l'URL, gardé dans un cookie et à préserver dans les redirections (source : « Conversion Measurement », octobre 2026).

Les traceurs liés à la publicité exigent un consentement préalable, donc le pixel ne se déclenche qu'après accord dans le bandeau cookies (source : CNIL, lignes directrices de septembre 2020, article 82 de la loi Informatique et Libertés).

## Exemple illustratif

Maison Albâtre, marque fictive de bougies sur Shopify, vérifie que sa catégorie manque au tableau d'éligibilité, puis demande une fiche produit sous l'agent OAI-AdsBot pour lire le code renvoyé. Pour son groupe "cadeau de crémaillère", elle écrit « Bougie en cire de colza à moins de 40 euros, cadeau de pendaison de crémaillère » et écarte « Montrer cette annonce aux personnes qui déménagent », une consigne de diffusion. Clicks à 20 euros par jour, marge de 25 euros par commande : un groupe qui dépense 50 euros sans vente en deux semaines voit ses indications réécrites, puis s'arrête s'il échoue encore.

Annonce payante ou marque bien décrite dans les réponses, tout part de pages lisibles par les robots d'OpenAI : c'est le premier contrôle d'un audit GEO de Maubourg Studio.
