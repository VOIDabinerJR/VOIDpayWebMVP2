const express = require('express');
const path = require('path');
const pagesController = require('../controllers/pagesController');

const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const { loadUserData } = require('../middleware/dataLoadMiddleware');


const notification = {
    notificationCount: 3,
    notificationText: 'hi',
    data: '20-12-2004',
    time: '20-12-2001',
    text: 'ola',
    sender: 'joeh'

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
    },
];


//main
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'public/Mainpage/index.html'));
});


//auth
router.get('/login', (req, res) => {
    res.render('login')
});
router.get('/register', (req, res) => {
    res.render('register')
});

router.get('/recoveraccount', (req, res) => {
    //res.sendFile(path.join(__dirname,'../forgot-password.html'));
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
router.get('/profile', requireAuth, loadUserData, (req, res) => {
    const data = req.data

    const userDetails = {
        "dateOfBirth": "1990-01-01",
        "address": "123 Main St, Apt 4B",
        "postalCode": "12345",
        "documentId": "A12345678",
        "phone": "123-456-7890",
        "alternativeEmail": "example@alternative.com"
    }


    const businessDetails = {
        "businessName": "Minha Empresa",
        "legalDocument": "B12345678",
        "email": "business@example.com",
        "address": "456 Business St, Suite 12",
        "website": "https://www.minhaempresa.com"
    }

    if (data.businessDetails[0] == undefined ) {
       
        data.businessDetails[0] = {
            "businessName": "",
            "legalDocument": "",
            "email": "",
            "address": "",
            "website": ""
        };
    }
    if ( data.userDetails[0] == undefined) {
        data.userDetails[0] = {
            "dateOfBirth": "",
            "address": "",
            "postalCode": "",
            "documentId": "",
            "phone": "",
            "alternativeEmail": ""
        };
       
    }



    res.render('profile', { usuarios: data.usuarios, userDetails: data.userDetails[0], businessDetails:data.businessDetails[0],notification: notification, message: message })

});
router.post('/profile', pagesController.profile);



router.get('/dashboard', requireAuth, loadUserData, (req, res) => {
    const data = req.data
  
    res.render('index', { usuarios: data.usuarios, orders: data.orders, wallet: data.wallet, notification: notification, message: message })
    // res.sendFile(path.join(__dirname, '../','/index.html'));


});

router.get('/notfound', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    res.render('404', { usuarios: data.usuarios,notification: notification, message: message} );
 
});
router.get('/configuracoes', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    res.render('generalConfigurations',{ usuarios: data.usuarios, orders: data.orders, wallet: data.wallet, notification: notification, message: message });

});
router.get('/assinatura', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    res.render('assinatura',{ usuarios: data.usuarios, orders: data.orders, wallet: data.wallet, notification: notification, message: message });

});
router.get('/analises', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    res.render('analises',{ usuarios: data.usuarios, orders: data.orders, wallet: data.wallet, notification: notification, message: message });

});

router.get('/analises', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    res.render('analises',{ usuarios: data.usuarios, orders: data.orders, wallet: data.wallet, notification: notification, message: message });

});


router.get('/integracaoSimples', requireAuth, loadUserData, (req, res) => {

    res.render('integracaoSimples', { token: data.firstname , notification: notification, message: message })
   
});

router.get('/integracao', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    console.log(data)
    res.render('integracao', { button: data.button, usuarios: data.usuarios, notification: notification, message: message  })
   
});

router.get('/app', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    console.log(data)
    res.render('appCredencials', { app: data.app, usuarios: data.usuarios, button:data.button, notification: notification, message: message  })

});
router.get('/carteira', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    console.log(data)
    const wallet = {
        balance: '50',

    }
    console.log(wallet.balance)
    res.render('wallet', { transactions:data.transactions, button: data.button, usuarios: data.usuarios, wallet: wallet, notification: notification, message: message  })

});
router.get('/reembolsos', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    console.log(data)
    res.render('refunds',  {  orders: data.orders,transactions:data.transactions, button: data.button, usuarios: data.usuarios, wallet:data.wallet, notification: notification, message: message  })//, {button: data.button,usuarios: data.usuarios})

});
router.get('/carteira', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    console.log(data)
    res.render('wallet',{ notification: notification, message: message })//, {button: data.button,usuarios: data.usuarios})
    // res.sendFile(path.join(__dirname, '../', 'integracao.html'));
});

router.get('/inicio',  requireAuth, loadUserData, (req, res) => {
    const data = req.data
    res.render('inicio', { usuarios: data.usuarios, notification: notification, message: message  })//, {button: data.button,usuarios: data.usuarios})
    // res.sendFile(path.join(__dirname, '../', 'integracao.html'));
});
 


module.exports = router;
