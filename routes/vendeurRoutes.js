const express = require("express");
const router = express.Router();
const UserCtrl = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');
const Vendeur = require("../models/adminModel");


// tous les utilisateurs
router.get('/all', async (req, res) => {
    const Vendeurlist = await Vendeur.find();
    res.send(userlist);
  })

// un seul utilisateur
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await Vendeur.findById(id);
    res.status(200).send(Vendeur);
})

// register
router.post("/register", VendeurCtrl.register);

// login
router.post("/login", VendeurCtrl.login);

// update
router.put('/update/:id', async (req, res) => {
 
    const id = req.params.id;
  const passwordhash = await bcrypt.hash(req.body.password, 10);
 
  if(req.body.password){
    req.body.password = passwordhash
  }  

  try {
    const updateVendeur = await Vendeur.findByIdAndUpdate(id, req.body);
    res.status(200).json(updateUser);
  } catch {
    res.status(500).json({ message: err });
  }
},)

// delete 
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const vendeur = await Vendeur.findByIdAndDelete(id);
      res.status(200).send('l\'utilisateur a été supprimé');
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
)


module.exports = router;
