const tokens = require('../src/tokens/tokens.global.json');
const tokensFL = require('../src/tokens/tokens.FL.json');
const tokensKFL = require('../src/tokens/tokens.KFL.json');
const {
	bannerProperties,
	globalProperties,
	sassVariable,
	styleBlock,
	unionType,
} = require('./jsonToCssScssTs');

const { name: fontNames, ...font } = tokens.font;
const namedFonts = Object.keys(fontNames);

// TYPES //
// const allBanners = customProperties({ FL: tokensFL });
// const bannerTypes = unionType({ banner: tokensFL }, 'Type');
// let bannerTypes = unionType({ color: tokensFL.brand }, 'TypeBrand');
// bannerTypes += unionType(tokensFL.theme, 'TypeTheme');
const types = `
// COLOR TYPES
${unionType({ color: tokens.color }, 'Global')}
// FONT TYPES
${unionType({ font }, 'Global')}
// FONT NAMES
${unionType({ fontName: namedFonts }, 'Global')}
`;

// SCSS //
const fontPlaceholders = styleBlock({ font: fontNames }, '%', '-');
const typography = `// typography.scss //
body, .font-body-2 {
	@extend %font-body-2;
}
h1, .font-heading-1 {
	@extend %font-heading-1;
}
h2, .font-heading-2 {
	@extend %font-heading-2;
}
h3, .font-heading-3 {
	@extend %font-heading-3;
}
`;
// const bannerPlaceholders = styleBlock({ button: tokensFL.button }, '%');
// const bannerPlaceholders = styleBlock({ FL: { button: tokensFL.button } }, "%");
/*
.Theme--light {
	color: var(--theme-light-color);
	background-color: var(--theme-light-background-color)
}
 */

const styles = `
// Theme style blocks 
${styleBlock({ Theme: tokensFL.theme }, '.', '--')}
`;

const scss = `
// SCSS COLOR VALUES
${sassVariable(tokens.color)}
// SCSS FONTS
${sassVariable({ font })}
// FontName style blocks
${fontPlaceholders}
${typography}
// BANNER FONTS
${globalProperties({
	font: { family: { heading: font.family.heading } },
	button: tokensFL.button,
	theme: tokensFL.theme,
})}
// BANNER CSS VARS
${bannerProperties({ FL: tokensFL, KFL: tokensKFL })}
// Button style blocks
${styleBlock({ Button: tokens.button }, '.', '--')}
`;

module.exports = {
	scss,
	types,
};
