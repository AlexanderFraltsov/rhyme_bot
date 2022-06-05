const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

export const config = {
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  PORT: process.env.PORT,
  PROXY_PORT: process.env.PROXY_PORT,
  PROXY_HOST: process.env.PROXY_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST
};
