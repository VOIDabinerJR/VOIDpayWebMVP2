const express = require('express');
const path = require('path');
const authController = require('../controllers/pagesController');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const { loadUserData } = require('../middleware/dataLoadMiddleware');






router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../','public/Mainpage/index.html'));
});



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
router.get('/privacy', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'privacy.html'));
});
router.get('/legal', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'legal.html'));
});
 





router.get('/dashboard', requireAuth, loadUserData,(req, res) => {
    const data = req.data
    
    res.render('index', {token: data.firstname})
   
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
