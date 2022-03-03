const { camelize, hasChildObjects, isTrueObject } = require('./jsonUtils');

function createUnion(arr) {
	if (!Array.isArray(arr)) {
		console.warn('cannot create union from non-Arrays');
		return;
	}
	return arr
		.map((item) => {
			if (typeof item === 'string') {
				return `'${item}'`;
			}
			return item;
		})
		.join(' | ');
}

/**
 * @param {*} obj
 * @returns
 * export type GlobalFontSize = 'heading-1' | 'heading-2';
 */
function unionType(obj, prefix = '') {
	return Object.entries(obj).reduce((all, [key, val]) => {
		let typeName = `${prefix}${camelize(key, { titleCase: true })}`;

		if (isTrueObject(val) && hasChildObjects(val)) {
			return all + `${unionType(val, `${typeName}`)}`;
		}

		const arr = Object.keys(val);
		return all + `export type ${typeName} = ${createUnion(arr)};\n`;
	}, '');
}

module.exports = { unionType };
