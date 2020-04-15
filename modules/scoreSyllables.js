const checkLetterEqual = require('./checkLetterEqual');
const findStressPosition = require('./findStressPosition');
const findVowelsNums = require('./findVowelsNums');

/*вспомогательная функция, перебирает буквы, сравнивает,
начисляет очки, чтобы не повторять код, это жесть конечно*/
const addScores = ({startI, endI, startJ, endJ, syl1, syl2, scoreMultiplier}) => {
	let addScore = 0;
	for (let i = startI; i < endI; i++) {
		for (let j = startJ; j < endJ; j++) {
			if ( checkLetterEqual(syl1[i], syl1[i - 1]) ) break;
			if ( checkLetterEqual(syl2[j], syl2[j - 1]) ) continue;
			if ( syl1[i] === syl2[j] ) {
				addScore += 1.5 * scoreMultiplier;
				break;
			}
			if ( checkLetterEqual(syl1[i], syl2[j]) ) {
				addScore += scoreMultiplier;
				break;
			}
		}
	}
	return addScore;
}

//начисляет очки за совпадение слогов
const scoreSyllables = (syl1, syl2) => {
	let score = 0;

	//мощь гласных и согласных
	const vowelWeight = 3;
	const consonantWeight = vowelWeight / 3;
	//предусмотрим ситуацию когда слог сравнивается с undefined
	let syl1mod = syl1 || '';
	let syl2mod = syl2 || '';

	if (findStressPosition(syl1) !== -1) {
		syl1mod = syl1.replace("'", "");
		syl2mod = syl2.replace("'", "");
	}
	const [vowel1] = findVowelsNums(syl1mod);
	const [vowel2] = findVowelsNums(syl2mod);
	//счет для гласных
	if ( checkLetterEqual(syl1mod[vowel1], syl2mod[vowel2]) ) {
		score += vowelWeight;
	}
	if ( syl1mod[vowel1] === syl2mod[vowel2] ) {
		score += vowelWeight / 4;
	}
	//для согласных до
	conditionsPrefix = 	{
		startI: 0,
		endI: vowel1,
		startJ: 0,
		endJ: vowel2,
		syl1: syl1mod,
		syl2: syl2mod,
		scoreMultiplier: consonantWeight
	};
	//для согласных после
	conditionsPostfix = {
		startI: vowel1 + 1,
		endI: syl1mod.length,
		startJ: vowel2 + 1, endJ:
		syl2mod.length,
		syl1: syl1mod,
		syl2: syl2mod,
		scoreMultiplier: consonantWeight
	};
	//для согласных до-после
	conditionsPrePostfix = {
		startI: 0,
		endI: vowel1,
		startJ: vowel2 + 1,
		endJ: syl2mod.length,
		syl1: syl1mod,
		syl2: syl2mod,
		scoreMultiplier: consonantWeight / 4
	};
	//для согласных после-до
	conditionsPostPrefix = {
		startI: vowel1 + 1,
		endI: syl1mod.length,
		startJ: 0,
		endJ: vowel2,
		syl1: syl1mod,
		syl2: syl2mod,
		scoreMultiplier: consonantWeight / 4
	};

	score += addScores(conditionsPrefix) + addScores(conditionsPostfix) + addScores(conditionsPrePostfix) + addScores(conditionsPostPrefix);
	return score;
}

module.exports = scoreSyllables;
