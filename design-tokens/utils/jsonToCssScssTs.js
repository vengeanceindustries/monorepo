// UTILS //

function log(text, ...args) {
	console.log(`🎨 Design Tokens ${text}`, ...args);
}

function warn(funcName, text, ...args) {
	log(`${funcName} skipped: ❌ ${text}:`, ...args);
}

/** Share a message when files are successfully generated! 🦄✨🎉 */
function successMessage(text, ...args) {
	log(`🦄✨🎉 ${text}`, ...args);
}

function isTrueObject(obj) {
	return obj && typeof obj === 'object' && !Array.isArray(obj);
}
function isArray(obj) {
	return obj && Array.isArray(obj);
	// return obj && typeof obj === 'object' && Array.isArray(obj);
}

function hasChildObjects(obj) {
	if (!isTrueObject(obj)) {
		return false;
	}
	const childVals = Object.values(obj);
	return childVals.some((kid) => typeof kid === 'object');
}

/* based off https://stackoverflow.com/a/2970667 */
/**
 * @param {string} str
 * @param {object} options
 * @description convert string of space-separated or dash-separated words to camelCase
 * Returned string will start with lowercase letter unless option.titleCase is true.
 */
function camelize(str, options) {
	if (typeof str !== 'string') {
		return '';
	}
	const { titleCase } = options;
	return str
		.replace(/-/g, ' ')
		.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
			if (+match === 0) return '';
			if (titleCase) {
				return match.toUpperCase();
			}
			return index === 0 ? match.toLowerCase() : match.toUpperCase();
		});
}

function titleCase(str) {
	return camelize(str, { titleCase: true });
}

const transformDefault = (key, val) => [key, val];

const variableSass = (val) => `#{$${val}}`;
const variableCss = (val) => `var(--$${val})`;

/**
 * @param {object} obj nested object whose keys will be flattened to a css-style variable
 * @param {string} prefix leading string on variable name; defaults to "$" for sass vars
 */
function flattenToVariable(obj, prefix = '$', useSassVar = false) {
	if (!isTrueObject(obj)) {
		warn('flattenToVariable', 'cannot create styles from non-object', obj);
		return '';
	}
	return Object.entries(obj).reduce((all, [key, val]) => {
		let attr = `${prefix}${key}`;

		if (isTrueObject(val)) {
			return all + `${flattenToVariable(val, `${attr}-`, useSassVar)}`;
		}

		let valTransformed = Array.isArray(val) ? `(${val})` : val;

		const matches = typeof val === 'string' ? RegExp(/\{(.*?)\}/g).exec(val) : null;
		if (matches) {
			const value = matches[1].replace(/\./g, '-');
			valTransformed = useSassVar ? variableSass(value) : variableCss(value);
		}

		return all + `${attr}: ${valTransformed};\n`;
	}, '');
}

const transformConfig = {
	depth: 0,
	lineEnd: ';\n',
	pre: '$'
};

function transformObj(items = {}, config = transformConfig) {
	const {depth, lineEnd, pre} = config;
	const indent = '\t'.repeat(depth);

	return Object.entries(items).reduce((all, [token, val]) => {
		let key = `${pre}${token}`;

		if (!isTrueObject(val)) {
			return all + `${indent}${key}: ${
				Array.isArray(val) ? `(${val})` : val
			}${lineEnd}`;
		}

		const configs = {
			...config,
			depth: depth + 1,
			lineEnd: ',\n',
			pre: '',
		};
		return all + `${indent}${key}: (\n${transformObj(val, configs)}${indent})${lineEnd}`;
	}, '');
}

function flattenToSassMap(obj, prefix = '$') {
	if (!isTrueObject(obj)) {
		warn('flattenToVariable', 'cannot create styles from non-object', obj);
		return '';
	}

	return Object.entries(obj).reduce((all, [key, val]) => {
		let attr = `${prefix}${key}`;

		if (isTrueObject(val) && hasChildObjects(val)) {
			return all + `${flattenToSassMap(val, `${attr}-`)}`;
		}

		return all + `${attr}: (\n${jsonToMap(val)});\n`;
	}, '');
}

function variablesMap(items = {}, deeplyNest = true) {
	if (deeplyNest) {
		return transformObj(items);
	}
	return flattenToSassMap(items);
}

// CSS CUSTOM PROPERTISE AKA CSS VARIABLES ////////////

