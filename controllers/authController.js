const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userCtrl = {

  // resgister
  register: async (req, res) => {
    try {
      const { nom, email, password } = req.body;
      if (!nom || !email || !password) {
        return res.status(400).send("remplir tous les champs");
      }

      const userexist = await User.findOne({ email: email });
      if (userexist) {
        return res.status(400).send("l'utilisateur existe");
      }

      const passwordhash = await bcrypt.hash(password, 10);
      const newUser = new User({
        nom,
        email,
        password: passwordhash,
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
      const user = await User.findOne({ email: email });

      if (!user) return res.status(400).send(" user n'existe pas");

      const comparepwd = await bcrypt.compare(password, user.password);

      if (!comparepwd) return res.status(400).send("mot de passe incorrect");

      if (comparepwd) {
        const token = jwt.sign(
          { userId: user.id, isAdmin: user.isAdmin },
          process.env.JWT_SECRET,
          { expiresIn: "3d" }
        );
        return res.json({ user, token: token });
        console.log(token);
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

module.exports = userCtrl;
