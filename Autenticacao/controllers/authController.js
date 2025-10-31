const bcrypt = require('bcrypt');
const { createUser, findUserByUsername } = require('../models/userModel');

async function register(req, res) {
    try {
        const { username, password, role } = req.body;
        if (!username || !password)
            return res.status(400).json({ message: 'username e password são obrigatórios.' });

        const exists = findUserByUsername(username);
        if (exists) return res.status(400).json({ message: 'Usuário já existe.' });

        const user = await createUser(username, password, role === 'admin' ? 'admin' : 'user');
        return res.status(201).json({ message: 'Usuário registrado.', user: { id: user.id, username: user.username, role: user.role } });
    } catch {
        return res.status(500).json({ message: 'Erro interno ao registrar.' });
    }
}

async function login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Campos obrigatórios.' });

    const user = findUserByUsername(username);
    if (!user) return res.status(401).json({ message: 'Credenciais inválidas.' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: 'Credenciais inválidas.' });

    req.session.userId = user.id;
    return res.status(200).json({ message: 'Login bem-sucedido.' });
}

function logout(req, res) {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: 'Erro ao encerrar sessão.' });
        res.clearCookie('sid');
        return res.status(200).json({ message: 'Logout realizado.' });
    });
}

module.exports = { register, login, logout };
