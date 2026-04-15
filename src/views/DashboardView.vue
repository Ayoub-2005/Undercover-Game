<template>
<div class="page">

<h2>Résultat de la partie</h2>

<!-- 🔥 TABLEAU -->
<table>

<tr>
<th>Joueur</th>
<th>Rôle</th>
<th>Mot</th>
</tr>

<tr v-for="(player, index) in players" :key="player">
<td>{{ player }}</td>
<td>{{ roles[index] }}</td>
<td>{{ words[player] }}</td>
</tr>

</table>

<!-- 🔥 BOUTONS -->
<div class="buttons">

<button @click="restart">
Nouvelle partie
</button>

<button @click="goLobby">
Retour au lobby
</button>

</div>

</div>
</template>

<script>
export default {

data(){
return{

players:[],
roles:[],
words:[]

}
},

methods:{

// 🔁 relancer partie
restart(){

localStorage.clear()

this.$router.push("/reveal")

},

// 🔙 retour lobby
goLobby(){

this.$router.push("/lobby")

}

},

mounted(){

// 🔥 récupération données
this.players = JSON.parse(localStorage.getItem("players")) || []

this.roles = JSON.parse(localStorage.getItem("roles")) || []

this.words = JSON.parse(localStorage.getItem("wordsReveal")) || []

}

}
</script>