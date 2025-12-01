const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwt');

exports.login = (req, res) => {
  const { id, username, password, role } = req.body;
  if (!id || !username || !password || !role) {
    return res.status(400).json({ error: 'id, username, password e role são obrigatórios' });
  }
  const token = jwt.sign({ id, username, role }, secret, { expiresIn });
  res.json({ token });
};
