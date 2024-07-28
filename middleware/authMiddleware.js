const jwt = require("jsonwebtoken");
//require('dotenv').config({ path: 'C:\\Users\\DELL\\Desktop\\server\\.env' });
const JWT_SECRET='oi'
const requireAuth = (req, res, next) => {
    console.log('a')
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        })
    } else {
        res.redirect('/login')
    }
};
const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        try {
            const response = await fetch('https://voidpayservermvp2.onrender.com/user/checktoken', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });

            const data = await response.json();

            if (response.ok) {
                const userResponse = await fetch('https://voidpayservermvp2.onrender.com/user/checkuser', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: data.id })
                });
 
                const userData = await userResponse.json();

                if (userResponse.ok) {
                    res.locals.user = userData.user;
                    
                } else {
                    res.locals.user = null;
                }
            } else {
                res.locals.user = null;
            }
        } catch (error) {
            console.error('Error verifying token or fetching user:', error);
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }

    next();
};


            

module.exports = { requireAuth,checkUser }; 