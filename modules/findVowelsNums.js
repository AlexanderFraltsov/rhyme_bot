const { vowels } = require('./constants');

module.exports = (word) => {
	const stringOfVowels = vowels.join('');
	const vowelsNums = [];

	word.split('').forEach( (el, index) => {
		if ( ~stringOfVowels.indexOf(el) ) vowelsNums.push(index);
	})

	return vowelsNums;
};
