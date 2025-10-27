const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

let products = [
    { id: 1, name: 'Produto 1', price: 100 },
    { id: 2, name: 'Produto 2', price: 200 }
];

router.get('/', authenticateToken, (req, res) => {
    res.json(products);
});

router.post('/', authenticateToken, authorizeRoles('admin'), (req, res) => {
    const { name, price } = req.body;
    const id = products.length + 1;
    const product = { id, name, price };
    products.push(product);
    res.status(201).json(product);
});

router.delete('/:id', authenticateToken, authorizeRoles('admin'), (req, res) => {
    const id = parseInt(req.params.id);
    products = products.filter(p => p.id !== id);
    res.json({ message: 'Produto removido' });
});

module.exports = router;
