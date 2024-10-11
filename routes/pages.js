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


//main
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'public/Mainpage/index.html'));
});


//auth
router.get('/login', (req, res) => {
    res.render('login', {error:''})
});
router.get('/register', (req, res) => {
    res.render('register', {error:''})
});

router.get('/recoveraccount', (req, res) => {
    //res.sendFile(path.join(__dirname,'../forgot-password.html'));
    res.render('forgot-password', {email:'', inputt:'block', message:'Digite seu e-mail abaixo'})
});
router.get('/resetpassword', (req, res) => {
    res.render('reset-password', {error:''});
});


//other
router.get('/privacy', (req, res) => {
    res.render('privacy');
});
router.get('/legal', (req, res) => {
    res.render('legal');
});
router.get('/refundpolitcs', (req, res) => {
    res.render('refundpolitcs');
});





//user
router.get('/profile', requireAuth, loadUserData, (req, res) => {
    const data = req.data

  

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



    res.render('profile', { usuarios: data.usuarios, userDetails: data.userDetails[0], businessDetails:data.businessDetails[0],notification: notification, message: data.notification })

});
router.post('/profile', pagesController.profile);



router.get('/dashboard', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    const userStatistics = req.userStatistics
    console.log(userStatistics.monthlySales)
    console.log(data.notification)
    console.log(data)
  
    res.render('index', { usuarios: data.usuarios, orders: data.orders, wallet: data.wallet, notification: notification, message: data.notification, userStatistics:userStatistics })
    // res.sendFile(path.join(__dirname, '../','/index.html'));


});

router.get('/notfound', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    const userStatistics = req.userStatistics
    res.render('404', { usuarios: data.usuarios,notification: notification, message: data.notification} );
 
});
router.get('/configuracoes', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    const userStatistics = req.userStatistics
    res.render('generalConfigurations',{ usuarios: data.usuarios, orders: data.orders, wallet: data.wallet, notification: notification, message: data.notification });

});
router.get('/assinatura', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    const userStatistics = req.userStatistics
    res.render('assinatura',{ usuarios: data.usuarios, orders: data.orders, wallet: data.wallet, notification: notification, message: data.notification });

});
router.get('/marketing', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    const userStatistics = req.userStatistics
    res.render('marketing',{ usuarios: data.usuarios, orders: data.orders, wallet: data.wallet, notification: notification, message: data.notification });

});
router.get('/analises', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    const userStatistics = req.userStatistics
    res.render('analises',{ usuarios: data.usuarios, orders: data.orders, wallet: data.wallet, notification: notification, message: data.notification, userStatistics: userStatistics  });

});

router.get('/analises', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    const userStatistics = req.userStatistics
    res.render('analises',{ usuarios: data.usuarios, orders: data.orders, wallet: data.wallet, notification: notification, message: data.notification });

});


router.get('/integracaoSimples', requireAuth, loadUserData, (req, res) => {
    const userStatistics = req.userStatistics
    res.render('integracaoSimples', { token: data.firstname , notification: notification, message: data.notification })
   
});

router.get('/integracao', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    const userStatistics = req.userStatistics
    console.log(data) 
    res.render('integracao', { button: data.button, usuarios: data.usuarios, notification: notification, message: data.notification  })
   
});

router.get('/app', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    const userStatistics = req.userStatistics
    console.log(data)
    res.render('appCredencials', { app: data.app, usuarios: data.usuarios, button:data.button, notification: notification, message: data.notification  })

});
router.get('/shopifyapp', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    const userStatistics = req.userStatistics

    if (!data.shopifyCredentials[0] || data.shopifyCredentials[0] == undefined) {
        data.shopifyCredentials[0] = {
            "accessTokenShopify": "",
            "apiKeyShopify": "",
            "secretKeyShopify": "",
            "buttonToken": "",
           
        };
       
    }
    console.log(data)
    res.render('shopifyCredencials', { app: data.app, usuarios: data.usuarios, button:data.button, notification: notification, message: data.notification, shopifyCredentials:data.shopifyCredentials  })

});

router.get('/shopifyint', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    const userStatistics = req.userStatistics

    console.log(data) 
    res.render('intShopify', { button: data.button, usuarios: data.usuarios, notification: notification, message: data.notification  })
  
});
router.get('/woocommerceapp', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    const userStatistics = req.userStatistics
    console.log(data)
    res.render('appCredencials', { app: data.app, usuarios: data.usuarios, button:data.button, notification: notification, message: data.notification  })

});
router.get('/wixapp', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    const userStatistics = req.userStatistics
    console.log(data)
    res.render('appCredencials', { app: data.app, usuarios: data.usuarios, button:data.button, notification: notification, message: data.notification  })

});
router.get('/carteira', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    const userStatistics = req.userStatistics
    console.log(data)
    const wallet = {
        balance: '50',

    }
    console.log(wallet.balance)
    res.render('wallet', { transactions:data.transactions, button: data.button, usuarios: data.usuarios, wallet: wallet, notification: notification, message: data.notification  })

});
router.get('/reembolsos', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    const userStatistics = req.userStatistics
    console.log(data)
    res.render('refunds',  {  orders: data.orders,transactions:data.transactions, button: data.button, usuarios: data.usuarios, wallet:data.wallet, notification: notification, message: data.notification  })//, {button: data.button,usuarios: data.usuarios})
 
});
router.get('/carteira', requireAuth, loadUserData, (req, res) => {
    const data = req.data
    const userStatistics = req.userStatistics
    console.log(data)
    res.render('wallet',{ notification: notification, message: data.notification })//, {button: data.button,usuarios: data.usuarios})
    // res.sendFile(path.join(__dirname, '../', 'integracao.html'));
});

router.get('/inicio',  requireAuth, loadUserData, (req, res) => {
    const data = req.data
    const userStatistics = req.userStatistics
    res.render('inicio', { usuarios: data.usuarios, notification: notification, message: data.notification  })//, {button: data.button,usuarios: data.usuarios})
    // res.sendFile(path.join(__dirname, '../', 'integracao.html'));
});
 


module.exports = router;
