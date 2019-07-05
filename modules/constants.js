//vowels
const v = ['а', 'е', 'ё', 'и', 'о', 'у', 'ы', 'э', 'ю', 'я', 'А', 'Е', 'Ё', 'И', 'О', 'У', 'Ы', 'Э', 'Ю', 'Я'];
//consonant letters
const c = ['б', 'в', 'г', 'д', 'ж', 'з', 'й', 'к', 'л', 'м', 'н', 'п', 'р', 'с', 'т', 'ф', 'х', 'ц', 'ч','ш','щ', 'Б', 'В', 'Г', 'Д', 'Ж', 'З', 'Й', 'К', 'Л', 'М', 'Н', 'П', 'Р', 'С', 'Т', 'Ф', 'Х', 'Ц', 'Ч','Ш','Щ'];
//other letters
const oL = ['ь', 'ъ', 'Ь', 'Ъ'];
//equal letters
const eL = ['ая', 'оё', 'эе', 'ую', 'иы', 'тд', 'бп', 'вф', 'сз', 'гк', 'нм', 'рл', 'жш', 'шщ', 'тц', 'чщ', 'сш', 'хк'];

//alerts
const a1 = "Уточните, на какой слог приходится ударение в вашем слове (хорошо бы получить число от 1 до 9007199254740992 включительно)";

const obj = {
  vowels:v,
  consonant:c,
  otherLetters:oL,
  equalLetters:eL,
  alert1:a1
}

module.exports = obj;