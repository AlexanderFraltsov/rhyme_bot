import { findStressPosition } from './find-stress-position';
import { findVowelsNums } from './find-vowels-nums';

export const stressForOneSyllable = (word: string): string => {
  if (findStressPosition(word) !== -1) {
    return word;
  }

  const [positionOfFirstVowel, ...rest] = findVowelsNums(word);
  if (rest.length !== 0) {
    return word;
  }

  return `${word.slice(0, positionOfFirstVowel + 1)}'${word.slice(
    positionOfFirstVowel + 1
  )}`;
};

