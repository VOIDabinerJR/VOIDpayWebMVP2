const express = require('express');

const authController = require('../controllers/authController');
require('dotenv').config();

const router = express.Router();
 
 
router.post('/register', authController.register);

router.post('/login', authController.login );

router.get('/logout', authController.logout_get );

router.post('/recoveraccount',authController.recoveraccount);
router.post('/resetpassword',authController.resetpassword);
 


   

 
module.exports = router;
 