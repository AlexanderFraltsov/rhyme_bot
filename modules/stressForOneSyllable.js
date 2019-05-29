let findStressPosition = require('./findStressPosition');
let findVowelsNums = require('./findVowelsNums');

//ставит ударение в слове с одной гласной
function stressForOneSyllable(word) {
	if (findStressPosition(word) === -1) {
		let a = findVowelsNums(word);
		let l = word.length;
		if (a.length === 1) {
			word = word.slice(0, a[0] + 1) + "'" + word.slice(a[0] + 1, l);
		}
		return word;
	}
	return word;
}

module.exports = stressForOneSyllable;