---
title: "Le référencement classique (SEO) suffit-il encore ou faut-il aussi optimiser pour les IA ?"
slug: "le-referencement-classique-suffit-il-encore-ou-faut-il-optimiser-pour-les-ia"
description: "Non : le SEO classique optimise pour Googlebot, qui exécute le JavaScript, alors que les robots de ChatGPT, Claude et Perplexity ne l'exécutent pas et ne lisent que le HTML…"
question: "Le référencement classique (SEO) suffit-il encore ou faut-il aussi optimiser pour les IA ?"
category: "Visibilité sur les IA génératives (GEO)"
date: 2026-10-01
lang: fr
readingTime: 4
draft: false
template: "citation"
---
# Le référencement classique (SEO) suffit-il encore ou faut-il aussi optimiser pour les IA

_Maubourg Studio, mis à jour le 1er octobre 2026_

Non : le SEO classique optimise pour Googlebot, qui exécute le JavaScript, alors que les robots de ChatGPT, Claude et Perplexity ne l'exécutent pas et ne lisent que le HTML brut renvoyé au premier chargement de la page (Gemini et les AI Overviews, eux, s'appuient sur l'index de Google, qui rend le JavaScript). Une boutique bien classée sur Google peut donc être invisible pour ChatGPT ou Perplexity si son contenu dépend du JavaScript pour s'afficher, ce qui en fait le vrai point de divergence entre les deux disciplines, plus que le vocabulaire ou les mots-clés.

## En bref

- L'analyse de Vercel publiée le 17 décembre 2024 sur plus de 500 millions de requêtes de GPTBot n'a relevé aucune exécution de JavaScript, même quand le robot télécharge des fichiers `.js` (11,5 % des requêtes).
- Recharger une fiche produit avec le JavaScript désactivé dans les outils de développement du navigateur montre la version qu'un robot IA en voit, et tout prix ou description qui disparaît alors lui est invisible.
- Dans le `robots.txt`, les robots à autoriser pour la citation plutôt que pour l'entraînement sont `OAI-SearchBot` et `ChatGPT-User` chez OpenAI, `Claude-SearchBot` et `Claude-User` chez Anthropic, et `PerplexityBot` chez Perplexity.
- Sur 94 boutiques suivies de janvier à décembre 2025, Visibility Labs (étude du 23 février 2026) a mesuré 1,81 % de conversion pour le trafic référé par ChatGPT contre 1,39 % pour l'organique non-marque, sur un volume de 135 000 sessions ChatGPT seulement.

## Le point technique qui change tout

Une analyse de Vercel, publiée le 17 décembre 2024 sur plus de 500 millions de requêtes de GPTBot (le robot d'OpenAI), n'a trouvé aucune exécution de JavaScript : le robot télécharge parfois les fichiers `.js` (11,5 % des requêtes) mais ne les exécute jamais. ClaudeBot, le robot d'Anthropic, montre le même comportement, avec un téléchargement de fichiers JavaScript dans 23,84 % des requêtes et une exécution nulle. Rien, à la vérification faite en septembre 2026, n'indique que ce comportement ait changé pour GPTBot, ClaudeBot ou PerplexityBot : les trois lisent l'équivalent d'un "voir le code source" figé, jamais la page telle qu'un navigateur la construit.

## Googlebot contre les robots IA, ce qui diffère concrètement

| | Googlebot | GPTBot / ClaudeBot / PerplexityBot |
|---|---|---|
| Exécute le JavaScript | Oui, via son service de rendu | Non, aucun des trois |
| Ce qu'il voit | La page après rendu, comme un visiteur | Le HTML brut de la première réponse serveur |
| Ce qui devient invisible | Rien de spécifique s'il patiente assez | Prix, description, stock injectés en JavaScript côté client |
| Conséquence pour la boutique | Une page lente peut quand même se faire indexer | Une fiche produit en JavaScript pur peut ne jamais être citée |

## Ce qu'il faut vérifier sur sa propre boutique

Ouvrir les outils de développement du navigateur, désactiver le JavaScript, et recharger une fiche produit : si le prix, la description ou la disponibilité disparaissent, un robot IA voit exactement cette version vide. Vérifier ensuite le fichier `robots.txt` : les robots à autoriser pour la citation, distincts de ceux dédiés à l'entraînement, sont `OAI-SearchBot` et `ChatGPT-User` côté OpenAI, `Claude-SearchBot` et `Claude-User` côté Anthropic, et `PerplexityBot` côté Perplexity, une distinction que beaucoup de fichiers ignorent en bloquant tout ce qui contient "GPT" ou "Claude" par réflexe. Pour une boutique en JavaScript côté client (React, Vue, une single-page application), la correction s'appelle le rendu côté serveur ou le prerendering : le serveur renvoie une page déjà construite, texte inclus dans le HTML, plutôt que de laisser le navigateur l'assembler.

## Ce que ça change pour le trafic, avec un vrai chiffre

Une étude de Visibility Labs, publiée le 23 février 2026 sur 12 mois de données GA4 (janvier à décembre 2025, 94 boutiques en ligne à sept et huit chiffres de revenu), a mesuré une conversion de 1,81 % pour le trafic référé par ChatGPT, contre 1,39 % pour le trafic organique non-marque, soit 31 % de mieux. Le volume reste faible, 135 000 sessions ChatGPT contre 9,46 millions de sessions organiques sur la même période, mais l'écart de conversion est net.

## Exemple illustratif

Fibre Nord, marque fictive de vêtements techniques de randonnée, a reconstruit ses fiches produit en single-page application il y a un an pour accélérer la navigation entre coloris. Le prix, le tableau des matières et les avis s'affichent bien pour un visiteur, mais uniquement après exécution du JavaScript. Pour vérifier ce que voit un robot IA, l'équipe désactive le JavaScript dans le navigateur et recharge une fiche : la page reste vide de tout contenu utile. Le correctif à envisager est un rendu côté serveur pour au minimum le nom, le prix, la description et la disponibilité, les quatre champs qu'une réponse d'assistant a besoin de citer.

## SEO et GEO ne se remplacent pas

Le SEO reste nécessaire : un site lent ou mal structuré perd son classement Google, et une partie du contenu qui nourrit les IA vient de pages bien référencées. Le GEO ajoute une vérification que le SEO classique n'a jamais eu à faire, celle du HTML brut, puisque Googlebot rend le JavaScript à sa place. L'article n°27 détaille plus largement ce que recouvre le GEO.

Le service de référencement sur les LLMs de Maubourg Studio commence par ce test précis, JavaScript désactivé, sur les pages qui portent le chiffre d'affaires, avant toute recommandation.
