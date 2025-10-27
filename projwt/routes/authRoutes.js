require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const users = [
    { username: 'admin', password: 'admin1234', role: 'admin' },
    { username: 'joao', password: '123456', role: 'user' }
];

router.post('/', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) return res.status(401).json({ message: 'Usuário ou senha inválidos' });

    const token = jwt.sign(
        { username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ token });
});

module.exports = router;
