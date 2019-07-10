/*-----------------------CONSTANTS-----------------------*/
const constants = require('./modules/constants');
const alert1 = constants.alert1;

/*-----------------------FUNCTIONS-----------------------*/
let findStressPosition = require('./modules/findStressPosition');
let getStress = require('./modules/getStress');
let getYo = require('./modules/getYo');
let stressForOneSyllable = require('./modules/stressForOneSyllable');
let findSyllableWithStress = require('./modules/findSyllableWithStress');
let findVowelsNums = require('./modules/findVowelsNums');
let scoreWords = require('./modules/scoreWords');

const start = new Date().getTime();
/*загружаем словарь ударений и словарь рифм*/
let fs = require('fs');


//let rhymes = JSON.parse(fs.readFileSync('./files/rhymesNEW.JSON'));
let termins = JSON.parse(fs.readFileSync('./files/wordsNEW.JSON'));
let syllables = JSON.parse(fs.readFileSync('./files/syllablesNEW.JSON'));



/*-------------------------------------------------------*/
//получаем слово - word - от пользователя (пока что задаем сами)
let receivedWord = "щенка'х";


receivedWord = receivedWord.toLowerCase();

//предусматриваем слово с "ё" - ударение всегда падает на него
receivedWord = getYo(receivedWord);

//если в слове одна гласная, ставим на неё ударение
receivedWord = stressForOneSyllable(receivedWord);

console.log(receivedWord);
let rhyme = 'no';
let tenRhymes = {};

//заменяем слово на слово с ударением (из словаря)
if (findStressPosition(receivedWord) === -1) {

  //let termins = JSON.parse(fs.readFileSync('./files/wordsNEW.JSON'));
  //производим поиск слова в словаре (там оно с ударением) и записываемв переменную, чтобы не искать дважды
  receivedWord = getStress(receivedWord, termins);
  //termins = {};
}

//если его нет, или спрашиваем, на какой оно слог
if (findStressPosition(receivedWord) === -1) {
  console.log(alert1);
  //break;
}

//получаем
/*if (rhymes[receivedWord] !== undefined) {
  tenRhymes = getRhyme(receivedWord, rhymes);
} else */{
  //в этом случае надо подобрать рифму минуя словарь
  //приходится очищать память, иначе происходит краш!!!
  const start2 = new Date().getTime();
  //rhymes = {};

  //let syllables = JSON.parse(fs.readFileSync('./files/syllablesNEW.JSON'));


  let word1 = receivedWord;
  //находим самый крупный вариант ударного слога
  let vowels1 = findVowelsNums(word1);
  let startPos = 0;
  // номер слога, начиная с 0
  let findedSyl = findSyllableWithStress(word1) - 1;
  if (findedSyl !== 0) {
    // позиция предыдущей гласной в слове + 1
    startPos = vowels1[findedSyl - 1] + 1;
  }
  let endPos = word1.length;
  if (findedSyl !== vowels1.length - 1) {
    // позиция последующей гласной
    endPos = vowels1[findedSyl + 1];
  }
  let syl1 = word1.slice(startPos, endPos);
  let stressedVowelPos = vowels1[findedSyl];

  //создаем объект, включающий слоги для нашего слова видом {syl1:1, syl2:1, ...}
  let sylsOfReceivedWorld = {};
  for (let j = startPos; j <= stressedVowelPos; j++) {
    for (let k = endPos; k >= stressedVowelPos + 2; k--) {
      newSyl = word1.slice(j, k);
      if (newSyl.length < 3) continue;
      if ( (newSyl.length > 4 && (~newSyl.indexOf("ь") || ~newSyl.indexOf("ъ"))) || newSyl.length > 5 ) continue;
      if ( (endPos-startPos > 4 || (endPos-startPos > 5 && (~newSyl.indexOf("ь") || ~newSyl.indexOf("ъ")))) && newSyl.length < 4 ) continue;

      if (sylsOfReceivedWorld[newSyl] === undefined) {
        sylsOfReceivedWorld[newSyl] = {};
      }
      sylsOfReceivedWorld[newSyl]=1;
    }
  }


  for (let syl in sylsOfReceivedWorld) {
    possibleRhymes = syllables[syl];
  }
  let a = [];
  outer: for (let key2 in possibleRhymes) {
    if ( !findOnlyEndingDiff(word1, key2) ) {
      let scoreRes = scoreWords(word1, key2);
      let i = a.length - 1;
      while (i > a.length - 5) {
        if (i < 0) break;
        if (findOnlyEndingDiff(key2, a[i].rhyme)) {
          if (a[i].score < scoreRes) {
            a[i].rhyme = key2;
            a[i].score = scoreRes;
          }
          continue outer;
        }
        i--;
      }
      a.push({
        rhyme: key2, 
        score: scoreRes
      });
    }
  }
  a.sort(function (x, y) {
    return y.score - x.score;
  });
  if (a.length > 10)  a.length = 10;
  let rhymesVar = {};
  for (let i = 0; i < a.length; i++) {
    rhymesVar[a[i].rhyme] = a[i].score;
  }
  tenRhymes = rhymesVar;

  const end2 = new Date().getTime();
  console.log('Время выполнения = ' + (end2-start2) + 'ms');
}

rhyme = getOneRhyme (tenRhymes);

const end = new Date().getTime();
console.log('Время выполнения = ' + (end-start) + 'ms');

console.log(rhyme);



/*-----------------------FUNCTIONS-----------------------*/
//выгружает десятку рифм для word
function getRhyme (word, rhymesDictionary) {
  let rhymeArray = rhymesDictionary[word];
  return rhymeArray;
}

//выбирает один случайный ключ из объекта с 10 ключами
function getOneRhyme (rhymeArray) {
  let randomNumber = Math.floor((Math.random() * 10) );
  let x = 0;
  for (let key in rhymeArray) {
    if (x === randomNumber) {
      rhyme = key;
    }
    x++;
  }
  return rhyme;
}

// проверяет, что слова отличаются только окончаниями
function findOnlyEndingDiff (word1, word2) {
  let l = word1.length;
  if (l < word2.length) l = word2.length;
  let partOfWord = Math.round(l * 0.4);
  if (word1.slice(0, l - partOfWord) === word2.slice(0, l - partOfWord)) {
    return true;
  }
  return false;
}