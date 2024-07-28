const express = require('express');

const userController = require('../controllers/userController');


const router = express.Router();


router.post('/app', userController.createApp); 

router.post('/integracao', userController.createButton); 

//router.post('/requestbutton', userController.requestButton);
//router.post('/ativebutton', userController.ativeButton);
//ou
//router.post('/button', userController.createButton);



module.exports = router;