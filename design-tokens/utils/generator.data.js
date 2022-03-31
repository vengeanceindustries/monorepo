const { tsObject, unionType } = require('./jsonToCssScssTs');

function FILE_COMMENT(tokenType) {
	return `// auto-generated file - ${tokenType} - design system values //\n`;
}
// GLOBAL TOKENS //
const color = require('../src/options/colors.global.json');
const layout = require('../src/options/layout.json');
const fonts = require('../src/options/fonts.json');
const fontStyles = require('../src/decisions/typography.json');

// BANNER TOKENS //
const FL = require('../src/themes/banner.FL.json');
const KFL = require('../src/themes/banner.KFL.json');
const SiteName = [FL.site, KFL.site];

// FONT //
const { family: families, imports, ...font } = fonts;
const family = Object.keys(families);
const allFont = { font: { family, ...font } };
const fontName = Object.keys(fontStyles);

// LAYOUT //
const { breakpoints, content, grid, spacing } = layout;
const gridBase = grid.base;

const spacingSize = Object.keys(spacing).map(Number).sort();

const bp = {};
const queries = {};
const breakpoint = { device: [], name: [], size: [] };
const breakpointSize = { px: [], em: [], rem: [] };

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
	breakpointSize.px.push(data.px);
	breakpointSize.em.push(data.em);
	breakpointSize.rem.push(data.rem);
	queries[`mq_for_${device}_up`] = `(min-width: ${data.em})`;
	queries[`mq_for_below_${device}`] = `screen and (max-width: ${below})`;
});

let breakpointsData = `${FILE_COMMENT('breakpoints')}
${tsObject({ breakpoints: bp })}
${tsObject({ breakpointSize })}
${tsObject({ breakpointDevices: breakpoint.device })}
${tsObject({ breakpointNames: breakpoint.name })}
${tsObject({ breakpointSizes: breakpoint.size })}
${tsObject({ queries })}`;

let colorData = `${FILE_COMMENT('color')}
${tsObject({ color })}
${tsObject({ colorName: Object.keys(color) })}
export type ColorName = typeof colorName[number];`;

let contentData = `${FILE_COMMENT('content')}
${tsObject({ content })}
${tsObject({ contentName: Object.keys(content) })}
export type ContentName = typeof contentName[number];`;

let fontData = `${FILE_COMMENT('fonts')}
${tsObject(allFont)}
${tsObject({ fontFamily: family })}
export type FontFamily = typeof fontFamily[number];

${tsObject({ fontName })}
// ${unionType({ FontName: fontName })}
export type FontName = typeof fontName[number];`;

let spacingData = `${FILE_COMMENT('spacing')}
${tsObject({ spacing })}
${tsObject({ spacingSize })}
export type SpacingSize = typeof spacingSize[number];
`;

module.exports = {
	breakpoints: breakpointsData,
	color: colorData,
	content: contentData,
	font: fontData,
	spacing: spacingData,
};
