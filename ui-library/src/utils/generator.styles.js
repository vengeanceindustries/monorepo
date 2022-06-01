const {
	FILE_COMMENT,
	bannerProperties,
	customProperties,
	fontFamilyReference,
	fontStylesMap,
	sassVariable,
	sassVariables,
	styleBlock,
	updateFontFamilyReferences,
	variablesMap,
} = require('./jsonToCssScssTs');

// GLOBAL TOKENS //

const color = require('../tokens/options/colors.global.json');
const layout = require('../tokens/options/layout.json');
const { breakpoints, columns, content, grid } = layout;
const gridBase = grid.base;

const fonts = require('../tokens/options/fonts.json');
const { imports, ...font } = fonts;
const fontStyles = require('../tokens/decisions/typography.json');

const { theme } = require('../tokens/decisions/colors.decisions.json');

// BANNER TOKENS //

const FL = require('../tokens/themes/banner.FL.json');
const KFL = require('../tokens/themes/banner.KFL.json');

const bannerCustomProperties = updateFontFamilyReferences({ FL, KFL });

// FL is default root styles
const globalCustomProperties = {
	site: FL.site,
	name: FL.name,
	color: FL.color,
	font: { family: fontFamilyReference(FL.font.family) },
	theme: FL.theme,
};

const breakpoint = { device: {}, size: {} };
const bp = {};
const mq = { at: {}, below: {} };
const mqs = { down: {}, up: {} };

Object.entries(breakpoints).forEach(([id, { name, value }]) => {
	const px = `${value}px`;
	const em = `${value / gridBase}em`;
	breakpoint.size[id] = em;
	breakpoint.device[name] = em;
	bp[name] = em;
	// mq.at[name] = `(min-width: {bp.${name}})`;
	// mq.below[name] = `screen and (max-width: {bp.${name} - $onePx-ems})`;
	// mqs.up[id] = `{mq.at.${name}}`;
	// mqs.down[id] = `{mq.below.${name}}`;
	mqs.up[id] = `(min-width: {bp.${name}})`;
	mqs.down[id] = `screen and (max-width: {bp.${name} - $onePx-ems})`;
	// breakpointList.mq[`for-${name}-up`] = `(min-width: {bp.${name}})`;
	// breakpointList.mq[`for-below-${name}`] = `screen and (max-width: {bp.${name} - $onePx-ems})`;
});

const contentSize = Object.keys(content);

const contentWidth = Object.entries(content).reduce((all, [id, value]) => {
	all[id] = typeof value === 'number' ? `${value / gridBase}rem` : value;
	return all;
}, {});

const columnSize = Object.entries(columns).reduce((all, [id, value]) => {
	all[value] = id;
	return all;
}, {});

let css = `${FILE_COMMENT('', true)}
:root {
	/* COLORS */
${customProperties({ color })}
	/* COLUMNS */
${customProperties({ columns, columnSize }, { wrapQuotes: true })}
	/* CONTENT WIDTHS */
${customProperties({ content, contentWidth })}
	/* FONTS */
${customProperties({
	font,
	// font: fontStyles,
})}
	/* BANNER VARS - DEFAULTS */
${customProperties(globalCustomProperties)}
}
/* BANNER VARS  */
${bannerProperties(bannerCustomProperties)}
`;

// COLOR //
const colorScss = `${FILE_COMMENT('COLORS')}
${sassVariables({ color })}
\r// Legacy color names //
${sassVariable(color)}
`;
// FONTS //
const fontScss = `${FILE_COMMENT('FONTS')}
${sassVariables({ font })}
\r// FONT MAP //
${fontStylesMap(fontStyles)}
`;

// LAYOUT  //
const onePx = {
	px: '1px',
	ems: `${1 / gridBase}em`,
	rems: `${1 / gridBase}rem`,
};
const breakpointsScss = `${FILE_COMMENT('BREAKPOINTS')}
${sassVariables({ onePx, breakpoint, bp })}
${variablesMap({ mqs }, false)}
`;
const columnScss = `${FILE_COMMENT('COLUMNS')}
${sassVariables({ columns, columnSize })}`;

const contentScss = `${FILE_COMMENT('CONTENT WIDTHS')}
${variablesMap({ contentSize })}
${sassVariables({ content, contentWidth })}

.contentWidth {
	@each $name, $width in $contentWidth {
		&\:#{$name} {
			max-width: $width;
		}
	}
}
`;

// THEMES //
const themeScss = `${FILE_COMMENT('THEMES')}
// THEME STYLE BLOCKS - TEMPORARY //
${styleBlock({ Theme: theme }, '.', '--')}
`;

let scss = `${FILE_COMMENT()}
${breakpointsScss}
${columnScss}
${contentScss}
${colorScss}
${fontScss}
`;

module.exports = {
	// banner: bannerScss,
	breakpoints: breakpointsScss,
	// button: buttonScss,
	column: columnScss,
	color: colorScss,
	content: contentScss,
	font: fontScss,
	// spacing: spacingScss,
	theme: themeScss,
	css,
	scss,
};
