import { Context } from 'telegraf';

import { WELCOME_SUBSTRING } from '../../common/constants';


export const sendWelcome = (ctx: Context) => {
  const { message } = ctx;
  const { first_name, last_name } = message.from;
  const response = `${WELCOME_SUBSTRING}, ${last_name} ${first_name}`;
  ctx.reply(response);
};
