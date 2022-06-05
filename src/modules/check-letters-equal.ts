import { EQUAL_LETTERS } from '../common/constants';

export const checkLettersEqual = (letter1: string, letter2: string) => {
  return (letter1 === letter2) ? true : EQUAL_LETTERS.some(
    (equals: string) => {
      const firstLetter = equals[0];
      const secondLetter = equals[1];

      return (letter1 === firstLetter && letter2 === secondLetter) ||
      (letter1 === secondLetter && letter2 === firstLetter)
    }
  );
};
