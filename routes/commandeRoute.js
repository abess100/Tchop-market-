const commande = require("../models/commandeModel");
const express = require("express");
const router = express.Router();
const produits = require("../models/produitModel");


// selec tous les commande
router.get("/",  async (req, res) => {
  try{
    const commandes = await commande.find({userId: req.user._id})
    if (!commandes || commandes.length === 0) return res.status(400).send("Pas de commande ");
    res.status(200).send({
      message:'la liste des commandes',
      totalCommande: commandes.length,
      commandes,
      });
  }catch(error){
    if (error.name === "CastError") {
      return res.status(400).send("id de commande invalide");
    }
    res.status(500).send({message:'une erreur est survenue', error}) 
  }
  
});

// selectionne un commande
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // recherche commande par id
    const commandeId = await commande.findById(id); 
    // validation
    if (!commandeId) return res.status(400).send("Pas de commande avec cet id ");       
    res.status(200).send({
      message:'la commande',
      commandeId,
      });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send("id de commande invalide");
    }
    res.status(500).send({message:'une erreur est survenue', error}) 
  } 
});

// ajouter un commande
router.post("/add", async (req, res) => {
  try{
    
    const {
      shippingInfo, 
      Listproduit, 
      prixProduit,
      montantTotal,

      } = req.body;

      // validation des données
    if (!shippingInfo || !Listproduit || !prixProduit || !montantTotal) {
      return res.status(400).send("veuillez remplir tous les champs");
    }

    const newCommande = new commande({
      shippingInfo,
      Listproduit,    
      prixProduit,
      montantTotal,   
      userId: req.user._id,
    });
    await newCommande.save();

    // mettre à jour le stock de produit
    for (let i = 0; i < Listproduit.length; i++) {
      // cherche produit 
      const produit = await produits.findById(Listproduit[i].produit);
      produit.stock -= Listproduit[i].quantite ;
      console.log(produit);
      await produit.save();
    }
    console.log("bonsoir");
    res.status(200).send("la commande validée avec succès");

  }catch(err){
    res.status(500).send({message:'une erreur est survenue', err}) 
  }
});

// mettre à jour un commande
router.put("/update/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const updateCommande = await commande.findByIdAndUpdate(id, req.body);
    res.status(200).json(updateCommande);
  } catch (err) {
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
