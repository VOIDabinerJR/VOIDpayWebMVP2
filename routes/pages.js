const express = require('express');
const path = require('path');

const authController = require('../controllers/pagesController');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'login.html'));
});



router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'login.html'));
});


router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'register.html'));
});
router.get('/singup', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'register.html'));
});
router.get('/recoveraccount', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'forgot-password.html'));
});
router.get('/resetpassword', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'reset-password.html'));
});
 

// Rota para dashboard
router.get('/dashboard', requireAuth, (req, res) => {
    const data = req.query
    console.log(data)
    
    res.render('index', {token: 'aaa'})
    // res.sendFile(path.join(__dirname,'../', 'index.html'));
});

router.get('/integracaoSimples', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'integracaoSimples.html'));
});

router.get('/integracao', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'integracao.html'));
});

router.get('/app', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'appCredencials.html'));
});



module.exports = router;
