const fs = require('fs');
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
			{ cleanupNumericValues: true },
			{ collapseGroups: true },
			{ convertColors: true },
			{ convertPathData: true },
			{ convertShapeToPath: true },
			{ convertStyleToAttrs: true },
			{ convertTransform: true },
			{ mergePaths: true },
			{ moveElemsAttrsToGroup: true },
			{ moveGroupAttrsToElems: true },
			{ removeAttrs: { attrs: `(class|data-name|stroke|fill})` } },
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

const { successMessage, warn } = require('./jsonToCssScssTs');

const sourcePath = path.resolve(__dirname, '../src/svgs/');

const distJson = path.join(__dirname, '../dist/icons.json');
const distSprite = path.join(__dirname, '../dist/sprite.svg');

// get generated file to insert into app
async function getSpriteFile() {
	return fs.readFile(distSprite, 'utf-8');
}

// create list of files
const icons =
	fs.existsSync(sourcePath) &&
	fs
		.readdirSync(sourcePath)
		.filter((file) => /.svg$/.test(file))
		.map((name) => name.replace('.svg', '')) // file extension throws off sort
		.sort();

// read all files
async function readFileData(file) {
	const raw = fs.readFileSync(file, 'utf-8');

	const optimized = await svgo().optimize(raw, { path: file });

	const data = await svgToPath(optimized.data);
	return data;
}

function convertToSprite(allExports) {
	const allPaths = Object.entries(allExports)
		.map(([name, dataPath]) => {
			try {
				const icon = `<path d="${dataPath}" />`;
				return `\r\t\t<symbol id="${name}">\r\t\t\t${icon}\r\t\t</symbol>`;
			} catch (err) {
				console.log('ERROR', err);
			}
		})
		.join('');
	return `<svg xmlns="http://www.w3.org/2000/svg">\r\t<defs>${allPaths}\r\t</defs>\r</svg>`;
}

async function convertAllSvgs() {
	if (!icons || !icons.length) {
		warn('convertAllSvgs', `👉 NO ICONS FOUND in ~${sourcePath}`);
		return;
	}

	const allSVGs = await Promise.all(
		icons.map((name) =>
			readFileData(path.resolve(sourcePath, `${name}.svg`))
		)
	);
	const allPaths = await Promise.all(
		allSVGs.map(async (data) => await extractPath.parse(data))
	);

	const iconList = [];

	const { svgs, paths } = icons.reduce(
		(all, icon, i) => {
			const name = icon.replace('ic_', '');
			iconList.push(name);
			all.paths[name] = allPaths[i];
			all.svgs[name] = allSVGs[i];
			return all;
		},
		{ paths: {}, svgs: {} }
	);

	const jsonFile = fs.writeFileSync(
		distJson,
		JSON.stringify(svgs, null, '\t').concat('\r')
	);
	const spriteFile = fs.writeFileSync(distSprite, convertToSprite(paths));

	if (!jsonFile && !spriteFile) {
		successMessage('icons sprite SVG and JSON data written to file! 💾🖍');
	}
}

module.exports = { convertAllSvgs, getSpriteFile };
