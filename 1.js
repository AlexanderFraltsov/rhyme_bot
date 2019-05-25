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

//гласные буквы
const vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я', 'А', 'Е', 'Ё', 'И', 'О', 'У', 'Ы', 'Э', 'Ю', 'Я'];
//согласные буквы
const consonant = ['б', 'в', 'г', 'д', 'ж', 'з', 'й', 'к', 'л', 'м', 'н', 'п', 'р', 'с', 'т', 'ф', 'х', 'ц', 'ч','ш','щ', 'Б', 'В', 'Г', 'Д', 'Ж', 'З', 'Й', 'К', 'Л', 'М', 'Н', 'П', 'Р', 'С', 'Т', 'Ф', 'Х', 'Ц', 'Ч','Ш','Щ'];
//другие буквы
const otherLetters = ['ь', 'ъ', 'Ь', 'Ъ'];

const equalLetters = ['ая', 'оё', 'эе', 'ую', 'иы', 'тд', 'бп', 'вф', 'гк', 'шщ', 'тц', 'нм', 'рл', 'жш', 'жз', 'дз', 'чш', 'сз', 'сш'];

//тревожные фразы
const alert1 = "Уточните, на какой слог приходится ударение в вашем слове (хорошо бы получить число от 1 до 9007199254740992 включительно)";

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

/*function f(termins) {
	for (let i = 0; i<termins.length; i++) {
		console.log(wordDivide(termins[i]));
	}
}*/
	


//выводим рифму (пока просто слово с ударением)
//console.log(getRhyme(receivedWord, termins) + ', ' + receivedWord);
//alert(receivedWord);


/*------------------------ФУНКЦИИ------------------------*/


function getYo (word) {
	if (findAccentPosition(word)===-1) {
		for (let i = 0; i < word.length; i++) {
			if (word[i] === 'ё') {
				word = word.replace("ё", "ё'");
			}
		}
		return word;
	}
	return word;
}

/*ищет слово в словаре, чтобы понять, где в нём ударение*/
function getAccent(word, dictionary) {
	
	let length = word.length;
	for (let i = 0; i < termins.length; i++) {
		//сначала смотрим, что слово в словаре нужной длины
		if (word.length !== dictionary[i].length - 1) continue;
		//убираем ударение из словарного слова и сравниваем
		let dictWord = dictionary[i].replace("'", "");
		if (word === dictWord) {
			word = dictionary[i]; 
			break;
		}
	}
	return word;
}


//начисляет очки за совпадение слов
function scoreWords(word1,word2) {
	let score = 0;
	let syllables1 = wordDivide(word1);
	let syllables2 = wordDivide(word2);
	let l1 = syllables1.length;
	let l2 = syllables2.length;

	//ударные слоги
	let accentedSyl1Pos = findSyllableWithAccent(word1) - 1;
	let accentedSyl2Pos = findSyllableWithAccent(word2) - 1;
	let delta = accentedSyl1Pos - accentedSyl2Pos;
	//сравниваем ударные слоги (увеличивающий коэффициент)
	score += 5 * scoreSyllables(syllables1[accentedSyl1Pos], syllables2[accentedSyl2Pos]);
	//сравниваем слоги после (!!цикл для большего количества слогов)
	if (l1-accentedSyl1Pos >= l2-accentedSyl2Pos) {
		for (let i = accentedSyl1Pos + 1; i < l1; i++) {
			score += scoreSyllables(syllables1[i], syllables2[i - delta] || '');
		}
	} else {
		for (let i = accentedSyl2Pos + 1; i < l2; i++) {
			score += scoreSyllables(syllables1[i + delta] || '', syllables2[i]);
		}
	}	
	//сравниваем слоги до
	if (accentedSyl1Pos >= accentedSyl2Pos) {
		for (let i = accentedSyl1Pos - 1; i >= 0; i--) {
			score += scoreSyllables(syllables1[i], syllables2[i - delta] || '');
		}
	} else {
		for (let i = accentedSyl2Pos - 1; i >= 0; i--) {
			score += scoreSyllables(syllables1[i + delta] || '', syllables2[i]);
		}
	}
	return score;
}

