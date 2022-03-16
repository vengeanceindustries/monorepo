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

const color = require('../src/tokens/colors.global.json');
const layout = require('../src/tokens/layout.json');
const {breakpoints, content, grid} = layout;
const gridBase = grid.base;

const fonts = require('../src/tokens/fonts.json');
const { imports: fontImports, style: fontStyles, ...font } = fonts;

const button = require('../src/tokens/colors.buttons.json');
const themes = require('../src/tokens/colors.themes.json');

// BANNER TOKENS //

const FL = require('../src/tokens/banner.FL.json');
const KFL = require('../src/tokens/banner.KFL.json');
const allBannerTokens = { FL, KFL };

const fontFamily = FL.font.family;

// FL is default root styles
const globalCustomProperties = {
	site: FL.site,
	name: FL.name,
	color: FL.color,
	// color: {...color, ...FL.color},
	font: { family: { ...font.family, ...fontFamily, } },
	button: FL.theme.light.button,
	theme: FL.theme,
};

const breakpointSizes = { device: {}, size: {} };
const bp = {};
const mq = { at: {}, below: {} };
const mqs = { down: {}, up: {} };

Object.entries(breakpoints).forEach(([id, { name, width }]) => {
	const px = `${width}px`;
	const em = `${width / gridBase}em`;
	breakpointSizes.size[id] = em;
	breakpointSizes.device[name] = em;
	bp[name] = em;
	// mq.at[name] = `(min-width: {bp.${name}})`;
	// mq.below[name] = `screen and (max-width: {bp.${name} - $one-px-ems})`;
	// mqs.up[id] = `{mq.at.${name}}`;
	// mqs.down[id] = `{mq.below.${name}}`;
	mqs.up[id] = `(min-width: {bp.${name}})`;
	mqs.down[id] = `screen and (max-width: {bp.${name} - $one-px-ems})`;
	// breakpointList.mq[`for-${name}-up`] = `(min-width: {bp.${name}})`;
	// breakpointList.mq[`for-below-${name}`] = `screen and (max-width: {bp.${name} - $one-px-ems})`;
});

let scss = `// auto-generated file - design system variables //\r
// BREAKPOINTS //\r
${sassVariable({ 'one-px-ems': `${1 / gridBase}em` })}
${variablesMap({ breakpoint: breakpointSizes }, false)}
${sassVariable({ bp, mq }, true)}
${variablesMap({ mqs }, false)}`;
scss += `
// CONTENT WIDTHS //\r
${variablesMap({ content }, false)}
${sassVariable({ content })}`;
scss += `
// SCSS FONTS //\r
${sassVariable({ font })}
// SCSS COLOR VALUES
${variablesMap({ color })}
${sassVariable({ color })}`;
scss += `
// GLOBAL CSS VARIABLES
${globalProperties(globalCustomProperties)}
// BANNER CSS VARS
${bannerProperties(allBannerTokens)}`;

const typemaps = `\r${fontStylesMap(fontStyles)}`;

const buttons = `
// Button style blocks
${styleBlock({ Button: button }, '.', '--')}
`;

const themeStyles = `
// Theme style blocks 
${styleBlock({ Theme: themes }, '.', '--')}
`;

// scss += `\r// STYLE BLOCKS - TEMPORARY //\r` + buttons + themeStyles;
// scss += `\r// FONT MIXIN w/ STYLE TYPEMAPS //////////////////` + typemaps;

let types = `// auto-generated file - design system variables //\r
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

module.exports = {
	scss,
	types,
	allBannerTokens,
	fontImports,
};
