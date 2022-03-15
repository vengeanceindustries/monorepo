const {
	bannerProperties,
	globalProperties,
	fontStylesMap,
	sassVariable,
	styleBlock,
	unionType,
	variablesMap,
} = require('./jsonToCssScssTs');

// GLOBAL TOKENS //
const breakpoints = require('../src/tokens/breakpoints.json');
const color = require('../src/tokens/colors.global.json');
const content = require('../src/tokens/content.json');
const fonts = require('../src/tokens/fonts.json');
const button = require('../src/tokens/colors.buttons.json');
const themes = require('../src/tokens/colors.themes.json');
const allTokens = {  breakpoints, button, color, content, fonts };
// BANNER TOKENS //
const FL = require('../src/tokens/banner.FL.json');
const KFL = require('../src/tokens/banner.KFL.json');
const allBannerTokens = { FL, KFL };

const { imports: fontImports, style: fontStyles, ...font } = fonts;

const fontFamily = FL.font.family;

// use FL for the default root styles
const globalTokens = {
	site: FL.site,
	name: FL.name,
	color: FL.color,
	// color: {...color, ...FL.color},
	font: { family: { ...font.family, ...fontFamily, } },
	button: FL.theme.light.button,
	theme: FL.theme,
};

const breakpointSizes = { device: {}, size: {} };

Object.entries(breakpoints).forEach(([id, { name, width }]) => {
	breakpointSizes.size[id] = width;
	breakpointSizes.device[name] = `${width / 16}em`;
});

let types = `// auto-generated file - design system variables //\n
// BREAKPOINTS
${unionType(breakpointSizes, 'Breakpoint')}
// CONTENT WIDTHS
${unionType(content, 'Content')}
// COLOR NAMES
${unionType({ color }, 'Global')}
// FONT VALUES
${unionType({ font }, 'Global')}
// FONT STYLES & NAMES
${unionType({ fontStyle: {
	name: Object.keys(fontStyles),
	family: fontFamily
} })}
// BANNER NAMES
${unionType(Object.keys(allBannerTokens), 'SiteName')}`;

let scss = `// auto-generated file - design system variables //\n
// BREAKPOINTS
${sassVariable({ breakpoint: breakpoints })}
${variablesMap({ breakpoint: breakpointSizes }, false)}
// CONTENT WIDTHS
${sassVariable({ content })}
${variablesMap({ content }, false)}`;
scss += `
// content variables map:
// SCSS FONTS
${sassVariable({ font })}
// SCSS COLOR VALUES
${sassVariable({ color })}`;
// scss += `${sassVariable(color)}`;
scss += `${variablesMap({ color })}`;
scss += `
// GLOBAL CSS VARIABLES
${globalProperties(globalTokens)}
// BANNER CSS VARS
${bannerProperties(allBannerTokens)}`;

const typemaps = `\n${fontStylesMap(fontStyles)}`;

const buttons = `
// Button style blocks
${styleBlock({ Button: button }, '.', '--')}
`;

const themeStyles = `
// Theme style blocks 
${styleBlock({ Theme: themes }, '.', '--')}
`;

// scss += `\n// STYLE BLOCKS - TEMPORARY //\n` + buttons + themeStyles;
// scss += `\n// FONT MIXIN w/ STYLE TYPEMAPS //////////////////` + typemaps;

module.exports = {
	scss,
	types,
	allBannerTokens,
	fontImports,
};
