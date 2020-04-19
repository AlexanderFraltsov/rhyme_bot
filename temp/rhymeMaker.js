const fs = require('fs');
const scoreWords = require('../src/modules/score-words');

const findOnlyEndingDiff = (word1, word2) => {
  const maxLength = Math.max(word1.length, word2.length);
  const partOfWord = Math.round(maxLength * 0.4);

  return (
    word1.slice(0, maxLength - partOfWord) ===
    word2.slice(0, maxLength - partOfWord)
  );
};

const rhymeMaker = (wordsFileName, syllablesFileName, rhymesFileName) => {
  const words = JSON.parse(fs.readFileSync(`./files/${wordsFileName}.json`));
  const syllables = JSON.parse(
    fs.readFileSync(`./files/${syllablesFileName}.json`)
  );

  let possibleRhymes = {};
  let t = 0;
  let maxT = 0;

  for (const word in words) {
    if ({}.hasOwnProperty.call(words, word)) {
      maxT++;
    }
  }
  for (const word in words) {
    if ({}.hasOwnProperty.call(words, word)) {
      for (const syl in words[word]) {
        if ({}.hasOwnProperty.call(words[word], syl)) {
          possibleRhymes[word] = syllables[syl];
        }
      }
      const a = [];
      outer: for (const rhyme in possibleRhymes[word]) {
        if (!findOnlyEndingDiff(word, rhyme)) {
          const score = scoreWords(word, rhyme);
          let i = a.length - 1;
          while (i > a.length - 5) {
            if (i < 0) break;
            if (findOnlyEndingDiff(rhyme, a[i].rhyme)) {
              if (a[i].score < score) {
                a[i].rhyme = rhyme;
                a[i].score = score;
              }
              continue outer;
            }
            i--;
          }
          a.push({
            rhyme,
            score
          });
        }
      }
      a.sort((x, y) => y.score - x.score);

      if (a.length > 10) a.length = 10;

      const rhymes = {};
      for (let i = 0; i < a.length; i++) {
        rhymes[a[i].rhyme] = a[i].score;
      }
      possibleRhymes[word] = rhymes;
      t++;
      console.log(t);

      if (t % 50000 === 0) {
        const index = t / 50000;
        const rhymesToJSON = JSON.stringify(possibleRhymes);
        fs.writeFileSync(
          `./files/${rhymesFileName}${index}.json`,
          rhymesToJSON
        );
        possibleRhymes = {};

      }
      if (t === maxT) {
        const index = 'Last';
        const rhymesToJSON = JSON.stringify(possibleRhymes);
        fs.writeFileSync(
          `./files/${rhymesFileName}${index}.json`,
          rhymesToJSON
        );
        possibleRhymes = {};
      }
    }
  }
};

// rhymeMaker('wordsNEW', 'syllablesNEW', 'rhymes');
module.exports = rhymeMaker;
