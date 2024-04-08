const cart = require("../models/cartModel");
const express = require("express");
const router = express.Router();

// const verifyToken = require("../middleware/verifyToken");

// selec tous les cart
router.get("/", async (req, res) => {
  try {
    const allcart = await cart.find();
    if (!allcart) return res.status(400).send("Pas de cart ");

    res.send(allcart);
  } catch {
    res.status(500).send(err);
  }
});

// select one cart
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const oneCart = await cart.findById(id);
    res.status(200).send(user);
  } catch {
    res.status(500).send(err);
  }
});

// select cart pour un utilisateur
router.get("/:userId", async (req, res) => {
  const id = req.params.userId;
  const oneCart = await cart.findById(id);
  res.status(200).send(user);
});

// ajouter un cart
router.post("/add", async (req, res) => {
  const newcart = new cart(req.body);
  try {
    const carts = await newcart.save();
    // if (!newcart) return res.send("le cart n'a pas été ajouté ");
    res.status(200).json(newcart);
  } catch (err) {
    console.log(err);
  }
});

// mettre à jour un cart
router.put("/update/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const updateCart = await cart.findByIdAndUpdate(id, req.body);
    res.status(200).json("le cart a été mis à jour");
  } catch {
    res.status(500).json({ message: err });
  }
});

// supprimer un cart
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteCart = await cart.findByIdAndDelete(id);
    res.status(200).send("le cart a été supprimé");
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
