const fs = require('fs');
const path = require('path');
const extractPath = require('extract-svg-path');
const svgToPath = require('path-that-svg').default;
const SVGO = require('svgo');
const plugins = [
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
];
const svgo = () => new SVGO({ plugins });

const { successMessage } = require('./jsonToCssScssTs');

const sourcePath = path.resolve(__dirname, '../src/icons/');

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

	const data = await svgToPath(optimized.data).then(extractPath.parse);
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
	if (!icons.length) {
		log(`convertAllSvgs: ???? NO ICONS FOUND in ~${sourcePath}`);
		return;
	}

	const allData = await Promise.all(
		icons.map((name) =>
			readFileData(path.resolve(sourcePath, `${name}.svg`))
		)
	);

	const iconList = [];

	const allExports = allData.reduce((all, datum, i) => {
		const name = icons[i];
		iconList.push(name);
		all[name.replace('ic_', '')] = datum;
		return all;
	}, {});

	console.log('icons:', iconList);

	const jsonStr = JSON.stringify(allExports, null, '\t').concat('\n');
	const dataStr = convertToSprite(allExports);

	const jsonFile = fs.writeFileSync(distJson, jsonStr);
	const spriteFile = fs.writeFileSync(distSprite, dataStr);

	if (!spriteFile) {
		successMessage('icons written to file! ????');
	}
}

module.exports = { convertAllSvgs, getSpriteFile };
