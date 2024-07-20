
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

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, password, repeatPassword })
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
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

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


exports.singup_post = async (req, res) => {
    const { firstName, lastName, email, password, repeatPassword } = req.body;

    try {
        const response = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, password, repeatPassword })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).send(data.error);
        }

        return res.status(201).send(data.message);

    } catch (error) {
        handleErrors(err);
        return res.status(500).send('Server error');
    }


};

exports.login_post = async (req, res) => {
    try {
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) { 
            return res.status(response.status).send(data.error);
        }

        // Após o login bem-sucedido, recuperar informações do usuário e renderizar página ou redirecionar
        const userInfoResponse = await fetch('http://localhost:5000/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.token}`  // Enviar token JWT no cabeçalho Authorization
            }
        });

        const userInfo = await userInfoResponse.json();

        if (!userInfoResponse.ok) {
            return res.status(userInfoResponse.status).send(userInfo.error);
        }

        // Aqui você pode retornar ou renderizar a página com as informações do usuário
        return res.status(200).json(userInfo);


    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }

};

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    return res.redirect('/login');
};

exports.criateButton = async (req, res) => {
    const { firstName, lastName, email, password, repeatPassword } = req.body;

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, password, repeatPassword })
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