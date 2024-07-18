const express = require('express');
const path = require('path');

const authController = require('../controllers/pagesController');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');



//router.get('/singup', pagesController.singup_get );
////router.get('/login', pagesController.login_get );

// Rota para login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,'../', 'login.html'));
});


router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname,'../', 'register.html'));
});
router.get('/singup', (req, res) => {
    res.sendFile(path.join(__dirname,'../', 'register.html'));
});


// Rota para dashboard
router.get('/dashboard', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname,'../', 'index.html'));
});

router.get('/integracaoSimples', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname,'../', 'integracaoSimples.html'));
});
router.get('/', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname,'../', 'index.html'));
});




module.exports = router;
