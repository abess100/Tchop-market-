const produit = require("../models/produitModel");
const express = require("express");
const router = express.Router();
const isauth = require("../middleware/authMiddleware");

// Get tous les produits
router.get("/", async (req, res) => {
  try {
    const produitList = await produit.find();
    res.status(200).send({
      message: "liste de tous les produits ",
      produitList,
    });
  } catch {
    console.log(err);
    res.status(500).send("Erreur lors de la récupération des produits");
  }
});

// Get un  produit
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const produitDetail = await produit.findById(id);
    // validation des données
    if (!produitDetail) {
      return res.status(404).send({ message: "Produit non trouvé" });
    }
    res.status(200).send({ message: "produit trouvé", produitDetail });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).send({ message: "id invalid" });
    }
    res.status(500).send({
      message: "Erreur lors de la récupération du produit",
      error,
    });
  }
});

// ajouter un produit
router.post("/add", isauth, async (req, res) => {
  try {
    const {
      titre,
      description,
      categorie,
      prixPromotion,
      prixVente,
      stock,
    } = req.body;

    // validation
    if (!titre || !description || !prixPromotion || !prixVente || !stock) {
     return  res.status(400).send({
        message: "veuillez remplir tous les champs",
        titre, description, prixPromotion, prixVente, stock,
      });
    }
    
    const newproduit = new produit({
      titre ,
      description,
      prixVente,
      // categorie,
      prixPromotion,
      stock,
    });

    const savedProduit = await newproduit.save();
    
    return res.status(200).send({
      message: "produit ajouté avec succès",
      savedProduit,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Erreur lors de l'ajout du produit",
      error
    });
  }
});

// mettre à jour un produit
router.put("/:id", isauth, async (req, res) => {
  try {
    const productId = req.params.id;
    // recherche produit
    const product = await produit.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
  
    const {
      titre,
      description,
      categorie,
      prixPromotion,
      prixVente,
      stock,
    } = req.body;
    // validation
    if(titre) product.titre = titre;
    if(description) product.description = description;
    if(prixPromotion) product.prixPromotion = prixPromotion;
    if(prixVente) product.prixVente = prixVente;
    if(stock) product.stock = stock;
    if(categorie) product.categorie = categorie;
    await product.save();
    res.status(200).send({
      message:"Détail du produit mis à jour "});
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        "Une erreur est survenue lors de la mise à jour des informations de l'produit",
    });
  }
});

// update product image
router.put("/image/:id", isauth, async (req, res) => {
  res.send("image upload success");
})

// supprimer un produit
router.delete("/:id", isauth, async (req, res) => {
  try {
    const ProduitId = req.params.id;
    
    // recherche produit 
    const Produitdelete = await produit.findById(ProduitId);
    if (!Produitdelete) {
      return res.status(404).send({ message: "Produit non trouvé" });
    }

    // suppression du produit
    await produit.findByIdAndDelete(ProduitId);
    res.status(200).send("le prod uit a été supprimé avec succès");
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).send({ message: "id invalid" });
    }
    res.status(500).send({ message: "il y a une erreur lors de la suppression du produit! veuillez recommencer", err });
  }
});

module.exports = router;
