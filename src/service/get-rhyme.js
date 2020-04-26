const getHandledWord = require('../modules/get-handled-word');
const Rhyme = require('../../db/models/rhyme');
const { connect } = require('../../db/connect');

const getRhyme = async word => {
  const handledWord = getHandledWord(word);

  const bestRhyme = await connect(async () => {
    console.log('db connected');

    const element = handledWord.includes("'") ?
    await Rhyme.findOne({
      where: { word: handledWord }
    }) :
    await Rhyme.findOne({
      where: { wordWithoutStress: handledWord }
    });
    if (element === null) return;
    const rhymes = element.getAllRhymes();
    console.log(JSON.stringify(rhymes));
    const rhymesString = rhymes.join(', ');
    //const rhyme = element.getBestRhyme();
    return rhymesString;
  })

  return bestRhyme;
};

module.exports = { getRhyme };
