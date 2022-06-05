import { findStressPosition } from './find-stress-position';
import { findVowelsNums } from './find-vowels-nums';
import { getHandledWord } from './get-handled-word';

export const findSyllableWithStress = (word: string): number => {
  let syllableNum = -1;
  const handledWord = getHandledWord(word);
  const stressPos = findStressPosition(handledWord);
  const vowelsPos = findVowelsNums(handledWord);

  vowelsPos.forEach((pos, index) => {
    if (stressPos === pos + 1) syllableNum = index + 1;
  });

  return syllableNum;
};
