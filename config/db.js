const mongoose  = require('mongoose')

mongoose.connect('mongodb://localhost:27017/tchopmarket')
.then(()=> console.log('connection réussie'))
.catch((err)=> {
    return console.log(err)
})