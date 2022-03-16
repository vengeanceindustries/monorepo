const { unionType } = require('./jsonToCssScssTs');

// GLOBAL TOKENS //

const color = require('../src/tokens/colors.global.json');
const layout = require('../src/tokens/layout.json');
const { breakpoints, content } = layout;

const fonts = require('../src/tokens/fonts.json');
const { imports: fontImports, style: fontStyles, ...font } = fonts;

// BANNER TOKENS //

const FL = require('../src/tokens/banner.FL.json');
const KFL = require('../src/tokens/banner.KFL.json');
const SiteName = [FL.site, KFL.site];

const fontFamily = FL.font.family;

const breakpoint = { device: [], size: [] };

Object.entries(breakpoints).forEach(([id, { name }]) => {
	breakpoint.size.push(id);
	breakpoint.device.push(name);
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
${unionType({ font }, 'Global')}
// FONT STYLES & NAMES
${unionType({
	fontStyle: {
		name: Object.keys(fontStyles),
		family: fontFamily,
	},
})}`;

module.exports = {
	types,
};
