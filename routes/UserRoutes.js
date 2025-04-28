const express = require("express");
const router = express.Router();
const UserCtrl = require("../controllers/authController");
const User = require("../models/userModel");
const  isAuth  = require("../middleware/authMiddleware");
const userCtrl = require("../controllers/authController");

router.get("/all", async (req, res) => {
  const users = await  User.find();
  if (!users) return res.status(404).send("aucun utilisateur trouvé")
  res.send({massage:"les usersu",users});
});
// register
router.post("/register", UserCtrl.register);

// login
router.post("/login", UserCtrl.login);

// déconnexion
router.get("/logout", UserCtrl.logout);

// profile User
router.get("/profile",isAuth, async (req, res) => {
  const id = req.user._id;
  const user = await  User.findById(id);
  res.status(200).send({message:"vous êtes connecté",user});

})

// update user profile
router.put("/update/",isAuth, userCtrl.updateUser);
// update user password 
router.put("/updatePassword",isAuth, userCtrl.updatePassword);

// delete

router.delete("/delete/:id", userCtrl.deleteUser);

// update user profile image


module.exports = router;
