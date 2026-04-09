const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

// 🔥 fallback (sécurité)
const fallbackWords = [
{normal:"chat", undercover:"chien"},
{normal:"lion", undercover:"tigre"},
{normal:"pizza", undercover:"burger"},
{normal:"Paris", undercover:"Londres"},
{normal:"Naruto", undercover:"Sasuke"}
]

app.post("/generate-word", async (req, res) => {

const { theme } = req.body

try {

console.log("Appel IA avec thème :", theme)

const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
method: "POST",
headers: {
"Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
"Content-Type": "application/json"
},
body: JSON.stringify({
model: "openai/gpt-3.5-turbo",
messages: [
{
role: "system",
content: "Tu génères des mots pour un jeu Undercover."
},
{
role: "user",
content: `Donne 2 mots proches mais différents sur le thème "${theme}".
Répond UNIQUEMENT en JSON :
{"normal":"mot","undercover":"mot proche"}`
}
]
})
})

const data = await response.json()

console.log("Réponse IA :", data)

// 🔥 sécurité
if(!data.choices || !data.choices[0]){
throw new Error("Pas de réponse IA")
}

const text = data.choices[0].message.content

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

console.log("⚠️ Erreur IA → fallback :", error.message)

const random = fallbackWords[Math.floor(Math.random()*fallbackWords.length)]

res.json({
normal: random.normal,
undercover: random.undercover
})

}

})

app.listen(3000, () => {
console.log("✅ Serveur IA (OpenRouter) lancé sur http://localhost:3000")
})