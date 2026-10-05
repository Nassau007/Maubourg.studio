---
title: "Mon robots.txt bloque-t-il les IA comme ChatGPT ou Perplexity sans que je le sache"
slug: "mon-robots-txt-bloque-t-il-les-ia-comme-chatgpt-ou-perplexity-sans-que-je-le-sache"
description: "C'est possible, et seule la lecture du fichier réellement servi à l'adresse boutique.fr/robots.txt permet de le savoir, en y cherchant deux familles de robots."
question: "Mon robots.txt bloque-t-il les IA comme ChatGPT ou Perplexity sans que je le sache ?"
category: "Visibilité sur les IA génératives (GEO)"
date: 2026-10-05
lang: fr
readingTime: 4
draft: false
template: "narrative"
---
# Mon robots.txt bloque-t-il les IA comme ChatGPT ou Perplexity sans que je le sache

_Maubourg Studio, mis à jour le 5 octobre 2026_

C'est possible, et seule la lecture du fichier réellement servi à l'adresse boutique.fr/robots.txt permet de le savoir, en y cherchant deux familles de robots. Les robots d'entraînement (GPTBot, ClaudeBot) et ceux qui lisent une page pour répondre (OAI-SearchBot, Claude-SearchBot, PerplexityBot) diffèrent : interdire les premiers n'empêche pas d'être cité, interdire les seconds retire la boutique des réponses de recherche.

## En bref

- Interdire OAI-SearchBot retire un site de la recherche ChatGPT, interdire GPTBot ne touche que l'entraînement (source : documentation OpenAI, lue le 3 octobre 2026).
- Google-Extended ne touche ni Google Search ni les AI Overviews, qui dépendent de Googlebot, mais couvre l'ancrage de Gemini (source : Google Search Central, lu le 3 octobre 2026).
- "User-agent: *" suivi de "Disallow: /" vaut pour tout robot sans groupe à son nom, PerplexityBot compris (source : norme RFC 9309, septembre 2022).
- Bot Preference Sync écrit en tête du robots.txt servi les choix du tableau de bord Cloudflare, absents du back-office de la boutique (source : blog Cloudflare, août 2026).

## Deux familles de robots, deux conséquences

Le nom après "User-agent" décide de ce qui est bloqué (sources : pages officielles des éditeurs, lues le 3 octobre 2026).

| Robot | Éditeur | Rôle | Effet d'un blocage |
|---|---|---|---|
| GPTBot | OpenAI | Entraînement | Exclu de l'entraînement |
| OAI-SearchBot | OpenAI | Recherche ChatGPT | Absent des réponses de recherche |
| ClaudeBot | Anthropic | Entraînement | Exclu de l'entraînement |
| Claude-SearchBot | Anthropic | Indexation pour la recherche | Visibilité réduite dans les réponses |
| PerplexityBot | Perplexity | Résultats de recherche | Non proposé dans les résultats |
| Google-Extended | Google | Entraînement et ancrage Gemini | Aucun effet sur Search ni AI Overviews |
| Googlebot | Google | Search, AI Overviews compris | Pages non explorées pour Search |

## Trois façons de bloquer sans le vouloir

Un "Disallow: /" oublié sous "User-agent: *" bloque OAI-SearchBot et PerplexityBot sans les nommer : un robot obéit au groupe portant son nom, sinon au groupe "*" (source : RFC 9309).

Une liste de "robots IA à bloquer" copiée d'un article peut mêler GPTBot (entraînement) et PerplexityBot (citation) : vérifier le rôle de chaque nom dans le tableau, garder les robots d'entraînement, retirer ceux de recherche.

Le robots.txt géré de Cloudflare ajoute avant les lignes du site des interdictions pour GPTBot, ClaudeBot, Google-Extended et d'autres robots d'entraînement (source : documentation Cloudflare, lue le 3 octobre 2026).

Hors du fichier, depuis le 15 septembre 2026, Cloudflare bloque par défaut sur les nouveaux domaines les robots "Training" et "Agent" des pages avec publicité. Son option "Block" arrête aussi Googlebot, Applebot et Bingbot, épargnés par "Disallow AI Training" (source : blog Cloudflare, septembre 2026).

## Ce que le fichier ne contrôle pas

Robots.txt peut ne pas s'appliquer à ChatGPT-User, envoyé à la demande d'un utilisateur, et Perplexity-User l'ignore généralement (sources : documentations OpenAI et Perplexity, lues le 3 octobre 2026).

## Vérifier depuis une boutique Shopify

1. Ouvrir boutique.fr/robots.txt en navigation privée et noter le "Disallow" de chaque nom du tableau et de l'astérisque : "Disallow: /" bloque tout le site.
2. Le comparer au modèle robots.txt.liquid, créé via "Edit code", "Add a new template", "robots" (source : centre d'aide Shopify, lu le 3 octobre 2026) : une ligne servie absente du modèle vient d'ailleurs.
3. Derrière Cloudflare, relever les réglages "Search", "Agent" et "Training".

## Rouvrir un robot de recherche bloqué

Le robot bloqué reçoit son propre groupe, par exemple "User-agent: OAI-SearchBot" puis "Allow: /" : nommé, il quitte le groupe "*" (source : RFC 9309). Un bloc partagé se scinde : GPTBot garde "Disallow: /", PerplexityBot passe dans son groupe avec "Allow: /".

Sur Shopify, ces lignes s'ajoutent dans robots.txt.liquid, hors du Liquid par défaut, sans remplacer le modèle, mis à jour par Shopify (source : documentation Shopify, lue le 3 octobre 2026).

Derrière Cloudflare, repasser "Search" sur "Allow" dans le tableau de bord : Bot Preference Sync écrit ce choix en tête du fichier, avant les lignes du site (source : blog Cloudflare, août 2026).

Un changement peut mettre jusqu'à 24 heures à s'appliquer (sources : documentations OpenAI et Perplexity, lues le 3 octobre 2026).

## Exemple illustratif

La Filature Vauclair, marque fictive de pulls sur Shopify derrière Cloudflare, lit dans son fichier servi : "User-agent: GPTBot", "User-agent: PerplexityBot", "Disallow: /".

La règle semble viser GPTBot seul, mais RFC 9309 réunit en un groupe les lignes "User-agent" consécutives : PerplexityBot est fermé aussi. Le bloc manque à son modèle robots.txt.liquid : la gérante vérifie d'abord le réglage "Search" de Cloudflare.

Chez Maubourg Studio, cette lecture ouvre chaque audit GEO : aucun travail de contenu ne sert tant que les robots qui citent restent à la porte.
