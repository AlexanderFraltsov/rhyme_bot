let findStressPosition = require('./findStressPosition');
let findVowelsNums = require('./findVowelsNums');
let stressForOneSyllable = require('./stressForOneSyllable');
let getYo = require('./getYo');

/*разбивает слово на слоги*/
function wordDivide(word) {
	//эта штука добавит слову ударений
	word = stressForOneSyllable(word);
	word = getYo(word);
	let vowelsNums = findVowelsNums(word);
	let syllables = [];
	//если состоит из одного слога, то этот слог всё слово
	if (vowelsNums.length <= 1) {
		syllables.push(word);
		return syllables;
	}
	let stressPos = findStressPosition(word);
	//переменные, которые надо заранее определить
	let newStart = 0;
	let previousStep = 0;

	for (let i = 0; i < vowelsNums.length; i++) {
		let syllable = '';
		let step = 1;
		/*наличие ударения увеличивает шаг, шаг - это количество 
		букв, которое надо взять после текущей гласной в слог*/
		if (stressPos > vowelsNums[i] && stressPos < vowelsNums[i + 1]) {
			step++;
		}
		//шаг уменьшается, если рядом гласная, чтобы её не захватить
		if (vowelsNums[i + 1] - vowelsNums[i] <= step + 1) {
			step--;
		}
		//формируем слоги
		if (i === 0) /*первый слог*/ {
			for (let j = 0; j <= vowelsNums[i] + step; j++) {
				syllable += word[j];
			}
		} else if (i === vowelsNums.length - 1) /*последний слог*/ {
			for (let j = newStart; j <= word.length - 1; j++) {
				syllable += word[j];
			}
		} else {
			for (let j = newStart; j <= vowelsNums[i] + step; j++) /*остальные*/ {
				syllable += word[j];
			}
		}
		syllables.push(syllable);
		//шаг предыдущего слога
		previousStep = step;
		//начало нового слога
		newStart = vowelsNums[i] + previousStep + 1;
	}
	return syllables;
}

module.exports = wordDivide;