const fs = require('fs-extra');

const tokens = require('../src/tokens.json');
const tokensFL = require('../src/tokens.FL.json');
const tokensKFL = require('../src/tokens.KFL.json');
const {
	bannerProperties,
	customProperties,
	sassVariable,
	styleBlock,
} = require('./jsonToScss');
const { unionType } = require('./jsonToTs');

const writefile = (filename, data) => {
	return fs.writeFileSync(filename, data);
};

// banners
const color = sassVariable(tokens.color);
const colorTypes = unionType({ color: tokens.color }, 'Global');
// const allBanners = customProperties({ FL: tokensFL });
// const bannerTypes = unionType({ banner: tokensFL }, 'Type');
// let bannerTypes = unionType({ color: tokensFL.brand }, 'TypeBrand');
// bannerTypes += unionType(tokensFL.theme, 'TypeTheme');

const font = sassVariable({ font: tokens.font });
const fontTypes = unionType({ font: tokens.font }, 'Global');
const button = styleBlock({ Button: tokens['button-variables'] }, '.', '--');

const banner = bannerProperties({ FL: tokensFL, KFL: tokensKFL });
const bannerPlaceholders = styleBlock({ button: tokensFL.button }, '%');
// const bannerPlaceholders = styleBlock({ FL: { button: tokensFL.button } }, "%");

const ts = `
// COLOR TYPES
${colorTypes}
// FONT TYPES
${fontTypes}
`;

const typography = `
// typography.scss //
h1,
.font-heading-1 {
  font: #{$font-size-heading-1}/#{$font-line-height-heading} #{$font-weight-bold} var(--font-family-heading);
}
h2,
.font-heading-2 {
  font: #{$font-size-heading-2}/#{$font-line-height-heading} #{$font-weight-bold} var(--font-family-heading);
}
`;

const scss = `
// SCSS COLORS
${color}
// SCSS FONTS
${font}
${typography}
// BANNER CSS VARS
${banner}
// Button style blocks
${button}
`;

writefile('dist/index.scss', scss);
writefile('dist/index.d.ts', ts);
