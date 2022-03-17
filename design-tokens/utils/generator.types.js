const { jsObject, unionType } = require('./jsonToCssScssTs');

// GLOBAL TOKENS //

const color = require('../src/tokens/colors.global.json');
const layout = require('../src/tokens/layout.json');
const { breakpoints, content, grid } = layout;
const gridBase = grid.base;

const fonts = require('../src/tokens/fonts.json');
const { imports: fontImports, style: fontStyles, ...font } = fonts;

// BANNER TOKENS //

const FL = require('../src/tokens/banner.FL.json');
const KFL = require('../src/tokens/banner.KFL.json');
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
	const below = `${(width - 1) / gridBase}em;`;

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
${unionType({ font }, 'Global')}
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
