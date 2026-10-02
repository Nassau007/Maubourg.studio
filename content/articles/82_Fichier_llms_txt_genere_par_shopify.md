---
title: "Le fichier llms.txt généré automatiquement par Shopify : qu'est-ce que c'est et faut-il le modifier"
slug: "le-fichier-llms-txt-genere-automatiquement-par-shopify-quest-ce-que-cest-et-faut-il-le-modifier"
description: "Le fichier llms.txt que Shopify publie sur chaque boutique depuis mai 2026 est un mode d'emploi technique en anglais destiné aux agents d'achat IA, pas une…"
question: "Le fichier llms.txt généré automatiquement par Shopify, qu'est-ce que c'est et faut-il le modifier ?"
category: "Visibilité sur les IA génératives (GEO)"
date: 2026-10-02
lang: fr
readingTime: 4
draft: false
template: "citation"
---
# Le fichier llms.txt généré automatiquement par Shopify : qu'est-ce que c'est et faut-il le modifier

_Maubourg Studio, mis à jour le 2 octobre 2026_

Le fichier llms.txt que Shopify publie sur chaque boutique depuis mai 2026 est un mode d'emploi technique en anglais destiné aux agents d'achat IA, pas une présentation de la marque. Il se lit en cinq minutes à l'adresse boutique.fr/llms.txt. Shopify permet de le modifier depuis le 28 mai 2026, ce qui n'a d'intérêt que si l'on sait ce qu'on veut y ajouter.

## En bref

- Lu le 28 septembre 2026 sur deux boutiques françaises sous Shopify, le fichier par défaut compte un peu moins de 600 mots en anglais, et les deux versions ne diffèrent que par le nom et l'adresse de la boutique.
- D'après la documentation développeur de Shopify, /llms.txt et /llms-full.txt renvoient par défaut au contenu de /agents.md : points d'accès techniques, URL de navigation, politiques de la boutique, consignes pour les agents d'achat.
- Depuis le changelog Shopify du 28 mai 2026, chacun des trois fichiers peut être remplacé par un modèle Liquid dans le code du thème, et un modèle agents.md.liquid s'applique aux trois adresses à la fois.
- John Mueller, de Google, a jugé en juin 2026 que llms.txt restait "purely speculative for now", faute d'outil d'IA qui s'en serve : le réécrire ne garantit aucune citation.

## D'où vient ce fichier

Le format llms.txt a été proposé par Jeremy Howard le 3 septembre 2024, sur llmstxt.org : un fichier markdown placé à la racine d'un site, avec un titre (le seul élément obligatoire), un court résumé en citation, puis des listes de liens vers les pages qui détaillent le sujet.

Shopify l'a déployé sur les boutiques sans annonce officielle, ce que Shopifreaks a signalé le 7 mai 2026. Son changelog du 28 mai 2026 fait de /agents.md le fichier de référence, que /llms.txt et /llms-full.txt reprennent.

## Ce qu'il contient vraiment

La version par défaut, lue le 28 septembre 2026, s'intitule "Agent Instructions" suivi du nom de la boutique. Elle recommande aux assistants d'installer le "Shop skill" de Shopify, décrit le protocole UCP (Universal Commerce Protocol, qui permet à un agent de passer commande), liste des URL génériques et se termine par une présentation de Shopify.

| Élément | Prévu par la proposition llmstxt.org | Fichier Shopify par défaut (septembre 2026) |
|---|---|---|
| Titre | Nom du site | "Agent Instructions" et le nom de la boutique |
| Résumé | Citation courte qui présente le site | Absent |
| Contenu | Informations utiles pour comprendre le site | Consignes d'achat pour agents, protocole UCP |
| Liens | Pages qui détaillent le sujet | URL génériques, politiques, liens vers Shopify |

Aucune phrase ne dit ce que vend la marque, à qui, ni en quoi elle se distingue : un agent y apprend comment commander, pas pourquoi choisir cette boutique.

## Faut-il le modifier

Rien n'y oblige : le fichier par défaut remplit son rôle technique, indiquer aux agents comment interroger le catalogue et commander.

Pour ajouter une présentation de la marque, la documentation Shopify prévoit un modèle llms.txt.liquid, qui ne touche que /llms.txt, alors qu'un modèle agents.md.liquid remplace les trois fichiers d'un coup, consignes UCP comprises. Ces modèles n'ont accès qu'aux objets Liquid request et agents, et Shopify déconseille d'y publier e-mail ou téléphone.

Côté attentes, John Mueller estimait en juin 2026 que le format existait depuis des années sans que les outils d'IA s'en servent réellement. Le réécrire est un geste de cohérence peu coûteux, pas un levier de visibilité en soi.

Une boutique qui utilisait une application llms.txt avant mai 2026 peut ouvrir l'adresse pour voir quelle version est servie aujourd'hui.

## Exemple illustratif

Lin Voyageur, marque fictive de linge de lit, ouvre dans un navigateur les adresses /llms.txt, /llms-full.txt et /agents.md de sa boutique et enregistre les trois textes datés. L'équipe vérifie que le titre porte le nom de la marque et non un nom interne saisi à la création du compte, puis clique sur chaque lien de politique, conditions de retour comprises, pour s'assurer qu'il ouvre une vraie page. Elle cherche enfin une phrase qui décrit ses produits et, faute d'en trouver, note ce qu'une version réécrite devrait dire : matière, fabrication, pays de livraison. Créer un modèle llms.txt.liquid en laissant agents.md intact reste ensuite une décision à prendre avec son développeur.

Lire ce fichier fait partie des vérifications techniques d'un audit GEO chez Maubourg Studio, avec le reste de ce que la boutique expose aux IA, avant de décider s'il vaut la peine de le réécrire.
