const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

const API_KEY = process.env.GEMINI_API_KEY

// 🔥 fetch compatible
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

// 🔥 fallback
const fallbackWords = [
{normal:"chat", undercover:"chien"},
{normal:"lion", undercover:"tigre"},
{normal:"pomme", undercover:"poire"},
{normal:"paris", undercover:"londres"},
{normal:"coca", undercover:"pepsi"},
{normal:"naruto", undercover:"luffy"}
]

app.post("/generate-word", async (req, res) => {

const { theme } = req.body

try {

console.log("Requête Gemini avec thème :", theme)

// ✅ MODÈLE CORRIGÉ
const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
contents: [
{
parts: [
{
text: `Donne 2 mots proches sur le thème "${theme}".
Répond UNIQUEMENT en JSON :
{"normal":"mot","undercover":"mot proche"}`
}
]
}
]
})
}
)

const data = await response.json()

console.log("Réponse Gemini complète :", data)

// 🔥 sécurité
if(!data.candidates || !data.candidates[0]){
throw new Error("Pas de réponse Gemini")
}

const text = data.candidates[0].content.parts[0].text

console.log("Texte IA :", text)

// 🔥 nettoyage
const cleaned = text.replace(/```json|```/g, "").trim()

let result

try {
result = JSON.parse(cleaned)
} catch {
throw new Error("JSON invalide")
}

res.json({
normal: result.normal,
undercover: result.undercover
})

} catch (error) {

console.log("⚠️ Erreur Gemini → fallback :", error.message)

const random = fallbackWords[Math.floor(Math.random()*fallbackWords.length)]

res.json({
normal: random.normal,
undercover: random.undercover
})

}

})

app.listen(3000, () => {
console.log("✅ Serveur Gemini lancé sur http://localhost:3000")
})