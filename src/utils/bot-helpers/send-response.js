const { ALERT1 } = require('../../common/constants');
const { getRhyme } = require('../../service/get-rhyme');

const sendResponse = async ctx => {
  const { message, reply } = ctx;
  const { text } = message;
  if (text === '/start') return;
  const rhyme = await getRhyme(text);
  reply(rhyme || ALERT1);
};

module.exports = sendResponse;
