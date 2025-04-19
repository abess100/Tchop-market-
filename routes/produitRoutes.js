const produit = require("../models/produitModel");
const express = require("express");
const router = express.Router();

const update = require("../controllers/upload");
const verify = require('../middleware/verifyToken')

// select tous les produits
router.get("/", async (req, res) => {
  // const produitList = await produit.find();
  // if (!produitList) return res.status(400).send("Pas de produit dans la liste");
  // // res.send(produitList);
  // res.render('market',{ produitList});
  res.send('Hello world')

});

// select one produit
router.get("/produit/:id", async (req, res) => {
  const id = req.params.id;
  const produitDetail = await produit.findById(id).sort({updatedAt: -1 });
  const pourcentage  = (produitDetail.prixInit - produitDetail.prixRéduit ) / produitDetail.prixInit * 100
  
  const quantity = req.body.quantity;

  // res.status(200).send(produitDetail);
  res.render('detailsProduit :',{ produitDetail, pourcentage, quantity});

});

// ajouter un produit
router.post("/produit/add", update.single("image"), async (req, res) => {
  const newproduit = new produit({
    titre: req.body.titre,
    desc: req.body.desc,
    image: "/data/uploads/" + req.file.filename,
    prixinit: req.body.prixinit,
    category: req.body.catégory,
    prixreduit: req.body.prixreduit,
    stock: req.body.stock,
  });

  if (req.file) {
    newproduit.image = "/data/uploads/" + req.file.filename;
  }

  try {
    const Produits = await newproduit.save();
    if (!Produits) return res.send(produit);

    // res.status(200).json(Produits);
    res.status(200).json(Produits);
  } catch (err) {
    console.log(err);
  }
});

// mettre à jour un produit
router.put("/produit/update/:id", update.single("image"), async (req, res) => {
const userId = req.params.id;
  const prod = await produit.findById(userId);
    try {
      
        const updateproduits = await produit.findByIdAndUpdate(
            userId,
            {
                $set: {
                    titre: req.body.titre,
                    description: req.body.description,
                    image: "/data/uploads/" + req.file.filename,
                    categories: req.body.catégories,
                    prixInit: req.body.prixInit,
                    prixRéduit: req.body.prixRéduit,
                    stock: req.body.stock,
                },
            },
            { new: true }
        );
               res.status(200).json(updateproduits);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour des informations de l\'produit' });
    }  
});

// supprimer un produit
router.delete("/produit/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteproduits = await produit.findByIdAndDelete(id);
    res.status(200).send("le produit a été supprimé");
  } catch (err) {
    res.status(500).json({ message: "l'erreur est : " + err });
  }
});



module.exports = router;
