/*-----------------------CONSTANTS-----------------------*/
const constants = require('./modules/constants');

const vowels = constants.vowels;
const consonant = constants.consonant;
const otherLetters = constants.otherLetters
const equalLetters = constants.equalLetters;
const alert1 = constants.alert1;

/*-----------------------FUNCTIONS-----------------------*/
let findAccentPosition = require('./modules/findStressPosition');
let getAccent = require('./modules/getStress');
let getYo = require('./modules/getYo');
let checkLetterEqual = require('./modules/checkLetterEqual');
let findVowelsNums = require('./modules/findVowelsNums');
let accentForOneSyllable = require('./modules/stressForOneSyllable');
let findSyllableWithAccent = require('./modules/findSyllableWithStress');
let wordDivide = require('./modules/wordDivide');
let scoreSyllables = require('./modules/scoreSyllables');
let scoreWords = require('./modules/scoreWords');

/*загружаем словарь ударений, выделяем из него термины в массив - termins (пока что массив для отладки)*/
let fs = require('fs');

function readListOfWords(filename, callback) {

	let listOfWords;
	fs.readFile(filename, function (error, data) {
		if (error) {
			throw error;
		}
		listOfWords = data.toString().split("\r\n");
		
		callback(listOfWords);
	});
}

let termins = ["нарко'тик", "ко'тик", "сапо'г", "кра'н", "шлакобло'к", "суббо'тник", "мо'тик", "ко'тики"];
//termins = fs.readFileSync('./nouns-2.txt').toString().split("\r\n");

/*-------------------------------------------------------*/

//получаем слово - word - от пользователя (пока что задаем сами)
let receivedWord = "КОТИК";
/* = prompt('введи свое слово, щенок', 'котик');*/

receivedWord = receivedWord.toLowerCase();

//предусматриваем слово с "ё" - ударение всегда падает на него
receivedWord = getYo(receivedWord);

//если в слове одна гласная, ставим на неё ударение
receivedWord = accentForOneSyllable(receivedWord);

//заменяем слово на слово с ударением (из словаря)
if (findAccentPosition(receivedWord) === -1) {
	//производим поиск слова в словаре (там оно с ударением) и записываемв переменную, чтобы не искать дважды
	receivedWord = getAccent(receivedWord, termins);
}

//если его нет, или спрашиваем, на какой оно слог
if (findAccentPosition(receivedWord) === -1) {
	console.log(alert1);
}
console.log(receivedWord);
console.log(termins);
getRhyme (termins);
//let low = readListOfWords('./nouns-2.txt', getRhyme);

let rhyme = "no";

function getRhyme (termins) {
	let max = 0;
	let rhyme = "no";
	for (let i = 0; i < termins.length; i++) {
		if (receivedWord === termins[i]) continue;
		let termin = termins[i];
		if (findAccentPosition(termin) === -1) {
			termin = getYo(termin);
			termin = accentForOneSyllable(termin);
		}

		let score = scoreWords(receivedWord, termin);
		if (score > max) {
			max = score;
			rhyme = termin;
		}
	}
	console.log(rhyme);
}

// проверяет, что слова отличаются только окончаниями
function findOnlyEndingDiff (word1, word2) {
	let l = word1.length;
	if (l < word2.length) l = word2.length;
	if (word1.slice(0,l-3) === word2.slice(0,l-3)) {
		return true;
	}
	return false;
}
/*допустить чтобы нь/ль/вь/дь/жь/мь/зь/рь в середине слова читались как слог, и нет одновременно???*/