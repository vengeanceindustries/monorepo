const { tsObject, tsObjectAndType } = require('./jsonToCssScssTs');

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
const bannerName = [FL.site, KFL.site];

// FONT //
const { family: families, imports, ...font } = fonts;
const family = Object.keys(families);
const allFont = { font: { ...font, family } };

// LAYOUT //
const { breakpoints, columns, content, grid, spacing } = layout;
const gridBase = grid.base;

const spacingSize = Object.keys(spacing).map(Number).sort();

const bp = {};
const queries = {};
const breakpoint = { device: [], name: [], width: [] };
const breakpointUnit = { px: [], em: [], rem: [] };

Object.entries(breakpoints).forEach(([id, { name, value }]) => {
	// types
	breakpoint.device.push(name);
	breakpoint.name.push(id);
	breakpoint.width.push(value);

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
	breakpointUnit.px.push(data.px);
	breakpointUnit.em.push(data.em);
	breakpointUnit.rem.push(data.rem);
	queries[`mq_for_${device}_up`] = `(min-width: ${data.em})`;
	queries[`mq_for_below_${device}`] = `screen and (max-width: ${below})`;
});

let bannerData = `${FILE_COMMENT('banners')}
${tsObjectAndType({ bannerName })}`;

let breakpointsData = `${FILE_COMMENT('breakpoints')}
// breakpoint.xs.value
// breakpoint.phone.px
// breakpoint.sm.em
// breakpoint.tablet_portrait.rem
${tsObject({ breakpoint: bp })}\n
// breakpointUnit.px.map(bp => ETC)
${tsObject({ breakpointUnit })}\n
${tsObjectAndType({
	breakpointDevice: breakpoint.device,
	breakpointName: breakpoint.name,
	breakpointWidth: breakpoint.width,
	queries,
	queryName: Object.keys(queries),
})}`;

let colorData = `${FILE_COMMENT('color')}
${tsObject({ color })}
${tsObjectAndType({ colorName: Object.keys(color) })}`;

let contentData = `${FILE_COMMENT('content')}
${tsObject({ content })}
${tsObjectAndType({ contentName: Object.keys(content) })}`;

let columnData = `${FILE_COMMENT('columns')}
${tsObject({ columns })}
${tsObjectAndType({ columnSize: Object.keys(columns) })}`;

let fontData = `${FILE_COMMENT('fonts')}
${tsObject(allFont)}
${tsObjectAndType({
	fontFamily: family,
	fontName: Object.keys(fontStyles),
	fontWeight: Object.keys(font.weight),
	letterSpacing: Object.keys(font.letterSpacing),
	textTransform: Object.keys(font.textTransform),
})}`;

let spacingData = `${FILE_COMMENT('spacing')}
${tsObject({ spacing })}
${tsObjectAndType({ spacingSize })}`;

module.exports = {
	banner: bannerData,
	breakpoints: breakpointsData,
	columns: columnData,
	color: colorData,
	content: contentData,
	font: fontData,
	spacing: spacingData,
};
