/*function looks up in the dictionary 
to understand where the stress*/
function getStress(word, dictionary) {
	
	let length = word.length;
	for (let i = 0; i < dictionary.length; i++) {
		if (word.length !== dictionary[i].length - 1) continue;
		let dictWord = dictionary[i].replace("'", "");
		if (word === dictWord) {
			word = dictionary[i]; 
			break;
		}
	}
	return word;
}

module.exports = getStress;