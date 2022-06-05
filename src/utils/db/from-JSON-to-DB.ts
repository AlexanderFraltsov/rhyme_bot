import { connect, createRhyme } from '../../db';

const fs = require('fs');

type TDataArrayRecord = [word: string, rhymes: string[]];

export const fileParse = (filePath: string, cb: (arr: any[]) => void) => {
  fs.readFile(filePath, (err: Error, data: string) => {
    if (err) {
      throw err;
    }

    cb(Object.entries(<TDataArrayRecord[]>JSON.parse(data)));
  });
};

export const onFileParse = (arr: TDataArrayRecord[]): void => {
  connect(async () => {
    for (const [word, rhymes] of arr) {
      await createRhyme(word, rhymes);
    }
  });
};
