const checkLettersEqual = require('./check-letters-equal');
const findStressPosition = require('./find-stress-position');
const findVowelsNums = require('./find-vowels-nums');

/* вспомогательная функция, перебирает буквы, сравнивает,
начисляет очки, чтобы не повторять код (sic!) */
const addScores = ({
  startI,
  endI,
  startJ,
  endJ,
  syl1,
  syl2,
  scoreMultiplier
}) => {
  let addScore = 0;
  for (let i = startI; i < endI; i++) {
    for (let j = startJ; j < endJ; j++) {
      if (checkLettersEqual(syl1[i], syl1[i - 1])) break;
      if (checkLettersEqual(syl2[j], syl2[j - 1])) continue;
      if (syl1[i] === syl2[j]) {
        addScore += 1.5 * scoreMultiplier;
        break;
      }
      if (checkLettersEqual(syl1[i], syl2[j])) {
        addScore += scoreMultiplier;
        break;
      }
    }
  }
  return addScore;
};

// начисляет очки за совпадение слогов
const scoreSyllables = (syl1, syl2) => {
  let score = 0;

  // мощь гласных и согласных
  const vowelWeight = 3;
  const consonantWeight = vowelWeight / 3;
  // предусмотрим ситуацию когда слог сравнивается с undefined
  let syl1mod = syl1 || '';
  let syl2mod = syl2 || '';

  if (findStressPosition(syl1) !== -1) {
    syl1mod = syl1.replace("'", '');
    syl2mod = syl2.replace("'", '');
  }
  const [vowel1] = findVowelsNums(syl1mod);
  const [vowel2] = findVowelsNums(syl2mod);
  // счет для гласных
  if (checkLettersEqual(syl1mod[vowel1], syl2mod[vowel2])) {
    score += vowelWeight;
  }
  if (syl1mod[vowel1] === syl2mod[vowel2]) {
    score += vowelWeight / 4;
  }
  // для согласных до
  const conditionsPrefix = {
    startI: 0,
    endI: vowel1,
    startJ: 0,
    endJ: vowel2,
    syl1: syl1mod,
    syl2: syl2mod,
    scoreMultiplier: consonantWeight
  };
  // для согласных после
  const conditionsPostfix = {
    startI: vowel1 + 1,
    endI: syl1mod.length,
    startJ: vowel2 + 1,
    endJ: syl2mod.length,
    syl1: syl1mod,
    syl2: syl2mod,
    scoreMultiplier: consonantWeight
  };
  // для согласных до-после
  const conditionsPrePostfix = {
    startI: 0,
    endI: vowel1,
    startJ: vowel2 + 1,
    endJ: syl2mod.length,
    syl1: syl1mod,
    syl2: syl2mod,
    scoreMultiplier: consonantWeight / 4
  };
  // для согласных после-до
  const conditionsPostPrefix = {
    startI: vowel1 + 1,
    endI: syl1mod.length,
    startJ: 0,
    endJ: vowel2,
    syl1: syl1mod,
    syl2: syl2mod,
    scoreMultiplier: consonantWeight / 4
  };

  score +=
    addScores(conditionsPrefix) +
    addScores(conditionsPostfix) +
    addScores(conditionsPrePostfix) +
    addScores(conditionsPostPrefix);
  return score;
};

module.exports = scoreSyllables;
