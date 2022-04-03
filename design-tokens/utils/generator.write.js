const fs = require('fs-extra');
const path = require('path');

const { successMessage } = require('./jsonToCssScssTs');

const data = require('./generator.data');
// const { types } = require('./generator.types');
const { css, scss } = require('./generator.styles');
const { convertAllSvgs } = require('./generator.icons');

fs.ensureDirSync(path.resolve(__dirname, '../dist/'));

let allData = '';
Object.entries(data).forEach(([token, data]) => {
	allData += `export * from './${token}';\n`;

	fs.writeFileSync(path.resolve(__dirname, `../dist/${token}.ts`), data);
});

fs.writeFileSync(path.resolve(__dirname, '../dist/index.ts'), allData);
fs.writeFileSync(path.resolve(__dirname, '../dist/index.css'), css);
fs.writeFileSync(path.resolve(__dirname, '../dist/index.scss'), scss);
fs.writeFileSync(path.resolve(__dirname, '../dist/variables.css.scss'), css);
// fs.writeFileSync(path.resolve(__dirname, '../dist/types.d.ts'), types);
successMessage('JS data, types and styles written to file! 💾');

convertAllSvgs();
