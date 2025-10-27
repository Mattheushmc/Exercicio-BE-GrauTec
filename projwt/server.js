require('dotenv').config();
const app = require('./app');

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
});
