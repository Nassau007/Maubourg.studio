---
title: "Comment savoir si ChatGPT ou Perplexity m'envoient vraiment du trafic et des ventes"
slug: "comment-savoir-si-chatgpt-ou-perplexity-m-envoient-vraiment-du-trafic-et-des-ventes"
description: "Dans Google Analytics 4, le canal AI Assistant, ajouté au groupe de canaux par défaut le 13 mai 2026, isole les visites venues de ChatGPT, mais pas celles de…"
question: "Comment savoir si ChatGPT ou Perplexity m'envoient vraiment du trafic et des ventes ?"
category: "Visibilité sur les IA génératives (GEO)"
date: 2026-10-07
lang: fr
readingTime: 4
draft: false
template: "sidebar"
---
# Comment savoir si ChatGPT ou Perplexity m'envoient vraiment du trafic et des ventes

_Maubourg Studio, mis à jour le 7 octobre 2026_

Dans Google Analytics 4, le canal AI Assistant, ajouté au groupe de canaux par défaut le 13 mai 2026, isole les visites venues de ChatGPT, mais pas celles de Perplexity, qu'il faut rattraper avec un groupe de canaux personnalisé. Côté ventes, le rapport Shopify des performances par canal marketing relie ces visites aux commandes, mais ce total est un minimum : par exemple, un lien copié depuis une réponse d'IA puis collé dans un nouvel onglet arrive sans source et se range en Direct. Le nombre réel de ventes venues d'une IA est donc probablement plus élevé.

## En bref

- GA4 range une visite sous le support "ai-assistant" quand son URL de provenance correspond à un assistant reconnu, mais ce canal exclut les AI Overviews et le mode IA de Google (source : documentation Google Analytics, octobre 2026).
- Une visite venue de perplexity.ai tombe dans le canal Referral, Perplexity n'étant cité ni dans la note de lancement ni dans la définition du canal (sources : GA4 Auditor ; aide Google Analytics).
- Un groupe de canaux personnalisé s'applique aussi aux données passées, alors que le canal AI Assistant ne compte qu'à partir du 13 mai 2026 (sources : aide Google Analytics ; GA4 Auditor).
- Depuis le 11 juin 2026, la dimension GA4 Source group regroupe ChatGPT (OpenAI) et Perplexity sans réglage, y compris sur les données passées (source : aide Google Analytics, page "Nouveautés").

## Ce que GA4 compte tout seul depuis mai 2026

La note de lancement du 13 mai 2026 citait ChatGPT, Gemini et Claude, et la définition actuelle du canal donne comme exemples ChatGPT, Gemini, Deepseek, Copilot et Grok (source : aide Google Analytics, pages "Nouveautés" et "Groupe de canaux par défaut", consultées le 5 octobre 2026). Les visites et les ventes du canal AI Assistant se lisent dans le rapport GA4 d'acquisition de trafic.

Les clics venus des AI Overviews et du mode IA de Google sont exclus de ce canal et restent comptés en Organic Search, mêlés au référencement naturel (sources : documentation Google Analytics ; GA4 Auditor).

## Le trou Perplexity, et comment le combler

Une visite qui arrive de perplexity.ai se retrouve en Referral (source : GA4 Auditor, 2026).

Le plus simple est la dimension Source group (11 juin 2026), qui regroupe ChatGPT et Perplexity sans réglage, historique compris (source : aide Google Analytics, "Nouveautés").

Pour voir Perplexity dans le rapport d'acquisition de trafic, la correction passe par un groupe de canaux personnalisé, dans Admin, Affichage des données, Groupes de canaux, en partant d'une copie du groupe par défaut. On y ajoute un canal "Assistants IA" dont la condition porte sur la source, avec l'option "correspond partiellement à l'expression régulière" (partially matches regex) et la valeur perplexity|chatgpt|claude|gemini|copilot. L'option simple "correspond à l'expression régulière" exige que toute la source corresponde : elle ne capterait ni perplexity.ai ni chatgpt.com, et le canal resterait vide sans message d'erreur. Le canal est placé au-dessus de Referral et d'AI Assistant, parce que GA4 range chaque visite dans le premier canal dont elle remplit la condition (source : aide Google Analytics).

| Provenance de la visite | Groupe de canaux par défaut | Avec le groupe personnalisé |
|---|---|---|
| ChatGPT | AI Assistant | Assistants IA |
| Perplexity | Referral | Assistants IA |
| AI Overviews, mode IA de Google | Organic Search | Organic Search |
| Lien copié depuis une conversation | Direct | Direct |

## Des visites aux ventes

GA4 n'attribue un chiffre d'affaires à un canal que si l'événement "purchase", recommandé par Google pour les achats, remonte bien depuis la boutique (source : aide Google Analytics, événements recommandés).

Dans Shopify, le rapport des performances par canal marketing affiche sessions, ventes, commandes et taux de conversion par canal, avec un menu d'attribution (dernier clic, premier clic, tous les clics, linéaire) (source : centre d'aide Shopify, rapports marketing, consulté le 5 octobre 2026). Comparer premier et dernier clic montre si l'assistant ouvre le parcours ou le conclut.

Les commandes venues des canaux IA de Shopify (ChatGPT, Google AI Mode et Gemini, Microsoft Copilot, Meta) s'affichent dans l'admin avec leur canal ou leur site d'origine ; depuis ChatGPT, l'achat se termine sur le paiement de la boutique (source : centre d'aide Shopify, agentic storefronts, consulté le 5 octobre 2026). La page ne précise pas quelles boutiques sont éligibles.

## Pourquoi le chiffre reste un plancher

Une visite venue d'une IA peut arriver sans référent, quand l'acheteur copie le lien de la réponse dans un nouvel onglet. GA4 range en Direct toute visite dont la source est "(direct)" et le support "(none)" ou "(not set)" (source : aide Google Analytics, groupe de canaux par défaut), mêlée aux favoris et aux adresses saisies. Rien ne la distingue ensuite : GA4 et Shopify montrent la part traçable, un minimum à suivre en tendance mensuelle.

## Exemple illustratif

Terres de Gardanne, marque fictive de peintures naturelles, vend sur Shopify avec GA4. L'équipe note d'abord la ligne AI Assistant depuis le 13 mai 2026, cherche perplexity.ai dans Referral, puis crée le groupe "Assistants IA", avec la source qui correspond partiellement à perplexity|chatgpt|claude|gemini|copilot, placé avant Referral, et l'applique aux douze derniers mois. Dans Shopify, elle lit le rapport par canal marketing en premier puis en dernier clic, relève les deux colonnes dans un tableur daté, et refera cette lecture le premier lundi de chaque mois.

Relier ce que les assistants disent d'une marque à ce qu'elle encaisse est le volet mesure du programme GEO de Maubourg Studio : le suivi des visites IA est posé dans GA4 au démarrage, puis relu chaque mois à côté des questions d'achat reposées aux assistants.
