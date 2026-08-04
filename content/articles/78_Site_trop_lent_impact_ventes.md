---
title: "Comment savoir si mon site est trop lent et si ça impacte mes ventes ?"
slug: "comment-savoir-si-mon-site-est-trop-lent-et-si-ca-impacte-mes-ventes"
description: "Google PageSpeed Insights donne en quelques secondes une note et un temps de chargement réel pour n'importe quelle page, gratuitement et sans installation."
question: "Comment savoir si mon site est trop lent et si ça impacte mes ventes ?"
category: "Mesure, tests et pilotage"
date: 2026-08-03
lang: fr
readingTime: 4
draft: false
template: "citation"
---
# Comment savoir si mon site est trop lent et si ça impacte mes ventes ?

_Maubourg Studio, mis à jour le 3 août 2026_

Google PageSpeed Insights donne en quelques secondes une note et un temps de chargement réel pour n'importe quelle page, gratuitement et sans installation. Un site devient un problème de conversion, pas juste un problème technique, quand ce temps dépasse trois secondes sur mobile, parce que c'est le seuil au-delà duquel une part croissante des visiteurs quitte la page avant qu'elle ait fini de s'afficher.

## Ce que mesure PageSpeed Insights, en langage courant

L'outil (accessible gratuitement sur pagespeed.web.dev) analyse une page et renvoie plusieurs indicateurs regroupés sous le nom de Core Web Vitals. Le plus parlant pour une boutique e-commerce s'appelle Largest Contentful Paint, souvent abrégé LCP : c'est le temps que met le plus gros élément visible de la page, en général l'image du produit, à s'afficher complètement à l'écran. Un LCP de 4 secondes veut dire, en pratique, qu'un visiteur regarde un espace vide ou un chargement pendant 4 secondes avant de voir le produit qu'il est venu voir. Google considère qu'un LCP sous 2,5 secondes est bon, qu'un LCP entre 2,5 et 4 secondes est à améliorer, et qu'au-delà de 4 secondes la page est lente au sens propre du terme, pas seulement selon un ressenti subjectif.

## Pourquoi la vitesse compte plus sur le trafic payant que sur le trafic fidèle

Un visiteur qui arrive depuis une publicité Meta ou Google ne connaît pas encore la marque et n'a aucune raison particulière d'attendre. Ce visiteur a cliqué par curiosité ou par intérêt ponctuel, et une page qui met du temps à s'afficher lui donne une raison immédiate de repartir, sans coût ni regret puisqu'il n'a encore rien investi dans la marque. Un client qui revient volontairement sur le site, lui, a déjà une raison d'y être : il connaît le produit, fait confiance à la marque, et tolère quelques secondes de chargement supplémentaires parce que son intention d'achat existait avant même d'ouvrir la page. La conséquence pratique est qu'un site lent pénalise en premier le trafic le plus cher à générer, celui pour lequel la boutique paie déjà par clic.

## Les deux causes les plus fréquentes sur Shopify

**Trop d'applications installées.** Chaque application tierce ajoute son propre script au chargement de la page, souvent sans lien direct avec l'affichage du contenu principal. Une boutique avec quinze applications actives, dont plusieurs oubliées après un test ponctuel, charge quinze scripts supplémentaires à chaque visite, même sur des pages où ces applications ne servent à rien.

**Des images produit trop lourdes.** Une photo de 4 ou 5 Mo directement sortie d'un appareil photo, mise en ligne sans compression, ralentit une fiche produit à elle seule. Le format et le poids de l'image comptent plus que sa résolution apparente à l'écran, puisqu'un écran de téléphone n'a de toute façon pas besoin de la définition brute d'un fichier photographique professionnel.

## Un exemple concret

Une boutique de produits pour animaux affiche un LCP mesuré à 5,2 secondes sur sa fiche produit la plus vendue, avec 22 applications installées et des images produit non compressées autour de 3 Mo chacune. Après désinstallation de 9 applications inutilisées et compression des images principales sans perte visible de qualité, le LCP retombe à 2,1 secondes. Sur le mois suivant, le taux de conversion du trafic publicitaire payant sur cette fiche passe de 1,2 % à 1,6 %, sans aucun changement de campagne ni de budget sur la même période.

## Le rapport entre vitesse et type de trafic

| Type de trafic | Tolérance à la lenteur | Raison |
|---|---|---|
| Publicité payante (Meta, Google Ads) | Très faible | Visiteur sans engagement préalable envers la marque |
| Recherche organique récente | Faible à moyenne | Intention existante mais pas encore de confiance établie |
| Trafic direct, email, clients existants | Plus élevée | Confiance déjà construite, intention d'achat antérieure à la visite |

## Ce qu'il faut retenir

Un test PageSpeed Insights prend deux minutes et donne une base de comparaison chiffrée, plutôt qu'une impression de lenteur difficile à objectiver. Le retenir n'est utile que si le chiffre se traduit ensuite en action : désinstaller ce qui ne sert plus, compresser ce qui n'a jamais été optimisé. C'est un des premiers points que Maubourg Studio vérifie dans un diagnostic technique, avant même de regarder le design ou le texte des fiches produit, parce qu'une page lente rend inutile tout le travail fait sur le contenu qu'elle affiche.
