import { findVowelsNums } from './find-vowels-nums';

export const wordDivide = (word: string): string[] => {
  const matchedWord = word.toLowerCase();
  const vowelsNums = findVowelsNums(matchedWord);

  return vowelsNums
    .map((vowel, index, array) => {
      const previousVowel = array[index - 1];
      if (previousVowel === undefined) return 0;
      if (vowel - previousVowel === 1) return vowel;
      if (vowel - previousVowel === 2) return previousVowel + 1;
      return previousVowel + 2;
    })
    .map((start, index, array) => {
      const end =
        array[index + 1] !== undefined
          ? array[index + 1] - 1
          : matchedWord.length - 1;
      return [start, end];
    })
    .map(([start, end]) => matchedWord.slice(start, end + 1));
};
