const express = require('express');
const path = require('path');
const pagesController = require('../controllers/pagesController');

const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const { loadUserData } = require('../middleware/dataLoadMiddleware');





//main
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../','public/Mainpage/index.html'));
});


//auth
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'login.html'));
});
router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'register.html'));
});

router.get('/recoveraccount', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'forgot-password.html'));
});
router.get('/resetpassword', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'reset-password.html'));
});


//other
router.get('/privacy', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'privacy.html'));
});
router.get('/legal', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'legal.html'));
});
 




//user
router.get('/profile', requireAuth, loadUserData,(req, res) => {
    const data = req.data

    res.sendFile(path.join(__dirname, '../', 'profile.html'));
    //.render('profile', {user: data.user, userDetails:data.userDetails, businessDetails: data.businessDetails})
   
});
router.post('/profile', pagesController.profile );



router.get('/dashboard', requireAuth, loadUserData,(req, res) => {
    const data = req.data
    
   // res.render('index', {token: data.firstname})
  res.sendFile(path.join(__dirname, '../','/index.html'));

   
});

router.get('/notfound', requireAuth, loadUserData,(req, res) => {
    const data = req.data
    
  
  res.sendFile(path.join(__dirname, '../', '404.html'));

   
});


router.get('/integracaoSimples', requireAuth,loadUserData, (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'integracaoSimples.html'));
});

router.get('/integracao', requireAuth, loadUserData,(req, res) => {
    res.sendFile(path.join(__dirname, '../', 'integracao.html'));
});

router.get('/app', requireAuth, loadUserData,(req, res) => {
    res.sendFile(path.join(__dirname, '../', 'appCredencials.html'));
});



module.exports = router;
