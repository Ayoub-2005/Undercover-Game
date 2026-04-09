<template>
<div class="container">

<h2>Révélation</h2>

<p v-if="loading">Chargement...</p>

<div v-if="!loading">

<!-- 🔥 NOM DU JOUEUR -->
<h3 class="player-name">
{{ currentPlayer }}
</h3>

<!-- 🎴 CARTE -->
<div 
class="card" 
:class="{ flipped: flipped }"
@click="flipCard"
>

<div class="card-inner">

<div class="card-front">
Clique pour voir
</div>

<div class="card-back">
{{ currentWord }}
</div>

</div>

</div>

<!-- 🔥 BOUTON -->
<button v-if="flipped" @click="next">
Suivant
</button>

</div>

</div>
</template>

<script>

export default{

data(){
return{
players:[],
words:[],
currentIndex:0,
flipped:false,
loading:true
}
},

computed:{
currentPlayer(){
return this.players[this.currentIndex]
},
currentWord(){
return this.words[this.currentIndex] || ""
}
},

// 🔥 AJOUT IMPORTANT
watch:{
'$route'(){
this.resetGame()
}
},

methods:{

// 🔥 RESET COMPLET
resetGame(){
this.currentIndex = 0
this.flipped = false
this.generateWords()
},

async generateWords(){

console.log("API appelée")

this.loading = true

const themes = ["animaux","films","villes","anime","nourriture"]
const theme = themes[Math.floor(Math.random()*themes.length)]

try {

const response = await fetch("http://localhost:3000/generate-word", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ theme })
})

const data = await response.json()

console.log("Mots IA :", data)

const normal = data.normal || "chat"
const undercover = data.undercover || "chien"

const nbUndercover = parseInt(localStorage.getItem("nbUndercover")) || 1
const useMrWhite = localStorage.getItem("useMrWhite") === "true"

let undercoverIndexes = []

while(undercoverIndexes.length < nbUndercover){
let r = Math.floor(Math.random()*this.players.length)
if(!undercoverIndexes.includes(r)){
undercoverIndexes.push(r)
}
}

// 🔥 éviter que Mr White soit aussi undercover
let mrWhiteIndex = -1
if(useMrWhite){
do{
mrWhiteIndex = Math.floor(Math.random()*this.players.length)
}while(undercoverIndexes.includes(mrWhiteIndex))
}

// distribution
this.words = this.players.map((p,i)=>{

if(i === mrWhiteIndex) return "Mr White"
if(undercoverIndexes.includes(i)) return undercover
return normal

})

} catch (error) {

console.error("Erreur API :", error)

this.words = this.players.map(()=> "mot")

}

this.loading = false
},

flipCard(){
this.flipped = true
},

next(){

this.flipped = false
this.currentIndex++

if(this.currentIndex >= this.players.length){
this.$router.push("/step")
}

}

},

mounted(){

this.players = JSON.parse(localStorage.getItem("players")) || []
this.generateWords()

}

}

</script>