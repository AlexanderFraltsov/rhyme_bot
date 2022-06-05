import { DbUtils } from '../src/utils';

const path = require('path');

const rhymesPath = path.join(__dirname, '../files/rhymesNew.json');

DbUtils.fileParse(rhymesPath, DbUtils.onFileParse);
