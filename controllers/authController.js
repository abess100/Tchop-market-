const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {

  // resgister
  register: async (req, res) => {
    try {
      const { nom, email, password } = req.body;
      if (!req.body) {
        return res.status(400).send("remplir tous les champs");
      }

      const userexist = await User.findOne({ email: email });
      if (userexist) {
        return res.status(400).send("l'utilisateur existe");
      }

      //vérify mot de passe
      if(password.length < 8){
        return res.status(400).send("le mot de passe doit avoir au moins 8 caractères");
      }

      const passwordhash = await bcrypt.hash(password, 10);
      const newUser = new User({
        nom,
        email,
        password: passwordhash,
      });
      const use = await newUser.save();

      if (!use){
        return res.statut(400).send("l'utilisateur n'a pas été crée");
        return res.render('inscriptionUser')
      }

        req.session.UserId = use._id
      // return res.json(newUser);
        return res.render('detailsProduit')
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },

  // login
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email: email });

      if (!user) return res.status(400).send(" user n'existe pas");

      const comparepwd = await bcrypt.compare(password, user.password);

      if (!comparepwd){
        return res.status(400).send("mot de passe incorrect");
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
        return res.render('file')
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
  
};

module.exports = userCtrl;
