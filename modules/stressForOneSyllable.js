const findStressPosition = require('./findStressPosition');
const findVowelsNums = require('./findVowelsNums');

module.exports = (word) => {
	if (findStressPosition(word) !== -1) return word;

	const [positionOfFirstVowel, ...rest] = findVowelsNums(word);
	if (rest.length !== 0) return word;

	return word.slice(0, positionOfFirstVowel + 1) + "'" + word.slice(positionOfFirstVowel + 1);
};
