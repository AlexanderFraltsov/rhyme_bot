const { WELCOME_SUBSTRING } = require('../../common/constants');

const sendWelcome = ctx => {
  const { message, reply } = ctx;
  const { first_name, last_name } = message.from;
  const response = `${WELCOME_SUBSTRING}, ${last_name} ${first_name}`;
  reply(response);
};

module.exports = sendWelcome;
