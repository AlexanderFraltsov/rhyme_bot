const stressForOneSyllable = require('./stress-for-one-syllable');
const getYo = require('./get-yo');

module.exports = word => stressForOneSyllable(getYo(word.toLowerCase()));
