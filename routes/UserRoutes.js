const express = require("express");
const router = express.Router();
const UserCtrl = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');
const User = require("../models/userModel");
const verifyJWTandAuthorization = require("../middleware/verifyToken");
// register

// tous les utilisateurs
router.get('/all', async (req, res) => {
    const userlist = await User.find();
    res.send(userlist);
  })

// un seul utilisateur
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).send(user);
})

// register
router.post("/register", UserCtrl.register);

// login
router.post("/login", UserCtrl.login);

// update
router.put('/update/:id', verifyToken.verifyToken, async (req, res) => {
 
    const id = req.params.id;
  const passwordhash = await bcrypt.hash(req.body.password, 10);
 
  if(req.body.password){
    req.body.password = passwordhash
  }  

  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body);
    res.status(200).json(updateUser);
  } catch {
    res.status(500).json({ message: err });
  }
},)

// delete
  
router.delete('/delete/:id', verifyToken.verifyJWTandAuthorization, async (req, res) => {
   
    const id = req.params.id;
    try {
      const user = await User.findByIdAndDelete(id);
      res.status(200).send('l\'utilisateur a été supprimé');
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
)


module.exports = router;
