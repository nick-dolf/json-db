const PuffCheeks = require('./puff-cheeks')

const chipmunks = new PuffCheeks('chipmunks', "name")

chipmunks.add({name:"alvin"})
chipmunks.add({name:"theodore"})
chipmunks.add({name:"simon"})
chipmunks.add({name:"dave"})
chipmunks.delete({name:"dave"})

chipmunks.sortByKey(["alvin", "simon", "theodore"])
console.log(chipmunks.data)
