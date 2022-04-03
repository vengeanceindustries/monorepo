const {
	bannerProperties,
	customProperties,
	fontFamilyReference,
	fontStylesMap,
	sassVariable,
	styleBlock,
	updateFontFamilyReferences,
	variablesMap,
} = require('./jsonToCssScssTs');

// GLOBAL TOKENS //

const color = require('../src/options/colors.global.json');
const layout = require('../src/options/layout.json');
const { breakpoints, columns, content, grid } = layout;
const gridBase = grid.base;

const fonts = require('../src/options/fonts.json');
const { imports, ...font } = fonts;
const fontStyles = require('../src/decisions/typography.json');

const { button, theme } = require('../src/decisions/colors.decisions.json');

// BANNER TOKENS //

const FL = require('../src/themes/banner.FL.json');
const KFL = require('../src/themes/banner.KFL.json');

const bannerCustomProperties = updateFontFamilyReferences({ FL, KFL });

// FL is default root styles
const globalCustomProperties = {
	site: FL.site,
	name: FL.name,
	color: FL.color,
	font: { family: fontFamilyReference(FL.font.family) },
	button: FL.theme.light.button,
	theme: FL.theme,
};

const breakpointSizes = { device: {}, size: {} };
const bp = {};
const mq = { at: {}, below: {} };
const mqs = { down: {}, up: {} };

Object.entries(breakpoints).forEach(([id, { name, value }]) => {
	const px = `${value}px`;
	const em = `${value / gridBase}em`;
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

const contentSize = {};

Object.entries(content).forEach(([id, value]) => {
	const out = typeof value === 'number' ? `${value / gridBase}em` : value;
	contentSize[id] = out;
});

const columnSize = {};

Object.entries(columns).forEach(([id, value]) => {
	columnSize[id] = value;
	columnSize[value] = id;
});

let css = `/* auto-generated file - design system variables */

:root {
	/* COLOR VALUES */
${customProperties({ color })}
	/* COLUMNS */
${customProperties({ columns: columnSize }, {wrapQuotes: true})}
	/* CONTENT WIDTHS */
${customProperties({ content: contentSize })}
	/* FONTS */
${customProperties({ font })}
	/* BANNER VARS - DEFAULTS */
${customProperties(globalCustomProperties)}
}
/* BANNER VARS  */
${bannerProperties(bannerCustomProperties)}`;

let scss = `// auto-generated file - design system variables //

// BREAKPOINTS //\r
${sassVariable({ 'one-px-ems': `${1 / gridBase}em` })}
${variablesMap({ breakpoint: breakpointSizes }, false)}
${sassVariable({ bp, mq }, true)}
${variablesMap({ mqs }, false)}
// COLOR VALUES
${variablesMap({ color })}
${sassVariable({ color })}
${sassVariable(color)}
// CONTENT WIDTHS //\r
${variablesMap({ content: contentSize }, false)}
${sassVariable({ content: contentSize })}
// COLUMNS //\r
${variablesMap({ columns: columnSize }, false)}
${sassVariable({ columns: columnSize })}
// FONTS //\r
${variablesMap({ font }, false)}
${sassVariable({ font })}`;
scss += ``;

css += ``;

const typemaps = `\r${fontStylesMap(fontStyles)}`;

const buttons = `
// Button style blocks
${styleBlock({ Button: button }, '.', '--')}`;

const themeStyles = `
// Theme style blocks 
${styleBlock({ Theme: theme }, '.', '--')}`;

scss += `\r// FONT MIXIN w/ STYLE TYPEMAPS //////////////////` + typemaps;
// scss += `\r// STYLE BLOCKS - TEMPORARY //\r` + buttons + themeStyles;

module.exports = {
	css,
	scss,
};
