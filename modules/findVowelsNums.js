const constants = require('./constants');
const vowels = constants.vowels;

//создаёт массив с позициями гласных букв в слове
function findVowelsNums(word) {
	const a = vowels.join("");
	let vowelsNums = [];
	for (let i = 0; i < word.length; i++) {
		if ( ~a.indexOf(word[i]) ) {
			vowelsNums.push(i);
		}
	}
	return vowelsNums;
}

module.exports = findVowelsNums;