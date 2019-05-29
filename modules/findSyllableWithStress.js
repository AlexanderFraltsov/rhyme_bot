let findStressPosition = require('./findStressPosition');
let stressForOneSyllable = require('./stressForOneSyllable');
let getYo = require('./getYo');
let findVowelsNums = require('./findVowelsNums');

//на какой слог ударение
function findSyllableWithStress(word) {
	let syllableNum = -1;
	word = stressForOneSyllable(word);
	word = getYo(word);
	let stressPos = findStressPosition(word);
	let vowelsPos = findVowelsNums(word);
	for (let i = 0; i < vowelsPos.length; i++) {
		if (stressPos === vowelsPos[i] + 1) {
			syllableNum = i + 1;
			break;
		}  
	}
	return syllableNum;
}

module.exports = findSyllableWithStress;