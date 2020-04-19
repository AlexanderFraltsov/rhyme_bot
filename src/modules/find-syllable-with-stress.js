const findStressPosition = require('./find-stress-position');
const findVowelsNums = require('./find-vowels-nums');
const getHandledWord = require('./get-handled-word');

module.exports = word => {
  let syllableNum = -1;
  const handledWord = getHandledWord(word);
  const stressPos = findStressPosition(handledWord);
  const vowelsPos = findVowelsNums(handledWord);

  vowelsPos.forEach((pos, index) => {
    if (stressPos === pos + 1) syllableNum = index + 1;
  });

  return syllableNum;
};
