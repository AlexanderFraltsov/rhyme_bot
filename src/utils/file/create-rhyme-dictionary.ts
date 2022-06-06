import { scoreWords } from '../../modules';

import * as fs from 'fs';

const findOnlyEndingDiff = (word1: string, word2: string): boolean => {
  const maxLength = Math.max(word1.length, word2.length);
  const partOfWord = Math.round(maxLength * 0.4);

  return (
    word1.slice(0, maxLength - partOfWord) ===
    word2.slice(0, maxLength - partOfWord)
  );
};

export const createRhymeDictionary = (filespath: string, wordsFileName: string, syllablesFileName: string, rhymesFileName: string): void => {
  const words = JSON.parse(fs.readFileSync(`${filespath}/${wordsFileName}.json`).toString());
  const syllables = JSON.parse(
    fs.readFileSync(`${filespath}/${syllablesFileName}.json`).toString()
  );

  let possibleRhymes: {[word: string]: { [rhyme: string]: number }} = {};
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
      const a: { rhyme: string; score: number }[] = [];
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

      if (a.length > 10) {
        a.length = 10;
      }

      const rhymes: { [rhyme: string]: number } = {};
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
          `${filespath}/${rhymesFileName}${index}.json`,
          rhymesToJSON
        );
        possibleRhymes = {};

      }
      if (t === maxT) {
        const index = 'Last';
        const rhymesToJSON = JSON.stringify(possibleRhymes);
        fs.writeFileSync(
          `${filespath}/${rhymesFileName}${index}.json`,
          rhymesToJSON
        );
        possibleRhymes = {};
      }
    }
  }
};

// createRhymeDictionary('filepath','wordsNEW', 'syllablesNEW', 'rhymes');
