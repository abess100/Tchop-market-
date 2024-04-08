const mongoose = require("mongoose");
const commandeschema = new mongoose.Schema(
  {
    userId: { type: String, require: true, unique: true },
    produit:  [
      {
        produitId: { type: String },
        quantité: { type: Number, default: 1 },
      }, 
    ],
    montant : {type: Number },
    status : {type: String, default: "non livré"}
  },
  { timestamps: true }
);

module.exports = mongoose.model("commande", commandeschema);
