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
function customProperties(obj, prefix = '--') {
	return sassVariable(obj, prefix);
}

/**
 * @param {object} obj nested object whose top-level keys will become class selectors,
 * and nested child objects will become flattend custom properties
 */
function bannerProperties(obj) {
	return Object.entries(obj).reduce((all, [key, val]) => {
		return all + `.${key} {\r${customProperties(val, `  --`)}}\r\n`;
	}, '');
}

function jsonToStyles(obj, space = 2) {
	return JSON.stringify(obj, null, space)
		.replace(/"([^"]+)"/g, '$1')
		.replace(/,/g, ';');
}

/**
 * @param {object} obj nested object whose keys will be flattened to a snake-cased className
 * @param {*} prefix leading string on selector name; defaults to "." for className.
 */
function styleBlock(obj, prefix = '.', join = '-') {
	return Object.entries(obj).reduce((all, [key, val]) => {
		let selector = `${prefix}${key}`;

		if (isTrueObject(val) && hasChildObjects(val)) {
			return all + `${styleBlock(val, `${selector}${join}`)}`;
		}

		return all + `${selector} ${jsonToStyles(val)}\r\n`;
	}, '');
}

module.exports = {
	bannerProperties,
	customProperties,
	sassVariable,
	styleBlock,
};
