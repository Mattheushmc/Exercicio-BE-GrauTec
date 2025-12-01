const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('petsdb', 'root', '04a254c7', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;