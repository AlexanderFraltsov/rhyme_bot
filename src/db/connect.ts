import { sequelize } from './config';

/* eslint-disable callback-return */
export const connect = async (cb: () => any) => {
  try {
    await sequelize.authenticate();
    return cb();
  } catch (err) {
    // TODO: error handler
    console.error('Unable to connect to the database:', err);
  }
};
