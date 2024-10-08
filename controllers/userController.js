
const { error } = require("jquery");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fetch = require('node-fetch');

require('dotenv').config();
const User = require('../models/User');




//handle erros 
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let error = { email: '', password: '' }

};
 


exports.createApp = async (req, res) => {
    const token = req.cookies.kn4;
    const { name, type } = req.body;
    console.log("aaa")

    try {
        const response = await fetch(`${process.env.URL}/user/createApp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, type, token })
        });

        const data = await response.json();
        console.log(data)

        if (response.status === 200) {
            const maxAge = 3 * 24 * 60 * 60 * 1000; // Exemplo de tempo de expiração do cookie


            res.cookie('void1', data.app.clientid, { httpOnly: true, maxAge });

            // Redireciona para a página de dashboard após login bem-sucedido
            return res.redirect('/app');
        } else { 
            // Em caso de falha no login, retorna o status e mensagem de erro recebidos do servidor
            return res.status(response.status).send(data);
        }
    } catch (error) {
        console.error('Erro durante criar app:', error);
        return res.status(500).send('Erro interno do servidor');
    }
};


exports.createButton = async (req, res) => {
    const clientId = req.cookies.void1;
    const token = req.cookies.kn4;
   
    console.log(token)
    
    const { name, destination } = req.body;
    
   

    try {
        const response = await fetch(`${process.env.URL}/button/requestbutton`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, clientId, destination, token })
        });

        const data = await response.json();
        console.log(data)

        if (response.status === 200) {
            
            return res.redirect('/app');
        } else { 
            // Em caso de falha no login, retorna o status e mensagem de erro recebidos do servidor
            return res.status(response.status).send(data);
        }
    } catch (error) {
        console.error('Erro durante criar app:', error);
        return res.status(500).send('Erro interno do servidor');
    }
};


exports.activateButton = async (req, res) => {
  
    const { tokeny } = req.body;
    
    
       
   
    try {
        const response = await fetch(`${process.env.URL}/button/activateButton`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  tokeny })
        });

        const data = await response.json();
        console.log(data)

        if (response.status === 200) {
            
            return res.status(200).redirect('/app');
        } else { 
           
            return res.status(response.status).send(data);
        }
    } catch (error) {
        console.error('Erro durante requisicao:', error);
        return res.status(500).send('Erro interno do servidor');
    }
};



exports.withdraw = async (req, res) => {
  
    const token  =  req.cookies.kn4;
    const {amount,customer_msisdn, paymentMethod} = req.body;
    
    
    
     
   
    try {
        const response = await fetch(`${process.env.URL}/pay/withdraw`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  token,amount,customer_msisdn ,paymentMethod})
        });

        const data = await response.json();
        console.log(data)
 
        if (response.status === 200) {
            
            return res.status(200).redirect('/carteira');
        } else { 
           
            return res.status(response.status).send(data);
        }
    } catch (error) {
        console.error('Erro durante requisicao:', error);
        return res.status(500).send('Erro interno do servidor');
    }
};

exports.qeryTransactionStatus = async (req, res) => {
  
    const { tokeny } = req.body;
    
    
     
   
    try {
        const response = await fetch(`${process.env.URL}/pay /withdraw`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  tokeny })
        });

        const data = await response.json();
        console.log(data)

        if (response.status === 200) {
            
            return res.status(200).redirect('/app');
        } else { 
           
            return res.status(response.status).send(data);
        }
    } catch (error) {
        console.error('Erro durante requisicao:', error);
        return res.status(500).send('Erro interno do servidor');
    }
};


exports.refund = async (req, res) => {
  
    const { tokeny } = req.body;
    
    
     
   
    try {
        const response = await fetch(`${process.env.URL}/pay /withdraw`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  tokeny })
        });

        const data = await response.json();
        console.log(data)

        if (response.status === 200) {
            
            return res.status(200).redirect('/app');
        } else { 
           
            return res.status(response.status).send(data);
        }
    } catch (error) {
        console.error('Erro durante requisicao:', error);
        return res.status(500).send('Erro interno do servidor');
    }
};

exports.shopifyCredentials = async (req, res) => {
    const token = req.cookies.kn4;
    const { accessTokenShopify, apiKeyShopify,secretKeyShopify,urlShopify,buttonToken } = req.body;
    console.log("aaa")
  

    try {
        const response = await fetch(`${process.env.URL}/user/shopifyCredentials`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessTokenShopify, apiKeyShopify,urlShopify,secretKeyShopify,buttonToken, token })
        });

        const data = await response.json();
        console.log(data)

        if (response.status === 200) {
            const maxAge = 3 * 24 * 60 * 60 * 1000; // Exemplo de tempo de expiração do cookie


           // res.cookie('void1', data.app.clientid, { httpOnly: true, maxAge });

            // Redireciona para a página de dashboard após login bem-sucedido
            return res.redirect('/shopifyapp');
        } else { 
            // Em caso de falha no login, retorna o status e mensagem de erro recebidos do servidor
            return res.status(response.status).send(data);
        }
    } catch (error) {
        console.error('Erro durante criar app:', error);
        return res.status(500).send('Erro interno do servidor');
    }
};
