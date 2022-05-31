/**
 * generate SUIT BEM classnames based on classname-related props
 */
export function bemClassNames({
	className,
	classNameBase,
	font,
	theme,
	variant,
}: BemClasses): string {
	return [
		classNameBase,
		classNameBase && variant && `${classNameBase}--${variant}`,
		theme && `${classNameBase}--Theme-${theme}`,
		font && `font-${font}`,
		className,
	]
		.filter(Boolean)
		.join(' ');
}

export type PropValue = string | number;

export function propToClassName(key: string, val: PropValue): string {
	if (typeof val === 'object' || (!val && val !== 0)) {
		return '';
	}
	return `${key}:${val}`;
}

export function propsToClassName(props: Record<string, any>): string {
	return Object.entries(props)
		.map(([key, val]) => propToClassName(key, val))
		.filter(Boolean)
		.join(' ');
}

// function spacingPropsToClassName({ margin, padding, ...rest }: SpacingProps): string {
// 	// create classnames for `margin` and `padding` shorthand properties, if they exist
// 	const shorthands = Object.entries({ margin, padding })
// 		.map(([key, val]) => propToClassName(key, val))
// 		.filter(Boolean)
// 		.join(' ');

// 	// include any margin-x & padding-x properties if the shorthand property isn't being used
// 	const longhands = Object.entries(rest)
// 		.map(([key, val]) => {
// 			if (
// 				(key.includes('margin') && !margin) ||
// 				(key.includes('padding') && !padding)
// 			) {
// 				return propToClassName(key, val);
// 			}
// 			return null;
// 		})
// 		.filter(Boolean)
// 		.join(' ');

// 	return `${shorthands} ${longhands}`.trim();
// }

// export function propsWithShorthand(
// 	name: string,
// 	props: Record<string, any>
// ): string {
// 	const shorthandValue = props[name];
// 	const rest = props;
// 	delete rest[name];

// 	// create classnames for shorthand properties, if they exist
// 	const shorthands = Object.entries({ [name]: shorthandValue })
// 		.map(([key, val]) => propToClassName(key, val))
// 		.filter(Boolean)
// 		.join(' ');

// 	// include any attribute-x properties if the shorthand property isn't being used
// 	const longhands = !shorthandValue
// 		? Object.entries(rest)
// 				.map(([key, val]) => {
// 					return key.includes(name)
// 						? propToClassName(key, val)
// 						: null;
// 				})
// 				.filter(Boolean)
// 				.join(' ')
// 		: '';

// 	return [shorthands, longhands].filter(Boolean).join(' ');
// }

// export function propsWithShorthand(
// 	names: string[],
// 	props: Record<string, PropValue>
// ): string {
// 	const rest = props;
// 	const shorthandValues = names.map((name) => {
// 		delete rest[name];
// 		return props[name];
// 	});

// 	// create classnames for shorthand properties, if they exist
// 	const shorthands = names
// 		.map((name) => propToClassName(name, props[name]))
// 		.filter(Boolean)
// 		.join(' ');

// 	// include any attribute-x properties if the shorthand property isn't being used
// 	const longhands = !shorthandValues.length
// 		? Object.entries(rest)
// 				.filter((key, val) => )
// 				.map(([key, val]) => {
// 					// return key.includes(name)
// 					// 	? propToClassName(key, val)
// 					// 	: null;
// 					if (
// 						(key.includes(name) && !margin) ||
// 						(key.includes('padding') && !padding)
// 					) {
// 						return propToClassName(key, val);
// 					}
// 					return null;
// 				})
// 				.filter(Boolean)
// 				.join(' ')
// 		: '';

// 	return [shorthands, longhands].filter(Boolean).join(' ');
// }
