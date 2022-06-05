import { VOWELS } from '../common/constants';

export const findVowelsNums = (word: string): number[] => {
  const stringOfVowels = VOWELS.join('');
  return word
    .split('')
    .map((letter, index) => stringOfVowels.includes(letter) ? index : null)
    .filter(letterNumber => letterNumber !== null);
};
