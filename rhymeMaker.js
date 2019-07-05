let fs = require('fs');
let scoreWords = require('./modules/scoreWords');

rhymeMaker('wordsNEW', 'syllablesNEW', 'rhymes');

function rhymeMaker(wordsFileName, syllablesFileName, rhymesFileName) {
  let words = JSON.parse(fs.readFileSync('./files/' + wordsFileName + '.json'));
  let syllables = JSON.parse(fs.readFileSync('./files/' + syllablesFileName + '.json'));

  let possibleRhymes = {};
  let t = 0;
  let maxT = 0;
  let maxI = 0;

  for (let word in words) {
    maxT++;
  }
  for (let word in words) {
    for (let syl in words[word]) {
      possibleRhymes[word] = syllables[syl];
    }
    let a = [];
    outer: for (let key2 in possibleRhymes[word]) {
      if ( !findOnlyEndingDiff(word, key2) ) {
        let scoreRes = scoreWords(word, key2);
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
    let rhymes = {};
    for (let i = 0; i < a.length; i++) {
      rhymes[a[i].rhyme] = a[i].score;
    }
    possibleRhymes[word] = rhymes;
    t++;
    console.log(t);
    //записываем "маленькими файлами" по 50К слов
    if (t % 50000 === 0) {
      let index = t / 50000;
      let rhymes = JSON.stringify(possibleRhymes);
      fs.writeFileSync('./files/' + rhymesFileName + '' + index + '.json', rhymes);
      possibleRhymes = {};
      maxI = index;
    }
    if (t === maxT) {
      let index = 'Last';
      let rhymes = JSON.stringify(possibleRhymes);
      fs.writeFileSync('./files/' + rhymesFileName + '' + index + '.json', rhymes);
      possibleRhymes = {};
    }
  }
  //собираем общий файл с рифмами
  let rhymesAll = {};
    for (let i = 1; i <= maxI; i++) {
    console.log(i);
    let obj1 = JSON.parse(fs.readFileSync('./files/'+ rhymesFileName + ''+ i + '.json'));
    Object.assign(rhymesAll, obj1);
    obj1 = {};
  }
  let objFin = JSON.parse(fs.readFileSync('./files/'+ rhymesFileName + 'Last.json'));
  Object.assign(rhymesAll, objFin);
  objFin = {};
  fs.writeFileSync('./files/' + rhymesFileName + '.json', JSON.stringify(rhymesAll));
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
module.exports = rhymeMaker;