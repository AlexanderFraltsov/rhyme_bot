/*function looks up in the dictionary {}
to understand where the stress*/
const findVowelsNums = require('./findVowelsNums');

module.exports = (word, dictionary) => {

  const vowels = findVowelsNums(word);

  for (let i = 0; i <= vowels.length; i++) {
    const wordVar = word.slice(0, vowels[i] + 1) + "'" + word.slice(vowels[i] + 1);
    if (dictionary[wordVar]) return wordVar;
  }

  return word;
};
