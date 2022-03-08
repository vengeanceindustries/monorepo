const fs = require('fs-extra');
const path = require('path');

const extractPath = require('extract-svg-path');
const svgToPath = require('path-that-svg').default;
const SVGO = require('svgo');

const svgo = () =>
	new SVGO({
		plugins: [
			{ cleanupAttrs: true },
			{ cleanupEnableBackground: true },
			{ cleanupIDs: true },
			{ cleanupNumericValues: { floatPrecision: 2 } },
			{ collapseGroups: true },
			{ convertColors: true },
			{ convertPathData: true },
			{ convertShapeToPath: true },
			{ convertStyleToAttrs: true },
			{ convertTransform: true },
			{ mergePaths: true },
			{ removeAttrs: { attrs: `(class|data-name|fill)` } },
			{ removeComments: true },
			{ removeDesc: true },
			{ removeDimensions: true },
			{ removeDoctype: true },
			{ removeEditorsNSData: true },
			{ removeEmptyAttrs: true },
			{ removeEmptyContainers: true },
			{ removeEmptyText: true },
			{ removeHiddenElems: true },
			{ removeMetadata: true },
			{ removeNonInheritableGroupAttrs: true },
			{ removeRasterImages: false },
			{ removeTitle: true },
			{ removeUnknownsAndDefaults: true },
			{ removeUnusedNS: true },
			{ removeUselessDefs: true },
			{ removeUselessStrokeAndFill: true },
			{ removeViewBox: false },
			{ removeXMLProcInst: true },
			{ sortAttrs: true },
		],
	});

const sourcePath = path.resolve(__dirname, './src/icons/');

const icons = fs.existsSync(sourcePath)
	? fs
			.readdirSync(sourcePath)
			.filter((file) => /.svg$/.test(file))
			.map((name) => name.replace('.svg', ''))
	: [];

const optimizeData = async (raw) => {
	const optimized = await svgo().optimize(raw);
	// console.log({ pathOnly }, 'optimized:', optimized);
	const data = await svgToPath(optimized.data).then(extractPath.parse);
	return data;
};

async function getAllData() {
	if (!icons.length) {
		console.log(
			`bundleIcons: 👉 NO ICONS FOUND in sourcePath: ${sourcePath}`
		);
		return '';
	}

	const allPaths = Promise.all(
		icons.map((name) => {
			const fileName = path.resolve(sourcePath, `${name}.svg`);
			const raw = fs.readFileSync(fileName, 'utf-8');
			const svgPath = optimizeData(raw);
			return [name, svgPath];
		})
	);

	return `<svg>\r\t<defs>\r${(await allPaths).map(
		([name, svgPath]) =>
			`\r\t\t<symbol id="${name}">${svgPath}\r\t</symbol>`
	)}\r\t</defs>\r</svg>`;
}
// module.exports = getAllData;

const dom = document.createElement('div');

const allPaths = icons
	.map((name) => {
		try {
			const fileName = path.resolve(sourcePath, `${name}.svg`);
			const raw = fs.readFileSync(fileName, 'utf-8');
			// const svgPath = optimizeData(raw);
			// return `\r\t\t<symbol id="${name}">\r\t\t\t${svgPath}\r\t\t</symbol>`;
			dom.innerHTML = raw;
			const thisSvg = dom.querySelector('svg');
			console.log('thisSvg', thisSvg);

			const icon = raw
				.replace('<svg', '<g')
				.replace('</svg>', '</g>')
				.replace(' xmlns="http://www.w3.org/2000/svg"', '')
				.replace(' height="24"', '')
				.replace(' width="24"', '')
				.replace(' viewBox="0 0 24 24"', '');
			return `\r\t\t<symbol id="${name}">\r\t\t\t${icon}\r\t\t</symbol>`;
		} catch (err) {
			console.log('ERROR', err);
		}
	})
	.join('\r');

module.exports = `<svg>\r\t<defs>\r${allPaths}\r\t</defs>\r</svg>`;
