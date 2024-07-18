
const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Create token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
};

// Register endpoint
app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return res.status(400).send("Passwords do not match");
    }

    try {
        const [existingUsers] = await db.query('SELECT * FROM USUARIOS WHERE email = ?', [email]);

        if (existingUsers.length > 0) {
            return res.status(400).send('Email is already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 8);
        const user = { firstName, lastName, email, password: hashedPassword };

        const [insertResult] = await db.query('INSERT INTO USUARIOS SET ?', user);

        if (insertResult.affectedRows === 1) {
            const [userResult] = await db.query('SELECT * FROM USUARIOS WHERE email = ?', [email]);
            const userID = userResult.length > 0 ? userResult[0].id : null;

            const token = createToken(userID);
            return res.status(201).json({ token });
        } else {
            return res.status(500).send("User registration failed");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [userResult] = await db.query('SELECT * FROM USUARIOS WHERE email = ?', [email]);

        if (userResult.length > 0) {
            const user = userResult[0];

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).send('Password incorrect');
            }

            const token = createToken(user.id);
            return res.status(200).json({ token });
        } else {
            return res.status(404).send('Email incorrect');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
