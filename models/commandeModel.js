const mongoose = require("mongoose");

const commandeschema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
         type: String, 
         required: true 
    },
      city: { 
        type: String, 
        required: true
     },
      phoneNumber: { 
        type: Number, 
        required: true 
      },
    },
    Listproduit:  [
      {
        nom: { 
          type: String ,
          required: true,
        },
        prix: { 
          type: Number,
          required: true,
        },
        quantite: { 
          type: Number, 
          required: true,
          default: 1 
        },
        image: {
          type: String, 
          require: true,
        },
        produitID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "produit",
          required: true,
        },
      }, 
    ],
     
    prixProduit: {
      type: Number,
      required: true,
    },
    montantTotal : {
      type: Number,
      required: true,
    },
    statusCommance : {
      type: String,
      enum: [
        "en attente",
        "livré",
        "annulé",
      ],
      default: "en attente",
    },
    dateLivraison : Date,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("commande", commandeschema);
