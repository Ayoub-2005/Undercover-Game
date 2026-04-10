export function validateGame(players, nbUndercover, useMrWhite){

// minimum joueurs
if(players.length < 3){
return false
}

// règle undercover
if(nbUndercover >= (players.length - 1) / 2){
return false
}

// Mr White (optionnel)
return true
}


// 🔥 distribution des rôles (testable)
export function assignRoles(players, nbUndercover, useMrWhite){

let undercoverIndexes = []

while(undercoverIndexes.length < nbUndercover){
let r = Math.floor(Math.random()*players.length)
if(!undercoverIndexes.includes(r)){
undercoverIndexes.push(r)
}
}

let mrWhiteIndex = -1

if(useMrWhite){
do{
mrWhiteIndex = Math.floor(Math.random()*players.length)
}while(undercoverIndexes.includes(mrWhiteIndex))
}

return players.map((p,i)=>{

if(i === mrWhiteIndex) return "mrwhite"
if(undercoverIndexes.includes(i)) return "undercover"
return "normal"

})

}