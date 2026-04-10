# 🎮 Undercover Game (Vue.js)

Un jeu interactif inspiré du célèbre jeu **Undercover**, développé avec **Vue.js**.

Chaque joueur reçoit un mot secret… sauf un 👀
Saurez-vous le démasquer ?

---

## 🚀 Fonctionnalités

* 👥 Ajout de joueurs
* 🎴 Distribution aléatoire des mots
* 🤖 Génération dynamique avec une API IA
* 🎭 Rôles :

  * Joueurs normaux
  * Undercover (configurable)
  * Mr White (optionnel)
* ⚙️ Paramétrage du jeu
* 🔄 Relancer une partie
* 💾 Sauvegarde des joueurs
* 🎨 Interface moderne avec animation des cartes

---

## 📦 Installation complète (Mode d’emploi)

---

### 🔹 1. Cloner le projet

```bash
git clone https://github.com/TON-USERNAME/Undercover-Game.git
cd Undercover-Game
```

---

### 🔹 2. Installer les dépendances

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

### 🔹 3. Configurer l’API IA

Créer un fichier `.env` dans le dossier `server` :

```env
OPENROUTER_API_KEY=TA_CLE_API
```

👉 Tu peux obtenir une clé gratuite sur : https://openrouter.ai

---

### 🔹 4. Lancer le projet

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

### 🔹 5. Accéder au jeu

Ouvre ton navigateur :

```
http://localhost:5173/
```

---

## 🎮 Utilisation du jeu

1. Ajouter les joueurs
2. Aller dans les paramètres
3. Choisir :

   * nombre d’Undercover
   * activer Mr White
4. Lancer la partie
5. Chaque joueur découvre son mot
6. Phase orale :

   * indices
   * débat
   * vote
7. Relancer une partie

---

## 🧠 Fonctionnement de l’IA

L’application utilise une API pour générer :

```json
{
  "normal": "chat",
  "undercover": "chien"
}
```

👉 Les mots :

* changent à chaque partie
* sont du même thème
* évitent les répétitions

---

## 🧪 Tests unitaires

Des tests ont été ajoutés avec **Vitest** pour vérifier les règles du jeu.

### 🔍 Ce qui est testé

* Minimum 3 joueurs
* Nombre d’Undercover valide
* Gestion de Mr White
* Distribution des rôles

---

### ▶️ Lancer les tests

Depuis la racine du projet :

```bash
npx vitest
```

---

## 📁 Structure du projet

```
src/
├── views/
├── components/
├── utils/
│   └── gameRules.js
├── tests/
│   └── game.test.js
```

---

## 🛠️ Technologies utilisées

* Vue.js ⚡
* Node.js 🟢
* Express 🚀
* API OpenRouter 🤖
* Vitest 🧪

---

## 📌 Auteur

Projet réalisé par **Ayoub**

---

## ⭐ Améliorations possibles

* 🔊 Sons
* ⏱️ Timer
* 🏆 Score
* 🌐 Mode multijoueur

---

## 🚀 Lancer rapidement

```bash
git clone https://github.com/TON-USERNAME/Undercover-Game.git
cd Undercover-Game
npm install
cd server
npm install
node server.js
cd ..
npm run dev
```

---

🎉 Amuse-toi bien !
