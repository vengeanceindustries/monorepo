const { jsObject, unionType } = require('./jsonToCssScssTs');

// GLOBAL TOKENS //

const color = require('../src/options/colors.global.json');
const layout = require('../src/options/layout.json');
const { breakpoints, content } = layout;

const fonts = require('../src/options/fonts.json');
const { family: families, imports, ...font } = fonts;
const fontStyles = require('../src/decisions/typography.json');

// BANNER TOKENS //

const FL = require('../src/themes/banner.FL.json');
const KFL = require('../src/themes/banner.KFL.json');
const SiteName = [FL.site, KFL.site];

const family = Object.keys(families);
const allFont = { font: { family, ...font } };
const fontStyle = {
	name: Object.keys(fontStyles),
	family: FL.font.family,
};

const breakpoint = { device: [], name: [], size: [] };

Object.entries(breakpoints).forEach(([id, { name, value }]) => {
	// types
	breakpoint.device.push(name);
	breakpoint.name.push(id);
	breakpoint.size.push(value);
});

let types = `// auto-generated file - design system variables //

// BANNER NAMES
${unionType({ SiteName })}
// BREAKPOINTS
${unionType({ breakpoint })}
// CONTENT WIDTHS
${unionType({ content })}
// COLOR NAMES
${unionType({ color }, 'Global')}
// FONT VALUES
${unionType(allFont, 'Global')}
// FONT STYLES & NAMES
${unionType({ fontStyle })}`;

module.exports = {
	types,
};
