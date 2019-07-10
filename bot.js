const Telegraf = require('telegraf')

// replace the value below with the Telegram token you receive from @BotFather
const token = '808355112:AAE3bWCnk7S4wrPMv70_mfKhY9xjNo6f6ZU';

// Create a bot that uses 'polling' to fetch new updates
const bot = new Telegraf(token)

console.log("let's go");


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

let termins = JSON.parse(fs.readFileSync('./files/wordsNEW.json'));
let rhymes = JSON.parse(fs.readFileSync('./files/rhymesNew.json'));
//let syllables = JSON.parse(fs.readFileSync('./files/syllablesNEW.JSON'));
const end = new Date().getTime();

function getRhyme (word, rhymesDictionary) {
  rhyme = rhymesDictionary[word];
  return rhyme;
}




/*


*/

console.log('listening');

// Matches "/echo [whatever]"
bot.on('message', (ctx) => {
    resp = ctx.message.text;
console.log('got', resp);
  
/*-------------------------------------------------------*/
//получаем слово - word - от пользователя (пока что задаем сами)
let receivedWord = resp;


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

let rhyme = 'no';

//получаем
rhyme = getRhyme(receivedWord,rhymes);

  // send back the matched "whatever" to the chat
ctx.reply(rhyme)
});

bot.launch()

