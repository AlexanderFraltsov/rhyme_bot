import { findStressPosition } from './find-stress-position';

// Add accent for 'ё', if there is no accent
export const getYo = (word: string): string => {
  if (findStressPosition(word) !== -1) return word;
  return word.replace('ё', `ё'`);
};
