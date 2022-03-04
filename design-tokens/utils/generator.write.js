const fs = require('fs-extra');
const { scss, types } = require('./generator.values');
const { successMessage } = require('./jsonToCssScssTs');

fs.writeFileSync('dist/index.d.ts', types);
fs.writeFileSync('dist/index.scss', scss);

successMessage('types and styles written to file! 📝');
