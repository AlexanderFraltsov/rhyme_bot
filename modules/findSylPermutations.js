const constants = require('./constants');
const equalLetters = constants.equalLetters;

function giveEqualLetters(letter) {
	let eqLetter = [letter];
	for (let i = 0; i < equalLetters.length; i++) {
		if (equalLetters[i][0] === letter) {
			eqLetter.push(equalLetters[i][1]);
		}
		if (equalLetters[i][1] === letter) {
			eqLetter.push(equalLetters[i][0]);
		}
	}
	return eqLetter;
}

function findSylPermutations(syl) {
    let permutations = [];
    for (let i = 0; i < syl.length; i++) {
        let this_letter = syl[i];
        let el = giveEqualLetters(this_letter);
        if (i) {
            permutations_old = permutations;
            permutations = [];
            for (let j = 0; j < el.length; j++) {
                for (let k = 0; k < permutations_old.length; k++) {
                    let score = el[j] === this_letter ? 0 : 1;
                    score += permutations_old[k][1];
                    if (score < 3) {
                        permutations.push([permutations_old[k][0] + el[j], score]);
                    }
                }
            }
        } else {
            for (let j = 0; j < el.length; j++) {
                let score = el[j] === this_letter ? 0 : 1;
                permutations.push([el[j], score]);
            }
        }
    }
    return permutations.map(x => x[0]);
}

module.exports = findSylPermutations;
