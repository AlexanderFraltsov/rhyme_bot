const { connect } = require('../../../db/connect');
const createRhyme = require('../../../db/actions/create-rhyme');

const fs = require('fs');
const path = require('path');

const rhymesPath = path.join(__dirname, '../../../files/rhymesNew.json');

const fileParse = (filePath, cb) => {
  fs.readFile(filePath, (err, data) => {
    if (err) throw err;
    const superArray = Object.entries(JSON.parse(data));
    cb(superArray);
  });
};

const onFileParse = arr => {
  connect(async () => {
    for (const el of arr) {
      const [word, rhymes] = el;
      await createRhyme(word, rhymes);
    }
  });
};

fileParse(rhymesPath, onFileParse);

module.exports = { fileParse, onFileParse };
