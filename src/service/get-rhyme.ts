import { connect, Rhyme } from '../db';
import { getHandledWord } from '../modules';

export const getRhyme = async (word: string) => {
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
