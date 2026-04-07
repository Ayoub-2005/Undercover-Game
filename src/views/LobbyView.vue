<template>
<div>

<h2>Lobby</h2>

<input v-model="name" placeholder="Nom">

<button @click="add">Ajouter</button>

<ul>
<li v-for="(p,i) in players" :key="i">
{{ p }}
<button @click="remove(i)">X</button>
</li>
</ul>

<button @click="start">Lancer</button>

<br><br>

<button @click="$router.push('/settings')">
Paramètres
</button>

</div>
</template>

<script>
export default{

data(){
return{
name:"",
players:[]
}
},

methods:{

add(){
if(this.name){
this.players.push(this.name)
localStorage.setItem("players", JSON.stringify(this.players))
this.name=""
}
},

remove(i){
this.players.splice(i,1)
localStorage.setItem("players", JSON.stringify(this.players))
},

start(){

if(this.players.length < 3){
alert("Minimum 3 joueurs")
return
}

this.$router.push("/reveal")

}

},

mounted(){
this.players = JSON.parse(localStorage.getItem("players")) || []
}

}
</script>