const {
	FILE_COMMENT,
	globalProperties,
	objectAndType,
	sassVariables,
	tsObject,
	variablesMap,
} = require('../jsonToCssScssTs');

// GLOBAL TOKENS //
const { content, grid } = require('../../tokens/options/layout.json');
const gridBase = grid.base;

const contentSize = Object.keys(content);

const contentWidth = Object.entries(content).reduce((all, [id, value]) => {
	all[id] = typeof value === 'number' ? `${value / gridBase}rem` : value;
	return all;
}, {});

const contentClass = contentSize.reduce((all, name) => {
	all[name] = `contentWidth:${name}`;
	return all;
}, {});
const contentClassName = Object.values(contentClass);

const mapName = (name) => `
.contentWidth\\:${name} {
	max-width: $contentWidth-${name};
}`;

const css = `
${globalProperties({ contentWidth })}`;

const scss = `${FILE_COMMENT('CONTENT WIDTHS')}
${variablesMap({ contentSize })}
${sassVariables({ content, contentWidth })}
${contentSize.map(mapName).join('')}
// .contentWidth {
// 	@include for_each_mq {
// 		@each $name, $width in $contentWidth {
// 			&\\:#{$name}#{$mq} {
// 				max-width: $width;
// 				max-width: $contentWidth-#{$name};
// 			}
// 		}
// 	}
// }

// "Legacy" classname
.constrained {
	// @extend .contentWidth\\:large;
	max-width: $contentWidth-large;
}
`;

const data = `${FILE_COMMENT('content')}
${tsObject({ content })}\n
${tsObject({ contentWidth, contentClass })}

${objectAndType({ contentSize, contentClassName })}
`;

module.exports = {
	css,
	data,
	scss,
};
