const { Sequelize } = require('sequelize');

import { config } from '../common/config';



const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = config;

export const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
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
