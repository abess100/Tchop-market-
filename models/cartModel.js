const mongoose = require("mongoose");

const CartShema = new mongoose.Schema(
  {
    userId: { type: String, require: true, unique: true },
    produits: [
      {
        produitId: { type: String },
        quantité: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartShema);

