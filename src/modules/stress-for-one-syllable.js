const findStressPosition = require('./find-stress-position');
const findVowelsNums = require('./find-vowels-nums');

const stressForOneSyllable = word => {
  if (findStressPosition(word) !== -1) return word;

  const [positionOfFirstVowel, ...rest] = findVowelsNums(word);
  if (rest.length !== 0) return word;

  return `${word.slice(0, positionOfFirstVowel + 1)}'${word.slice(
    positionOfFirstVowel + 1
  )}`;
};

module.exports = stressForOneSyllable;
