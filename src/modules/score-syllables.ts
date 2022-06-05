import { checkLettersEqual } from './check-letters-equal';
import { findVowelsNums } from './find-vowels-nums';

const VOWELS_WEIGHT = 3;
const VOWELS_MULTIPLIER = 1.25;

const CONSONANTS_WEIGHT = VOWELS_WEIGHT / 3;
const CONSONANTS_MULTIPLIER = 1.5;

const compare = (sym1: string, sym2: string, weight: number, strongEqualMultiplier: number): number => {
  if (sym1 === sym2) {
    return strongEqualMultiplier * weight;
  }
  if (checkLettersEqual(sym1, sym2)) {
    return weight;
  }
  return 0;
};

const consonantsCheck = ({ toCompare, weight }: { toCompare: string[]; weight: number }): number => {
  const [first, second] = toCompare;
  let score = 0;

  first.split('').forEach(symbol1 => {
    second.split('').forEach(symbol2 => {
      score += compare(symbol1, symbol2, weight, CONSONANTS_MULTIPLIER);
    });
  });

  return score;
};

export const scoreSyllables = (syl1: string, syl2: string): number => {
  if (!syl1 || !syl2) return 0;

  const [vowel1Pos] = findVowelsNums(syl1);
  const [vowel2Pos] = findVowelsNums(syl2);

  const VOWEL1 = syl1[vowel1Pos];
  const VOWEL2 = syl2[vowel2Pos];

  const CONSONANTS_BEFORE_1 = syl1.slice(0, vowel1Pos);
  const CONSONANTS_BEFORE_2 = syl2.slice(0, vowel2Pos);
  const CONSONANTS_AFTER_1 = syl1.slice(vowel1Pos + 1);
  const CONSONANTS_AFTER_2 = syl2.slice(vowel2Pos + 1);

  const conditionsBefore = {
    toCompare: [CONSONANTS_BEFORE_1, CONSONANTS_BEFORE_2],
    weight: CONSONANTS_WEIGHT
  };

  const conditionsAfter = {
    toCompare: [CONSONANTS_AFTER_1, CONSONANTS_AFTER_2],
    weight: CONSONANTS_WEIGHT
  };

  const conditionsBeforeAfter = {
    toCompare: [CONSONANTS_BEFORE_1, CONSONANTS_AFTER_2],
    weight: CONSONANTS_WEIGHT / 4
  };

  const conditionsAfterBefore = {
    toCompare: [CONSONANTS_AFTER_1, CONSONANTS_BEFORE_2],
    weight: CONSONANTS_WEIGHT / 4
  };

  return (
    compare(VOWEL1, VOWEL2, VOWELS_WEIGHT, VOWELS_MULTIPLIER) +
    consonantsCheck(conditionsBefore) +
    consonantsCheck(conditionsAfter) +
    consonantsCheck(conditionsBeforeAfter) +
    consonantsCheck(conditionsAfterBefore)
  );
};
