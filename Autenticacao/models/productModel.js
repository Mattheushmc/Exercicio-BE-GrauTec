const { v4: uuidv4 } = require('uuid');
const products = [];

function getAllProducts() {
    return products;
}

function addProduct(name, price, description) {
    const product = { id: uuidv4(), name, price, description };
    products.push(product);
    return product;
}

function removeProductById(id) {
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return null;
    return products.splice(idx, 1)[0];
}

module.exports = { products, getAllProducts, addProduct, removeProductById };
