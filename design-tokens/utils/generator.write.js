const fs = require('fs-extra');
const { scss, types } = require('./generator.values');

fs.writeFileSync('dist/index.d.ts', types);
fs.writeFileSync('dist/index.scss', scss);
