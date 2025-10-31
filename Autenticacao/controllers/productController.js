const { getAllProducts, addProduct, removeProductById } = require('../models/productModel');

function listProducts(req, res) {
    return res.status(200).json({ products: getAllProducts() });
}

function createProduct(req, res) {
    const { name, price, description } = req.body;
    if (!name || price === undefined) return res.status(400).json({ message: 'name e price são obrigatórios.' });
    const product = addProduct(name, price, description || '');
    return res.status(201).json({ message: 'Produto adicionado.', product });
}

function deleteProduct(req, res) {
    const { id } = req.params;
    const removed = removeProductById(id);
    if (!removed) return res.status(404).json({ message: 'Produto não encontrado.' });
    return res.status(200).json({ message: 'Produto removido.', product: removed });
}

module.exports = { listProducts, createProduct, deleteProduct };
