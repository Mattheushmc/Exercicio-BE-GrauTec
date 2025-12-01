const express = require('express');
const app = express();

const petRoutes = require('./routes/petRoutes');
app.use(express.json());

app.use('/pets', petRoutes); 

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
