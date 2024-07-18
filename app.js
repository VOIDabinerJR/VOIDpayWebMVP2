const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require('path');
const bodyParser = require('body-parser');
const coockieParser = require('cookie-parser')
const authRoutes = require('./routes/auth');
const pagesRoutes = require('./routes/pages');
const { checkUser } = require("./middleware/authMiddleware");


const app = express();

// apos corrigir os directorios (public) branch 2
//midleware
const publicDirectory = path.join(__dirname)
app.use(express.static(publicDirectory))
app.use(coockieParser());

dotenv.config({path: './.env'});
 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//routes
app.get('*', checkUser)
app.use(authRoutes);
app.use(pagesRoutes);



const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});