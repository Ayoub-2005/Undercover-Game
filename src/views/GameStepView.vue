<template>

<div>

<h2>Phase du jeu</h2>

<p>
Chaque joueur doit donner un indice (3 tours).
</p>

<p>
Ensuite débattez et votez pour trouver l'Undercover.
</p>

<button @click="restart">
Nouvelle manche
</button>

<button @click="goLobby">
Modifier joueurs
</button>

</div>

</template>

<script>

export default{

methods:{

restart(){
this.$router.push("/reveal")
},

goLobby(){
this.$router.push("/lobby")
}

}

}

</script>