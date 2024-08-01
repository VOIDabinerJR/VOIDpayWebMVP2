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
    res.render('login')
});
router.get('/register', (req, res) => {
    res.render('register')
});

router.get('/recoveraccount', (req, res) => {
    res.render('forgot-password')
});
router.get('/resetpassword', (req, res) => {
    res.render('reset-password');
});


//other
router.get('/privacy', (req, res) => {
    res.render('privacy');
});
router.get('/legal', (req, res) => {
    res.render('legal');
});
 




//user
router.get('/profile', requireAuth, loadUserData,(req, res) => {
    const data = req.data

   
    res.render('profile', {user: data.user, userDetails:data.userDetails, businessDetails: data.businessDetails})
   
});
router.post('/profile', pagesController.profile );



router.get('/dashboard', requireAuth, loadUserData,(req, res) => {
    const data = req.data
    const notification={
        notificationCount:3,
        notificationText:'hi',
        data: '20-12-2004',
        time:'20-12-2001',
        text:'ola',
        sender:'joeh'

    }
    const message = [
        {
            notificationCount: 3,
            notificationText: 'Hi',
            data: '20-12-2004',
            time: '20-12-2001',
            text: 'Ola',
            sender: 'Joeh'
        },
        {
            notificationCount: 3,
            notificationText: 'Hi',
            data: '20-12-2004',
            time: '20-12-2001',
            text: 'Ola',
            sender: 'Joeh'
        },{
            notificationCount: 3,
            notificationText: 'Hi',
            data: '20-12-2004',
            time: '20-12-2001',
            text: 'Ola',
            sender: 'Joeh'
        },{
            notificationCount: 3,
            notificationText: 'Hi',
            data: '20-12-2004',
            time: '20-12-2001',
            text: 'Ola',
            sender: 'Joeh'
        },{
            notificationCount: 3,
            notificationText: 'Hi',
            data: '20-12-2004',
            time: '20-12-2001',
            text: 'Ola',
            sender: 'Joeh'
        },{
            notificationCount: 3,
            notificationText: 'Hi',
            data: '20-12-2004',
            time: '20-12-2001',
            text: 'Ola',
            sender: 'Joeh'
        },{
            notificationCount: 3,
            notificationText: 'Hi',
            data: '20-12-2004',
            time: '20-12-2001',
            text: 'Ola',
            sender: 'Joeh'
        },{
            notificationCount: 3,
            notificationText: 'Hi',
            data: '20-12-2004',
            time: '20-12-2001',
            text: 'Ola',
            sender: 'Joeh'
        },
    ];
   res.render('index', {usuarios: data.usuarios, orders: data.orders, wallet: data.wallet, notification: notification,  message: message })
 // res.sendFile(path.join(__dirname, '../','/index.html'));

   
});

router.get('/notfound', requireAuth, loadUserData,(req, res) => {
    const data = req.data
    
  
  res.render('404');

   
});


router.get('/integracaoSimples', requireAuth,loadUserData, (req, res) => {

    res.render('integracaoSimples', {token: data.firstname})
    //res.sendFile(path.join(__dirname, '../', 'integracaoSimples.html'));
});

router.get('/integracao', requireAuth, loadUserData,(req, res) => {
    const data = req.data
    console.log(data)
    res.render('integracao', {button: data.button,usuarios: data.usuarios})
   // res.sendFile(path.join(__dirname, '../', 'integracao.html'));
});

router.get('/app', requireAuth, loadUserData,(req, res) => {
const data = req.data
console.log(data)
    res.render('appCredencials', {app: data.app,usuarios: data.usuarios })
    
});
router.get('/carteira', requireAuth, loadUserData,(req, res) => {
    const data = req.data
    console.log(data)
    res.render('wallet', {button: data.button,usuarios: data.usuarios})
 
});
router.get('/reembolsos', requireAuth, loadUserData,(req, res) => {
    const data = req.data
    console.log(data)
    res.render('refund')//, {button: data.button,usuarios: data.usuarios})
   
});
router.get('/carteira', requireAuth, loadUserData,(req, res) => {
    const data = req.data
    console.log(data)
    res.render('wallet')//, {button: data.button,usuarios: data.usuarios})
   // res.sendFile(path.join(__dirname, '../', 'integracao.html'));
});

router.get('/inicio', (req, res) => {
   
    res.render('inicio', {usuarios:'abinr'})//, {button: data.button,usuarios: data.usuarios})
   // res.sendFile(path.join(__dirname, '../', 'integracao.html'));
});
 
 

module.exports = router;
