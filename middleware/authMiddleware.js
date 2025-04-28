const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


const isAuth = async (req, res, next) => {
  const { token } = req.cookies || req.headers.authorization;
  if (!token){
    console.log("token non trouvé");
    
    return res.status(401).send("vous n'etes pas authentifié ");}
  try {
    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    // search user dans la BD
    req.user = await User.findById(decodeData.id);
    if (!req.user) return res.status(401).send("utilisateur non trouvé");
    next();
    
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({messge: "le token a expiré"});
    }
   return  res.status(400).send({message: "token invalide"});
  }
};

module.exports = isAuth;
