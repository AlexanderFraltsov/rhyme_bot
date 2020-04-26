const Sequelize = require('sequelize');
const sequelize = require('../config');
const { Model } = Sequelize;
const MODEL_NAME = 'rhyme';

class Rhyme extends Model {
  _getSortedArrOfRhymes(jsonOfRhymes) {
    return Object.entries(JSON.parse(jsonOfRhymes))
      .sort((a, b) => b[1] - a[1])
      .map(([rhyme]) => rhyme);
  }

  getAllRhymes() {
    return this._getSortedArrOfRhymes(this.getDataValue('rhymes'));
  }

  getBestRhyme() {
    const [firstRhyme] = this.getAllRhymes();
    // const [firstRhyme] = this._getSortedArrOfRhymes(this.getDataValue('rhymes'));
    return firstRhyme;
  }
}

Rhyme.init(
  {
    word: {
      type: Sequelize.STRING,
      unique: true
    },
    rhymes: Sequelize.JSON,
    wordWithoutStress: Sequelize.STRING
  },
  {
    sequelize,
    modelName: MODEL_NAME
  }
);

module.exports = Rhyme;
