module.exports = {
  secret: process.env.JWT_SECRET || 'secretkey_do_projeto',
  expiresIn: '12h'
};
