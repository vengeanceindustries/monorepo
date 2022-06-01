const fs = require('fs-extra');
const path = require('path');

const { successMessage } = require('./jsonToCssScssTs');

const data = require('./generator.data');
const { css, scss, ...styles } = require('./generator.styles');
const { convertAllSvgs } = require('./generator.icons');

const outPath = path.resolve(__dirname, '../../dist/');
const dataPath = path.resolve(outPath, 'data');
const stylePath = path.resolve(outPath, 'scss');
fs.ensureDirSync(outPath);
fs.ensureDirSync(dataPath);
fs.ensureDirSync(stylePath);

const content = require('./generators/generator.content');
// const generators = fs.readdirSync(
// 	path.resolve(__dirname, './generators/'),
// 	'utf-8'
// );
// console.log('generators:', generators);
// generators.forEach((file) => {
// 	allData += `export * from './data/${token}';\n`;
// 	fs.writeFileSync(path.resolve(dataPath, `${token}.ts`), data);
// });

let allData = '';
Object.entries(data).forEach(([token, ts]) => {
	const data = token === 'content' ? content.data : ts;

	allData += `export * from './data/${token}';\n`;
	fs.writeFileSync(path.resolve(dataPath, `${token}.ts`), data);
});

let allStyles = '';
Object.entries(styles).forEach(([token, style]) => {
	const data = token === 'content' ? content.scss + content.css : style;

	allStyles += `@import './scss/${token}';\n`;
	fs.writeFileSync(path.resolve(stylePath, `${token}.scss`), data);
});

fs.writeFileSync(path.resolve(outPath, 'index.ts'), allData);
fs.writeFileSync(path.resolve(outPath, 'index.scss'), allStyles);
fs.writeFileSync(path.resolve(outPath, 'variables.css'), css);
successMessage('JS data, types and styles written to file! 💾');

convertAllSvgs();
