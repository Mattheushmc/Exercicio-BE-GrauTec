const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(session({
    secret: 'segredo123',
    resave: false,
    saveUninitialized: false,
}));


const users = [];
const products = [];
function authenticateSession(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send({ message: 'Unauthorized: precisa estar logado' });
    }
}

function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!req.session.user) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        if (!roles.includes(req.session.user.role)) {
            return res.status(403).send({ message: 'Forbidden: sem permissão' });
        }
        next();
    };
}

app.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res.status(400).send({ message: 'Dados incompletos' });
    }
    const userExists = users.find(u => u.username === username);
    if (userExists) {
        return res.status(400).send({ message: 'Usuário já existe' });
    }
    users.push({ username, password, role });
    res.status(201).send({ message: 'Usuário criado com sucesso' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).send({ message: 'Usuário ou senha inválidos' });
    }
    req.session.user = { username: user.username, role: user.role };
    res.send({ message: 'Login realizado com sucesso' });
});

app.post('/logout', authenticateSession, (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ message: 'Erro ao encerrar sessão' });
        res.send({ message: 'Logout realizado com sucesso' });
    });
});

app.get('/products', authenticateSession, (req, res) => {
    res.send(products);
});

app.post('/products', authenticateSession, authorizeRoles('admin'), (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).send({ message: 'Dados do produto incompletos' });
    }
    const id = products.length + 1;
    const product = { id, name, price };
    products.push(product);
    res.status(201).send({ message: 'Produto adicionado', product });
});

app.delete('/products/:id', authenticateSession, authorizeRoles('admin'), (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).send({ message: 'Produto não encontrado' });
    }
    products.splice(index, 1);
    res.send({ message: 'Produto removido com sucesso' });
});

module.exports = app;
