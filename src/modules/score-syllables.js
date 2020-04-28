const checkLettersEqual = require('./check-letters-equal');
const findVowelsNums = require('./find-vowels-nums');

const VOWELS_WEIGHT = 3;
const CONSONANTS_WEIGHT = VOWELS_WEIGHT / 3;

const addScores = ({ toCompare, scoreMultiplier }) => {
  const [first, second] = toCompare;
  let addScore = 0;

  first.split('').forEach(symbol1 => {
    second.split('').forEach(symbol2 => {
      if (symbol1 === symbol2) {
        addScore += 1.5 * scoreMultiplier;
      } else if (checkLettersEqual(symbol1, symbol2)) {
        addScore += scoreMultiplier;
      }
    });
  });

  return addScore;
};

const scoreSyllables = (syl1, syl2) => {
  if (!syl1 || !syl2) return 0;

  let score = 0;

  const [vowel1Pos] = findVowelsNums(syl1);
  const [vowel2Pos] = findVowelsNums(syl2);

  const vowel1 = syl1[vowel1Pos];
  const vowel2 = syl2[vowel2Pos];

  if (vowel1 === vowel2) {
    score += 1.25 * VOWELS_WEIGHT;
  } else if (checkLettersEqual(vowel1, vowel2)) {
    score += VOWELS_WEIGHT;
  }

  const CONSONANTS_BEFORE_1 = syl1.slice(0, vowel1Pos);
  const CONSONANTS_BEFORE_2 = syl2.slice(0, vowel2Pos);
  const CONSONANTS_AFTER_1 = syl1.slice(vowel1Pos + 1);
  const CONSONANTS_AFTER_2 = syl2.slice(vowel2Pos + 1);
  // before
  const conditionsPrefix = {
    toCompare: [CONSONANTS_BEFORE_1, CONSONANTS_BEFORE_2],
    scoreMultiplier: CONSONANTS_WEIGHT
  };
  // after
  const conditionsPostfix = {
    toCompare: [CONSONANTS_AFTER_1, CONSONANTS_AFTER_2],
    scoreMultiplier: CONSONANTS_WEIGHT
  };
  // 1 - before, 2 - after
  const conditionsPrePostfix = {
    toCompare: [CONSONANTS_BEFORE_1, CONSONANTS_AFTER_2],
    scoreMultiplier: CONSONANTS_WEIGHT / 4
  };
  // 1 - after, 2 - before
  const conditionsPostPrefix = {
    toCompare: [CONSONANTS_AFTER_1, CONSONANTS_BEFORE_2],
    scoreMultiplier: CONSONANTS_WEIGHT / 4
  };

  score +=
    addScores(conditionsPrefix) +
    addScores(conditionsPostfix) +
    addScores(conditionsPrePostfix) +
    addScores(conditionsPostPrefix);

  return score;
};

module.exports = scoreSyllables;
