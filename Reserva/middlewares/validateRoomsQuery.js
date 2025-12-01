module.exports = function validateRoomsQuery(req, res, next) {
  const { capacityMin, hasProjector, page, limit } = req.query;

  if (capacityMin !== undefined && Number.isNaN(Number(capacityMin))) {
    return res.status(400).json({ error: 'capacityMin deve ser um número' });
  }

  if (hasProjector !== undefined) {
    if (!(hasProjector === 'true' || hasProjector === 'false')) {
      return res.status(400).json({ error: 'hasProjector deve ser true ou false' });
    }
  }

  if (page !== undefined) {
    const p = Number(page);
    if (!Number.isInteger(p) || p <= 0) return res.status(400).json({ error: 'page deve ser inteiro > 0' });
  }

  if (limit !== undefined) {
    const l = Number(limit);
    if (!Number.isInteger(l) || l <= 0) return res.status(400).json({ error: 'limit deve ser inteiro > 0' });
  }

  next();
};