//начисляет очки за совпадение слогов
function scoreSyllables(syl1, syl2) {
	let score = 0;
	
	//мощь гласных и согласных
	let vowelWeight = 3;
	let consonantWeight = vowelWeight / 3;
	//предусмотрим ситуацию когда слог сравнивается с undefined
	let syl1mod = syl1 || '';
	let syl2mod = syl2 || '';

	if (findAccentPosition(syl1)!==-1) {
		syl1mod = syl1.replace("'", "");
		syl2mod = syl2.replace("'", "");
	}
	let vowel1 = findVowelsNums(syl1mod)[0];
	let vowel2 = findVowelsNums(syl2mod)[0];
	//счет для гласных
	if ( checkLetterEqual(syl1mod[vowel1], syl2mod[vowel2]) ) {
		score += vowelWeight;
	}
	if ( syl1mod[vowel1] === syl2mod[vowel2] ) {
		score += vowelWeight / 4;
	}
	//для согласных до
	conditionsPrefix = 	{
		startI: 0,
		endI: vowel1,
		startJ: 0,
		endJ: vowel2,
		syl1: syl1mod,
		syl2: syl2mod,
		scoreMultiplier: consonantWeight
	};
	//для согласных после
	conditionsPostfix = {
		startI: vowel1+1, 
		endI: syl1mod.length, 
		startJ: vowel2+1, endJ: 
		syl2mod.length, 
		syl1: syl1mod, 
		syl2: syl2mod, 
		scoreMultiplier: consonantWeight
	};
	//для согласных до-после
	conditionsPrePostfix = {
		startI: 0, 
		endI: vowel1, 
		startJ: vowel2+1, 
		endJ: syl2mod.length, 
		syl1: syl1mod, 
		syl2: syl2mod, 
		scoreMultiplier: consonantWeight / 4
	};
	//для согласных после-до
	conditionsPostPrefix = {
		startI: vowel1+1, 
		endI: syl1mod.length, 
		startJ: 0, endJ: vowel2, 
		syl1: syl1mod, 
		syl2: syl2mod, 
		scoreMultiplier: consonantWeight / 4
	};

	score += addScores(conditionsPrefix) + addScores(conditionsPostfix) + addScores(conditionsPrePostfix) + addScores(conditionsPostPrefix);
	return score;
}

/*вспомогательная функция, перебирает буквы, сравнивает, 
начисляет очки, чтобы не повторять код*/
function addScores(obj) {
	let addScore = 0;
	for (let i = obj.startI; i < obj.endI; i++) {
		for (let j = obj.startJ; j < obj.endJ; j++) {
			if ( checkLetterEqual(obj.syl1[i], obj.syl1[i - 1]) ) break;
			if ( checkLetterEqual(obj.syl2[j], obj.syl2[j - 1]) ) continue;
			if ( obj.syl1[i] === obj.syl2[j] ) {
				addScore += 1.5 * obj.scoreMultiplier;
				break;
			}
			if ( checkLetterEqual(obj.syl1[i],obj.syl2[j]) ) {
				addScore += obj.scoreMultiplier;
				break;
			}
		}
	}
	return addScore;
}

//проверяет, эквивалентны ли буквы по звучанию
function checkLetterEqual(letter1, letter2) {
	if (letter1 === letter2) return true;	
	for (let i = 0; i < equalLetters.length; i++) {
		if ((letter1 === equalLetters[i][0] && letter2 === equalLetters[i][1]) ||
			(letter1 === equalLetters[i][1] && letter2 === equalLetters[i][0])) return true;
	} 
	return false;
}

/*разбивает слово на слоги*/
function wordDivide(word) {
	//эта штука добавит слову ударений
	word = accentForOneSyllable(word);
	word = getYo(word);
	let vowelsNums = findVowelsNums(word);
	let syllables = [];
	//если состоит из одного слога, то этот слог всё слово
	if (vowelsNums.length <= 1) {
		syllables.push(word);
		return syllables;
	}
	let accentPos = findAccentPosition(word);
	//переменные, которые надо заранее определить
	let newStart = 0;
	let previousStep = 0;

	for (let i = 0; i < vowelsNums.length; i++) {
		let syllable = '';
		let step = 1;
		/*наличие ударения увеличивает шаг, шаг - это количество 
		букв, которое надо взять после текущей гласной в слог*/
		if (accentPos > vowelsNums[i] && accentPos < vowelsNums[i + 1]) {
			step++;
		}
		//шаг уменьшается, если рядом гласная, чтобы её не захватить
		if (vowelsNums[i + 1] - vowelsNums[i] <= step + 1) {
			step--;
		}
		//формируем слоги
		if (i === 0) /*первый слог*/ {
			for (let j = 0; j <= vowelsNums[i] + step; j++) {
				syllable += word[j];
			}
		} else if (i === vowelsNums.length - 1) /*последний слог*/ {
			for (let j = newStart; j <= word.length - 1; j++) {
				syllable += word[j];
			}
		} else {
			for (let j = newStart; j <= vowelsNums[i] + step; j++) /*остальные*/ {
				syllable += word[j];
			}
		}
		syllables.push(syllable);
		//шаг предыдущего слога
		previousStep = step;
		//начало нового слога
		newStart = vowelsNums[i] + previousStep + 1;
	}
	return syllables;
}

//на какой слог ударение
function findSyllableWithAccent(word) {
	let syllableNum = -1;
	word = accentForOneSyllable(word);
	word = getYo(word);
	let accentPos = findAccentPosition(word);
	let vowelsPos = findVowelsNums(word);
	for (let i = 0; i < vowelsPos.length; i++) {
		if (accentPos === vowelsPos[i] + 1) {
			syllableNum = i + 1;
			break;
		}  
	}
	return syllableNum;
}

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

//находит позицию ударения в слове
function findAccentPosition(word) {
	accentPos = word.indexOf("'");
	return accentPos;

}

//ставит ударение в слове с одной гласной
function accentForOneSyllable(word) {
	if (findAccentPosition(receivedWord) === -1) {
		let a = findVowelsNums(word);
		let l = word.length;
		if (a.length === 1) {
			word = word.slice(0, a[0] + 1) + "'" + word.slice(a[0] + 1, l);
		}
		return word;
	}
	return word;
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