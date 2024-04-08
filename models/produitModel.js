const mongoose = require("mongoose");
const produitschema = new mongoose.Schema(
  {
    titre: { type: String, require: true, unique: true },
    description: { type: String},
    image: { type: String },
    catégories: { type: Array },
    prixInit: { type: Number, require: true},
    prixréduit: { type:Number, require: true},
    stock: { type: Number, require : true} 
  },
  { timestamps: true }
);

module.exports = mongoose.model("produit", produitschema)