let findStressPosition = require('./findStressPosition');
//Add accent for 'ё', if there is no accent
function getYo (word) {
	if (findStressPosition(word)===-1) {
		for (let i = 0; i < word.length; i++) {
			if (word[i] === 'ё') {
				word = word.replace("ё", "ё'");
				break;
			}
		}
		return word;
	}
	return word;
}

module.exports = getYo;