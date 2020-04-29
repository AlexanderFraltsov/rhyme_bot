const wordDivide = require('./word-divide');
const findSyllableWithStress = require('./find-syllable-with-stress');
const scoreSyllables = require('./score-syllables');
const findStressPosition = require('./find-stress-position');

const MULTIPLIER_STRESSED_SYLLABLE = 5;
const MULTIPLIER_EXCESS_SYLLABLES = 2;
const MULTIPLIER_EXCESS_LETTERS = 0.25;

const findEnding = word => word.slice(findStressPosition(word) + 1);

const findEndingLengthsDifference = (word1, word2) =>
  Math.abs(findEnding(word1).length - findEnding(word2).length);

const findSyllablesQuantityDifference = (word1, word2) =>
  Math.abs(wordDivide(word1).length - wordDivide(word2).length);

const getScoresForNonStressedSyllables = (
  slblsMany,
  stressedManyPos,
  slblsFew,
  stressedFewPos,
  isSyllablesBefore
) => {
  let score = 0;
  if (isSyllablesBefore) {
    slblsMany
      .filter((el, index) => index < stressedManyPos)
      .reverse()
      .forEach((syl, index) => {
        score += scoreSyllables(syl, slblsFew[stressedFewPos - 1 - index]);
      });
  } else {
    slblsMany
      .filter((el, index) => index > stressedManyPos)
      .forEach((syl, index) => {
        score += scoreSyllables(syl, slblsFew[stressedFewPos + 1 + index]);
      });
  }
  return score;
};

const scoreOtherSylls = (word1, word2) => {
  const sylls1 = wordDivide(word1);
  const sylls2 = wordDivide(word2);

  const positionStressedSyl1 = findSyllableWithStress(word1) - 1;
  const positionStressedSyl2 = findSyllableWithStress(word2) - 1;

  let score = 0;

  if (
    sylls1.length - sylls2.length >=
    positionStressedSyl1 - positionStressedSyl2
  ) {
    score += getScoresForNonStressedSyllables(
      sylls1,
      positionStressedSyl1,
      sylls2,
      positionStressedSyl2,
      false
    );
  } else {
    score += getScoresForNonStressedSyllables(
      sylls2,
      positionStressedSyl2,
      sylls1,
      positionStressedSyl1,
      false
    );
  }

  if (positionStressedSyl1 >= positionStressedSyl2) {
    score += getScoresForNonStressedSyllables(
      sylls1,
      positionStressedSyl1,
      sylls2,
      positionStressedSyl2,
      true
    );
  } else {
    score += getScoresForNonStressedSyllables(
      sylls2,
      positionStressedSyl2,
      sylls1,
      positionStressedSyl1,
      true
    );
  }
  return score;
};

const scoreStressedSylls = (word1, word2) => {
  const syllables1 = wordDivide(word1);
  const syllables2 = wordDivide(word2);

  const stressedSylPos1 = findSyllableWithStress(word1) - 1;
  const stressedSylPos2 = findSyllableWithStress(word2) - 1;

  const stressedSyl1 = syllables1[stressedSylPos1];
  const stressedSyl2 = syllables2[stressedSylPos2];

  return (
    MULTIPLIER_STRESSED_SYLLABLE * scoreSyllables(stressedSyl1, stressedSyl2)
  );
};

const scoreWords = (word1, word2) =>
  scoreStressedSylls(word1, word2) +
  scoreOtherSylls(word1, word2) -
  findSyllablesQuantityDifference(word1, word2) * MULTIPLIER_EXCESS_SYLLABLES -
  findEndingLengthsDifference(word1, word2) * MULTIPLIER_EXCESS_LETTERS;

module.exports = scoreWords;
