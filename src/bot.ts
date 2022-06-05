import { Telegraf } from 'telegraf';

import { config } from './common/config';
import { sendResponse, sendWelcome } from './utils';

const bot = new Telegraf(config.TELEGRAM_TOKEN);

bot.catch((err: any, ctx) => {
  // TODO: error handler
  console.error(err.message, ctx);
});

bot.use(async (ctx, next) => {
  // TODO: write something middleware (logger?)
  return next();
});

bot.start(sendWelcome);
bot.on('message', sendResponse);

export { bot };
