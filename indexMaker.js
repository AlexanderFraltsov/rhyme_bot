const constants = require('./modules/constants');
const vowels = constants.vowels;
const equalLetters = constants.equalLetters;
let findVowelsNums = require('./modules/findVowelsNums');
let getYo = require('./modules/getYo');
let stressForOneSyllable = require('./modules/stressForOneSyllable');
let checkLetterEqual = require('./modules/checkLetterEqual');
let findSyllableWithStress = require('./modules/findSyllableWithStress');


let fs = require('fs');
let termins = fs.readFileSync('./nouns2.csv').toString().split("\n");

//let termins = ['Аз', 'Башма\'к', 'маз', 'о\'дин', 'пржже\'ннка', 'одолже\'ние', 'уваже\'ние', "А'зией","А'зиею","А'зии","А'зию","А'зия","А'нглией","А'нглиею","А'нглии","А'нглию"];


let indexWords = {};
let indexSyllables = {};

	let startI = 0;
	let stopI = termins.length;

	for (let i = startI; i < stopI; i++){
	
		let word1 = termins[i].toLowerCase();


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
	
		let syllables = {};
		indexWords[word1] = syllables;

		let stressedVowelPos = vowels1[findedSyl];
		//цикл для того, чтобы найти все варианты слогов
		for (let j = startPos; j <= stressedVowelPos; j++) {
			for (let k = endPos; k >= stressedVowelPos + 2; k--) {
			
				newSyl = word1.slice(j,k);
				syllables[newSyl] = 1;
				

				if (indexSyllables[newSyl] === undefined) {
					indexSyllables[newSyl] = {};
				}
				
				indexSyllables[newSyl][word1]=1;

				for (let m = 0; m < newSyl.length; m++) {
					eL = giveEqualLetters(newSyl[m]);
					if (!eL[0]) continue;

					for (let l = 0; l < eL.length; l++) {
					if (!eL[l]||newSyl.length<3) continue;

						newSyl=newSyl.replace(newSyl[m], eL[l]);
						syllables[newSyl] = 1;
						if (indexSyllables[newSyl] === undefined) {
							indexSyllables[newSyl] = {};
						}
						indexSyllables[newSyl][word1]=1;
					}
				}
			}
		}


		console.log(i);
	}






words = JSON.stringify(indexWords);
fs.writeFileSync('./files/wordsNEW.json', words);

let syllables = JSON.stringify(indexSyllables);
fs.writeFileSync('./files/syllablesNEW.json', syllables);


//console.log(indexWords);
//console.log(indexSyllables);

function giveEqualLetters(letter) {
	let eqLetter = [];
	for (let i = 0; i < equalLetters.length; i++) {
		if (equalLetters[i][0] === letter) {
			eqLetter.push(equalLetters[i][1]);
		}
		if (equalLetters[i][1] === letter) {
			eqLetter.push(equalLetters[i][0]);
		}
	}
	return eqLetter;
}
