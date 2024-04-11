const express = require('express')
const router = express.Router();
const Admin = require('../models/adminModel')
const AdminCtrl = require('../controllers/authVendeurController');
const verifyToken = require('../middleware/verifyToken');
const bcrypt = require('bcrypt')


router.get('/all', async (req, res) => {
    const adminlist = await Admin.find();
    if(req.session.UserId){
      res.send(adminlist);
    }else{
      res.send(req.session.UserId)
      
    }

  })

// un seul utilisateur
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const admin = await Admin.findById(id);
    res.status(200).send(user);
})

router.get('/', async (req, res) => {
    res.render('connexionAdmin')
})


//  register
router.post("/register", AdminCtrl.register);

// login
router.post("/login", AdminCtrl.login);



// mettre à jour un admin

router.put('/update/:id', async (req, res) => {
 
    const id = req.params.id;
  const passwordhash = await bcrypt.hash(req.body.password, 10);
 
  if(req.body.password){
    req.body.password = passwordhash
  }  

  try {
    const updateadmin = await Admin.findByIdAndUpdate(id, req.body);
    res.status(200).json(updateadmin);
  } catch {
    res.status(500).json({ message: err });
  }
},)

// delete
  
router.delete('/delete/:id', async (req, res) => {
   
    const id = req.params.id;
    try {
      const admin = await Admin.findByIdAndDelete(id);
      res.status(200).send('l\'utilisateur a été supprimé');
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
)


module.exports = router;

