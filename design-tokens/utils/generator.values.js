const {
	bannerProperties,
	globalProperties,
	objectValueTransform,
	sassVariable,
	styleBlock,
	unionType,
} = require('./jsonToCssScssTs');

// GLOBAL TOKENS //
const breakpoints = require('../src/tokens/breakpoints.json');
const color = require('../src/tokens/colors.global.json');
const button = require('../src/tokens/colors.buttons.json');
const themes = require('../src/tokens/colors.themes.json');
const content = require('../src/tokens/content.json');
const fonts = require('../src/tokens/fonts.json');
const allTokens = {  breakpoints, button, color, content, fonts };
// BANNER TOKENS //
const FL = require('../src/tokens/banner.FL.json');
const KFL = require('../src/tokens/banner.KFL.json');
const allBannerTokens = { FL, KFL };

const { imports: fontImports, style: fontStyles, ...font } = fonts;

const globals = {
	// ...FL, // use FL loosely as the root styles
	font: { family: font.family },
	'font-family': FL['font-family'] || FL.font?.family,
	button: FL.theme.light.button,
	theme: FL.theme,
};

const globalsTransformed = objectValueTransform(globals, (key, val) => {
	if (key === 'font-family') {
		const transform = objectValueTransform(val, (k, v) => [k, `#{$font-family-${v}}`]);
		return [key, transform];
	}
	return [key, val];
});
const bannersTransformed = objectValueTransform(allBannerTokens, (key, val) => {
	if (key === 'font-family') {
		const transform = objectValueTransform(val, (k, v) => [k, `var(--font-family-${v})`]);
		return [key, transform];
	}
	return [key, val];
})

const breakpointSizes = { device: {}, size: {} };

Object.entries(breakpoints).forEach(([id, { name, width }]) => {
	breakpointSizes.size[id] = width;
	breakpointSizes.device[name] = `${width / 16}em`;
});

let types = `// auto-generated file - design system variables //\n
// BREAKPOINTS
${unionType(breakpointSizes, 'Breakpoint')}
// CONTENT WIDTHS
${unionType(content, 'Content')}
// COLOR NAMES
${unionType({ color }, 'Global')}
// FONT TYPES
${unionType({ fontType: FL['font-family'] || FL.font?.family }, 'Global')}
// FONT VALUES
${unionType({ font }, 'Global')}
// FONT STYLES
${unionType({ fontStyle: Object.keys(fontStyles) }, 'Global')}
// BANNER NAMES
${unionType(Object.keys(allBannerTokens), 'SiteName')}
`;

let scss = `// auto-generated file - design system variables //\n
// BREAKPOINTS
${sassVariable({ breakpoint: breakpoints })}
// CONTENT WIDTHS
${sassVariable({ content })}
// SCSS FONTS
${sassVariable({ font })}
// Font style placeholders
${styleBlock({ font: fontStyles }, '%', '-')} ///////////
// SCSS COLOR VALUES
${sassVariable(color)}
// GLOBAL CSS VARIABLES
${
	// globalProperties(globals)
	globalProperties(globalsTransformed)
}
// BANNER CSS VARS
${
	// bannerProperties(allBannerTokens)
	bannerProperties(bannersTransformed)
}`;

const buttons = `
// Button style blocks
${styleBlock({ Button: button }, '.', '--')}
`;

const typography = `// Font style placeholders //\n
${styleBlock({ font: fontStyles }, '%', '-')}
// typography.scss //\n
body, .font-body-2 {
	@extend %font-body-2;
}
h1, .font-heading-1 {
	@extend %font-heading-1;
}
h2, .font-heading-2 {
	@extend %font-heading-2;
}
h3, .font-heading-3 {
	@extend %font-heading-3;
}\n`;

const themeStyles = `
// Theme style blocks 
${styleBlock({ Theme: themes }, '.', '--')}
`;

scss += `// STYLE BLOCKS - TEMPORARY //\n` + buttons + themeStyles + typography;

module.exports = {
	scss,
	types,
	allBannerTokens,
	fontImports,
};
