const sequelize = require('./config');

/* eslint-disable callback-return */
const connect = async cb => {
  try {
    await sequelize.authenticate();
    return cb();
  } catch (err) {
    // TODO: error handler
    console.error('Unable to connect to the database:', err);
  }
};

module.exports = { connect };
