const mongoose = require("mongoose");
const produitschema = new mongoose.Schema(
  {
    titre: { 
      type: String, 
      require: true, 
     },
    desc: { 
      type: String, 
      require: true 
    },
    image: {
      type: String 
    },
    category: {
       type: String
      },
    prixinit: {
       type: Number, require: true 
      },
    prixreduit: { 
      type: Number, require: true 
    },
    stock: { 
      type: Number, 
      require: true 
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("produit", produitschema);
