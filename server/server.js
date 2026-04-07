const express = require("express")
const cors = require("cors")
require("dotenv").config()
const OpenAI = require("openai")

const app = express()

app.use(cors())
app.use(express.json())

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
})

// ROUTE IA
app.post("/generate-word", async (req, res) => {

const { theme } = req.body

try {

const completion = await openai.chat.completions.create({
model: "gpt-4.1-mini",
messages: [
{
role: "system",
content: "Répond uniquement en JSON : {\"normal\":\"mot\",\"undercover\":\"mot proche\"}"
},
{
role: "user",
content: `Donne un mot normal et un mot undercover sur le thème : ${theme}`
}
]
})

const text = completion.choices[0].message.content

// 🔥 transformation JSON sécurisée
let data

try {
data = JSON.parse(text)
} catch {
data = { normal: "chat", undercover: "chien" }
}

res.json({
normal: data.normal,
undercover: data.undercover
})

} catch (error) {

console.error("Erreur OpenAI:", error)

// fallback
res.json({
normal: "chat",
undercover: "chien"
})

}

})

app.listen(3000, () => {
console.log("✅ Serveur lancé sur http://localhost:3000")
})