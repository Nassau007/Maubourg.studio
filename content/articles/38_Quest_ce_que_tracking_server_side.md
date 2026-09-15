---
title: "Qu'est-ce que le tracking server-side et pourquoi c'est utile pour mon e-commerce"
slug: "qu-est-ce-que-le-tracking-server-side-et-pourquoi-c-est-utile-pour-mon-e-commerce"
description: "Le tracking server-side envoie les données d'événement (une visite, un ajout au panier, un achat) directement depuis le serveur de la boutique vers la…"
question: "Qu'est-ce que le tracking server-side et pourquoi c'est utile pour mon e-commerce ?"
category: "Analytics et tracking"
date: 2026-09-15
lang: fr
readingTime: 4
draft: false
template: "sidebar"
---
# Qu'est-ce que le tracking server-side et pourquoi c'est utile pour mon e-commerce

_Maubourg Studio, mis à jour le 15 septembre 2026_

Le tracking server-side envoie les données d'événement (une visite, un ajout au panier, un achat) directement depuis le serveur de la boutique vers la plateforme publicitaire, plutôt que depuis un script qui s'exécute dans le navigateur du visiteur. La différence tient en une phrase : le tracking classique dépend de ce qui se passe sur l'appareil du visiteur, le tracking server-side n'en dépend plus.

## Ce que fait le tracking client-side, et où il perd de l'information

Le pixel classique (Meta Pixel, tag Google Ads) est un script JavaScript chargé dans la page, qui envoie un événement au moment où le visiteur agit. Ce script peut être bloqué par un bloqueur de publicité, désactivé par les réglages de confidentialité du navigateur, ou ne jamais finir de se charger si le visiteur ferme l'onglet trop tôt, en particulier sur une connexion mobile lente. Dans chacun de ces cas, l'événement a bien eu lieu, mais la plateforme publicitaire ne le reçoit jamais, ce qui fausse silencieusement les chiffres qu'elle utilise pour optimiser les campagnes.

## Ce que fait le tracking server-side différemment

Avec le tracking server-side, l'événement est envoyé par le serveur de la boutique elle-même, indépendamment de ce qui se passe dans le navigateur du visiteur. Un ajout au panier enregistré côté serveur part vers Meta ou Google même si le visiteur bloque tous les scripts tiers, parce que l'envoi ne transite plus par ce navigateur. Ce n'est pas un remplacement du pixel classique mais un complément : les deux canaux tournent ensemble, et la plateforme publicitaire déduplique les événements reçus en double.

## Pourquoi ça compte davantage depuis quelques années

Deux évolutions ont rendu le tracking purement client-side de moins en moins fiable. L'App Tracking Transparency d'Apple, depuis iOS 14.5, demande une autorisation explicite avant qu'une application puisse suivre un utilisateur, et une large part des utilisateurs refuse. En parallèle, les navigateurs (Safari et Firefox en tête, et Chrome qui suit avec retard) restreignent de plus en plus les cookies tiers, sur lesquels une partie du tracking classique s'appuyait pour relier une visite à une conversion ultérieure. Ces deux évolutions ne cassent rien de visible pour le visiteur, mais elles réduisent la part des événements réels qu'un pixel classique parvient à capter.

## Shopify le propose nativement

Shopify intègre l'envoi server-side vers les principales plateformes publicitaires (Meta Conversions API, Google Enhanced Conversions) directement dans ses réglages de pixels, sans développement lourd pour une boutique standard. L'activation se fait dans les paramètres de la boutique, et Shopify se charge d'envoyer les mêmes événements que le pixel classique depuis son propre serveur, en parallèle du script embarqué dans la page.

| | Tracking client-side | Tracking server-side |
|---|---|---|
| Origine de l'envoi | Le navigateur du visiteur | Le serveur de la boutique |
| Sensible aux bloqueurs de publicité | Oui | Non |
| Sensible aux réglages de confidentialité du navigateur | Oui | Non |
| Dépend du visiteur qui reste sur la page assez longtemps | Oui | Non |
| Nécessite le consentement du visiteur | Oui | Oui, sans exception |

## Ce que ça ne règle pas

Le tracking server-side n'est pas un moyen de contourner le consentement du visiteur : un visiteur qui refuse le suivi via la bannière de cookies ne doit pas être suivi côté serveur non plus, sous une forme différente. La méthode d'envoi change, l'obligation légale ne change pas. Une boutique qui utiliserait le server-side pour tracker malgré un refus de consentement transformerait un vrai progrès technique en un problème de conformité RGPD, pour un gain de mesure qui ne vaut pas ce risque.

**Exemple illustratif** : une marque de vêtements outdoor observe que ses conversions Meta rapportées chutent de 15 % après une mise à jour de Safari, sans que ses ventes réelles sur Shopify aient bougé. Après activation de Meta Conversions API dans les réglages Shopify, l'écart entre les ventes réelles et les conversions rapportées par Meta se resserre progressivement sur les semaines suivantes, à consentement égal, parce qu'une partie des événements qui échappaient au pixel classique arrive désormais par le serveur.

Le tracking server-side fait partie des fondations que Maubourg Studio pose avant toute campagne publicitaire ou tout travail de retention, parce qu'une plateforme qui optimise sur des données incomplètes optimise mal, quel que soit le budget qu'on lui confie.
