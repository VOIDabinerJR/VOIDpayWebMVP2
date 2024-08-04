
const { error } = require("jquery");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fetch = require('node-fetch');
//const { isEmail } = require('validator'); // onde validar?
require('dotenv').config();
const User = require('../models/User');




//handle erros 
const handleErrors = (err) => {
    console.log(err.message, err.code)
    let error = { email: '', password: '' }

};



exports.register = async (req, res) => {  
    const { firstName, lastName, email, password, repeatPassword } = req.body;
const username =firstName
    try {
        const response = await fetch(`${process.env.URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ firstName, username ,lastName, email, password, repeatPassword })
        });

        const data = await response.json();
        console.log(data);

        if (response.status === 201) { 
            const maxAge = 3 * 24 * 60 * 60 * 1000; // Exemplo de tempo de expiração do cookie

            // Define o cookie JWT no cliente
            res.cookie('jwt', data.token, { httpOnly: true, maxAge });

            // Redireciona para o dashboard
            return res.redirect('/dashboard');
        } else {
            // Trata qualquer erro retornando o status e mensagem recebidos do servidor
            return res.status(response.status).send(data);
        }
    } catch (error) {
        console.error('Erro durante o registro:', error);
        return res.status(500).send('Erro interno do servidor');
    }
};
exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log("aaa")

    try {
        const response = await fetch(`${process.env.URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        console.log(data)

        if (response.status === 200) {
            const maxAge = 3 * 24 * 60 * 60 * 1000; // Exemplo de tempo de expiração do cookie

            // Define o token JWT como um cookie no navegador do usuário
            res.cookie('jwt', data.token, { httpOnly: true, maxAge });

            // Redireciona para a página de dashboard após login bem-sucedido
            return res.redirect('/dashboard');
        } else { 
            // Em caso de falha no login, retorna o status e mensagem de erro recebidos do servidor
            return res.status(response.status).send(data);
        }
    } catch (error) {
        console.error('Erro durante o login:', error);
        return res.status(500).send('Erro interno do servidor');
    }
};


exports.recoveraccount = async (req, res) => {
    const { email } = req.body;
   
    console.log('aa')


    try {
        const response = await fetch(`${process.env.URL}/auth/recoveraccount`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email})
        });
        

        const data = await response.json();  
        console.log(data.sucess)
      

        if (response.status === 200) {
           
          
            return res.render('forgot-password',{email :email, message:' Enviamos um link de recuperação para o e-mail.' })
        } else { 
          
            return res.render('forgot-password',{email :'Email não cadastrado'})
        }
    } catch (error) {
        console.error('Erro durante o login:', error);
        return res.status(500).send('Erro interno do servidor');
    }
};


exports.resetpassword = async (req, res) => {
    const token = req.query.token
    const { repeatPassword, password } = req.body;
 

    try {
        const response = await fetch(`${process.env.URL}/auth/resetpassword`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({  password,repeatPassword,token })
        });

        const data = await response.json();
        console.log(data)

        if (response.status === 200) {
            const maxAge = 3 * 24 * 60 * 60 * 1000; // Exemplo de tempo de expiração do cookie

            // Define o token JWT como um cookie no navegador do usuário
            res.cookie('jwt', data.token, { httpOnly: true, maxAge });

            return res.render('forgot-password',{email :"Sucesso" ,message:"Senha Alterada com sucesso"})
        } else { 
            // Em caso de falha no login, retorna o status e mensagem de erro recebidos do servidor
            return res.status(response.status).send(data);
        }
    } catch (error) {
        console.error('Erro durante o login:', error);
        return res.status(500).send('Erro interno do servidor');
    }
};


module.exports.logout_get = (req, res) => {
    console.log("Aaa")
    res.cookie('jwt', '', { maxAge: 1 });
    return res.redirect('/login');
};
