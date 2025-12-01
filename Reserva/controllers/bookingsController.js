const store = require('../services/dataStore');
const { isValidDateString, isValidTimeString, timesOverlap } = require('../utils/validators');

exports.createBooking = (req, res) => {
  if (req.user.role !== 'member') return res.status(403).json({ error: 'Apenas members podem reservar' });
  const roomId = Number(req.params.id);
  const room = store.rooms.find(r => r.id === roomId);
  if (!room) return res.status(404).json({ error: 'Sala não encontrada' });

  const { date, start, end } = req.body;
  if (!date || !start || !end) return res.status(422).json({ error: 'date, start e end são obrigatórios' });
  if (!isValidDateString(date)) return res.status(422).json({ error: 'date deve ser YYYY-MM-DD' });
  if (!isValidTimeString(start) || !isValidTimeString(end)) return res.status(422).json({ error: 'start e end devem ser HH:MM' });
  if (!(end > start)) return res.status(422).json({ error: 'end deve ser depois de start' });

  const roomBookings = store.bookings.filter(b => b.roomId === roomId && b.date === date);
  for (const b of roomBookings) {
    if (timesOverlap(start, end, b.start, b.end)) {
      return res.status(409).json({ error: 'Conflito: sobreposição com reserva existente' });
    }
  }

  const booking = { id: store.nextBookingId++, roomId, userId: req.user.id, username: req.user.username, date, start, end };
  store.bookings.push(booking);
  res.status(201).json(booking);
};

exports.listBookings = (req, res) => {
  res.json(store.bookings);
};

exports.deleteBooking = (req, res) => {
  const id = Number(req.params.id);
  const idx = store.bookings.findIndex(b => b.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Reserva não encontrada' });
  const removed = store.bookings.splice(idx, 1)[0];
  res.json({ message: 'Reserva cancelada', booking: removed });
};
