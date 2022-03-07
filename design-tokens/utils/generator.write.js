const fs = require('fs-extra');
const { successMessage } = require('./jsonToCssScssTs');

const { scss, types } = require('./generator.values');
fs.writeFileSync('dist/index.d.ts', types);
fs.writeFileSync('dist/index.scss', scss);
successMessage('types and styles written to file! 📝');

const { convertAllSvgs } = require('./generator.icons');
convertAllSvgs();
