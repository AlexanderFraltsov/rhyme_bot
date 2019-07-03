/*function looks up in the dictionary {}
to understand where the stress*/

let findVowelsNums = require('./findVowelsNums');


function getStress(word, dictionary) {

  let vowels = findVowelsNums(word);
  for (let i = 0; i <= vowels.length; i++){
    let wordVar = word.slice(0, vowels[i] + 1) + "'" + word.slice(vowels[i] + 1);
    if (dictionary[wordVar]!==undefined) {
      word = wordVar;
      break;
    }
  }
  return word;
}

module.exports = getStress;