const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, "veuillez saisir votre nom"],
      
    },
    prenom : {
      type: String,

    },
    email: {
      type: String,
      required: [true, "veuillez saisir votre email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "veuillez saisir votre mot de passe"],

    },
    photo:{
      public_id: String,
      url: String,

    },
    points: {
      type: String,
      default: 1,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
