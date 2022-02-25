Passer au contenu principal
￼
[21-22]-M4103C Programmation Web – client riche (O ...

JavaScript - Sujet de projet
# DUT, M4103C, Programmation web, client riche.

## Projet HotHotHot



Travail en groupe de 5 à rendre avant le 4 **avril 2022**, 0h00 (donc le dimanche 3 au plus tard).

_HotHotHot_ est une application dont le rôle est d’être une interface d’information et de gestion d’un système domotique.

Cette application reçoit des données en provenance de différents capteurs (ex, température, humidité, état d’un périphérique etc.)

Elle affiche ces données, leur historique et propose des suggestions, émet des alertes à l’attention des utilisateurs.

l’écran d’accueil comprend a minima :

Un menu avec  :

- des actions liées  à l’utilisateur (déconnexion , info compte - pages HTML simples dans le sens où nous n'avons rien côté serveur pour les rendre opérationnelles).

- accès à une page de documentation

  L’affichage de l’état de deux capteurs thermiques (température donc…), l’un situé en extérieur, l’autre à l’intérieur d’une pièce.

  L’affichage d’un graphe synthèse des capteurs avec historique

  Un système d’alertes et d’information comprenant :

  -   Synthèse journalière avec temp min et max de chacun
  -   Si Capteur ext >  35 degrés :  alerte : Hot Hot Hot !
  -   Si Capteur ext <  0 degrés : alerte : Banquise en vue !
  -   Si Capteur int > 22 degrés : alerte : Baissez le chauffage !
  -   Si Capteur int > 50 degrés : alerte : Appelez les pompiers ou arrêtez votre barbecue !
  -   Si Capteur int < 12 : alerte : montez le chauffage ou mettez un gros pull  !
  -   Si Capteur int < 0 : alerte : canalisations gelées, appelez SOS plombier et mettez un bonnet !



  Le système d’alerte permet, au clic et par événement, de faire apparaître le détail de l’alerte

## Travail attendu :


Pour l’ensemble des lots, vous prendrez soin d’utiliser ARIA à bon escient et d’organiser votre code JavaScript dans les règles de l’art (Usage de Design pattern, observateur, MVC sont des pistes à explorer)


### Lot 1, Réalisation d’une interface HTML/CSS/JS responsive comprenant :


**Page d’accueil :**

**Menu de navigation :**

- lien 1 : Accueil

- lien 2 : documentation de votre projet :

    - Présentation de l’équipe et du rôle de chacun.

    - Outils utilisés et organisation (gestion de projet, dépôt git avec url), planning de réalisation.

    - 2 principales difficultés rencontrées et solution apportée

    - Si vous deviez recommencer ce projet, que changeriez vous à vos pratiques ?



      **Système d’onglet**

- onglet 1 : Affichage des données en temps réel des deux capteurs de températures (via websocket : wss://ws.hothothot.dog:9502 ).

- onglet 2 : emplacement pour l’historique des capteurs sous forme de graphe


  **Note : Framework CSS autorisé mais SANS la partie JavaScript**

### Lot 2, système d’alerte et notifications


Lors de la réception des données des capter celle-ci devront être analysées et selon les exemples donnés ci-avant :

- le Min et Max de la journée en cours affichés

- L’utilisateur devra être prévenu des anomalies (cf ci-avant) par deux moyens
  - 1  Système d’alerte par une boite de dialogue sur la page d’accueil (accès aux alertes passées via clic, surgissement d’une boîte de dialogue quand une alerte est émise)
  - 2  Système de Notification (mode push)


### Lot 3, mise en oeuvre d’une  PWA
 
- bouton d’installation

- gestion du mode hors ligne avec stratégie de mise en cache

  1 - Mise en cache dès le premier accès à la page d’accueil de la page documentation

  2 - mise en cache de l’accueil avec les données récoltées (Attention, il n’est pas possible de mettre en cache des données en provenance d’un serveur websocket, il vous faudra trouver une alternative…)
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTgxNTgyMTk3N119
-->



























































































































Favoris ()
Aucune conversation favorite



Groupe ()
Pas de conversation de groupe



Privée ()
Pas de conversation privée



Contacts

Non contact

Charger plus
Messages personnels

Charger plus
Aucun résultat

Rechercher des personnes et des messages
Confidentialité
Vous pouvez choisir qui peut vous envoyer un message personnel
Accepter des messages de :
Mes contacts seulement
Mes contacts et tout le monde dans mes cours
Préférences de notification
Général
Taper entrée pour envoyer























Supprimer les messages sélectionnés


Envoyer une demande de contact
Vous avez bloqué cet utilisateur.
Débloquer l'utilisateur
Vous ne pouvez pas envoyer un message à cet utilisateur



Tout afficher 
