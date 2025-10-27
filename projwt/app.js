
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(bodyParser.json());

// Rotas
app.use('/login', authRoutes);
app.use('/products', productRoutes);

module.exports = app;


