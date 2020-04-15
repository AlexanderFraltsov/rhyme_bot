const wordDivide = require('./wordDivide');
const findSyllableWithStress = require('./findSyllableWithStress');
const scoreSyllables = require('./scoreSyllables');
const findStressPosition = require('./findStressPosition');

//начисляет очки за совпадение слов
const scoreWords = (word1,word2) => {
  let score = 0;

  const syllables1 = wordDivide(word1);
  const syllables2 = wordDivide(word2);
  const l1 = syllables1.length;
  const l2 = syllables2.length;

  //ударные слоги
  const stressedSyl1Pos = findSyllableWithStress(word1) - 1;
  const stressedSyl2Pos = findSyllableWithStress(word2) - 1;
  const delta = stressedSyl1Pos - stressedSyl2Pos;

  //сравниваем ударные слоги (увеличивающий коэффициент)
  score += 5 * scoreSyllables(syllables1[stressedSyl1Pos], syllables2[stressedSyl2Pos]);

  //сравниваем слоги после (!!цикл для большего количества слогов)
  if (l1-stressedSyl1Pos >= l2-stressedSyl2Pos) {
    for (let i = stressedSyl1Pos + 1; i < l1; i++) {
      score += scoreSyllables(syllables1[i], syllables2[i - delta] || '');
    }
  } else {
    for (let i = stressedSyl2Pos + 1; i < l2; i++) {
      score += scoreSyllables(syllables1[i + delta] || '', syllables2[i]);
    }
  }
  //сравниваем слоги до
  if (stressedSyl1Pos >= stressedSyl2Pos) {
    for (let i = stressedSyl1Pos - 1; i >= 0; i--) {
      score += scoreSyllables(syllables1[i], syllables2[i - delta] || '');
    }
  } else {
    for (let i = stressedSyl2Pos - 1; i >= 0; i--) {
      score += scoreSyllables(syllables1[i + delta] || '', syllables2[i]);
    }
  }

  //штрафуем за количество слогов
  score -= Math.abs(l1 - l2) * 2;

  //штрафуем за лишние(недостающие) буквы после гласной в последнем слоге
  ending1 = word1.slice(findStressPosition(word1) + 1);
  ending2 = word2.slice(findStressPosition(word2) + 1);
  score -= Math.abs(ending1.length - ending2.length) * 0.25;

  return score;
};

module.exports = scoreWords;
