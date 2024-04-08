const mongoose = require('mongoose')
const CategorieSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})