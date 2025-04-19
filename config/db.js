const mongoose  = require('mongoose')

mongoose.connect(process.env.dbConnect)
.then(()=> console.log('connection à la base de donnée a réussie'))
.catch((err)=> {
    return console.log(err)
})