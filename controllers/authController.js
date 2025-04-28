const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getDataUri = require("../middleware/datauri");

const userCtrl = {
  // resgister
  register: async (req, res) => {
    try {
      // vérification de l'utilisateur
      const { nom, email, password } = req.body;
      if (!req.body) {
        return res.status(400).send("remplir tous les champs");
      }

      const userexist = await User.findOne({ email: email });
      if (userexist) {
        return res.status(400).send("adresse email deja existant");
      }

      if (password.length < 8) {
        return res
          .status(400)
          .send("le mot de passe doit avoir au moins 8 caractères");
      }

      // créer l'utilisateur
      const passwordhash = await bcrypt.hash(password, 10);
      const newUser = new User({
        nom,
        email,
        password: passwordhash,
      });
      const use = await newUser.save();
      res.send("utilisateur crée avec succès ");

      if (!use) {
        return res.statut(400).send("l'utilisateur n'a pas été crée");
      }
    } catch (error) {
      res.status(500).send({ message: "Veuillez réessayer" });
    }
  },

  // login
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // validation de l'utilisateur
      if (!req.body) {
        return res.status(400).send("veuillez remplir tous les champs");
      }

      // check de l'utilisateur
      const user = await User.findOne({ email: email });

      if (!user) return res.status(400).send(" l'addresse email n'existe pas");

      // verifier le mot de passe
      const comparepwd = await bcrypt.compare(password, user.password);

      if (!comparepwd) {
        return res.status(400).send({ message: "mot de passe incorrect" });
      }

      // générer le token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(200)
      .cookie("token", token, {
        secure : process.env.NODE_ENV === "developperment" ? true: false,
        httpOnly : process.env.NODE_ENV === "developperment" ? true: false,
        expire: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      })
      .send({
        message: "connexion réussie",
        token,
        user,
      });
    } catch (err) {
      res.status(500).send({message:"connexion echouée",err});
    }
  },

  // logout
  logout : async (req, res) => {
    try {
      res.clearCookie("token").send("vous êtes déconnecté avec succès");
    } catch (err) {
      res.status(500).send({message:"deconnexion echouée",err});
    }
  },

  // update user password
  updatePassword : async (req, res) => {
    try {
      const id = req.user._id;
      const user = await User.findById(id);
      const { lastpassword, newpassword } = req.body; 
      // validation
      if (!req.body) {
        return res.status(400).send({message:"veuillez remplir tous les champs"});
      } 
      const ismatch = await bcrypt.compare(lastpassword, user.password);
      if (!ismatch) {
        return res.status(400).send({message:"mot de passe incorrect"});
      }
      user.password = await bcrypt.hash(newpassword, 10);
      await user.save();
      res.status(200).send({message:"votre mot de passe a été mis à jour avec succès"});

    } catch {
      res.status(500).json({ message:"Il y a eu un problème, veuillez réessayer ", err });
    }
  },
  // update user profile
  updateUser : async (req, res) => {
    try {
      
      if (!req.user || !req.user._id) {
        
        return res.status(400).send({message:"l'utilisateur n'existe pas"});
      }
      
      const user  = await User.findById(req.user._id);
      
      const { nom, email} = req.body;
      
     // Validation et mise à jour des champs
    if (nom) user.nom = nom;
    if (email) user.email = email;
  
    // Sauvegardez les modifications
     await user.save();         
    res.status(200).send({message:"votre profil a été mis à jour avec succès"});  
    } catch (error) {
      res.status(500).send({ message: "Il y a eu un problème, veuillez réessayer ", error });
      
    }
  },


  // update user profile image
  updatePassword:  async (req, res) => {
    try {
      const id = req.user._id;
      const user = await User.findById(id);
      const file = getDataUri(req.file)
      
    } catch (error) {
      res.status(500).send({ 
        message: "Erreur lors de la mise à jour de l'image de profil", 
        error });
    }
  },

  // delete user
  deleteUser :  async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.findByIdAndDelete(id);
      res.status(200).send("l'utilisateur a été supprimé");
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
  
};



module.exports = userCtrl;
