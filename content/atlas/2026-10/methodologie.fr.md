---
title: "Méthode - Atlas des réponses IA - Maubourg Studio"
description: "Comment les chiffres de l'Atlas sont produits : les catégories et les marques, les 60 questions, les quatre outils, les deux séries et les cinq vagues, et ce que les chiffres ne disent pas."
---
# Méthode

Cette page explique comment les chiffres de l'Atlas sont produits, et ce qu'ils ne disent
pas. Elle vaut pour l'édition 1 (octobre 2026).

## Les catégories et les marques {#categories-et-marques}

Trois catégories où des marques françaises vendent directement en ligne : la literie, la
cosmétique clean et les chaussures de confort.

Dans chaque catégorie, nous suivons de près des marques de taille petite à moyenne, hors leaders
de leur catégorie : 5 en literie, 6 en cosmétique clean, 4 en chaussures de confort, soit 15
marques. Les leaders (Emma et Simba en literie, Typology en cosmétique clean) sont suivis à
part, pour comparer. S'y ajoutent les marques nommées dans nos questions comparatives (par
exemple Mephisto ou Caudalie). Ce sont les 24 « marques suivies » dont parlent les constats.
Toutes les autres marques que les outils citent d'eux-mêmes sont aussi comptées.

## Les questions {#questions}

60 questions d'achat en français, 20 par catégorie, réparties en quatre types de 5 :

- **ouverte** : une question d'achat générale (« quel matelas choisir pour mal de dos ») ;
- **avec critère** : la même intention plus une exigence précise (« matelas naturel sans mousse
  pétrochimique ») ;
- **comparative** : compare des marques ou en cherche une autre (« alternative française à
  Skechers confort ») ;
- **sur une marque** : porte sur une marque nommée (« avis Kipli matelas »).

