---
title: "Pourquoi mes chiffres Google Analytics ne correspondent pas à mes ventes réelles sur Shopify"
slug: "pourquoi-mes-chiffres-google-analytics-ne-correspondent-pas-a-mes-ventes-reelles-sur-shopify"
description: "Un écart entre Google Analytics et les ventes réelles Shopify est normal, même sur un tracking parfaitement configuré, parce que les deux systèmes ne comptent…"
question: "Pourquoi mes chiffres Google Analytics ne correspondent pas à mes ventes réelles sur Shopify ?"
category: "Analytics et tracking"
date: 2026-08-03
lang: fr
readingTime: 4
draft: false
template: "narrative"
---
# Pourquoi mes chiffres Google Analytics ne correspondent pas à mes ventes réelles sur Shopify

_Maubourg Studio, mis à jour le 3 août 2026_

Un écart entre Google Analytics et les ventes réelles Shopify est normal, même sur un tracking parfaitement configuré, parce que les deux systèmes ne comptent pas la même chose : GA4 mesure des sessions et des événements, Shopify compte des commandes effectivement passées. Attendre une correspondance exacte entre les deux, c'est comparer deux unités différentes et s'étonner qu'elles ne tombent pas juste.

## Deux systèmes qui ne mesurent pas la même chose

GA4 enregistre un événement "purchase" au moment où le navigateur du visiteur déclenche le script de conversion, généralement sur la page de confirmation de commande. Shopify enregistre une commande dès qu'elle est créée dans son système, indépendamment de ce que le navigateur du client a réussi à charger ensuite. Un client qui ferme l'onglet une seconde trop tôt sur la page de confirmation, ou dont la connexion coupe juste après le paiement, génère une commande bien réelle dans Shopify sans jamais déclencher l'événement GA4 correspondant. Ce n'est l'erreur de personne, c'est la conséquence mécanique de deux points de mesure différents dans le même parcours.

## Le décalage de fuseau horaire

GA4 et Shopify peuvent être réglés sur des fuseaux horaires différents dans leurs paramètres respectifs, ce qui déplace une commande passée à 23h50 d'une journée à l'autre selon l'outil qui la compte. Sur une plage de plusieurs semaines, cet écart se moyenne et pèse peu, mais il explique une bonne partie des désaccords qu'on observe en comparant deux journées précises côte à côte, en particulier un dimanche soir ou un jour de lancement où le volume de fin de journée compte davantage que d'habitude.

## Les bloqueurs de publicité et les réglages de confidentialité

Une part des visiteurs navigue avec un bloqueur de publicité ou un navigateur qui restreint les scripts de mesure par défaut (Safari, Firefox, et une part croissante des utilisateurs Chrome avec des extensions dédiées). Ces visiteurs achètent normalement sur la boutique, leur commande existe bien dans Shopify, mais GA4 ne les voit jamais parce que son script de mesure n'a jamais pu se charger sur leur appareil. Cet écart est invisible et impossible à éliminer complètement : ce n'est pas un signe de tracking cassé, c'est une part structurelle du trafic qu'aucun outil de mesure côté navigateur ne peut capter.

## Les remboursements et annulations comptés différemment

Une commande annulée ou remboursée après coup peut rester comptée dans GA4 comme une conversion passée, puisque GA4 n'a généralement pas connaissance des remboursements survenus après l'achat, alors que Shopify ajuste ses chiffres de revenu en fonction des remboursements réels. Sur une boutique avec un taux de retour ou d'annulation significatif, cet écart s'accumule et va toujours dans le même sens : GA4 tend à surestimer le revenu net réellement encaissé.

| Cause | Effet sur l'écart | Normal ou signe d'un problème |
|---|---|---|
| Sessions vs commandes (unités différentes) | Écart structurel, toujours présent | Normal |
| Fuseau horaire différent entre GA4 et Shopify | Décalage ponctuel sur une journée précise | Normal, à vérifier une fois dans les réglages |
| Bloqueurs de publicité et confidentialité navigateur | Sous-comptage GA4 invisible | Normal, non corrigeable |
| Remboursements et annulations | Surestimation du revenu GA4 | Normal, sauf écart anormalement élevé |

**Exemple illustratif** : une boutique de bijoux compte 412 commandes dans Shopify sur un mois donné, contre 379 conversions "purchase" enregistrées dans GA4 sur la même période, soit un écart d'environ 8 %. Après vérification, les deux fuseaux horaires sont correctement alignés, ce qui indique que l'écart tient surtout aux visiteurs dont le navigateur a bloqué le script de mesure et à quelques abandons juste après paiement. Ce niveau d'écart, entre 5 et 10 %, se situe dans la fourchette courante pour une boutique Shopify sans problème de tracking identifiable.

Le bon réflexe n'est pas de chercher à faire coller les deux chiffres, mais d'utiliser chaque outil pour ce qu'il fait bien : Shopify comme référence du revenu réel, GA4 pour comprendre le comportement des visiteurs et l'origine du trafic. Maubourg Studio vérifie ce type d'écart dans chaque audit de tracking, pour distinguer un écart structurel normal d'un vrai problème de configuration qui, lui, mérite d'être corrigé.
