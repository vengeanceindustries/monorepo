const { hasChildObjects, isTrueObject } = require('./jsonUtils');

/**
 * @param {object} obj nested object whose keys will be flattened to a snake-cased sass variable
 * @param {string} prefix leading string on variable name; defaults to "$" for sass vars
 */
function sassVariable(obj, prefix = '$') {
	return Object.entries(obj).reduce((all, [key, val]) => {
		let attr = `${prefix}${key}`;

		if (!!val && typeof val === 'object' && !Array.isArray(val)) {
			return all + `${sassVariable(val, `${attr}-`)}`;
		}

		return all + `${attr}: ${Array.isArray(val) ? `(${val})` : val};\n`;
	}, '');
}

/**
 * @param {object} obj nested object whose keys will be flattened to a snake-cased custom property (aka CSS variable)
 * @param {string} prefix leading string on variable name; defaults to "--" for custom properties
 */
function customProperties(obj, prefix = '') {
	return sassVariable(obj, `${prefix}--`);
}

/**
 * @param {object} obj nested object whose keys will be flattened to a snake-cased custom property (aka CSS variable)
 * @param {string} root "selector" name of context for properties, defaults to document :root
 */
function globalProperties(obj, root = ':root') {
	return `${root} {\r${customProperties(obj, `\t`)}};\r\n`;
}

/**
 * @param {object} obj nested object whose top-level keys will become class selectors,
 * and nested child objects will become flattend custom properties
 */
function bannerProperties(obj) {
	return Object.entries(obj).reduce((all, [key, val]) => {
		return all + globalProperties(val, `.${key}`);
	}, '');
}

function jsonToStyles(obj, space = '\t') {
	if (!obj) {
		return '';
	}
	return JSON.stringify(obj, null, space)
		.replace(/"([^"]+)"/g, '$1')
		.replace(/,/g, ';');
}

function getCssChild(obj) {
	if (!isTrueObject(obj)) {
		return null;
	}
	// acceptable key names for css child:
	return obj.css || obj.CSS;
}

function getChildObject(obj) {
	return hasChildObjects(obj) ? Object.values(obj) : null;
}

/**
 * @param {object} obj nested object whose keys will be flattened to a snake-cased className
 * @param {*} prefix leading string on selector name; defaults to "." for className.
 */
function styleBlock(obj, prefix = '.', join = '-') {
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

module.exports = {
	bannerProperties,
	customProperties,
	globalProperties,
	sassVariable,
	styleBlock,
};
