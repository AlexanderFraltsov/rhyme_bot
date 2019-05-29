const constants = require('./constants');
const equalLetters = constants.equalLetters;

//checks whether the letters are equivalent in sound
function checkLetterEqual(letter1, letter2) {
	if (letter1 === letter2) return true;	
	for (let i = 0; i < equalLetters.length; i++) {
		if ((letter1 === equalLetters[i][0] && letter2 === equalLetters[i][1]) ||
			(letter1 === equalLetters[i][1] && letter2 === equalLetters[i][0])) return true;
	} 
	return false;
}

module.exports = checkLetterEqual;