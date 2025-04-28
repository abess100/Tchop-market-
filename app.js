require('dotenv').config({path: './config/.env'})
require('./config/db')
const express = require("express");
const port =  process.env.PORT || 4000 ;
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const cloudinary = require('cloudinary').v2
const isauth = require('./middleware/authMiddleware')

const morgan =require('morgan')
const cors = require('cors')
const app = express();

// claudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())
app.use(morgan("dev"));
app.use(cors());

// route
app.use('/user', require('./routes/UserRoutes'))
app.use('/produit', require('./routes/produitRoutes')) 
app.use('/commande', isauth, require('./routes/commandeRoute'))
app.use('/admin',isauth, require('./routes/adminRoutes'))
app.use('/category', require('./routes/categoryRoutes'))

app.get('/', (req,res) => {
    return res.status(200).send('Hello to server')
})

 




app.listen(port, ()=>{
    console.log(`LE SERVER EST LANCER SUR LE PORT ${port}`);
})