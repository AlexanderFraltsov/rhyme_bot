import { Context } from 'telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';

const ALERT = 'Давайте нормальное слово, существительное, а то это что, шуточки по вашему?';

export const sendResponse = async (ctx: Context<Update>) => {
  console.log(ctx.message);
  // const rhyme = await getRhyme(text);
  // ctx.reply(rhyme || ALERT);
  ctx.reply('ok')
};
