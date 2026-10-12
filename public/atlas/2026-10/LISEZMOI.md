# Atlas des réponses IA, édition 1 (octobre 2026) : données agrégées

Maubourg Studio. Méthode complète : page Méthode de l'Atlas.

## atlas-reponses-ia-edition-1-questions.csv

Les 60 questions, telles que posées : identifiant, verticale, type, texte, et si elle a été reposée
en série 2.

## atlas-reponses-ia-edition-1-citations.csv

Une ligne par marque citée, question, série et outil.

- `verticale` : literie, cosmétique clean ou chaussures de confort.
- `question_id`, `question`, `type_de_question` : la question posée, telle quelle, et son type
  (ouverte, avec critère, comparative, sur une marque).
- `serie` : 1 (une réponse par question et par outil, le 25 septembre 2026) ou 2 (quatre réponses
  par question et par outil, du 5 au 8 octobre 2026).
- `outil` : ChatGPT, Claude, Gemini ou Perplexity.
- `marque` : la marque citée dans la réponse. Une marque nommée dans la question n'est pas
  comptée ; les boutiques et distributeurs ne sont pas des marques ici.
- `reponses_qui_citent`, `reponses` : nombre de réponses qui citent la marque, sur le nombre de
  réponses de l'outil à cette question dans cette série.

Seules les marques citées au moins une fois figurent dans le fichier.

## atlas-reponses-ia-edition-1-sources.csv

Une ligne par site cité comme source, question type, série et outil.

- `domaine` : le site cité (sans www).
- `type_de_site` : presse, site spécialisé, site de marque, boutique ou distributeur, santé ou
  institution, avis clients, forum, ou « non classé » pour les sites cités une seule fois par
  ChatGPT et Perplexity et ceux cités seulement par Claude ou Gemini.
- `reponses_qui_citent` : nombre de réponses qui citent au moins une page du domaine.

Les sources ne sont relevées que quand l'outil les affiche : toujours pour Perplexity, presque
toujours pour ChatGPT, seulement quand il cherche sur le web pour Claude, une partie du temps pour
Gemini.
