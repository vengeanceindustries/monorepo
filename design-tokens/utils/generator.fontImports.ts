import { allBannerTokens, fontImports } from './generator.values';
import { SiteName } from 'design-tokens';

function generateFontLink(families: string): string {
	return (
		'<link rel="preconnect" href="https://fonts.googleapis.com" />' +
		'<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />' +
		`<link href="https://fonts.googleapis.com/css2?family=${families}&display=swap" rel="stylesheet" />`
	);
}

const entries = Object.entries(allBannerTokens);

const allFontImports: Record<SiteName, string> = entries.reduce(
	(all, [banner, bannerTokens]) => {
		const { base, heading, mono } = bannerTokens.font.family;

		const families = [fontImports[base], fontImports[mono]];
		if (heading !== base) {
			families.push(fontImports[heading]);
		}

		all[banner] = generateFontLink(families.join('&'));
		return all;
	},
	{} as Record<SiteName, string>
);

export default allFontImports;
