import React from 'react';
import { SpacingSize } from 'design-tokens';

export interface MarginPaddingProps {
	// extends React.CSSProperties {
	// margin properties
	margin?: SpacingSize;
	marginTop?: SpacingSize;
	marginRight?: SpacingSize;
	marginBottom?: SpacingSize;
	marginLeft?: SpacingSize;
	// padding properties
	padding?: SpacingSize;
	paddingTop?: SpacingSize;
	paddingRight?: SpacingSize;
	paddingBottom?: SpacingSize;
	paddingLeft?: SpacingSize;
}
export type SpacingProps = React.PropsWithChildren<MarginPaddingProps>;

// const deps = [ margin, marginBottom, marginLeft, marginRight, marginTop, padding, paddingBottom, paddingLeft, paddingRight, paddingTop, ];

function propToClassName(key: string, val: string | number): string {
	return `${key}:${val}`;
}

/**
 * create classNames from margin, padding shorthand properties
 */
function propsToClassName({ margin, padding, ...rest }: SpacingProps): string {
	// create classnames for `margin` and `padding` shorthand properties, if they exist
	const shorthands = Object.entries({ margin, padding })
		.map(([key, val]) => !!val && propToClassName(key, val))
		.filter(Boolean)
		.join(' ');

	// include any margin-area/padding-area properties if the shorthand property isn't being used
	const longhands = Object.entries(rest)
		.map(([key, val]) => {
			if (
				(key.includes('margin') && !margin) ||
				(key.includes('padding') && !padding)
			) {
				return propToClassName(key, val);
			}
			return null;
		})
		.filter(Boolean)
		.join(' ');

	return `${shorthands} ${longhands}`.trim();
}

/**
 * add spacing to anything without adding styles
 */
export default function Spacing({
	children,
	...props
}: SpacingProps): JSX.Element {
	const className = propsToClassName(props);

	return <div className={className}>{children}</div>;
}
