const commande = require("../models/commandeModel");
const express = require("express");
const router = express.Router();
const produits = require("../models/produitModel");


// selec tous les commande
router.get("/",  async (req, res) => {
  const commandes = await commande.find();

  if (!commandes) return res.status(400).send("Pas de commande ");
  if (req.session.UserId) {
    res.render("file", { commandes });
  }
  res.render("connexion");
  // res.send(produitList);
});

// select une commande
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await commande.findById(id);
  res.status(200).send(user);
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

    // créer une nouvelle commande
    await commande.create({
      user: req.user.id,
      shippingInfo, 
      Listproduit, 
      prixProduit,
      montantTotal,
    })

    // mettre à jour le stock de produit
    for (let i = 0; i < Listproduit.length; i++) {
      // cherche produit 
      const produit = await produits.findById(Listproduit[i].produit);
      produit.stock -= Listproduit[i].quantite;
      await produit.save();
    }
    
    res.status(200).send("la commande validée avec succès");
    

  }catch(err){
    res.status(500).send({message:'une erreur est survenue', err}) 
  }
});

router.post("/add", async (req, res) => {
  const commandes = new commande(req.body);
  try {
    const newCommande = await commandes.save();
    if (!newCommande) {
      return res.send("le commande n'a pas été ajouté ");
    }
    return res.status(200).json(newCommande);
    // return res.render('resp')
  } catch (err) {
    console.log(err);
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
