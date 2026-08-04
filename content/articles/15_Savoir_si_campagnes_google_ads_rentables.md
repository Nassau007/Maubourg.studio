---
title: "Comment savoir si mes campagnes Google Ads sont rentables"
slug: "comment-savoir-si-mes-campagnes-google-ads-sont-rentables"
description: "Le ROAS affiché dans Google Ads ne dit pas si une campagne est rentable : il faut le comparer à un seuil calculé à partir de votre marge, appelé ROAS de…"
question: "Comment savoir si mes campagnes Google Ads sont rentables ?"
category: "Acquisition et publicité payante"
date: 2026-08-03
lang: fr
readingTime: 4
draft: false
template: "sidebar"
---
# Comment savoir si mes campagnes Google Ads sont rentables

_Maubourg Studio, mis à jour le 3 août 2026_

Le ROAS affiché dans Google Ads ne dit pas si une campagne est rentable : il faut le comparer à un seuil calculé à partir de votre marge, appelé ROAS de rentabilité (breakeven ROAS), et intégrer des coûts que la plateforme n'affiche jamais. Une campagne à ROAS 3 peut perdre de l'argent, une autre à ROAS 2 peut en gagner : tout dépend de la marge derrière chaque vente.

## Calculer son ROAS de rentabilité

La formule est simple : ROAS de rentabilité = 1 divisé par le taux de marge. Si votre marge brute est de 40 % (c'est-à-dire qu'il reste 40 centimes de marge sur chaque euro de chiffre d'affaires, avant la publicité), il faut un ROAS d'au moins 2,5 pour ne pas perdre d'argent sur cette vente : 1 / 0,40 = 2,5. En dessous de ce seuil, chaque euro dépensé en publicité coûte plus cher que ce qu'il rapporte, même si le ROAS affiché semble correct en apparence.

| Marge brute | ROAS de rentabilité (breakeven) |
|---|---|
| 25 % | 4,0 |
| 33 % | 3,0 |
| 40 % | 2,5 |
| 50 % | 2,0 |
| 60 % | 1,7 |

Un ROAS "confortable" pour une marque à faible marge peut donc être un ROAS déficitaire pour une autre à marge plus élevée, alors que Google Ads affiche exactement le même chiffre dans les deux cas et ne fait aucune distinction.

## Les coûts que Google Ads n'affiche jamais

Le ROAS de la plateforme compare le chiffre d'affaires généré au coût publicitaire, point final. Il ignore systématiquement trois postes qui rongent la marge réelle sur chaque commande :

- **Les frais de traitement des paiements** : environ 1,5 à 3 % du montant de la commande selon le prestataire (Shopify Payments, Stripe, PayPal), prélevés sur chaque transaction générée par la publicité.
- **Le taux de retours et de remboursements** : une commande remboursée après achat a coûté un budget publicitaire réel, mais n'a généré aucun chiffre d'affaires final. Sur la mode, où le taux de retour dépasse parfois 20 %, cet écart peut suffire à transformer une campagne rentable sur le papier en campagne perdante en réalité.
- **Les codes de réduction utilisés au moment du paiement** : un client venu via une annonce à ROAS 3 qui utilise un code -15 % au checkout fait mécaniquement baisser la marge réelle, sans que le ROAS affiché en tienne compte une seule seconde.

## Repérer le gaspillage dans le rapport des termes de recherche

Sur une campagne Search, le rapport des termes de recherche (Search terms report) montre les requêtes exactes tapées par les internautes qui ont déclenché l'annonce, y compris celles qui ne correspondaient pas à l'intention visée par le mot-clé acheté. C'est l'une des fuites de rentabilité les plus fréquentes et les plus silencieuses : un mot-clé large comme "sac cuir femme" peut déclencher "réparer sac cuir" ou "sac cuir femme pas cher occasion", qui consomment du budget sans jamais convertir. Passer ce rapport en revue une fois par mois et ajouter les requêtes non pertinentes en mots-clés à exclure (negative keywords) est l'action la plus rentable pour l'effort qu'elle demande.

## Le calcul complet, avec un exemple

Une campagne affiche un ROAS de 3 sur un mois : 3 000 € dépensés pour 9 000 € de chiffre d'affaires généré. La marge brute produit est de 45 %, avant publicité, ce qui donne 4 050 € de marge sur ces 9 000 €. Il faut ensuite retirer les frais de paiement (environ 2 %, soit 180 €), un taux de retours de 12 % appliqué au chiffre d'affaires (1 080 €, avec la marge correspondante perdue), et les codes de réduction utilisés sur environ 20 % des commandes à -10 % (environ 180 €). Une fois ces trois postes déduits, la marge réelle tombe autour de 2 400 €, contre un coût publicitaire de 3 000 € : la campagne, malgré un ROAS de 3 qui semblait confortable, est en réalité déficitaire d'environ 600 € sur le mois.

Ce calcul demande de connaître sa marge produit réelle, pas seulement le prix de vente, et de suivre le taux de retours par campagne plutôt que globalement. Maubourg Studio intègre systématiquement ce calcul de rentabilité réelle, marge et coûts annexes compris, dans le pilotage des comptes Google Ads qu'il gère, plutôt que de piloter sur le seul ROAS affiché par la plateforme.
