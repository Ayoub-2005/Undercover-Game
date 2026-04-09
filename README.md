# 🎮 Undercover Game

## 📌 Description

Undercover Game est une application web interactive développée en Vue.js permettant de jouer au célèbre jeu "Undercover".

Chaque joueur reçoit un mot secret :

* La majorité des joueurs ont le même mot (les "normaux")
* Un ou plusieurs joueurs ont un mot légèrement différent (les "Undercover")
* Un joueur peut être "Mr White" (il n’a aucun mot)

Le but est de trouver les Undercover grâce à des indices… sans se faire démasquer !

---

## 🚀 Fonctionnalités

* 👥 Création de partie avec plusieurs joueurs
* 🎴 Distribution aléatoire et sécurisée des mots
* 🤖 Génération dynamique des mots via une API IA
* 🎭 Gestion des rôles :

  * Joueurs normaux
  * Undercover (configurable)
  * Mr White (optionnel)
* ⚙️ Paramétrage du jeu :

  * Nombre d’Undercover
  * Activation de Mr White
* 🔄 Relancer une partie facilement
* 💾 Sauvegarde des joueurs (localStorage)
* 🎨 Interface moderne avec animations (flip card)

---

## 🛠️ Technologies utilisées

### Frontend

* HTML / CSS
* JavaScript
* Vue.js (Vite)

### Backend

* Node.js
* Express

### IA

* API OpenRouter (modèle GPT)
* Génération dynamique de mots

---

## 📦 Installation du projet

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/TON-USERNAME/Undercover-Game.git
cd Undercover-Game
```

---

### 2️⃣ Installer les dépendances

#### Frontend

```bash
npm install
```

#### Backend

```bash
cd server
npm install
```

---

### 3️⃣ Configurer l’API IA

Créer un fichier `.env` dans le dossier `/server` :

```env
OPENROUTER_API_KEY=TA_CLE_API
```

👉 Obtenir une clé gratuite sur : https://openrouter.ai

---

### 4️⃣ Lancer le projet

#### Backend

```bash
cd server
node server.js
```

#### Frontend

```bash
npm run dev
```

---

## 🎮 Utilisation

1. Ajouter les joueurs dans le lobby
2. Configurer les paramètres (Undercover / Mr White)
3. Lancer la partie
4. Chaque joueur découvre son mot
5. Phase orale :

   * Indices (3 tours)
   * Débat
   * Vote
6. Relancer une nouvelle partie ou modifier les joueurs

---

## 🧠 Fonctionnement de l’IA

L’application utilise une API IA pour générer :

* Un mot "normal"
* Un mot "undercover" proche

Exemple :

```json
{
  "normal": "chat",
  "undercover": "chien"
}
```

Un système de fallback est prévu en cas d’erreur API.

---

## 🧪 Tests (à venir)

Des tests unitaires seront ajoutés pour :

* Vérifier le nombre minimum de joueurs
* Valider le nombre d’Undercover
* Tester la présence de Mr White
* Vérifier la distribution des rôles

---

## 📈 Améliorations possibles

* Ajout de sons (flip card)
* Mode multijoueur en ligne
* Chat intégré
* Timer pour les tours
* Score des joueurs

---

## 🎓 Contexte

Projet réalisé dans le cadre du BTS SIO SLAM.

Objectifs :

* Développer une application web complète
* Utiliser une API externe (IA)
* Implémenter une logique métier
* Concevoir une interface utilisateur moderne

---

## 👨‍💻 Auteur

Projet réalisé par : Ayoub

---

## 📜 Licence

Projet personnel à but pédagogique.
