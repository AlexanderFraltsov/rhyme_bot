import { EQUAL_LETTERS } from '../common/constants';

const giveEqualLetters = (letter: string) => {
  const eqLetter = [letter];
  EQUAL_LETTERS.forEach(pair => {
    if (pair[0] === letter) {
      eqLetter.push(pair[1]);
    }
    if (pair[1] === letter) {
      eqLetter.push(pair[0]);
    }
  });
  return eqLetter;
};

export const findSylPermutations = (syl: string): string[] => {
  let permutations: [word: string, score: number][] = [];
  syl.split('').forEach((letterOfSyl, index) => {
    const el = giveEqualLetters(letterOfSyl);
    if (index) {
      const permutations_old = permutations;
      permutations = [];
      el.forEach(letter => {
        permutations_old.forEach(x => {
          let score = letter === letterOfSyl ? 0 : 1;
          score += x[1];
          if (score < 3) {
            permutations.push([x[0] + letter, score]);
          }
        });
      });
    } else {
      el.forEach(letter => {
        const score = letter === letterOfSyl ? 0 : 1;
        permutations.push([letter, score]);
      });
    }
  });

  return permutations.map(([first]) => first);
};
