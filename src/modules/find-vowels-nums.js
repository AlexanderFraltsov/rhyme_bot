const { VOWELS } = require('../common/constants');

const findVowelsNums = word => {
  const stringOfVowels = VOWELS.join('');
  const vowelsNums = [];

  word.split('').forEach((el, index) => {
    if (stringOfVowels.includes(el)) vowelsNums.push(index);
  });

  return vowelsNums;
};

module.exports = findVowelsNums;
