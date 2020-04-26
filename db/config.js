const Sequelize = require('sequelize');
const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST
} = require('../src/common/config');

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false
  }
});

module.exports = sequelize;
