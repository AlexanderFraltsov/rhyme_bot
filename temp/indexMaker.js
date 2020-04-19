const fs = require('fs');

const findVowelsNums = require('../src/modules/find-vowels-nums');
const findSyllableWithStress = require('../src/modules/find-syllable-with-stress');
const findSylPermutations = require('../src/modules/find-syl-permutations');
const getHandledWord = require('../src/modules/get-handled-word');

const indexMaker = (dictionaryFileName, wordsFileName, syllablesFileName) => {
  const termins = fs
    .readFileSync(`${dictionaryFileName}.csv`)
    .toString()
    .split('\n');

  const indexWords = {};
  const indexSyllables = {};

  termins.forEach((termin, index) => {
    const word1 = getHandledWord(termin);

    const vowels1 = findVowelsNums(word1);
    // номер слога, начиная с 0
    const findedSyl = findSyllableWithStress(word1) - 1;

    // позиция предыдущей гласной в слове + 1 : 0
    const startPos = findedSyl !== 0 ? vowels1[findedSyl - 1] + 1 : 0;
    // позиция последующей гласной : конец слова
    const endPos =
      findedSyl !== vowels1.length - 1 ? vowels1[findedSyl + 1] : word1.length;

    const syllables = {};
    indexWords[word1] = syllables;
    const stressedVowelPos = vowels1[findedSyl];
    // цикл для того, чтобы найти все варианты слогов
    for (let j = startPos; j <= stressedVowelPos; j++) {
      for (let k = endPos; k >= stressedVowelPos + 2; k--) {
        const newSyl = word1.slice(j, k);
        if (newSyl.length < 3) continue;
        if (
          (newSyl.length > 4 &&
            (newSyl.includes('ь') || newSyl.includes('ъ'))) ||
          newSyl.length > 5
        ) {
          continue;
        }
        if (
          (endPos - startPos > 4 ||
            (endPos - startPos > 5 &&
              (newSyl.includes('ь') || newSyl.includes('ъ')))) &&
          newSyl.length < 4
        ) {
          continue;
        }

        syllables[newSyl] = 1;
        if (!indexSyllables[newSyl]) {
          indexSyllables[newSyl] = {};
        }
        indexSyllables[newSyl][word1] = 1;
        findSylPermutations(newSyl).forEach(permutation => {
          const _newSyl = permutation;
          syllables[_newSyl] = 1;
          if (!indexSyllables[_newSyl]) {
            indexSyllables[_newSyl] = {};
          }
          indexSyllables[_newSyl][word1] = 1;
        });
      }
    }
    console.log(index);
  });

  const wordsToJSON = JSON.stringify(indexWords);
  fs.writeFileSync(`./files/${wordsFileName}.json`, wordsToJSON);

  const syllablesToJSON = JSON.stringify(indexSyllables);
  fs.writeFileSync(`./files/${syllablesFileName}.json`, syllablesToJSON);
};

// indexMaker('./nouns2', 'wordsNEW-1', 'syllablesNEW');
module.exports = indexMaker;
