const express = require('express');
const router = express.Router();
const { listProducts, createProduct, deleteProduct } = require('../controllers/productController');
const authenticateSession = require('../middlewares/authenticateSession');
const authorizeRoles = require('../middlewares/authorizeRoles');

router.get('/', authenticateSession, listProducts);
router.post('/', authenticateSession, authorizeRoles('admin'), createProduct);
router.delete('/:id', authenticateSession, authorizeRoles('admin'), deleteProduct);

module.exports = router;
