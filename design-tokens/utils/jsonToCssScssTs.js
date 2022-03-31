// UTILS //

function log(text, ...args) {
	console.log(`🎨 Design Tokens ${text}`, ...args);
}

/** Warn user when a generator has failed! ❌ */
function warn(funcName, text, ...args) {
	log(`${funcName} skipped: ❌ ${text}:`, ...args);
}

/** Share a message when files are successfully generated! 🦄✨🎉 */
function successMessage(text, ...args) {
	log(`🦄✨🎉 ${text}`, ...args);
}

function isTrueObject(el) {
	return el && typeof el === 'object' && !Array.isArray(el);
}
function typeOf(el) {
	return Array.isArray(el) ? 'array' : typeof el;
}
function isArray(el) {
	return el && Array.isArray(el);
}
function isStringArray(el) {
	return isArray(el) && !el.some((kid) => typeof kid !== 'string');
}

function hasChildObjects(obj, includeArrays) {
	if (!isTrueObject(obj)) {
		return false;
	}
	const childVals = Object.values(obj);
	return childVals.some((kid) =>
		includeArrays ? typeof kid === 'object' : typeOf(kid) === 'object'
	);
}

/* based off https://stackoverflow.com/a/2970667 */
/**
 * @param {string} str
 * @param {object} options
 * @description convert string of space-separated or dash-separated words to camelCase
 * Returned string will start with lowercase letter unless option.titleCase is true.
 */
function camelize(str, options = {}) {
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

function transformValue(val, inCustomVar = false, useSassVar = false) {
	if (isStringArray(val)) {
		return inCustomVar ? val.join(', ') : `(${val.join(', ')})`;
	}

	let valTransformed = val;
	const regex = RegExp(/\{(.*?)\}/g);

	const matches = typeof val === 'string' ? val.match(regex) : null;
	if (matches) {
		matches.forEach((str) => {
			const value = str.replace(/\./g, '-');
			const valFormatted = useSassVar
				? value.replace('{', '#{$')
				: value.replace('{', 'var(--').replace('}', '');
			valTransformed = valTransformed.replace(str, valFormatted);
		});
	}
	return valTransformed;
}

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

		return (
			all +
			`${attr}: ${transformValue(
				val,
				prefix.includes('--'),
				useSassVar
			)};\r`
		);
	}, '');
}

const transformConfig = {
	depth: 0,
	lineEnd: ';\r\n',
	pre: '$',
	useSassVar: true,
};

function transformObj(obj = {}, config = transformConfig) {
	const { depth, lineEnd, pre, useSassVar } = config;

	const indent = '\t'.repeat(depth);

	return Object.entries(obj).reduce((all, [token, val]) => {
		let key = `${pre}${token}`;

		if (!isTrueObject(val)) {
			return (
				all +
				`${indent}${key}: ${transformValue(
					val,
					pre.includes('--'),
					useSassVar
				)}${lineEnd}`
			);
		}

		const configs = {
			...config,
			depth: depth + 1,
			lineEnd: ',\r',
			pre: '',
		};
		return (
			all +
			`${indent}${key}: (\r${transformObj(
				val,
				configs
			)}${indent})${lineEnd}`
		);
	}, '');
}

function flattenToSassMap(obj, prefix = '$') {
	if (!isTrueObject(obj)) {
		warn('flattenToSassMap', 'cannot create styles from non-object', obj);
		return '';
	}

	return Object.entries(obj).reduce((all, [key, val]) => {
		let attr = `${prefix}${key}`;

		if (isTrueObject(val) && hasChildObjects(val)) {
			return all + `${flattenToSassMap(val, `${attr}-`)}`;
		}

		const config = {
			...transformConfig,
			depth: 1,
			lineEnd: ',\r',
			pre: '',
		};

		const arr = isStringArray(val)
			? `(${val.join(', ')})`
			: `(\r${transformObj(val, config)})`;

		return all + `${attr}: ${arr};\r`;
	}, '');
}

function variablesMap(obj = {}, deeplyNest = true) {
	if (!isTrueObject(obj)) {
		warn('variablesMap', 'cannot create styles from non-object', obj);
		return '';
	}
	if (deeplyNest) {
		return transformObj(obj);
	}
	return flattenToSassMap(obj);
}

