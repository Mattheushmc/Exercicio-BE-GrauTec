const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const roomsRoutes = require('./routes/roomsRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());

app.use('/', authRoutes);
app.use('/rooms', roomsRoutes);
app.use('/bookings', bookingsRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
