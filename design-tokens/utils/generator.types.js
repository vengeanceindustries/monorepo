const { jsObject, unionType } = require('./jsonToCssScssTs');

// GLOBAL TOKENS //

const color = require('../src/options/colors.global.json');
const layout = require('../src/options/layout.json');
const { breakpoints, content, grid } = layout;
const gridBase = grid.base;

const fonts = require('../src/options/fonts.json');
const { family: families, imports: fontImports, ...font } = fonts;
const fontStyles = require('../src/decisions/typography.json');

// BANNER TOKENS //

const FL = require('../src/themes/banner.FL.json');
const KFL = require('../src/themes/banner.KFL.json');
const SiteName = [FL.site, KFL.site];

const fontFamily = FL.font.family;

const breakpoint = { device: [], name: [], size: [] };

Object.entries(breakpoints).forEach(([id, { name, width }]) => {
	breakpoint.device.push(name);
	breakpoint.name.push(id);
	breakpoint.size.push(width);
});

const bp = {};
const queries = {};
Object.entries(breakpoints).forEach(([id, { name, width }]) => {
	const device = name.replace('-', '_');
	const data = {
		value: width,
		px: `${width}px`,
		em: `${width / gridBase}em`,
		rem: `${width / gridBase}rem`,
	};
	const below = `${(width - 1) / gridBase}em`;

	bp[id] = data;
	bp[device] = data;
	queries[`mq_for_${device}_up`] = `(min-width: ${data.em})`;
	queries[`mq_for_below_${device}`] = `screen and (max-width: ${below})`;
});

let data = `// auto-generated file - design system values //

// BREAKPOINTS
${jsObject({ breakpoints: bp })}
${jsObject({ queries })}
`;

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
${unionType({ font: { family: Object.keys(families), ...font } }, 'Global')}
// FONT STYLES & NAMES
${unionType({
	fontStyle: {
		name: Object.keys(fontStyles),
		family: fontFamily,
	},
})}`;

module.exports = {
	data,
	types,
};
