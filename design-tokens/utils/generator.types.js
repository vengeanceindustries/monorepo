const { jsObject, unionType } = require('./jsonToCssScssTs');

// GLOBAL TOKENS //

const color = require('../src/options/colors.global.json');
const layout = require('../src/options/layout.json');
const { breakpoints, content, grid } = layout;
const gridBase = grid.base;

const fonts = require('../src/options/fonts.json');
const { family: families, imports, ...font } = fonts;
const fontStyles = require('../src/decisions/typography.json');

// BANNER TOKENS //

const FL = require('../src/themes/banner.FL.json');
const KFL = require('../src/themes/banner.KFL.json');
const SiteName = [FL.site, KFL.site];

const family = Object.keys(families);
const fontFamilyBanner = FL.font.family;

const bp = {};
const queries = {};
const breakpoint = { device: [], name: [], size: [] };

Object.entries(breakpoints).forEach(([id, { name, value }]) => {
	// types
	breakpoint.device.push(name);
	breakpoint.name.push(id);
	breakpoint.size.push(value);

	// js data
	const below = `${(value - 1) / gridBase}em`;
	const device = name.replace('-', '_');
	const data = {
		value,
		px: `${value}px`,
		em: `${value / gridBase}em`,
		rem: `${value / gridBase}rem`,
	};

	bp[id] = data;
	bp[device] = data;
	queries[`mq_for_${device}_up`] = `(min-width: ${data.em})`;
	queries[`mq_for_below_${device}`] = `screen and (max-width: ${below})`;
});

let data = `// auto-generated file - design system values //

// BREAKPOINTS
${jsObject({ breakpoints: bp })}
${jsObject({ queries })}`;

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
${unionType({ font: { family, ...font } }, 'Global')}
// FONT STYLES & NAMES
${unionType({
	fontStyle: {
		name: Object.keys(fontStyles),
		family: fontFamilyBanner,
	},
})}`;

module.exports = {
	data,
	types,
};
