  /*загружаем словарь ударений, выделяем из него термины в массив - termins - возможно есть смысл записать этот файл отдельно (пока что массив для отладки)*/
var termins = ["нарко'тик", "ко'тик", "сапо'г", "кра'н", "шлакобло'к", "суббо'тник", "мо'тик"];

  //гласные буквы
const vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я', 'А', 'Е', 'Ё', 'И', 'О', 'У', 'Ы', 'Э', 'Ю', 'Я'];

  //согласные буквы
const consonant = ['б', 'в', 'г', 'д', 'ж', 'з', 'й', 'к', 'л', 'м', 'н', 'п', 'р', 'с', 'т', 'ф', 'х', 'ц', 'ч','ш','щ', 'Б', 'В', 'Г', 'Д', 'Ж', 'З', 'Й', 'К', 'Л', 'М', 'Н', 'П', 'Р', 'С', 'Т', 'Ф', 'Х', 'Ц', 'Ч','Ш','Щ'];

const otherLetters = ['ь', 'ъ', 'Ь', 'Ъ'];

const equalLetters = ['ая', 'оё', 'эе', 'ую', 'иы', 'тд', 'бп', 'вф', 'гк', 'шщ', 'тц', 'нм', 'рл', 'жш', 'жз', 'дз', 'чш', 'сз', 'сш'];

  //получаем слово - word - от пользователя (пока что задаем сами)
var receivedWord = 'КОТИК';
  // = prompt('введи свое слово, щенок', 'котик');

receivedWord = receivedWord.toLowerCase();

  //тревожные фразы
var alert1 = "уточните, на какой слог приходится ударение в вашем слове (хорошо бы получить число от 1 до 9007199254740992 включительно)";

  //предусматриваем слово с "ё" - ударение всегда падает на него
for (let i = 0; i < receivedWord.length; i++) {
  if (receivedWord[i] === 'ё') {
    receivedWord = receivedWord.replace("ё", "ё'");
  }
}

//заменяем слово на слово с ударением, если его нет, или спрашиваем, на какой оно слог

if (!isAccent(receivedWord)) {
  //производим поиск слова в словаре (оно ведь там с ударением) и записываем его в переменную, чтобы не искать дважды
  receivedWord = getAccent(receivedWord, termins);
}

if (!isAccent(receivedWord)) {
  console.log(alert1);
}


/*тут пока неструктурированный план: создаем рандомное  число luckyNumber от 0 до - termins.length - оно будет использоваться для точки начала поиска рифмы в словаре, если оно больше termins.length/2, поиск производится в сторону увеличения номера массива, если рифмы не найдено - разворот (это надо чтоб бот не давал одну и ту же рифму)*/

/*рифмой будет считаться первое "соответствие 1го порядка" (нужно ввести разные варианты соответствия чтобы он хотя бы захудалую рифму но выдавал).
соответственно 1й порядок - полное совпадение ударного и последующих слогов (без предыдущих)
2й - совпадение ударной гласной и последующих и предыдущих слогов
3й - совпадение ударного слога и гласных последующих

приравнять к слогам нь/ль/вь/дь/жь/мь/зь в середине слова*/






var rhyme = "nono";

  //выводим рифму (пока просто слово с ударением)
console.log(receivedWord);
//alert(receivedWord);

console.log(checkLetterEqual('н', 'л'));

console.log(wordDivide(receivedWord));

//ф-ции
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
  let stopCondition = 0;
  //длина слова изменится по ходу цикла, если оно есть в словаре, поэтому
  let length = word.length;

  for (let i = 0; i < termins.length; i++) {
    let step = 0;
    //сначала смотрим, что слово в словаре нужной длины
    if (word.length !== dictionary[i].length - 1) continue;
    for (let j = 0; j < dictionary[i].length; j++) {
    /*пропускаем такт, когда добираемся до ударения; step - шаг пропуска*/
      if (dictionary[i][j] === "'") {
        step++;
        continue;
      }
      //прекращаем сравнение, если буквы не совпадают
      if (dictionary[i][j + step] !== word[j]) {
        step = 0;
        break;
      }
        stopCondition++;
    }
     //останавливаем цикл перечисления словаря, если слово найдено
    if (stopCondition === length) {
      //и заменяем наше слово на слово с ударением
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

//выясняет степень схожести слогов
function checkSyllableEqual(syl1, syl2) {


}


/*разбивает слово на слоги*/
function wordDivide(word) {
	let accentPos = findAccentPosition(word);
	let vowelsNums = findVowelsNums(word);
	let syllabes = [];
	//если состоит из одного слога, то этот слог всё слово
	if (vowelsNums.length <= 1) {
		syllabes.push(word);
		return syllabes;
	}

    let newStart = 0;
    let previousStep = 0;
  
	for (let i = 0; i < vowelsNums.length; i++) {
		let syllabe = '';
		let step = 1;
 		//наличие ударения увеличивает шаг
		if (accentPos > vowelsNums[i] && accentPos < vowelsNums[i + 1]) {
			step++;
		}
		//шаг уменьшается, если рядом гласная, чтобы её не захватить
		if (vowelsNums[i + 1] - vowelsNums[i] <= step + 1) {
			step--;
		}
		//формируем слоги
		if (i === 0) {
			for (let j = 0; j <= vowelsNums[i] + step; j++) {
				syllabe += word[j];
			}
		} else if (i === vowelsNums.length - 1) {
			for (let j = newStart; j <= word.length - 1; j++) {
				syllabe += word[j];
			}
		} else {
			for (let j = newStart; j <= vowelsNums[i] + step; j++) {
				syllabe += word[j];
			}
		}
		syllabes.push(syllabe);
		previousStep = step;
		newStart = vowelsNums[i] + previousStep + 1;
	}
	return syllabes;
}

//находит позицию ударения в слове
function findAccentPosition(word) {
	let accentPos = 0;
	for (let i = 0; i < word.length; i++) {
		if (word[i] === "'") accentPos = i;
	}
	return accentPos;
}

//создаёт массив с позициями гласных букв в слове
function findVowelsNums(word) {
	let vowelsNums = [];
	for (let i = 0; i < word.length; i++) {
		for (let j = 0; j < vowels.length; j++) {
			if (word[i] === vowels[j]) {
				vowelsNums.push(i);
			}
		}
	}
	return vowelsNums;
}