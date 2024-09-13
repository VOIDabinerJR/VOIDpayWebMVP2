
const { error } = require("jquery");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.profile = async (req, res) => {  
    const { firstName, lastName, username, email, password, repeatPassword,dateOfBirth,address, postalCode, documentId, documentIdImg,phone,alternativeEmail,businessName, legalDocument,website, form }  = req.body;
    const token = req.cookies.kn4;
    console.log(req.file)
    const file = req.file;
    
   
    
    try {
        const response = await fetch(`${process.env.URL}/pages/profile`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ token, firstName, lastName, username, email, password, repeatPassword,dateOfBirth,address, postalCode, documentId, documentIdImg,phone,alternativeEmail,businessName, legalDocument,website, form,file } )
        });

        const data = await response.json();
        console.log(data);

        if (response.status === 201) {
            const maxAge = 3 * 24 * 60 * 60 * 1000; // Exemplo de tempo de expiração do cookie
 
          
            

            res.cookie('jgg', data.token, { httpOnly: true, maxAge });
            res.cookie('d', data.token, { httpOnly: true, maxAge });
            res.cookie('kn4', data.token, { httpOnly: true, maxAge });
            res.cookie('e432', data.token, { httpOnly: true, maxAge });
            res.cookie('412t', data.token, { httpOnly: true, maxAge });
            res.cookie('vcxd', data.token, { httpOnly: true, maxAge });

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