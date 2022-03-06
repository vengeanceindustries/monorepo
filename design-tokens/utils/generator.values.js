const tokens = require('../src/tokens/tokens.global.json');
const FL = require('../src/tokens/tokens.FL.json');
const KFL = require('../src/tokens/tokens.KFL.json');
const allBannerTokens = { FL, KFL };
const {
	bannerProperties,
	globalProperties,
	sassVariable,
	styleBlock,
	unionType,
} = require('./jsonToCssScssTs');

const { imports: fontImports, style: fontStyles, ...font } = tokens.font;

// TYPES //
// const allBanners = customProperties({ FL });
// const bannerTypes = unionType({ banner: FL }, 'Type');
// let bannerTypes = unionType({ color: FL.brand }, 'TypeBrand');
// bannerTypes += unionType(FL.theme, 'TypeTheme');
const types = `
// BANNERS
${unionType(Object.keys(allBannerTokens), 'SiteName')}
// COLOR TYPES
${unionType({ color: tokens.color }, 'Global')}
// FONT TYPES
${unionType({ fontType: FL.font.family }, 'Global')}
${unionType({ font }, 'Global')}
// FONT NAMES
${unionType({ fontStyle: Object.keys(fontStyles) }, 'Global')}
`;

// SCSS //
const fontPlaceholders = styleBlock({ font: fontStyles }, '%', '-');
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
// const bannerPlaceholders = styleBlock({ button: FL.button }, '%');
// const bannerPlaceholders = styleBlock({ FL: { button: FL.button } }, "%");
/*
.Theme--light {
	color: var(--theme-light-color);
	background-color: var(--theme-light-background-color)
}
 */

const styles = `
// Theme style blocks 
${styleBlock({ Theme: FL.theme }, '.', '--')}
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
	// font: { family: font.family },
	// font: FL.font,
	button: FL.theme.light.button,
	theme: FL.theme,
})}
// BANNER CSS VARS
${bannerProperties(allBannerTokens)}
// Button style blocks
${styleBlock({ Button: tokens.button }, '.', '--')}
`;

module.exports = {
	scss,
	types,
	allBannerTokens,
	fontImports,
};
