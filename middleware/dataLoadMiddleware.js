const jwt = require("jsonwebtoken");
const fetch = require('node-fetch');


const loadUserData = async (req, res, next) => {

    const token = req.cookies.kn4;
  
    if (!req.data || (typeof req.data === 'object' && Object.keys(req.data).length === 0)) {
      


        try {
            const response = await fetch(`${process.env.URL}/auth/loaddata`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token })
            });
 
            const data = await response.json();
           console.log(data.user) 
            console.log(data.userStatistics.salesLast30Days)
 
            if (response.status === 200) { 
                req.data =data.user
                req.userStatistics =data.userStatistics
                next()
               
            } else {
                // Em caso de falha no login, retorna o status e mensagem de erro recebidos do servidor
                return res.status(response.status).send(data);
            }
        } catch (error) {
            console.error('Erro durante o login:', error);
            return res.status(500).send('Erro interno do servidor');
        }

      
    } else {
        next()
    }
};





module.exports = { loadUserData }; 