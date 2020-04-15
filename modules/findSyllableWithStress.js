const findStressPosition = require('./findStressPosition');
const stressForOneSyllable = require('./stressForOneSyllable');
const getYo = require('./getYo');
const findVowelsNums = require('./findVowelsNums');

module.exports = (word) => {
	let syllableNum = -1;
	word = stressForOneSyllable(word);
	word = getYo(word);
	const stressPos = findStressPosition(word);
	const vowelsPos = findVowelsNums(word);

	vowelsPos.forEach((pos, index) => {
		if (stressPos === pos + 1) syllableNum = index + 1;
	});

	return syllableNum;
};
