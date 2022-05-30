const {
	FILE_COMMENT,
	objectAndType,
	objectNameAndType,
	tsObject,
} = require('./jsonToCssScssTs');

// GLOBAL TOKENS //
const color = require('../tokens/options/colors.global.json');
const layout = require('../tokens/options/layout.json');
const fonts = require('../tokens/options/fonts.json');
const fontStyles = require('../tokens/decisions/typography.json');
const { theme } = require('../tokens/decisions/colors.decisions.json');
const { button } = require('../tokens/decisions/components.json');

// BANNER TOKENS //
const FL = require('../tokens/themes/banner.FL.json');
const KFL = require('../tokens/themes/banner.KFL.json');
const bannerName = [FL.site, KFL.site];

let bannerData = `${FILE_COMMENT('banners')}
${objectAndType({ bannerName })}`;

// FONT //
const { family: families, imports, ...font } = fonts;
const fontFamily = Object.keys(families);
const allFont = { font: { ...font, family: fontFamily } };
const fontObj = {
	fontFamily,
	fontName: Object.keys(fontStyles),
	fontSize: Object.keys(font.size),
	fontWeight: Object.keys(font.weight),
	letterSpacing: Object.keys(font.letterSpacing),
	textTransform: Object.keys(font.textTransform),
};

// LAYOUT //
const { breakpoints, content, grid, spacing } = layout;
const column = layout.columns;
const gridBase = grid.base;

const bpObj = {};
const query = {};
const breakpoint = { device: [], name: [], width: [] };
const breakpointUnit = { px: [], em: [], rem: [], unitless: [] };

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

	bpObj[id] = data;
	bpObj[device] = data;
	breakpointUnit.px.push(data.px);
	breakpointUnit.em.push(data.em);
	breakpointUnit.rem.push(data.rem);
	breakpointUnit.unitless.push(value);
	query[`mq_for_${device}_up`] = `(min-width: ${data.em})`;
	query[`mq_for_below_${device}`] = `screen and (max-width: ${below})`;
});

let breakpointsData = `${FILE_COMMENT('breakpoints')}
// breakpoint.xs.value
// breakpoint.phone.px
// breakpoint.sm.em
// breakpoint.tablet_portrait.rem
${tsObject({ breakpoint: bpObj })}\n
// breakpointUnit.px.map(bp => ETC)
${tsObject({ breakpointUnit, query })}\n
${objectAndType({
	breakpointDevice: breakpoint.device,
	breakpointName: breakpoint.name,
	breakpointWidth: breakpoint.width,
	queryName: Object.keys(query),
})}`;

let colorData = objectNameAndType('color', color);

let contentData = objectNameAndType('content', content);

let columnData = objectNameAndType('column', column);

let themeData = objectNameAndType('theme', theme);

let fontData = `${FILE_COMMENT('fonts')}
${tsObject(allFont)}\n
${objectAndType(fontObj)}`;

let spacingData = `${FILE_COMMENT('spacing')}
${tsObject({ spacing })}
${objectAndType({ spacingName: Object.keys(spacing).map(Number).sort() })}`;

let buttonData = `${FILE_COMMENT('button')}
${objectAndType({ button }, true)}`;

module.exports = {
	banner: bannerData,
	breakpoints: breakpointsData,
	button: buttonData,
	column: columnData,
	color: colorData,
	content: contentData,
	font: fontData,
	spacing: spacingData,
	theme: themeData,
};
