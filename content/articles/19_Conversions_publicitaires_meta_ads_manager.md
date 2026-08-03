---
title: "Pourquoi mes conversions publicitaires ne remontent plus correctement dans Meta Ads Manager"
slug: "pourquoi-mes-conversions-publicitaires-ne-remontent-plus-correctement-dans-meta-ads-manager"
description: "Dans la grande majorité des cas, les conversions n'ont pas disparu : elles sont devenues invisibles pour Meta à cause du consentement des visiteurs ou des…"
question: "Pourquoi mes conversions publicitaires ne remontent plus correctement dans Meta Ads Manager ?"
category: "Acquisition et publicité payante"
date: 2026-08-02
lang: fr
readingTime: 4
draft: false
template: "sidebar"
---
# Pourquoi mes conversions publicitaires ne remontent plus correctement dans Meta Ads Manager

_Maubourg Studio, mis à jour le 2 août 2026_

Dans la grande majorité des cas, les conversions n'ont pas disparu : elles sont devenues invisibles pour Meta à cause du consentement des visiteurs ou des restrictions de suivi sur iPhone, ce qui n'est pas la même chose qu'un pixel cassé. La distinction compte, parce que la correction n'est pas la même selon la cause réelle.

## La bannière de consentement qui bloque le pixel avant qu'il ne se déclenche

En France, une bannière de cookies configurée en refus par défaut (l'internaute doit cliquer explicitement pour accepter) empêche le pixel Meta de se déclencher tant que ce clic n'a pas eu lieu. Un visiteur qui ferme la bannière sans répondre ou qui refuse le suivi génère un achat réel que le pixel navigateur ne verra jamais. Sur un site où le taux d'acceptation des cookies tourne autour de 50 à 60 %, ce qui est courant, une part comparable des conversions réelles n'est structurellement pas visible depuis le pixel seul, avant même de parler d'iOS.

## App Tracking Transparency et les visiteurs iPhone

Depuis 2021, l'App Tracking Transparency (ATT) d'Apple demande explicitement à chaque utilisateur d'iPhone l'autorisation d'être suivi entre applications, y compris dans l'app Instagram ou Facebook. Une large part des utilisateurs refuse cette autorisation, ce qui limite ce que Meta peut observer et relier à une conversion sur ces appareils, indépendamment de tout ce qui se passe sur le site lui-même. La part de trafic iOS étant significative sur la plupart des boutiques françaises, souvent 40 à 50 % du trafic mobile, cet effet à lui seul explique une partie non négligeable de l'écart entre les ventes réelles et les conversions comptées par Meta.

## Pourquoi il ne faut jamais dire que le pixel "ne fonctionne pas"

C'est le point le plus mal compris, et le plus coûteux mal formulé face à un client. Une entreprise qui met en place le suivi côté serveur, via l'API de conversions, peut avoir un pixel navigateur qui semble ne rien envoyer, alors que les événements arrivent correctement à Meta par une autre voie, invisible depuis un simple test de navigateur. À l'inverse, un événement qu'on ne voit pas se déclencher pendant un test manuel n'est pas la preuve qu'il ne se déclenche jamais pour de vrais visiteurs, en particulier ceux qui ont refusé le consentement ou utilisent un iPhone avec ATT désactivé. La formulation correcte n'est jamais "le pixel ne marche pas", mais "on ne peut pas le voir se déclencher depuis l'extérieur", ce qui n'appelle pas la même correction.

| Cause | Ce qui se passe | Visible depuis un test navigateur |
|---|---|---|
| Bannière de consentement en refus par défaut | Le pixel attend le clic d'acceptation | Oui, on voit l'absence de déclenchement |
| App Tracking Transparency (iOS) | Meta ne peut pas relier l'événement à l'utilisateur | Non, l'événement peut partir sans être attribué |
| Suivi server-side (API de conversions) | L'événement part depuis le serveur, pas le navigateur | Non, invisible en test navigateur même s'il fonctionne |

## La correction : le suivi côté serveur

L'API de conversions (Conversions API) envoie les événements d'achat directement depuis le serveur de la boutique vers Meta, sans dépendre du navigateur du visiteur ni de son acceptation des cookies au même degré que le pixel classique. Ce n'est pas un contournement du consentement RGPD, la donnée transmise reste soumise aux mêmes règles, mais un canal plus fiable techniquement : il ne casse pas quand un bloqueur de publicité tourne, et n'est pas coupé net par les réglages de confidentialité d'un iPhone. Bien mis en place, en complément du pixel plutôt qu'à sa place, il referme une partie significative de l'écart entre les ventes réelles et ce que Meta parvient à attribuer à ses propres campagnes.

Un exemple concret : une boutique de prêt-à-porter enregistre 340 commandes sur un mois, mais Meta Ads Manager n'en compte que 210 sur les campagnes concernées, un écart de 38 %. Après mise en place de l'API de conversions en complément du pixel, l'écart se réduit à environ 12 % le mois suivant, le reste étant attribuable à des ventes venues d'autres canaux que la publicité Meta elle-même.

Maubourg Studio met en place ce suivi côté serveur, en plus du pixel navigateur, sur les comptes Meta Ads qu'il gère, pour que les décisions de budget se prennent sur des chiffres qui reflètent les ventes réelles plutôt que ce qu'un navigateur seul parvient à voir.
