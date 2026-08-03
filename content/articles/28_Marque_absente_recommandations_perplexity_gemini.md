---
title: "Pourquoi ma marque n'apparaît jamais quand on demande une recommandation à Perplexity ou Gemini"
slug: "pourquoi-ma-marque-n-apparait-jamais-quand-on-demande-une-recommandation-a-perplexity-ou-gemini"
description: "Dans la grande majorité des cas, c'est l'une de ces quatre raisons, dans cet ordre de fréquence : le site bloque sans le savoir les robots qui ont le droit de…"
question: "Pourquoi ma marque n'apparaît jamais quand on demande une recommandation à Perplexity ou Gemini ?"
category: "Visibilité sur les IA génératives (GEO)"
date: 2026-08-02
lang: fr
readingTime: 4
draft: false
---
# Pourquoi ma marque n'apparaît jamais quand on demande une recommandation à Perplexity ou Gemini

_Maubourg Studio, mis à jour le 2 août 2026_

Dans la grande majorité des cas, c'est l'une de ces quatre raisons, dans cet ordre de fréquence : le site bloque sans le savoir les robots qui ont le droit de le lire et de le citer, la marque n'a nulle part de description claire et cohérente d'elle-même, aucune page ne répond vraiment à la question posée, ou personne d'autre n'en parle dans les sources que l'assistant consulte déjà. Les quatre se testent en une heure.

## Premier réflexe : vérifier que les robots peuvent lire le site

Les IA qui répondent aux questions utilisent des robots différents de ceux qui les entraînent, et bloquer l'un ne bloque pas l'autre. OAI-SearchBot, ChatGPT-User, Claude-SearchBot et PerplexityBot sont les robots côté réponse, ceux qui rendent une marque éligible à être citée, alors que GPTBot ou ClaudeBot servent à l'entraînement. Beaucoup de sites ont bloqué tous les robots IA en 2024 par prudence, sans revenir sur ce réglage depuis, ce qui les rend invisibles dans les réponses tout en laissant l'entraînement ouvert.

Le point qui piège le plus de monde : un `robots.txt` correct ne suffit pas, parce que la protection anti-robots installée au niveau du CDN (Cloudflare et les outils similaires) peut bloquer ces mêmes agents silencieusement, parfois par un réglage activé par défaut que le propriétaire n'a jamais vu. La seule façon fiable de vérifier, c'est de récupérer une page en se faisant passer pour ces agents et de lire les journaux serveur sur trente jours, jamais de se fier au fichier seul.

## Deuxième cause : aucune description cohérente de la marque

Un assistant ne recommande pas une marque qu'il ne sait pas décrire. Si la page "À propos", la meta description, les profils sociaux et les fiches marketplace racontent chacun une version légèrement différente de ce que fait la marque, l'assistant reçoit trois signaux faibles au lieu d'un signal fort. Demander à ChatGPT "qu'est-ce que [la marque]" révèle le problème tout de suite : une réponse vague ou fausse sur un point simple (le pays, le secteur, la cible) signale que la marque n'a pas de description stable sur le web.

## Troisième cause : la question n'a simplement pas de réponse sur le site

Un assistant ne peut pas citer une réponse qui n'existe nulle part. Si la question réelle d'un acheteur est "quelle taille prendre en bottes en cuir italien" et qu'aucune page n'aborde le sujet avec des mesures concrètes, il n'y a rien à extraire, même si le site est bien référencé sur Google. C'est la cause la plus facile à corriger : pas de refonte technique, juste écrire la page qui manque.

## Quatrième cause : personne d'autre n'en parle

Une partie importante de ce qu'un assistant sait d'une marque vient de sources tierces qu'il considère déjà fiables : avis clients, articles comparatifs, fils de discussion. Une marque avec un bon site mais aucune présence dans ces sources reste invisible dès qu'un acheteur demande une comparaison, parce que l'assistant s'appuie alors sur ce que d'autres ont déjà écrit, pas seulement sur le site officiel.

| Cause | Comment la vérifier | Effort pour corriger |
|---|---|---|
| Robots bloqués (site ou CDN) | Récupérer une page en tant qu'agent IA, lire les journaux serveur | Heures |
| Description de marque incohérente | Demander à ChatGPT "qu'est-ce que [marque]", comparer aux textes du site | Jours |
| Question sans réponse sur le site | Lister les questions d'achat réelles, vérifier si une page y répond | Jours à semaines |
| Absence dans les sources tierces | Chercher la marque dans les comparatifs et avis déjà cités par l'assistant | Semaines |

## Un exemple concret

Une marque française de maroquinerie, appelée ici Belrive pour l'exemple, a un site rapide, bien écrit, avec de bonnes fiches produit. Elle reste pourtant absente de toute réponse Perplexity sur "sac en cuir français durable". Les journaux serveur montrent que le CDN bloque PerplexityBot depuis une mise à jour de sécurité poussée huit mois plus tôt, sans lien avec un choix de la marque. Un seul réglage à changer, et elle redevient éligible à être citée, ce qui ne garantit rien mais retire l'obstacle qui rendait tout le reste inutile.

Ce diagnostic en quatre points est la première chose que fait Maubourg Studio sur la visibilité IA d'une marque : vérifier ce qu'un assistant voit et dit réellement, avant de décider quoi corriger.
