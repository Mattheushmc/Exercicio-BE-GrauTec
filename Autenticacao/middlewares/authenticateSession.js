const { findUserById } = require('../models/userModel');

function authenticateSession(req, res, next) {
    if (req.session && req.session.userId) {
        const user = findUserById(req.session.userId);
        if (!user) {
            return res.status(401).json({ message: 'Sessão inválida. Faça login.' });
        }
        req.user = user;
        return next();
    }
    return res.status(401).json({ message: 'Usuário não autenticado.' });
}

module.exports = authenticateSession;
