let fs = require('fs');

let rhymes = {};

for (let i = 1; i <= 7; i++) {
  console.log(i);
  let obj1 = JSON.parse(fs.readFileSync('./files/rhymes'+i+'.json'));
  Object.assign(rhymes, obj1);
  obj1 = {};
}

let objFin = JSON.parse(fs.readFileSync('./files/rhymes'+'Last'+'.json'));
Object.assign(rhymes, objFin);
objFin = {};

fs.writeFileSync('./files/rhymesNew.json', JSON.stringify(rhymes));