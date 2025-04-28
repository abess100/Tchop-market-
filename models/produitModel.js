const mongoose = require("mongoose");
const produitschema = new mongoose.Schema(
  {
    titre: { 
      type: String, 
      require: [true, "le nom du produit est obligatoire"], 
     },
    description: { 
      type: String, 
      require: [true, "la description du produit est obligatoire"] 
    },
    image: {
      type: [String ]
    },
    categorie: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "categorie",
       default: "undefined",
      },
    prixVente: {
       type: Number, 
       require: [true , "le prix de vente est obligatoire"],
      },
    prixPromotion: { 
      type: Number, 
      require:[ true , "le prix promotionnel est obligatoire"],
    },
    stock: { 
      type: Number, 
      require: [true , "le stock du produit est obligatoire"]
    },
    quantity: { 
      type: Number, 
      require: [true , "la quantité du produit est obligatoire"]
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("produit", produitschema);
