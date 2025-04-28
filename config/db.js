const mongoose  = require('mongoose')


const connectDB = async () => { 
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(()=> console.log('connection à la base de donnée a réussie'))
    } catch (error) {
        console.log('connection à la base de donnée a échouée', error.message);
        process.exit(1)
        
    }
}

module.exports = connectDB