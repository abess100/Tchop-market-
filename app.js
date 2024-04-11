require('dotenv').config({path: './config/.env'})
require('./config/db')
const express = require("express");
const port =  process.env.PORT ;
const bodyParser = require('body-parser')
const path = require('path')     
const ejs = require('ejs')
const session = require('express-session')
const app = express();

// fichier statique
// app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// middleware 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    name: 'session_projet',
    resave: false,
    saveUninitialized: false,
    secret: process.env.session_secret,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure:false
    }
}))

// view engine
app.set('views', 'views')
app.set('view engine', 'ejs')

// 
// params API

// app.use('/', require('./routes/produitRoutes'))
app.use('/user', require('./routes/UserRoutes'))
app.use('/', require('./routes/produitRoutes')) 
app.use('/commande', require('./routes/commandeRoute'))
app.use('/admin', require('./routes/adminRoutes'))
// API 

 




app.listen(port, ()=>{
    console.log('serveur a démarré au port ' + port);
})