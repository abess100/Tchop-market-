require('dotenv').config({path: './config/.env'})
require('./config/db')
const express = require("express");
const port =  process.env.port || 4000 ;
const bodyParser = require('body-parser')
const morgan =require('morgan')
const cors = require('cors')
const app = express();

// middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(cors());

// route
app.use('/user', require('./routes/UserRoutes'))
app.use('/produit', require('./routes/produitRoutes')) 
app.use('/commande', require('./routes/commandeRoute'))
app.use('/admin', require('./routes/adminRoutes'))

app.get('/', (req,res) => {
    return res.status(200).send('Hello to server')
})

 




app.listen(port, ()=>{
    console.log('serveur a démarré au port ' + port);
})