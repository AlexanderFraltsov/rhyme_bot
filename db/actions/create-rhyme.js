const Rhyme = require('../models/rhyme');
const createRhyme = async (word, rhymes) => {
  try {
    const wordWithoutStress = word.replace("'", '');
    await Rhyme.create({
      word,
      wordWithoutStress,
      rhymes: JSON.stringify(rhymes)
    });
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = createRhyme;
