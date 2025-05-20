const express = require('express');

const userController = require('../controllers/userController');


const router = express.Router();
  
  
router.post('/app', userController.createApp);  
router.post('/shopifyapp', userController.shopifyCredentials);  

router.post('/integracao/create', userController.createButton); 
router.post('/integracao/activate', userController.activateButton); 
router.post('/carteira', userController.withdraw); //mudar nome desta rota
 
//router.post('/requestbutton', userController.requestButton);
//router.post('/ativebutton', userController.ativeButton);
//ou
//router.post('/button', userController.createButton);



module.exports = router;