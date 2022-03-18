const fs = require('fs-extra');
const path = require('path');

const { successMessage } = require('./jsonToCssScssTs');

const { data, types } = require('./generator.types');
const { scss } = require('./generator.values');
const { convertAllSvgs } = require('./generator.icons');

fs.ensureDirSync(path.resolve(__dirname, '../dist/'));

fs.writeFileSync(path.resolve(__dirname, '../dist/index.js'), data);
fs.writeFileSync(path.resolve(__dirname, '../dist/index.scss'), scss);
fs.writeFileSync(path.resolve(__dirname, '../dist/index.d.ts'), types);
successMessage('JS data, types and styles written to file! 💾');

convertAllSvgs();
