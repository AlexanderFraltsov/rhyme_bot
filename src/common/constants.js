const lettersToArray = (string) => (string+string.toUpperCase()).split('');

const VOWELS = lettersToArray('аеёиоуыэюя');
const CONSONANTS = lettersToArray('бвгджзйклмнпрстфхцчшщ');
const OTHER_LETTERS = lettersToArray('ьъ');
const EQUAL_LETTERS = [
  'ая',
  'оё',
  'эе',
  'ую',
  'иы',
  'тд',
  'бп',
  'вф',
  'сз',
  'гк',
  'нм',
  'рл',
  'жш',
  'шщ',
  'тц',
  'чщ',
  'сш',
  'хк'
];

const WELCOME_SUBSTRING = 'Бот-рифмоплёт приветствует тебя';
const ALERT1 =
  'Уточните, на какой слог приходится ударение в вашем слове (хорошо бы получить число от 1 до 9007199254740992 включительно)';

module.exports = {
  VOWELS,
  CONSONANTS,
  OTHER_LETTERS,
  EQUAL_LETTERS,
  ALERT1,
  WELCOME_SUBSTRING
};
