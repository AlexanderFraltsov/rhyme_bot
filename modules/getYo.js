let findStressPosition = require('./findStressPosition');
//Add accent for 'ё', if there is no accent
function getYo (word) {
	if (findStressPosition(word)===-1) {
        word = word.replace("ё", "ё'");
	}
	return word;
}

module.exports = getYo;
