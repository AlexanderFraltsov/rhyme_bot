//const { ALERT1 } = require('../../common/constants');
const { getRhyme } = require('../../service/get-rhyme');
const ALERT = 'Давайте нормальное слово, существительное, а то это что, шуточки по вашему?';

const sendResponse = async ctx => {
  const { message, reply } = ctx;
  const { text } = message;
  if (text === '/start') return;
  const rhyme = await getRhyme(text);
  reply(rhyme || ALERT);
};

module.exports = sendResponse;
