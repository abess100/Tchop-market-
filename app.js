require('dotenv').config({path: './config/.env'})
require('./config/db')
const express = require("express");
const port =  process.env.PORT ;
const bodyParser = require('body-parser')
const app = express();
const protect = require('./middleware/authmiddleware')

// middleware 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// app.use(protect)
 
// params API
app.use('/user', require('./routes/UserRoutes'))
app.use('/produit', require('./routes/produitRoutes')) 
app.use('/commande', require('./routes/commandeRoute'))
app.use('/cart', require('./routes/cartRoutes'))
// API  
app.get("/", (req,res) =>{
    res.send('bonjour');
})



app.listen(port, ()=>{
    console.log('serveur a démarré au port ' + port);
})