function customProperties(obj, prefix = '', useSassVar) {
	return flattenToVariable(obj, `${prefix}--`, useSassVar);
}

/**
 * @param {object} obj nested object whose keys will be flattened to a snake-cased custom property (aka CSS variable)
 * @param {string} root "selector" name of context for properties, defaults to document :root
 */
function globalProperties(obj, root = ':root', useSassVar = true) {
	if (!isTrueObject(obj)) {
		warn('globalProperties', 'need object to create custom properties', obj);
		return '';
	}

	return `${root} {\r${customProperties(obj, `\t`, useSassVar)}};\r\n`;
}

/**
 * @param {object} obj nested object whose top-level keys will become class selectors,
 * and nested child objects will become flattend custom properties
 */
function bannerProperties(obj) {
	if (!isTrueObject(obj)) {
		warn(
			'bannerProperties',
			'cannot create custom-properties from non-object',
			obj
		);
		return '';
	}

	return Object.entries(obj).reduce((all, [key, val]) => {
		return all + globalProperties(val, `.${key}`, true);
	}, '');
}

// SCSS VARIABLES /////////////////////////////////////

/**
 * @param {object} obj nested object whose keys will be flattened to a snake-cased sass variable
 */
function sassVariable(obj) {
	return flattenToVariable(obj, (prefix = '$'));
}

function jsonToMap(obj, depth = 1) {
	const config = {
		...transformConfig,
		depth,
		lineEnd: ',\n',
		pre: '',
	};
	return Array.isArray(obj) ? obj : transformObj(obj, config);
}

function jsonToStyles(obj, space = '\t') {
	if (typeof obj === 'undefined') {
		warn('jsonToStyles', 'cannot create styles from `undefined`');
		return '';
	}
	if (!isTrueObject(obj)) {
		warn('jsonToStyles', 'attempting to strigify a non-object', obj);
		return `{\r${space}${JSON.stringify(obj, null, space)}\r}`;
	}
	return JSON.stringify(obj, null, space)
		.replace(/"([^"]+)"/g, '$1')
		.replace(/,\n/g, ';\n')
		.replace(/,\r/g, ';\r');
}

/**
 * @param {object} obj nested object whose keys will be flattened to a snake-cased className
 * @param {*} prefix leading string on selector name; defaults to "." for className.
 */
function styleBlock(obj, prefix = '.', join = '-') {
	if (!isTrueObject(obj)) {
		warn('styleBlock', 'cannot create styles from non-object', obj);
		return '';
	}
	return Object.entries(obj).reduce((all, [key, val]) => {
		let selector = `${prefix}${key}`;

		if (hasChildObjects(val)) {
			return all + `${styleBlock(val, `${selector}${join}`)}`;
		}
		const styles = jsonToStyles(val);
		if (!styles) {
			return all;
		}
		return all + `${selector} ${styles}\r\n`;
	}, '');
}

function fontStylesMap(obj) {
	const typemap = obj;
	return variablesMap({ typemap });
}

// TYPESCRIPT TYPES ///////////////////////////////////

function createUnion(arr) {
	if (!Array.isArray(arr)) {
		warn('createUnion', 'cannot create union from non-Arrays', arr);
		return '';
	}
	return arr
		.map((item) => (typeof item === 'string' ? `'${item}'` : item))
		.join(' | ');
}

/**
 * @param {*} obj
 * @returns
 * export type GlobalFontSize = 'heading-1' | 'heading-2';
 */
function unionType(obj, prefix = '') {
	if (isArray(obj) && prefix) {
		return `export type ${prefix} = ${createUnion(obj)};\n`;
	}

	return Object.entries(obj).reduce((all, [key, val]) => {
		if (typeof val === 'undefined') {
			return all;
		}
		const typeName = `${prefix}${camelize(key, { titleCase: true })}`;

		if (isTrueObject(val) && hasChildObjects(val)) {
			return all + `${unionType(val, `${typeName}`)}`;
		}

		const arr = isArray(val) ? val : Object.keys(val);

		return all + `export type ${typeName} = ${createUnion(arr)};\n`;
	}, '');
}

module.exports = {
	bannerProperties,
	fontStylesMap,
	globalProperties,
	sassVariable,
	successMessage,
	styleBlock,
	unionType,
	variablesMap,
};
