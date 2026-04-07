<template>

<div>

<h2>Révélation</h2>

<p v-if="loading">Chargement...</p>

<div v-if="!loading">

<h3>{{ currentPlayer }}</h3>

<div @click="flipCard">

<p v-if="!flipped">Clique</p>
<p v-if="flipped">{{ currentWord }}</p>

</div>

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

methods:{

async generateWords(){

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

let mrWhiteIndex = useMrWhite 
? Math.floor(Math.random()*this.players.length)
: -1

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