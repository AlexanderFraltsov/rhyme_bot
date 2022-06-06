import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../config';

const MODEL_NAME = 'rhyme';

class Rhyme extends Model {
  _getSortedArrOfRhymes(jsonOfRhymes: string): string[] {
    return Object.entries(<{ [rhyme: string]: number }>JSON.parse(jsonOfRhymes))
      .sort((a, b) => b[1] - a[1])
      .map(([rhyme]) => rhyme);
  }

  getAllRhymes(): string[] {
    return this._getSortedArrOfRhymes(this.getDataValue('rhymes'));
  }

  getBestRhyme(): string {
    const [firstRhyme] = this.getAllRhymes();
    // const [firstRhyme] = this._getSortedArrOfRhymes(this.getDataValue('rhymes'));
    return firstRhyme;
  }
}

Rhyme.init(
  {
    word: {
      type: DataTypes.STRING,
      unique: true
    },
    rhymes: DataTypes.JSON,
    wordWithoutStress: DataTypes.STRING
  },
  {
    sequelize,
    modelName: MODEL_NAME
  }
);

export { Rhyme };