Chaque question porte un identifiant (par exemple LIT-O02 pour la deuxième question ouverte en
literie), repris dans les données publiées. La liste complète est [en bas de cette page](#les-60-questions).

## Les outils et les conditions {#outils-et-conditions}

ChatGPT, Claude, Gemini et Perplexity, dans leur version grand public, sur un compte dédié à
l'étude par outil, connecté, mémoire et personnalisation désactivées, dans un navigateur réservé
à l'étude, langue française. Chaque question est collée telle quelle dans une nouvelle
conversation, sans reformulation ni question de suivi.

**Pourquoi à la main.** Nous n'avons pas interrogé les modèles par programme : chaque question a
été tapée dans l'application, comme le ferait un acheteur, et chaque réponse enregistrée telle
qu'elle s'affiche. Interrogés par programme (par API), les modèles ne passent pas forcément par les
mêmes fonctions que l'application grand public : recherche sur le web, fiches produits, sources
affichées. C'est plus long, mais c'est la réponse que voit le client. Les captures d'écran publiées
dans l'étude sont celles de ces conversations.

Modèles affichés pendant la collecte : ChatGPT gpt-5-6 en série 1 et « Luna 5.6 » en série 2 ;
Claude Sonnet 5.5, recherche web activée ; Gemini Flash ; Perplexity en mode Recherche.

## Deux séries, cinq vagues {#series-et-vagues}

- **Série 1**, le 25 septembre 2026 : les 60 questions, posées une fois à chaque outil (240
  réponses).
- **Série 2**, du 5 au 8 octobre 2026 : 12 de ces questions, posées quatre fois de plus à chaque
  outil, un jour par vague (192 réponses).

Chaque fois qu'une question est posée à un outil s'appelle une vague : la vague 1 est la série
1, les vagues 2 à 5 forment la série 2. Les 12 questions de la série 2 ont été choisies après
lecture de la série 1, parmi les questions où les écarts entre marques étaient nets ; ce sont
des questions ouvertes, avec critère et comparatives qui ne nomment aucune marque. Pour ne pas
fausser les fréquences, la stabilité est calculée sur les vagues 2 à 5 seulement.

Une réponse a été écartée : une question posée par erreur en série 2 à un seul outil. 432
réponses sont analysées.

## Ce que nous comptons {#ce-que-nous-comptons}

**Les marques citées.** Chaque réponse est lue par un programme qui repère les noms de marques et
leurs variantes d'écriture, en mots entiers, sans tenir compte des accents ni des majuscules,
sauf pour les marques qui sont aussi des mots courants (elles ne comptent qu'écrites avec leur
majuscule). Une marque ne compte que dans les réponses de sa catégorie. Une marque nommée dans la
question ne compte pas comme citée dans la réponse.

**Les distributeurs.** Les boutiques et enseignes (La Redoute, une pharmacie en ligne...) sont
comptées à part et n'entrent jamais dans les chiffres d'une marque.

**La forme de la réponse.** Chaque réponse est classée : liste de marques, une seule marque,
aucune marque (conseil général), refus de répondre. Ce classement est fait par un agent IA
suivant un guide écrit. Avant de lui confier les 432 réponses, nous avons comparé son classement
à un classement fait à la main sur 20 réponses : aucun désaccord.

**La stabilité.** Sur une question et un outil, une marque est dite stable si elle est citée à 3
ou 4 des 4 vagues de la série 2, intermittente si elle l'est 1 ou 2 fois, absente si elle ne
l'est jamais. Le mot est toujours donné avec sa fraction.

**Les sources.** Quand un outil affiche les pages sur lesquelles il s'appuie, nous les relevons.
Les sites cités au moins deux fois par ChatGPT ou Perplexity (182 sites, 73 % des citations) ont
été classés à la main en sept types : presse, sites spécialisés (comparatifs, guides d'achat,
blogs, annuaires), sites de marques, boutiques et distributeurs, santé et institutions, avis
clients, forums. Les sites ambigus ont été vérifiés un par un.

Tous les chiffres sont donnés en fractions, avec leur dénominateur, et jamais en pourcentage sur
de petits effectifs.

## Ce que les chiffres ne disent pas {#limites}

- Trois catégories et 60 questions ne représentent pas tout l'e-commerce français.
- Les réponses des IA changent avec le temps et avec les mises à jour des modèles ; ces chiffres
  décrivent la fin septembre et le début octobre 2026.
- Un compte connecté avec mémoire désactivée n'est pas l'usage de tout le monde : un
  utilisateur avec historique peut obtenir d'autres réponses.
- Claude décide de chercher sur le web ou non selon la question ; ses sources ne sont visibles
  que quand il cherche. Gemini ne montre pas toujours les siennes. C'est pourquoi la typologie
  des sources ne porte que sur ChatGPT et Perplexity.
- 299 citations de sources sur 1 096 vont à des sites cités une seule fois ; elles ne sont pas
  classées.
- Quatre réponses par question et par outil suffisent à montrer la variabilité, pas à la
  mesurer finement. Les écarts d'une ou deux réponses ne sont pas interprétés.

## Les données {#donnees}

Trois fichiers sont téléchargeables, avec leur mode d'emploi : les 60 questions, les marques citées, par question,
série et outil (nombre de réponses qui les citent, sur le nombre de réponses), et les sites cités
comme sources, avec leur type. Seules les marques citées au moins une fois y figurent. Les
éditions publiées ne sont jamais modifiées ; une nouvelle campagne donne une nouvelle édition.

{{donnees}}

## La pondération par position {#ponderation}

Pour l'ordre d'apparition des marques dans une réponse, nous reprenons la pondération par
position de l'article « GEO: Generative Engine Optimization » (Aggarwal et al., Princeton,
2023), sans le nombre de mots : la marque citée au rang k parmi n pèse exp(-(k-1)/n).

## Les 60 questions {#les-60-questions}

Les questions ont été posées exactement comme écrites ci-dessous. La colonne « Série 2 » indique
les 12 questions reposées quatre fois. La liste est aussi dans les données téléchargeables.

