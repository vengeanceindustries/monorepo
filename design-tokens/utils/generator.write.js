const fs = require('fs-extra');
const { successMessage } = require('./jsonToCssScssTs');

const { scss, types } = require('./generator.values');
fs.writeFileSync('dist/index.d.ts', types);
fs.writeFileSync('dist/index.scss', scss);

const icons = require('./generator.icons');
fs.writeFile('dist/sprite.svg', icons);

// const getIcons = require('./generator.icons');

// async function writeAll() {
// 	const icons = await getIcons();
// 	console.log('generatedIcons:', icons);
// 	fs.writeFile('dist/sprite.svg', icons);

// 	// require('./generator.icons').then((icons) => {
// 	// 	console.log('generatedIcons:', icons);
// 	// 	fs.writeFile('dist/sprite.svg', icons);
// 	// });

// }
// writeAll();
successMessage('types and styles written to file! 📝');
