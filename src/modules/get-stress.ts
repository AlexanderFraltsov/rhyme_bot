import { findVowelsNums } from './find-vowels-nums';

export const getStress = (word: string, dictionary: string[]) => {
  const vowels = findVowelsNums(word);

  for (let i = 0; i <= vowels.length; i++) {
    const wordVar = `${word.slice(0, vowels[i] + 1)}'${word.slice(
      vowels[i] + 1
    )}`;
    if (dictionary[wordVar]) return wordVar;
  }

  return word;
};
