const express = require("express");
const router = express.Router();

conqt = require('../routes/vendeurRoutes');


router.get("/connexion", (req, res) => {
    // res.send('bbbbb')
    res.render('connexion')
})

router.get("/inscription", (req, res) => {
    // res.send('bbbbb')
    res.render('register')
})
router.get("/admin", (req, res) => {
    // res.send('bbbbb')
    res.render('admin')
})
router.get("/user/profil", (req, res) => {
    // res.send('bbbbb')
    res.render('profil')
})
router.get("/inscription", (req, res) => {
    // res.send('bbbbb')
    res.render('register')
})
router.get("/commande", (req, res) => {
    // res.send('bbbbb')
    res.render('resp')
})



module.exports = router