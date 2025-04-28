const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "le nom de la catégorie est obligatoire"],
    },
   
  },
  { timestamps: true }
);

module.exports = mongoose.model("category", categorySchema);