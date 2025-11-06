import express from 'express';
import session from 'express-session';
import authRoutes from './src/routes/authRoutes.js';
import notasRoutes from './src/routes/notasRoutes.js';

const app = express();

app.use(express.json());

app.use(session({
    secret: 'segredo123', 
    resave: false,
    saveUninitialized: true,
}));

app.use('/auth', authRoutes);
app.use('/notas', notasRoutes);

if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
}

export default app;
