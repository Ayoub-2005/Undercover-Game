<template>
<div class="page">

<h2>Phase des indices</h2>

<!-- 🔥 affichage du tour -->
<p>Tour {{ currentRound }} / 3</p>

<!-- 🔥 joueur actuel -->
<h3 v-if="players.length > 0">
Tour de : {{ currentPlayer }}
</h3>

<!-- 🔥 sécurité -->
<p v-else>Aucun joueur</p>

<!-- 🔥 input -->
<input 
v-model="currentWord" 
placeholder="Entre ton indice"
/>

<!-- 🔥 bouton -->
<button @click="addWord" :disabled="currentRound > 3">
Valider
</button>

<!-- 🔥 message fin -->
<p v-if="currentRound > 3">
Tous les tours sont terminés Ensuite débattez et votez pour trouver l'Undercover !
</p>

<!-- 🔥 tableau -->
<table>

<tr>
<th>Joueur</th>
<th v-for="n in 3" :key="n">Tour {{ n }}</th>
</tr>

<tr v-for="player in players" :key="player">
<td>{{ player }}</td>

<td v-for="n in 3" :key="n">
{{ getWord(player, n-1) }}
</td>

</tr>

</table>

<!-- 🔥 boutons navigation -->
<div class="buttons">

<button @click="restart">
Nouvelle partie
</button>

<button @click="goLobby">
Retour au lobby
</button>

<button @click="goDashboard">
Voir les résultats
</button>


</div>

</div>
</template>

<script>
export default {

data(){
return{

// 🔥 liste des joueurs
players:[],

// 🔥 index du joueur actuel
currentIndex:0,

// 🔥 numéro du tour
currentRound:1,

// 🔥 mot saisi
currentWord:"",

// 🔥 stockage des mots
words:{}

}
},

computed:{

// 🔥 joueur actuel
currentPlayer(){

if(this.players.length === 0) return ""

return this.players[this.currentIndex]

}

},

methods:{

// 🔥 ajouter un mot
addWord(){

// ❌ bloque après 3 tours
if(this.currentRound > 3) return

// ❌ bloque si vide
if(this.currentWord === "") return

const player = this.currentPlayer

// 🔥 créer tableau si pas existant
if(!this.words[player]){
this.words[player] = []
}

// 🔥 ajouter mot
this.words[player].push(this.currentWord)

// 🔄 reset input
this.currentWord = ""

// 🔄 joueur suivant
this.currentIndex++

// 🔁 si tous les joueurs ont joué → tour suivant
if(this.currentIndex >= this.players.length){
this.currentIndex = 0
this.currentRound++
}

// 💾 sauvegarde
localStorage.setItem("words", JSON.stringify(this.words))

},

// 🔥 récupérer mot pour tableau
getWord(player, index){

return this.words[player]?.[index] || ""

},

// 🔁 relancer partie
restart(){

localStorage.removeItem("words")

this.$router.push("/reveal")

},

// 🔙 retour lobby
goLobby(){

this.$router.push("/lobby")

},
goDashboard(){
this.$router.push("/dashboard")
}

},


mounted(){

// 🔥 récupérer joueurs depuis localStorage
const savedPlayers = JSON.parse(localStorage.getItem("players"))

// 🔥 sécurité
if(savedPlayers && savedPlayers.length > 0){
this.players = savedPlayers
}else{
this.players = []
console.warn("Aucun joueur trouvé")
}

}

}
</script>