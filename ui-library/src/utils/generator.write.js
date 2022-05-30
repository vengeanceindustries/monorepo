const fs = require('fs-extra');
const path = require('path');

const { successMessage } = require('./jsonToCssScssTs');

const data = require('./generator.data');
const { css, scss } = require('./generator.styles');
const { convertAllSvgs } = require('./generator.icons');

const outPath = path.resolve(__dirname, '../../dist/');
fs.ensureDirSync(outPath);

let allData = '';
Object.entries(data).forEach(([token, data]) => {
	allData += `export * from './${token}';\n`;

	fs.writeFileSync(path.resolve(outPath, `${token}.ts`), data);
});

fs.writeFileSync(path.resolve(outPath, 'index.ts'), allData);
fs.writeFileSync(path.resolve(outPath, 'index.css'), css);
fs.writeFileSync(path.resolve(outPath, 'index.scss'), scss);
fs.writeFileSync(path.resolve(outPath, 'variables.css.scss'), css);
successMessage('JS data, types and styles written to file! 💾');

convertAllSvgs();
