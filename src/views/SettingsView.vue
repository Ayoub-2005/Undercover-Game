<template>
<div>

<h2>Paramètres</h2>

<label>Undercover :</label>
<input type="number" v-model="nbUndercover">

<br><br>

<label>Mr White :</label>
<input type="checkbox" v-model="useMrWhite">

<br><br>

<button @click="save">
Valider
</button>

</div>
</template>

<script>
export default{

data(){
return{
nbUndercover:1,
useMrWhite:false
}
},

methods:{
save(){

localStorage.setItem("nbUndercover", this.nbUndercover)
localStorage.setItem("useMrWhite", this.useMrWhite)

this.$router.push("/lobby")

}
}

}
</script>