const admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const adminCtrl = {

  // resgister
  register: async (req, res) => {
    try {
      const { nom, email, password, address} = req.body;
      if (!req.body) {
        return res.status(400).send("remplir tous les champs");
      }

      const userexist = await admin.findOne({ email: email });
      if (userexist) {
        return res.status(400).send("l'utilisateur existe");
      }

      //vérify mot de passe
      if(password.length < 8){
        return res.status(400).send("le mot de passe doit avoir au moins 8 caractères");
      }

      const passwordhash = await bcrypt.hash(password, 10);
      const newUser = new admin({
        nom,
        email,
        // password: passwordhash,
        address
      });
      const use = await newUser.save();

      if (!newUser)
        return res.statut(400).send("l'utilisateur n'a pas été crée");

      return res.json(newUser);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },

  // login
  login: async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const user = await admin.findOne({ email: email });

      if (!user) return res.status(400).send(" user n'existe pas");

      const comparepwd = await bcrypt.compare(password, user.password);

      if (!comparepwd){
        return res.status(400).json("mot de passe incorrect");
        // return res.render('inscriptionUser')
      }

      if (comparepwd) {
        const token = jwt.sign(
          { userId: user.id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET,
          { expiresIn: "3d" } 
        );
        // return res.json({ user, token });
        // console.log(token);
        req.session.UserId = user._id
        return res.render('admin')
      }
    } catch (err) {
      res.status(500).send(err);
    }
    
   
  },
};

module.exports = adminCtrl;
