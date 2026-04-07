# 🎮 Undercover Game

## 📌 Description

Undercover Game est une application web multijoueur inspirée du jeu "Undercover".
Chaque joueur reçoit un mot secret :

* 🟢 Les joueurs "normaux" ont le même mot
* 🔴 Les "Undercover" ont un mot légèrement différent
* ⚪ Le "Mr White" n’a aucun mot et doit deviner

Le but est de découvrir qui est l’Undercover… sans se faire démasquer !

---

## 🚀 Technologies utilisées

* Frontend : Vue.js
* Backend : Node.js (Express)
* API : OpenAI (génération dynamique des mots)
* Stockage : LocalStorage (navigateur)

---

## ⚙️ Installation du projet

### 🔽 1. Cloner le projet

```bash
git clone https://github.com/Ayoub-2005/Undercover-Game.git
cd Undercover-Game
```

---

### 📦 2. Installer le frontend

```bash
npm install
npm run dev
```

👉 L'application sera accessible sur :
http://localhost:5173

---

### 🧠 3. Installer le backend (API IA)

```bash
cd server
npm install
```

---

### 🔑 4. Configurer la clé API

Créer un fichier `.env` dans le dossier `server` :

```env
OPENAI_API_KEY=VOTRE_CLE_API
```

---

### ▶️ 5. Lancer le serveur

```bash
node server.js
```

👉 Le serveur sera disponible sur :
http://localhost:3000

---

## 🎮 Fonctionnement du jeu

### 1️⃣ Paramètres

* Choisir le nombre d’Undercover
* Activer ou non le mode "Mr White"

---

### 2️⃣ Lobby

* Ajouter / supprimer des joueurs
* Minimum 3 joueurs requis

---

### 3️⃣ Révélation

* Chaque joueur découvre son mot secrètement

---

### 4️⃣ Phase de jeu

* Chaque joueur donne un indice
* 3 tours d’indices
* Débat entre joueurs

---

### 5️⃣ Vote

* Les joueurs votent pour éliminer un suspect

---

## 🎯 Règles de gestion

* Minimum 3 joueurs
* Nombre d’Undercover :

  ```
  Undercover < (nombre de joueurs - 1) / 2
  ```
* Le "Mr White" n’a aucun mot

---

## 🤖 Génération des mots

Les mots sont générés dynamiquement grâce à l’API OpenAI :

* Choix aléatoire d’un thème (animaux, films, villes…)
* Génération :

  * 1 mot normal
  * 1 mot undercover proche

---

## 🧪 Tests (à venir)

Des tests unitaires seront ajoutés pour vérifier :

* Les règles du jeu
* La distribution des rôles

---

## 📁 Structure du projet

```
undercover-game/
│
├── src/ (Vue.js)
├── server/ (API Node.js)
├── public/
├── package.json
```

---

## ⚠️ Problèmes connus

* Si écran blanc → vérifier la console (F12)
* Si mots absents → vérifier que le serveur est lancé

---

## 🎤 Projet BTS SIO SLAM

Ce projet a été réalisé dans le cadre d’un projet personnel pouvant être présenté pour le BTS SIO (option SLAM).

Objectifs :

* Développement web complet (frontend + backend)
* Utilisation d’une API externe
* Mise en place de logique métier
* Gestion d’un projet avec GitHub

---

## 👨‍💻 Auteur

Ayoub

---

## 📌 Améliorations possibles

* 🎨 Design amélioré
* 🎴 Animation des cartes
* 🌐 Mode multijoueur en ligne
* 🧪 Tests unitaires complets

---
