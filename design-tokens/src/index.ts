import tokens from './tokens.json';
import tokensFL from './tokens.FL.json';
import {
	bannerProperties,
	customProperties,
	sassVariable,
	styleBlock,
	unionType,
} from '../utils';

// banners
const color = sassVariable(tokens.color);
const colorTypes = unionType({ color: tokens.color }, 'Global');
// const allBanners = customProperties({ FL: tokensFL });
const banner = bannerProperties({ FL: tokensFL });
// const bannerTypes = unionType({ banner: tokensFL }, 'Type');
// let bannerTypes = unionType({ color: tokensFL.brand }, 'TypeBrand');
// bannerTypes += unionType(tokensFL.theme, 'TypeTheme');

const font = sassVariable({ font: tokens.font });
const fontTypes = unionType({ font: tokens.font }, 'Global');
const button = styleBlock({ Button: tokens['button-variables'] }, '.', '--');
const bannerPlaceholders = styleBlock({ button: tokensFL.button }, '%');
// const bannerPlaceholders = styleBlock({ FL: { button: tokensFL.button } }, "%");
// console.log(tokens.banner);

const typography = `
// typography.scss //
h1,
.font-heading-1 {
  font: #{$font-size-heading-1}/#{$font-line-height-heading} #{$font-weight-bold} var(--font-family-heading);
}
h2,
.font-heading-2 {
  font: #{$font-size-heading-2}/#{$font-line-height-heading} #{$font-weight-bold} var(--font-family-heading);
}
`;

const app = document.getElementById('app');
app.innerHTML = `
<h1>Design Tokens</h1>
<pre>
// SCSS COLORS
${color}
// COLOR TYPES
${colorTypes}
// SCSS FONTS
${font}
// FONT TYPES
${fontTypes}
${typography}
// BANNER CSS VARS
${banner}
// Button placeholders
${bannerPlaceholders}
// Button style blocks
${button}
</pre>`;
