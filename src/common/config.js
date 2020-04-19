const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

module.exports = {
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  PORT: process.env.PORT,
  PROXY_PORT: process.env.PROXY_PORT,
  PROXY_HOST: process.env.PROXY_HOST
};
