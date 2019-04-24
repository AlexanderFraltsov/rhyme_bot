/*загружаем словарь ударений, выделяем из него термины в массив - termins - возможно есть смысл записать этот файл отдельно (пока что массив для отладки)*/
var termins = ["нарко'тик", "ко'тик", "сапо'г", "кра'н", "шлакобло'к", "суббо'тник", "мо'тик"];

//гласные буквы
const vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я', 'А', 'Е', 'Ё', 'И', 'О', 'У', 'Ы', 'Э', 'Ю', 'Я'];
//согласные буквы
const consonant = ['б', 'в', 'г', 'д', 'ж', 'з', 'й', 'к', 'л', 'м', 'н', 'п', 'р', 'с', 'т', 'ф', 'х', 'ц', 'ч','ш','щ', 'Б', 'В', 'Г', 'Д', 'Ж', 'З', 'Й', 'К', 'Л', 'М', 'Н', 'П', 'Р', 'С', 'Т', 'Ф', 'Х', 'Ц', 'Ч','Ш','Щ'];
//другие буквы
const otherLetters = ['ь', 'ъ', 'Ь', 'Ъ'];

const equalLetters = ['ая', 'оё', 'эе', 'ую', 'иы', 'тд', 'бп', 'вф', 'гк', 'шщ', 'тц', 'нм', 'рл', 'жш', 'жз', 'дз', 'чш', 'сз', 'сш'];

//тревожные фразы
var alert1 = "Уточните, на какой слог приходится ударение в вашем слове (хорошо бы получить число от 1 до 9007199254740992 включительно)";


//получаем слово - word - от пользователя (пока что задаем сами)
var receivedWord = 'КОТИК';
// = prompt('введи свое слово, щенок', 'котик');

receivedWord = receivedWord.toLowerCase();

//предусматриваем слово с "ё" - ударение всегда падает на него
for (let i = 0; i < receivedWord.length; i++) {
  if (receivedWord[i] === 'ё') {
    receivedWord = receivedWord.replace("ё", "ё'");
  }
}

//заменяем слово на слово с ударением, если его нет, или спрашиваем, на какой оно слог
if (!isAccent(receivedWord)) {
  //производим поиск слова в словаре (там оно с ударением) и записываемв переменную, чтобы не искать дважды
  receivedWord = getAccent(receivedWord, termins);
}

if (!isAccent(receivedWord)) {
  console.log(alert1);
}


var rhyme = "nono";

//выводим рифму (пока просто слово с ударением)
console.log(receivedWord);
//alert(receivedWord);

console.log(checkLetterEqual('н', 'л'));

console.log(wordDivide(receivedWord));


/*---------------------------------ФУНКЦИИ--------------------------------------*/

//проверяет стоит ли ударение
function isAccent(word) {
  let accentes = 0;
  
  for (let i = 0; i < word.length; i++) {
  if (word[i] === "'") {
    accentes++;
    }
  }
  if (accentes > 0) {
    return true;
    } 
  return false;
}

/*ищет слово в словаре, чтобы понять, где в нём ударение*/
function getAccent(word, dictionary) {
  var length = word.length;
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

//проверяет, эквивалентны ли буквы по звучанию
function checkLetterEqual(letter1, letter2) {
  if (letter1 === letter2) return true;	
  for (let i = 0; i < equalLetters.length; i++) {
    if ((letter1 === equalLetters[i][0] && letter2 === equalLetters[i][1]) ||
    	(letter1 === equalLetters[i][1] && letter2 === equalLetters[i][0])) return true;
  } 
  return false;
}

//даёт количественную оценку схожести слогов
function scoreSyllables(syl1, syl2) {


}

/*разбивает слово на слоги*/
function wordDivide(word) {

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

//находит позицию ударения в слове
function findAccentPosition(word) {
	let accentPos = -1;
	for (let i = 0; i < word.length; i++) {
		if (word[i] === "'") accentPos = i;
	}
	return accentPos;
}

//создаёт массив с позициями гласных букв в слове
function findVowelsNums(word) {
	let vowelsNums = [];
	for (let i = 0; i < word.length; i++) {
		
		//может упростить потом через indexOf???
		for (let j = 0; j < vowels.length; j++) {
			if (word[i] === vowels[j]) {
				vowelsNums.push(i);
			}
		}
	}
	return vowelsNums;
}

/*допустить чтобы нь/ль/вь/дь/жь/мь/зь/рь в середине слова читались как слог, и нет одновременно???*/