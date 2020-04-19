const { EQUAL_LETTERS } = require('../common/constants');

const checkLettersEqual = (letter1, letter2) => {
  if (letter1 === letter2) return true;
  return EQUAL_LETTERS.some(
    ([firstLetter, secondLetter]) =>
      (letter1 === firstLetter && letter2 === secondLetter) ||
      (letter1 === secondLetter && letter2 === firstLetter)
  );
};

module.exports = checkLettersEqual;
