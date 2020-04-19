const Telegraf = require('telegraf');

const proxyAgent = require('./common/proxy-agent');
const { TELEGRAM_TOKEN } = require('./common/config');
const { sendWelcome, sendResponse } = require('./utils');

const bot = new Telegraf(TELEGRAM_TOKEN, proxyAgent);

bot.catch((err, ctx) => {
  // TODO: error handler
  console.error(err.message, ctx);
});

bot.use(async (ctx, next) => {
  // TODO: write something middleware (logger?)
  return next();
});

bot.start(sendWelcome);
bot.on('message', sendResponse);

module.exports = bot;
