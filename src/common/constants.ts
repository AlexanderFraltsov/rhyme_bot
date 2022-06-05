const lettersToArray = (s: string) => (s + s.toUpperCase()).split('');

export const VOWELS = lettersToArray('аеёиоуыэюя');
export const CONSONANTS = lettersToArray('бвгджзйклмнпрстфхцчшщ');
export const OTHER_LETTERS = lettersToArray('ьъ');
export const EQUAL_LETTERS = [
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

export const WELCOME_SUBSTRING = 'Бот-рифмоплёт приветствует тебя';
export const ALERT1 =
  'Уточните, на какой слог приходится ударение в вашем слове (хорошо бы получить число от 1 до 9007199254740992 включительно)';
