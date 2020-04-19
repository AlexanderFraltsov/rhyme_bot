const findStressPosition = require('./find-stress-position');
// Add accent for 'ё', if there is no accent

module.exports = word => {
  if (findStressPosition(word) !== -1) return word;
  return word.replace('ё', "ё'");
};
