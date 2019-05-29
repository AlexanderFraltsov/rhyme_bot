let wordDivide = require('./wordDivide');
let findSyllableWithStress = require('./findSyllableWithStress');
let scoreSyllables = require('./scoreSyllables');

//начисляет очки за совпадение слов
function scoreWords(word1,word2) {
	let score = 0;
	let syllables1 = wordDivide(word1);
	let syllables2 = wordDivide(word2);
	let l1 = syllables1.length;
	let l2 = syllables2.length;

	//ударные слоги
	let stressedSyl1Pos = findSyllableWithStress(word1) - 1;
	let stressedSyl2Pos = findSyllableWithStress(word2) - 1;
	let delta = stressedSyl1Pos - stressedSyl2Pos;
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
	return score;
}

module.exports = scoreWords;