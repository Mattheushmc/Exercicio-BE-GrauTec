const store = require('../services/dataStore');

exports.getRooms = (req, res) => {
  let results = [...store.rooms];
  const { capacityMin, hasProjector, page = 1, limit = 10 } = req.query;

  if (capacityMin !== undefined) {
    results = results.filter(r => r.capacity >= Number(capacityMin));
  }
  if (hasProjector !== undefined) {
    const hp = hasProjector === 'true';
    results = results.filter(r => r.hasProjector === hp);
  }

  const p = Number(page) || 1;
  const l = Number(limit) || 10;
  const start = (p - 1) * l;
  const paged = results.slice(start, start + l);

  res.json({ page: p, limit: l, total: results.length, data: paged });
};

exports.createRoom = (req, res) => {
  const { name, capacity, hasProjector } = req.body;
  if (!name || name.toString().trim() === '') {
    return res.status(422).json({ error: 'name é obrigatório' });
  }
  if (capacity === undefined || Number.isNaN(Number(capacity)) || Number(capacity) <= 0) {
    return res.status(422).json({ error: 'capacity deve ser um número > 0' });
  }
  const room = { id: store.nextRoomId++, name: String(name), capacity: Number(capacity), hasProjector: Boolean(hasProjector) };
  store.rooms.push(room);
  res.status(201).json(room);
};
