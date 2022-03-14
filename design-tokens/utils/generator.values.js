const {
	bannerProperties,
	globalProperties,
	objectValueTransform,
	sassVariable,
	styleBlock,
	unionType,
	variablesMap,
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

const fontFamily = FL['font-family'] || FL.font?.family;

const globals = {
	// use FL for the default root styles
	site: FL.site,
	name: FL.name,
	color: FL.color,
	font: { family: font.family },
	'font-family': fontFamily,
	button: FL.theme.light.button,
	theme: FL.theme,
};

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
// FONT VALUES
${unionType({ font }, 'Global')}
// FONT STYLES & NAMES
${unionType({ fontStyle: {
	name: Object.keys(fontStyles),
	family: fontFamily
} })}
// BANNER NAMES
${unionType(Object.keys(allBannerTokens), 'SiteName')}`;

let scss = `// auto-generated file - design system variables //\n
// BREAKPOINTS
${sassVariable({ breakpoint: breakpoints })}
${variablesMap({
	'breakpoint-device': breakpointSizes.device,
	'breakpoint-size': breakpointSizes.size
})}
// CONTENT WIDTHS
${sassVariable({ content })}
${variablesMap({ 'content-width': content.width })}
// SCSS FONTS
${sassVariable({ font })}
// SCSS COLOR VALUES
${sassVariable(color)}
${variablesMap({ color })}
// GLOBAL CSS VARIABLES
${globalProperties(globals)}
// BANNER CSS VARS
${bannerProperties(allBannerTokens)}`;

const typemaps = `\n
${variablesMap({typemap: fontStyles})}\n
// Font style mixin ////////////////////////////////////////////////
//// Render specific type styles by searching for $name in $typemap
//// @param {String} $name - style to find; don't add "font-" prefix
@mixin font($name) {
	@if map-has-key($typemap, $name) {
		$props: map-get($typemap, $name);
		@include styleMap($props);
	} @else {
		@warn 'No key "#{$name}" in map $typemap. HINT: key should not start with "font-"';
	}
}

/// Loops though a map to render styles
/// @param {Map} $typemap - font map to loop through
@mixin styleMap($map) {
	@each $key, $value in $typemap {
		@if ($key == 'mobile') {
			// 1) assign mobile styles if present,
			@include mq_for_phone_only {
				@include styleMap($value);
			}
		} @else {
			// 2) nest deeper into the map,
			@if (type-of($value) == 'map') {
				&-#{$key} {
					@include styleMap($value);
				}
			} @else {
				// 3) render styles
				@if ($key == 'content') {
					content: quote($value);
				} @else {
					#{$key}: #{$value};
				}
			}
		}
	}
}\n`;

const buttons = `
// Button style blocks
${styleBlock({ Button: button }, '.', '--')}
`;

const themeStyles = `
// Theme style blocks 
${styleBlock({ Theme: themes }, '.', '--')}
`;

// scss += `\n// STYLE BLOCKS - TEMPORARY //\n` + buttons + themeStyles;
scss += `\n// FONT MIXIN w/ STYLE TYPEMAPS //////////////////` + typemaps;

module.exports = {
	scss,
	types,
	allBannerTokens,
	fontImports,
};
