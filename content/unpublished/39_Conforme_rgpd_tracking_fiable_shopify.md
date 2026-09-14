---
title: "Comment être conforme RGPD tout en gardant un tracking fiable sur Shopify"
slug: "comment-etre-conforme-rgpd-tout-en-gardant-un-tracking-fiable-sur-shopify"
description: "La réponse tient dans deux mécanismes complémentaires : une bannière de cookies réellement conforme aux exigences de la CNIL, et le Consent Mode de Google…"
question: "Comment être conforme RGPD tout en gardant un tracking fiable sur Shopify ?"
category: "Analytics et tracking"
date: 2026-08-02
lang: fr
readingTime: 4
draft: false
---
# Comment être conforme RGPD tout en gardant un tracking fiable sur Shopify

_Maubourg Studio, mis à jour le 2 août 2026_

La réponse tient dans deux mécanismes complémentaires : une bannière de cookies réellement conforme aux exigences de la CNIL, et le Consent Mode de Google (version 2), qui permet à Google de recevoir des signaux modélisés et limités plutôt que rien du tout quand un visiteur refuse. Ça ne rend pas le tracking parfait, ça le garde utilisable sans suivre quelqu'un qui a dit non.

## Ce que la CNIL exige, et ce qui est souvent raté

Deux points reviennent constamment dans les bannières de cookies mal configurées. D'abord, le bouton "Refuser" doit être aussi visible et aussi facile à cliquer que le bouton "Accepter" : les deux au même niveau visuel, sur le même écran, sans que "Refuser" soit relégué dans un sous-menu de réglages qu'il faut chercher. Une bannière où "Accepter" est un gros bouton coloré et "Refuser" un lien discret en petit texte gris ne respecte pas cette exigence, même si techniquement les deux options existent quelque part. Ensuite, aucune case ne doit être précochée comme acceptée par défaut : le consentement doit être un geste actif du visiteur, jamais une case qu'il faudrait décocher pour refuser.

## Le Consent Mode de Google, expliqué simplement

Quand un visiteur refuse les cookies via la bannière, Google Consent Mode informe Google Analytics et Google Ads de ce refus, et ces outils cessent d'utiliser des cookies pour ce visiteur. Ce qu'ils font à la place, c'est estimer un comportement agrégé à partir des visiteurs ayant accepté, avec des méthodes statistiques, pour combler une partie de ce qui manque sans reconstituer de suivi individuel. Concrètement : si 30 % des visiteurs refusent le tracking, Google Analytics ne compte pas 30 % de sessions en moins de façon brute, il modélise une estimation raisonnable de leur comportement, sans jamais associer cette estimation à une personne identifiable.

## Ce que ça change pour la mesure au quotidien

Une boutique qui active correctement Consent Mode voit ses chiffres de sessions et de conversions se rapprocher de la réalité, sans pour autant retrouver l'exactitude d'un tracking qui suivrait tout le monde sans exception. C'est une amélioration, pas une solution parfaite, et c'est important de le formuler ainsi plutôt que de promettre une mesure à 100 % fiable, ce qu'aucun outil conforme au RGPD ne peut offrir.

| Situation | Sans Consent Mode | Avec Consent Mode v2 |
|---|---|---|
| Visiteur qui refuse les cookies | Aucune donnée collectée | Signal limité et modélisé, sans identification individuelle |
| Écart entre trafic réel et trafic mesuré | Peut être important, sans visibilité dessus | Réduit, en partie estimé plutôt qu'exact |
| Conformité RGPD | Dépend de la configuration de la bannière | Compatible, à condition que la bannière reste conforme |
| Exactitude de la mesure | Fausse de façon invisible | Approximative de façon assumée |

## Le compromis qu'il faut accepter comme normal

Une part des visiteurs refusera toujours le suivi, et une part des données restera modélisée plutôt qu'exacte. Ce n'est pas un problème à corriger, c'est le résultat correct d'un système qui respecte le choix de la personne en face. Chercher à "récupérer" ce qui a été refusé par un autre biais technique n'est pas une optimisation, c'est un contournement, et c'est exactement le genre de pratique que la CNIL sanctionne quand elle contrôle une boutique.

**Exemple illustratif** : une marque de cosmétique bio configure sa bannière avec "Accepter" et "Refuser" au même niveau visuel, aucune case précochée, et active Consent Mode v2 sur Google Analytics et Google Ads. Le taux de refus mesuré se stabilise autour de 35 % des visiteurs, une proportion cohérente avec ce qui s'observe sur des boutiques comparables. Les rapports Google Analytics affichent ensuite une mesure modélisée pour cette part de trafic, signalée comme telle dans l'interface, plutôt qu'un simple vide dans les chiffres.

Une bannière de cookies mal réglée est à la fois un risque juridique et une source de données faussées, ce qui en fait un des premiers points que Maubourg Studio vérifie dans un audit de tracking, avant même de regarder les campagnes publicitaires qui s'appuient sur ces mêmes données.
