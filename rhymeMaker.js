let fs = require('fs');
let scoreWords = require('./modules/scoreWords');

let words = JSON.parse(fs.readFileSync('./files/wordsNEW.JSON'));
let syllables = JSON.parse(fs.readFileSync('./files/syllablesNEW.JSON'));


let possibleRhymes = {};

let t=0;

for (let word in words) {
  let syls = [];
  for (let syl in words[word]) {
  /*  syls.push({
      syllable: syl,
      sylLength: syl.length-1
    });
  */
  /*  if (syl.length>4) {
      possibleRhymes[word] = syllables[syl];
      break;
    }
    if (syl.length>3) {
      possibleRhymes[word] = syllables[syl];
      break;
    }
    if (syl.length>2) {
      possibleRhymes[word] = syllables[syl];
      break;
    }*/
    possibleRhymes[word] = syllables[syl];
    
  }
  /*syls.sort(function (x, y) {
      return y.sylLength - x.sylLength;
  });
*/
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

  if (a.length>10)  a.length = 10;

  let rhymes = {};
  for (let i = 0; i < a.length; i++) {
    rhymes[a[i].rhyme]=a[i].score;
  }
  possibleRhymes[word] = rhymes;

  
  t++;
  console.log(t);
  //console.log(possibleRhymes);
  //записываем "маленькими файлами" по 30К слов
  if (t%30000===0) {
    let index = t/30000;
    let rhymes = JSON.stringify(possibleRhymes);
    fs.writeFileSync('./files/rhymes'+index+'.json', rhymes);
    possibleRhymes = {};
  }
  if (t===210003) {
	let index = 'Last';
    let rhymes = JSON.stringify(possibleRhymes);
    fs.writeFileSync('./files/rhymes'+index+'.json', rhymes);
    possibleRhymes = {};
  }
}


//rhymes = JSON.stringify(possibleRhymes);
//console.log(indexWords);
//fs.writeFileSync('./files/rhymesNEW.json', rhymes);


// проверяет, что слова отличаются только окончаниями
function findOnlyEndingDiff (word1, word2) {
  let l = word1.length;
  if (l < word2.length) l = word2.length;
  let partOfWord = Math.round(l*0.4);
  if (word1.slice(0,l-partOfWord) === word2.slice(0,l-partOfWord)) {
    return true;
  }
  return false;
};