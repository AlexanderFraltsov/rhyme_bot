const fs = require('fs');

const { alert1 } = require('../modules/constants');
const findStressPosition = require('../modules/findStressPosition');
const getStress = require('../modules/getStress');
const getYo = require('../modules/getYo');
const stressForOneSyllable = require('../modules/stressForOneSyllable');
const findSyllableWithStress = require('../modules/findSyllableWithStress');
const findVowelsNums = require('../modules/findVowelsNums');
const scoreWords = require('../modules/scoreWords');

const start = new Date().getTime();
/* загружаем словарь ударений и словарь рифм */

// const rhymes = JSON.parse(fs.readFileSync('./files/rhymesNEW.JSON'));
const termins = JSON.parse(fs.readFileSync('./files/wordsNEW.JSON'));
const syllables = JSON.parse(fs.readFileSync('./files/syllablesNEW.JSON'));

/*-----------------------FUNCTIONS-----------------------*/
// выгружает десятку рифм для word
const getRhyme = (word, rhymesDictionary) => {
  return rhymesDictionary[word];
};

// выбирает один случайный ключ из объекта с 10 ключами
const getOneRhyme = (rhymeArray) => {
  const randomNumber = Math.floor((Math.random() * 10) );
  let x = 0;
  for (const rhyme of rhymeArray) {
    if (x === randomNumber) return rhyme;
    x++;
  }
};

// проверяет, что слова отличаются только окончаниями
const findOnlyEndingDiff = (word1, word2) => {
  const maxLength = Math.max(word1.length, word2.length);
  const partOfWord = Math.round(maxLength * 0.4);

  return (word1.slice(0, maxLength - partOfWord) === word2.slice(0, maxLength - partOfWord));
};

/*-------------------------------------------------------*/
// получаем слово - word - от пользователя (пока что задаем сами)
let receivedWord = "кошка";

// предусматриваем слово с "ё" - ударение всегда падает на него
// если в слове одна гласная, ставим на неё ударение
receivedWord = stressForOneSyllable(
  getYo(receivedWord.toLowerCase())
);

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
/*if (!rhymes[receivedWord]) {
  tenRhymes = getRhyme(receivedWord, rhymes);
} else */{
  //в этом случае надо подобрать рифму минуя словарь
  //приходится очищать память, иначе происходит краш!!!
  const start2 = new Date().getTime();
  //rhymes = {};

  //let syllables = JSON.parse(fs.readFileSync('./files/syllablesNEW.JSON'));


  let word1 = receivedWord;
  // находим самый крупный вариант ударного слога
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
  //let syl1 = word1.slice(startPos, endPos);
  let stressedVowelPos = vowels1[findedSyl];

  //создаем объект, включающий слоги для нашего слова видом {syl1:1, syl2:1, ...}
  let sylsOfReceivedWorld = {};
  for (let j = startPos; j <= stressedVowelPos; j++) {
    for (let k = endPos; k >= stressedVowelPos + 2; k--) {
      const newSyl = word1.slice(j, k);
      if (newSyl.length < 3) continue;
      if ( (newSyl.length > 4 && (~newSyl.indexOf("ь") || ~newSyl.indexOf("ъ"))) || newSyl.length > 5 ) continue;
      if ( (endPos-startPos > 4 || (endPos-startPos > 5 && (~newSyl.indexOf("ь") || ~newSyl.indexOf("ъ")))) && newSyl.length < 4 ) continue;

      if (!sylsOfReceivedWorld[newSyl]) {
        sylsOfReceivedWorld[newSyl] = {};
      }
      sylsOfReceivedWorld[newSyl] = 1;
    }
  }


  for (const syl in sylsOfReceivedWorld) {
    possibleRhymes = syllables[syl];
  }
  const a = [];
  outer: for (const key2 in possibleRhymes) {
    if ( !findOnlyEndingDiff(word1, key2) ) {
      const scoreRes = scoreWords(word1, key2);
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
  a.sort((x, y) => y.score - x.score);

  if (a.length > 10) a.length = 10;
  const rhymesVar = {};

  a.forEach( el => {
    rhymesVar[el.rhyme] = el.score;
  })

  tenRhymes = rhymesVar;

  const end2 = new Date().getTime();
  console.log('Время выполнения = ' + (end2-start2) + 'ms');
}

rhyme = getOneRhyme (tenRhymes);

const end = new Date().getTime();
console.log('Время выполнения = ' + (end-start) + 'ms');
console.log(rhyme);
