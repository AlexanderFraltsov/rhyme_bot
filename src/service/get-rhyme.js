const getHandledWord = require('../modules/get-handled-word');

const getRhyme = async word => {
  const wordWithStress = getHandledWord(word);
  console.log(wordWithStress);
  // TODO: implementation of request to db and waiting response
  return `${word} - rhyme`;
};

module.exports = { getRhyme };
