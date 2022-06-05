import { Rhyme } from '../models/rhyme';

export const createRhyme = async (word: string, rhymes: string[]) => {
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