| Identifiant | Catégorie | Type | Question | Série 2 |
|---|---|---|---|---|
| LIT-O01 | Literie | ouverte | quel matelas choisir pour mal de dos |  |
| LIT-O02 | Literie | ouverte | meilleure marque de matelas français | oui |
| LIT-O03 | Literie | ouverte | quel matelas pour dormir sur le côté |  |
| LIT-O04 | Literie | ouverte | quelle marque de literie choisir en 2026 | oui |
| LIT-O05 | Literie | ouverte | quel matelas acheter quand on transpire la nuit |  |
| LIT-C01 | Literie | avec critère | matelas naturel sans mousse pétrochimique |  |
| LIT-C02 | Literie | avec critère | matelas ferme pour personne de forte corpulence |  |
| LIT-C03 | Literie | avec critère | matelas fabriqué en France livré sous une semaine |  |
| LIT-C04 | Literie | avec critère | matelas pour lit 160x200 avec essai longue durée | oui |
| LIT-C05 | Literie | avec critère | matelas hypoallergénique pour personne allergique aux acariens |  |
| LIT-X01 | Literie | comparative | Tediber ou Emma |  |
| LIT-X02 | Literie | comparative | alternative française à Emma matelas |  |
| LIT-X03 | Literie | comparative | Hypnia/Slome vs Tediber lequel choisir |  |
| LIT-X04 | Literie | comparative | quelle marque de matelas remplace Simba |  |
| LIT-X05 | Literie | comparative | comparatif matelas en ligne français | oui |
| LIT-B01 | Literie | sur une marque | que vaut Hypnia/Slome |  |
| LIT-B02 | Literie | sur une marque | avis Kipli matelas |  |
| LIT-B03 | Literie | sur une marque | Tediber est-ce une bonne marque |  |
| LIT-B04 | Literie | sur une marque | Mello matelas retours clients |  |
| LIT-B05 | Literie | sur une marque | Le Matelas Vert qualité |  |
| COS-O01 | Cosmétique clean | ouverte | quelle marque de cosmétique clean choisir | oui |
| COS-O02 | Cosmétique clean | ouverte | meilleure marque de soin visage naturel française | oui |
| COS-O03 | Cosmétique clean | ouverte | quelle crème hydratante sans perturbateur endocrinien |  |
| COS-O04 | Cosmétique clean | ouverte | marque de cosmétique bio à privilégier | oui |
| COS-O05 | Cosmétique clean | ouverte | quelle routine visage pour peau sensible |  |
| COS-C01 | Cosmétique clean | avec critère | sérum vitamine C sans alcool pour peau réactive |  |
| COS-C02 | Cosmétique clean | avec critère | crème solaire minérale sans filtre chimique |  |
| COS-C03 | Cosmétique clean | avec critère | soin anti-âge vegan fabriqué en France |  |
| COS-C04 | Cosmétique clean | avec critère | nettoyant visage sans sulfate pour peau grasse |  |
| COS-C05 | Cosmétique clean | avec critère | cosmétique clean avec packaging rechargeable |  |
| COS-X01 | Cosmétique clean | comparative | Typology ou Aime |  |
| COS-X02 | Cosmétique clean | comparative | alternative française à The Ordinary |  |
| COS-X03 | Cosmétique clean | comparative | Respire vs Les Huilettes déodorant |  |
| COS-X04 | Cosmétique clean | comparative | quelle marque remplace Caudalie en clean beauty |  |
| COS-X05 | Cosmétique clean | comparative | comparatif marques cosmétique clean françaises | oui |
| COS-B01 | Cosmétique clean | sur une marque | que vaut Typology |  |
| COS-B02 | Cosmétique clean | sur une marque | avis Aime compléments et soins |  |
| COS-B03 | Cosmétique clean | sur une marque | Oden est-ce une bonne marque |  |
| COS-B04 | Cosmétique clean | sur une marque | Nidéco retours clients |  |
| COS-B05 | Cosmétique clean | sur une marque | Absolution qualité des ingrédients |  |
| CHA-O01 | Chaussures de confort | ouverte | quelle marque de chaussures confort choisir |  |
| CHA-O02 | Chaussures de confort | ouverte | meilleure chaussure pour pieds sensibles |  |
| CHA-O03 | Chaussures de confort | ouverte | quelle chaussure pour personne diabétique |  |
| CHA-O04 | Chaussures de confort | ouverte | marque de chausson orthopédique à recommander | oui |
| CHA-O05 | Chaussures de confort | ouverte | quelle chaussure large pour pieds gonflés | oui |
| CHA-C01 | Chaussures de confort | avec critère | chaussure avec semelle amovible pour orthèse |  |
| CHA-C02 | Chaussures de confort | avec critère | chausson fermeture velcro pour personne âgée |  |
| CHA-C03 | Chaussures de confort | avec critère | chaussure de confort fabriquée en France | oui |
| CHA-C04 | Chaussures de confort | avec critère | chaussure large pour hallux valgus | oui |
| CHA-C05 | Chaussures de confort | avec critère | chaussure confort femme élégante pour le travail |  |
| CHA-X01 | Chaussures de confort | comparative | Podowell ou Mephisto |  |
| CHA-X02 | Chaussures de confort | comparative | alternative française à Skechers confort |  |
| CHA-X03 | Chaussures de confort | comparative | Chausse Mouton vs Damart chaussons |  |
| CHA-X04 | Chaussures de confort | comparative | quelle marque remplace Finn Comfort |  |
| CHA-X05 | Chaussures de confort | comparative | comparatif marques chaussures confort |  |
| CHA-B01 | Chaussures de confort | sur une marque | que vaut Podowell |  |
| CHA-B02 | Chaussures de confort | sur une marque | avis Chausse Mouton |  |
| CHA-B03 | Chaussures de confort | sur une marque | Mephisto est-ce une bonne marque |  |
| CHA-B04 | Chaussures de confort | sur une marque | Pédiconfort retours clients |  |
| CHA-B05 | Chaussures de confort | sur une marque | Xsensible qualité |  |
