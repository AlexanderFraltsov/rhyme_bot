const constants = require('./modules/constants');
const vowels = constants.vowels;
let findVowelsNums = require('./modules/findVowelsNums');
let getYo = require('./modules/getYo');
let stressForOneSyllable = require('./modules/stressForOneSyllable');

let findSyllableWithStress = require('./modules/findSyllableWithStress');


let fs = require('fs');
let termins = fs.readFileSync('./nouns.csv').toString().split("\r\n");

//let termins = ['аз', 'башма\'к', 'маз', 'о\'дин', 'пржже\'ннка', 'одолже\'ние', 'уваже\'ние', "А'зией","А'зиею","А'зии","А'зию","А'зия","А'нглией","А'нглиею","А'нглии","А'нглию"];

let indexWords = {};
let indexSyllables = {};

//termins.length
function indexWordsForming (startI,stopI) {
	for (let i = startI; i < stopI; i++){
	
		let word1 = termins[i];

		word1 = getYo(word1);
		word1 = stressForOneSyllable(word1);
		let vowels1 = findVowelsNums(word1);
		let startPos = 0;
		let findedSyl = findSyllableWithStress(word1)-1;
		if (findedSyl !== 0) {
			startPos = vowels1[findedSyl-1]+1;
		}
		let endPos = word1.length;
		if (findedSyl !== vowels1.length-1) {
			endPos = vowels1[findedSyl+1];
		}
		let syl1 = word1.slice(startPos,endPos);
	
		//let words = [];
		//words.push(word1);
		//indexSyllables[syl1] = words;

		let syllables = [];
		syllables.push(syl1);
		indexWords[word1] = syllables;

		let stressedVowelPos = vowels1[findedSyl];
		//цикл для того, чтобы найти все варианты слогов
		for (let j = startPos; j <= stressedVowelPos; j++) {
			for (let k = endPos; k>=stressedVowelPos+2;k--) {
				newSyl = word1.slice(j,k);
				if (syllables.indexOf(newSyl) !== -1) {continue;}
				syllables.push(newSyl);
				indexWords[word1] = syllables;
			/*
			if (indexSyllables[newSyl] !== undefined) {
				if (indexSyllables[newSyl].indexOf(word1) !== -1) {continue;}
				words = indexSyllables[newSyl];
				words.push(word1);
			}
			indexSyllables[newSyl] = words;*/
			}
		}
		console.log(i);
	
	}
	return indexWords;
}




indexWords=indexWordsForming(100000,200000);
words = JSON.stringify(indexWords);
fs.writeFileSync('./files/words2.json', words);


//let syllables = JSON.stringify(indexSyllables);



//fs.writeFileSync('./files/syllables.json', syllables);