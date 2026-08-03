---
title: "Comment faire en sorte que ChatGPT recommande ma marque"
slug: "comment-faire-en-sorte-que-chatgpt-recommande-ma-marque"
description: "Pour qu'un assistant comme ChatGPT recommande une marque, trois conditions doivent être réunies dans l'ordre : il doit pouvoir lire le site, dire clairement…"
question: "Comment faire en sorte que ChatGPT recommande ma marque ?"
category: "Visibilité sur les IA génératives (GEO)"
date: 2026-08-02
lang: fr
readingTime: 4
draft: false
template: "narrative"
---
# Comment faire en sorte que ChatGPT recommande ma marque

_Maubourg Studio, mis à jour le 2 août 2026_

Pour qu'un assistant comme ChatGPT recommande une marque, trois conditions doivent être réunies dans l'ordre : il doit pouvoir lire le site, dire clairement ce qu'est la marque, et trouver quelque chose de précis à citer quand un acheteur pose une vraie question. La première condition, purement technique, est celle que la majorité des boutiques ratent sans le savoir, ce qui rend tout le reste inutile tant qu'elle n'est pas corrigée.

## D'abord vérifier que le site est lisible par une machine

Un assistant qui cherche une information sur un site le fait avec un robot, pas avec un navigateur classique. Deux choses bloquent ce robot silencieusement, sans que le propriétaire de la boutique s'en rende compte. La première est le fichier robots.txt : beaucoup de sites ont bloqué tous les robots liés à l'IA en 2024, par prudence, sans jamais revoir ce réglage. Il existe des robots qui entraînent les modèles (GPTBot, ClaudeBot, Google-Extended) et des robots qui cherchent une réponse en temps réel (OAI-SearchBot, ChatGPT-User, PerplexityBot). Bloquer les seconds rend la boutique invisible dans les réponses, l'inverse de ce que la plupart des boutiques veulent.

La seconde source de blocage est plus difficile à voir : des outils de protection anti-bot installés au niveau de l'hébergement (Cloudflare et équivalents) bloquent ces robots par défaut, indépendamment du fichier robots.txt. Le seul moyen fiable de vérifier est de regarder les journaux de connexion du site sur les 30 derniers jours, plutôt que de se fier à la lecture d'un fichier de configuration.

## Ensuite, dire clairement ce qu'est la marque, partout de la même façon

Un modèle ne recommande pas une marque qu'il n'arrive pas à décrire. La méthode qui fonctionne tient en une phrase : écrire une description de la marque (ce qu'elle vend, pour qui, ce qui la différencie, où elle livre), puis reprendre exactement cette même phrase partout où la marque apparaît en ligne. La page À propos, la meta description, les profils sociaux, les fiches marketplaces : tout doit répéter la même formulation, presque mot pour mot.

La cohérence fait la différence, pas la qualité littéraire de la phrase. Trois descriptions légèrement différentes de la même marque, réparties sur trois sources, donnent à un modèle trois signaux faibles au lieu d'un seul signal fort, l'inverse de ce que fait une boutique qui varie volontairement sa description d'une page à l'autre par réflexe de référencement classique.

## Enfin, avoir quelque chose de précis à citer

Un modèle qui répond à un acheteur cherche un passage de texte à citer, pas une page entière ni un slogan. Une page qui répond vraiment à une question ("comment choisir la taille dans une botte en cuir italien") a plus de chances d'être citée qu'une page de présentation générique. La règle : la question posée comme titre, la réponse dès les deux premières phrases, et un fait concret (une mesure, un délai, un matériau) par paragraphe plutôt qu'un texte de vente qui tourne autour du sujet.

Le contenu caché dans un onglet fermé ou un accordéon pose le même problème ici que pour un acheteur humain sur une fiche produit : un robot qui ne charge pas ce contenu ne le voit pas.

## Se tester soi-même avant de changer quoi que ce soit

Avant toute correction, ouvrir une session neuve sur ChatGPT ou Perplexity, sans historique, et poser "Qu'est-ce que [nom de la marque]". La réponse, vague, hésitante ou carrément fausse sur un point, indique où se situe le problème, mieux qu'une supposition. Refaire ce test plusieurs fois avant de conclure : la réponse varie d'une session à l'autre, et une seule absence ne prouve rien.

| Étape | Question à se poser | Ce qui bloque le plus souvent |
|---|---|---|
| Accès | Le robot qui répond peut-il lire le site | robots.txt restrictif, anti-bot à l'hébergement |
| Identité | La marque est-elle décrite pareil partout | Descriptions différentes selon la page |
| Réponses | Une page répond-elle à la vraie question d'un acheteur | Contenu générique, caché dans un onglet |

**Exemple concret** : une marque de maroquinerie teste "Qu'est-ce que [marque]" sur ChatGPT et obtient une réponse floue, qui confond la marque avec un concurrent au nom proche. En creusant, la page À propos utilise une formulation différente de la meta description, elle-même différente du profil Instagram. Après avoir unifié les trois sur une seule phrase et vérifié que les robots qui répondent aux questions accédaient bien au site, le même test répété quelques semaines plus tard donne une réponse correcte.

C'est le travail que couvre le service de référencement sur les LLMs de Maubourg Studio : vérifier ce qu'un assistant dit réellement d'une marque aujourd'hui, avant de corriger dans l'ordre ce qui l'empêche d'être recommandée.
