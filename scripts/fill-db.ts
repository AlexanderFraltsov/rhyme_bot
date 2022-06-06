import { DbUtils } from '../src/utils';

import * as path from 'path';

const filename = 'rhymesNew';
const rhymesPath = path.join(__dirname, `../files/${filename}.json`);

console.log('start parse: ', filename);
DbUtils.fileParse(rhymesPath, DbUtils.onFileParse);
