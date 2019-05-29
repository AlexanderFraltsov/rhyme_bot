const constants = require('./constants');
const equalLetters = constants.equalLetters;
let checkLetterEqual = require('./checkLetterEqual');
let findStressPosition = require('./findStressPosition');
let findVowelsNums = require('./findVowelsNums');

//начисляет очки за совпадение слогов
function scoreSyllables(syl1, syl2) {
	let score = 0;
	
	//мощь гласных и согласных
	let vowelWeight = 3;
	let consonantWeight = vowelWeight / 3;
	//предусмотрим ситуацию когда слог сравнивается с undefined
	let syl1mod = syl1 || '';
	let syl2mod = syl2 || '';

	if (findStressPosition(syl1)!==-1) {
		syl1mod = syl1.replace("'", "");
		syl2mod = syl2.replace("'", "");
	}
	let vowel1 = findVowelsNums(syl1mod)[0];
	let vowel2 = findVowelsNums(syl2mod)[0];
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
		startI: vowel1+1, 
		endI: syl1mod.length, 
		startJ: vowel2+1, endJ: 
		syl2mod.length, 
		syl1: syl1mod, 
		syl2: syl2mod, 
		scoreMultiplier: consonantWeight
	};
	//для согласных до-после
	conditionsPrePostfix = {
		startI: 0, 
		endI: vowel1, 
		startJ: vowel2+1, 
		endJ: syl2mod.length, 
		syl1: syl1mod, 
		syl2: syl2mod, 
		scoreMultiplier: consonantWeight / 4
	};
	//для согласных после-до
	conditionsPostPrefix = {
		startI: vowel1+1, 
		endI: syl1mod.length, 
		startJ: 0, endJ: vowel2, 
		syl1: syl1mod, 
		syl2: syl2mod, 
		scoreMultiplier: consonantWeight / 4
	};

	score += addScores(conditionsPrefix) + addScores(conditionsPostfix) + addScores(conditionsPrePostfix) + addScores(conditionsPostPrefix);
	return score;
}

/*вспомогательная функция, перебирает буквы, сравнивает, 
начисляет очки, чтобы не повторять код*/
function addScores(obj) {
	let addScore = 0;
	for (let i = obj.startI; i < obj.endI; i++) {
		for (let j = obj.startJ; j < obj.endJ; j++) {
			if ( checkLetterEqual(obj.syl1[i], obj.syl1[i - 1]) ) break;
			if ( checkLetterEqual(obj.syl2[j], obj.syl2[j - 1]) ) continue;
			if ( obj.syl1[i] === obj.syl2[j] ) {
				addScore += 1.5 * obj.scoreMultiplier;
				break;
			}
			if ( checkLetterEqual(obj.syl1[i],obj.syl2[j]) ) {
				addScore += obj.scoreMultiplier;
				break;
			}
		}
	}
	return addScore;
}

module.exports = scoreSyllables;