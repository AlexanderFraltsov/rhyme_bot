//looking for the position of accent in the word
function findStressPosition(word) {
	stressPos = word.indexOf("'");
	return stressPos;
}

module.exports = findStressPosition;