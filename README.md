# IDashBoard

## Description
IDashBoard est un projet d'application permettant d'obtenir un dashboard contenant des widgets semblable à IGoogle.
IGoogle avait été choisi au départ, mais par soucis de droit d'auteur, les mentions relatives à la marque Google ainsi que les logos ont été commentés dans le code pour le déploiement de l'application, mais peuvent être décommentés pour vérification.
Un logo a été mis en place pour le remplacer.

### APIs
Les APIs présentes sont : 
- GNews pour les News
- OpenWeather pour la météo (celle-ci fonctionne en https)
- Flickr pour les images,
- GoogleSearch pour la recherche sur le site de l'université.
- Leaflet (OpenStreetMap) + MapQuest pour la carte.

### Autres services (hors API)
- Twitter (iframe)
- Heure et Date (date locale)

### Fonctionnalités
- Changer de couleur des plugins possible
- Pouvoir choisir un widget dans une liste de widgets dans une liste déroulante.
- Possibilité de sauvegarder les positions, la couleur et les widgets sélectionnés.
- Respecte des règles qualité OpQuast
- Service worker : les fichiers sont mis en cache pour une utilisation ultérieure (mise en cache des images principalement).
- PWA : Manifest, icônes liées.

### Choix des technologies
- Effectuer le projet sur VueJS
- Utilisation de VueX pour du stockage inter-composant (stockage d'état de variables)
- Material pour le thème : Material est le thème d'origine de Google. Il a été étudié pour être conforme aux règles standards d'UX/UI.
- Verte : colorPicker pour VueJS https://github.com/baianat/verte (Merci à eux)

### Problèmes prévus
- L'événement move qui permet de bouger les widgets se désactive aussitôt que le pointeur de la souris quitte la zone de move, sans raison.
- Le responsive n'est pas opérationnel.
- Le fil twitter peut rester à l'état de lien. Cela vient d'un bug venant d
- Icône du projet n'est pas très belle graphiquement.

## Développement
### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## COPYRIGHT

Le code est sous licence GPL v3.
```
Copyright (C) 2021 Gomes Dias Julien

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see https://www.gnu.org/licenses/. See LICENSE file for more informations.
```

Les images provenant des API et logo du projet ont des droits réservés. Il est formellement interdit de les copier.

Ce projet utilise les composants et la icones de Material Design qui sont sous licence MIT et ApacheV2.


