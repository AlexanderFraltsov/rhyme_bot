const constants = require('./constants');
const equalLetters = constants.equalLetters;

const checkLetterEqual = (letter1, letter2) => {
	if (letter1 === letter2) return true;
	if ( equalLetters.some( ([firstLetter, secondLetter]) => {
		return (letter1 === firstLetter && letter2 === secondLetter) || (letter1 === secondLetter && letter2 === firstLetter);
	})) return true;

	return false;
}

module.exports = checkLetterEqual;
