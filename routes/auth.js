const express = require('express');

const authController = require('../controllers/authController');


const router = express.Router();


router.post('/register', authController.register);


router.post('/singup', authController.singup_post );


//router.post('/login', authController.login_post );
router.post('/login', authController.login );

router.get('/logout', authController.logout_get );



 
module.exports = router;
