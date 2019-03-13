  /*загружаем словарь ударений, выделяем из него термины в массив - termins - возможно есть смысл записать этот файл отдельно (пока что массив для отладки)*/
var termins = ["нарко'тик", "ко'тик", "сапо'г", "кра'н", "шлакобло'к", "суббо'тник", "мо'тик"];

  //гласные буквы
const vowels = ['а', 'е', 'ё', 'и', 'о', 'у', 'Ы', 'э', 'ю', 'я', 'А', 'Е', 'Ё', 'И', 'О', 'У', 'Ы', 'Э', 'Ю', 'Я'];

  //согласные буквы
const consonant = ['б', 'в', 'г', 'д', 'ж', 'з', 'й', 'к', 'л', 'м', 'н', 'п', 'р', 'с', 'т', 'ф', 'х', 'ц', 'ч','ш','щ', 'Б', 'В', 'Г', 'Д', 'Ж', 'З', 'Й', 'К', 'Л', 'М', 'Н', 'П', 'Р', 'С', 'Т', 'Ф', 'Х', 'Ц', 'Ч','Ш','Щ'];

const otherLetters = ['ь', 'ъ', 'Ь', 'Ъ'];

const equalLetters = ['ая', 'оё', 'эе', 'ую', 'иы', 'тд', 'бп', 'вф', 'гк', 'шщ', 'тц', 'нмл', 'рл', 'жш', 'жз', 'дз', 'чш', 'сз', 'сш'];

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

function checkAccord1(word1, word2) {
}
function checkAccord2(word1, word2) {
}
function checkAccord3(word1, word2) {
}




var rhyme = "nono";

  //выводим рифму (пока просто слово с ударением)
console.log(receivedWord);
//alert(receivedWord);

console.log(checkLetterEqual('н', 'л'));



//ф-ции
  //проверяет стоит ли ударение
function isAccent(word) {
  var accentes = 0;
  
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
  var stopCondition = 0;
  //длина слова изменится по ходу цикла, если оно есть в словаре, поэтому
  var length = word.length;

  for (let i = 0; i < termins.length; i++) {
    var step = 0;
    //сначала смотрим, что слово в словаре нужной длины
    if (word.length !== dictionary[i].length - 1) continue;
    for (var j = 0; j < dictionary[i].length; j++) {
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
  for (let i=0; i<equalLetters.length; i++) {
    let l1=0;
    let l2=0;
    for (let j=0; j<equalLetters[i].length; j++) {
      if (letter1===equalLetters[i][j]) l1++;
      if (letter2===equalLetters[i][j]) l2++;
    }
    if (l1>0&l2>0) return true;
  } 
  return false;
}