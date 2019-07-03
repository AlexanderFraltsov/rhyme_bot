/*-----------------------CONSTANTS-----------------------*/
const constants = require('./modules/constants');
const alert1 = constants.alert1;

/*-----------------------FUNCTIONS-----------------------*/
let findStressPosition = require('./modules/findStressPosition');
let getStress = require('./modules/getStress');
let getYo = require('./modules/getYo');
let stressForOneSyllable = require('./modules/stressForOneSyllable');
const start = new Date().getTime();
/*загружаем словарь ударений и словарь рифм*/
let fs = require('fs');

let termins = JSON.parse(fs.readFileSync('./files/wordsNEW.JSON'));
let rhymes = JSON.parse(fs.readFileSync('./files/rhymesNEW.JSON'));
//let syllables = JSON.parse(fs.readFileSync('./files/syllablesNEW.JSON'));
const end = new Date().getTime();
console.log('Время выполнения = ' + (end-start) + 'ms');
/*-------------------------------------------------------*/
//получаем слово - word - от пользователя (пока что задаем сами)
let receivedWord = "щенок";


receivedWord = receivedWord.toLowerCase();

//предусматриваем слово с "ё" - ударение всегда падает на него
receivedWord = getYo(receivedWord);

//если в слове одна гласная, ставим на неё ударение
receivedWord = stressForOneSyllable(receivedWord);


//заменяем слово на слово с ударением (из словаря)
if (findStressPosition(receivedWord) === -1) {
  //производим поиск слова в словаре (там оно с ударением) и записываемв переменную, чтобы не искать дважды
  receivedWord = getStress(receivedWord, termins);
}

//если его нет, или спрашиваем, на какой оно слог
if (findStressPosition(receivedWord) === -1) {
  console.log(alert1);
}
console.log(receivedWord);



let rhyme = 'no';

//получаем
rhyme = getRhyme(receivedWord,rhymes);
console.log(rhyme);




function getRhyme (word, rhymesDictionary) {
  rhyme = rhymesDictionary[word];
  return rhyme;
}

/*


*/