import { connect, createRhyme } from '../../db';

import * as fs from 'fs';

type TDataArrayRecord = [word: string, rhymes: string[]];

export const fileParse = (filePath: string, cb: (arr: any[]) => void) => {
  fs.readFile(filePath, (err: Error, data: Buffer) => {
    if (err) {
      throw err;
    }

    cb(Object.entries(<TDataArrayRecord[]>JSON.parse(data.toString())));
  });
};

export const onFileParse = (arr: TDataArrayRecord[]): void => {
  console.log('file parse is over');
  connect(async () => {
    console.log('db connected, start rhyme creating');
    let index = 0;
    const last = arr.length;
    for (const [word, rhymes] of arr) {
      await createRhyme(word, rhymes);
      index++;

      if (index % 1000 === 0) {
        console.log(`already pushed ${index} rhymes`);
      }

      if (index === arr.length) {
        console.log('all rhymes added');
      }
    }
  });
};
