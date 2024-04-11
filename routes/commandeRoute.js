const commande = require("../models/commandeModel");
const express = require("express");
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

// selec tous les commande
router.get("/", async (req, res) => {
  const commande = await commande.find();

  if (!commande) 
  return res.status(400).send("Pas de commande ");

  res.send(produitList);
});


// select une commande
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await commande.findById(id);
  res.status(200).send(user);
});


// ajouter un commande
router.post("/add/delta", async (req, res) => {
  const commandes = new commande({
    userId: req.body.userId,
    produit:  [
      {
        produitId: req.body.produitId,
        quantite: req.body.quantite,
      }, 
    ],
    montant : req.body.montant,
    status : req.body.status
  });
  res.render('file',{commandes})
 
});


router.post("/add", async (req, res) => {
  const commandes = new commande(req.body);
  try {
    
      const newCommande= await  commandes.save();
      if (!newCommande) {
        return res.send("le commande n'a pas été ajouté ");
        }
    return res.status(200).json(newCommande);
    // return res.render('resp')

    
  }catch(err) {

    console.log(err);
  }
});


// mettre à jour un commande
router.put("/update/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const updateCommande = await commande.findByIdAndUpdate(id, req.body);
    res.status(200).json(updateCommande);
  } catch(err) {
    res.status(500).json({ message: err });
  }
});


// supprimer un commande
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteCommande = await commande.findByIdAndDelete(id);
    res.status(200).send("le commande a été supprimé");
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
