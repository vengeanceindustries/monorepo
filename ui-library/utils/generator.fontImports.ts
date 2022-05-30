const fonts = require('../src/tokens/options/fonts.json');
const fontImports = fonts.imports;

const FL = require('../src/tokens/themes/banner.FL.json');
const KFL = require('../src/tokens/themes/banner.KFL.json');
const allBannerTokens = { FL, KFL } as const;
type BannerName = keyof typeof allBannerTokens;

function generateFontLink(families: string): string {
	return (
		'<link rel="preconnect" href="https://fonts.googleapis.com" />' +
		'<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />' +
		`<link href="https://fonts.googleapis.com/css2?family=${families}&display=swap" rel="stylesheet" />`
	);
}

const entries = Object.entries(allBannerTokens);

const allFontImports: Record<BannerName, string> = entries.reduce(
	(all, [banner, bannerTokens]) => {
		const { base, heading, mono } = bannerTokens.font.family;

		const families = [fontImports[base], fontImports[mono]];
		if (heading !== base) {
			families.push(fontImports[heading]);
		}

		all[banner as BannerName] = generateFontLink(families.join('&'));
		return all;
	},
	{} as Record<BannerName, string>
);

export default allFontImports;
