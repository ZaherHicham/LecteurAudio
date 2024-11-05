# Projet : Lecteur Audio avec Web Components

## Ouvrir sur google chrome

## Description

Ce projet consiste à développer un lecteur audio complet en utilisant les **Web Components** et l'API **HTML5 audio**. L'objectif est de créer un lecteur audio personnalisé avec des fonctionnalités avancées, notamment le réglage de la stéréo, la visualisation des fréquences, et l'utilisation de **WebAudio Controls** pour améliorer l'expérience utilisateur.

## Fonctionnalités Réalisées

### ✅ 1. Faire votre propre lecteur audio avec Web Components
 [x] Création d'un lecteur audio personnalisé en uhttp://127.0.0.1:5500/index.htmltilisant des Web Components.

### ✅ 2. Utilisation de l’API du W3C de l’élément `<audio>` de HTML5
[x] Intégration de l'API HTML5 `<audio>` pour les fonctionnalités essentielles :
  - **Play** : Lecture de l'audio.
  - **Pause** : Pause de l'audio.
  - **Stop** : Arrêt de l'audio.
  - **Avance rapide** : Fonction pour avancer dans la piste.
  - **Volume** : Contrôle du volume avec un slider.
  - **Barre de progression** : Affichage de la barre de progression pour visualiser le temps écoulé et restant.

### ✅ 3. Ajout du réglage de la stéréo
[x] Utilisation de l'API **Web Audio** pour ajouter un contrôle de stéréo.
[x] Utilisation de `StereoPannerNode` pour gérer le panoramique gauche/droite.
[x] Contrôle de stéréo intégré dans un slider, permettant à l'utilisateur d'ajuster facilement la balance.

### ✅ 4. Ajouter une visualisation de fréquences
[x] Création d'un composant de visualisation des fréquences utilisant **AnalyserNode** pour capturer les données de fréquence audio en temps réel.
[x] Utilisation d'un `<canvas>` pour afficher la visualisation sous forme de barres animées représentant les fréquences.
[x] La visualisation est réactive et se met à jour en fonction de l'audio en cours de lecture.

### ✅ 5. Utiliser un ou plusieurs WebAudio Controls pour les réglages de volume, stéréo, etc.
[x] Utilisation de **WebAudio Controls** pour un contrôle visuel et intuitif des réglages de volume et de stéréo.
[x] Intégration de boutons et sliders personnalisés, tels que **WebAudioKnob** pour le volume et **WebAudioSlider** pour la stéréo.
[x] Les contrôles sont fonctionnels et permettent une interaction fluide avec le lecteur.

### ✅ 6. Décomposition en plusieurs Web Components
[x] Le projet est structuré en plusieurs Web Components pour améliorer la modularité et la maintenabilité du code.


[x] : veut dire que ça a été fait