function fontFamilyReference(obj) {
	if (!isTrueObject(obj)) {
		warn(
			'fontFamilyReference',
			'was expecting an object, not',
			typeOf(obj),
			obj
		);
		return obj;
	}

	return Object.entries(obj).reduce((all, [type, family]) => {
		// all[type] = `{font.family.${family}}`;
		all[type] = `var(--font-family-${family})`;
		return all;
	}, {});
}

function updateFontFamilyReferences(obj) {
	if (!isTrueObject(obj)) {
		return obj;
	}
	return Object.entries(obj).reduce((all, [key, val]) => {
		all[key] =
			key === 'family'
				? fontFamilyReference(val)
				: updateFontFamilyReferences(val);
		return all;
	}, {});
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
		warn(
			'globalProperties',
			'need object to create custom properties',
			obj
		);
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
function sassVariable(obj, useSassVar = true) {
	if (!isTrueObject(obj)) {
		warn('sassVariable', 'cannot create styles from non-object', obj);
		return '';
	}
	return flattenToVariable(obj, '$', useSassVar);
}

function jsonToStyles(obj, space = '\t') {
	if (!isTrueObject(obj)) {
		warn('jsonToStyles', 'attempting to strigify a non-object', obj);
		return `{\r${space}${JSON.stringify(obj, null, space)}\r}`;
	}
	return (
		JSON.stringify(obj, null, space)
			// .replace(/"([^"]+)":/g, '$1:') // remove double-quotes around keys
			.replace(/"([^"]+)"/g, '$1') // remove all double-quotes
			.replace(/,\r/g, ';\r') // replace comma + line-ending with semi-colon + line-ending (Mac EOL)
			.replace(/,\n/g, ';\n') // replace comma + line-ending with semi-colon + line-ending (Win/Unix EOL)
	);
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
			warn('jsonToStyles', 'cannot create styles from', typeOf(val), val);
			return all;
		}
		return all + `${selector} ${styles}\r\n`;
	}, '');
}

function fontStylesMap(obj) {
	if (!isTrueObject(obj)) {
		warn(
			'fontStylesMap',
			'cannot create variablesMap from non-object',
			obj
		);
		return '';
	}
	return variablesMap({ typemap: obj });
}

// JAVASCRIPT TYPES ///////////////////////////////////

function jsonToObject(val) {
	return JSON.stringify(val, null, '\t').replace(/"([^"]+)":/g, '$1:');
}

function jsObject(obj, prefix = '', lineEnd = ';\r') {
	if (!isTrueObject(obj)) {
		warn('jsObject', 'object expected, not', obj);
		return '';
	}

	return Object.entries(obj).reduce((all, [key, val]) => {
		const name = `${prefix}${camelize(key)}`;

		return all + `export const ${name} = ${jsonToObject(val)}${lineEnd}`;
	}, '');
}

function tsObject(obj) {
	return jsObject(obj, '', ` as const;\r\r`);
}

// TYPESCRIPT TYPES ///////////////////////////////////

function createUnion(arr) {
	if (!Array.isArray(arr)) {
		warn(
			'createUnion',
			'cannot create union from non-Arrays',
			typeOf(arr),
			arr
		);
		return '';
	}
	return arr
		.map((item) => (typeof item === 'string' ? `"${item}"` : item))
		.join(' | ');
}

/**
 * @param {*} obj
 * @returns
 * export type GlobalFontSize = 'heading-1' | 'heading-2';
 */
function unionType(obj, prefix = '') {
	if (isArray(obj) && prefix) {
		return `export type ${prefix} = ${createUnion(obj)};\r`;
	}

	return Object.entries(obj).reduce((all, [key, val]) => {
		if (typeof val === 'undefined') {
			return all;
		}
		const typeName = `${prefix}${camelize(key, { titleCase: true })}`;

		if (isTrueObject(val) && hasChildObjects(val, true)) {
			return all + `${unionType(val, `${typeName}`)}`;
		}

		const arr = isArray(val) ? val : Object.keys(val);

		return all + `export type ${typeName} = ${createUnion(arr)};\r`;
	}, '');
}

module.exports = {
	bannerProperties,
	fontFamilyReference,
	fontStylesMap,
	globalProperties,
	jsObject,
	tsObject,
	sassVariable,
	styleBlock,
	unionType,
	updateFontFamilyReferences,
	variablesMap,
	successMessage,
	warn,
};
