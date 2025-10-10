const express = require('express');
const app = express();
const livrosRoutes = require('./routes/livrosroutes');

app.use(express.json());

app.use('/api', livrosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
