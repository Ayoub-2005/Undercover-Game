const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

// ── Catégories pour le mode aléatoire ──────────────────────────────────────
const CATEGORIES = [
  "cuisine & boissons", "sports & jeux", "animaux & nature",
  "lieux & voyages", "professions & métiers", "musique & arts",
  "transports & véhicules", "vêtements & accessoires", "technologies",
  "corps humain & santé", "émotions & sentiments", "films & personnages",
  "outils & instruments", "meubles & maison", "saisons & météo"
]

// ── Fallback si l'IA échoue ─────────────────────────────────────────────────
const fallbackWords = [
  { normal: "chat",   undercover: "chien",    categorie: "animaux & nature" },
  { normal: "lion",   undercover: "tigre",    categorie: "animaux & nature" },
  { normal: "pizza",  undercover: "burger",   categorie: "cuisine & boissons" },
  { normal: "Paris",  undercover: "Londres",  categorie: "lieux & voyages" },
  { normal: "Naruto", undercover: "Sasuke",   categorie: "films & personnages" }
]

// ── Constructeur de prompt ──────────────────────────────────────────────────
function buildUndercoverPrompt(theme, usedPairs = [], difficulty = "medium") {
  const difficultyInstructions = {
    easy:   "Les deux mots doivent être clairement du même domaine mais bien distincts (ex: guitare / piano).",
    medium: "Les deux mots doivent être proches et subtils à distinguer (ex: tanière / terrier).",
    hard:   "Les deux mots doivent être très proches, quasi-synonymes ou très liés sémantiquement (ex: allée / couloir)."
  }

  const avoidList = usedPairs.length > 0
    ? `\nPaires déjà utilisées à ÉVITER absolument :\n${usedPairs.map(p => `- ${p.normal} / ${p.undercover}`).join("\n")}`
    : ""

  const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)]
  const resolvedTheme  = theme === "random" ? randomCategory : theme

  return [
    {
      role: "system",
      content: `Tu es un générateur expert de paires de mots pour le jeu Undercover.

NIVEAU DE DIFFICULTÉ : ${difficulty.toUpperCase()}
${difficultyInstructions[difficulty]}

RÈGLES STRICTES :
1. Les deux mots doivent appartenir au même univers thématique
2. Un civil ayant le mot "normal" doit pouvoir décrire son mot sans trahir l'undercover
3. Les mots doivent être des noms communs concrets, facilement descriptibles à l'oral
4. Varie les catégories : objets, lieux, métiers, aliments, animaux, etc.
5. Évite les paires trop génériques ou sur-utilisées (chat/chien, rouge/bleu...)
6. Privilégie des mots du vocabulaire courant français${avoidList}

FORMAT DE RÉPONSE : JSON uniquement, sans markdown, sans explication.
{"normal":"mot","undercover":"mot proche","categorie":"nom de la catégorie"}`
    },
    {
      role: "user",
      content: `Génère une paire pour le thème : ${resolvedTheme}`
    }
  ]
}

// ── Mémoire des paires utilisées (réinitialisée au redémarrage du serveur) ──
let usedPairs = []

// ── Route principale ────────────────────────────────────────────────────────
app.post("/generate-word", async (req, res) => {
  const { theme = "random", difficulty = "medium" } = req.body

  try {
    console.log(`Appel IA — thème: "${theme}" | difficulté: "${difficulty}"`)

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: buildUndercoverPrompt(theme, usedPairs, difficulty)
      })
    })

    const data = await response.json()
    console.log("Réponse IA :", data)

    if (!data.choices || !data.choices[0]) throw new Error("Pas de réponse IA")

    const text    = data.choices[0].message.content
    const cleaned = text.replace(/```json|```/g, "").trim()
    const result  = JSON.parse(cleaned)

    // Mémoriser pour éviter les répétitions (limite à 20 paires)
    usedPairs.push({ normal: result.normal, undercover: result.undercover })
    if (usedPairs.length > 20) usedPairs.shift()

    res.json({
      normal:     result.normal,
      undercover: result.undercover,
      categorie:  result.categorie ?? null
    })

  } catch (error) {
    console.warn("⚠️ Erreur IA → fallback :", error.message)
    const random = fallbackWords[Math.floor(Math.random() * fallbackWords.length)]
    res.json(random)
  }
})

// ── Réinitialiser la mémoire des paires (utile entre deux parties) ──────────
app.post("/reset-pairs", (_req, res) => {
  usedPairs = []
  res.json({ ok: true, message: "Historique des paires réinitialisé." })
})

app.listen(3000, () => {
  console.log("✅ Serveur IA (OpenRouter) lancé sur http://localhost:3000")
})