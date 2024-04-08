const produit = require("../models/produitModel");
const express = require("express");
const router = express.Router();
const multer = require("multer");

// const verifyToken = require('../middleware/verifyToken');
const FILE_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if(isValid) return uploadError = null;
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, file.fieldname + "-" + Date.now().extension);
  },
});

const uploadOption = multer({ storage: storage });

const upload = multer({ storage: storage });

// selec tous les produits
router.get("/", async (req, res) => {
  const produitList = await produit.find();
  if (!produitList) return res.status(400).send("Pas de produit ");
  res.send(produitList);
});

// select one produit
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await produit.findById(id);
  res.status(200).send(user);
});

// ajouter un produit
router.post("/add", uploadOption.single("image"), async (req, res) => {
  const fileName = req.file.filename;
  const basepath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  const newproduit = new produit(req.body, { image: `${basepath}${fileName}` });
 
  try {
    const Produits = await newproduit.save();
    if (!produit) return res.send("le produit n'a pas été ajouté ");
    
    res.status(200).json(Produits);
  } catch (err) {
    console.log(err);
  }
});

// mettre à jour un produit
router.put("/update/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const updateproduits = await produit.findByIdAndUpdate(id, req.body);
    res.status(200).json("le produit a été mis à jour");
  } catch {
    res.status(500).json({ message: err });
  }
});

// supprimer un produit
router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deleteproduits = await produit.findByIdAndDelete(id);
    res.status(200).send("le produit a été supprimé");
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
