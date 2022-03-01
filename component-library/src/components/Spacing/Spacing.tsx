import React from 'react';

import './Spacing.css';

export type SpacingSize = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface SpacingProps {
	// extends React.CSSProperties {
	children: React.ReactNode;
	// margin properties
	margin?: SpacingSize;
	marginBottom?: SpacingSize;
	marginLeft?: SpacingSize;
	marginRight?: SpacingSize;
	marginTop?: SpacingSize;
	// padding properties
	padding?: SpacingSize;
	paddingBottom?: SpacingSize;
	paddingLeft?: SpacingSize;
	paddingRight?: SpacingSize;
	paddingTop?: SpacingSize;
}

function propToClassName(key: string, val: string | number): string {
	return `${key}:${val}`;
}

export default function Spacing({
	children,
	margin,
	padding,
	...props
}: SpacingProps): JSX.Element {
	const entries = Object.entries(props);

	// create classnames for `margin` and `padding` shorthand properties, if they exist
	const shorthands = Object.entries({ margin, padding })
		.map(([key, val]) => val !== undefined && propToClassName(key, val))
		.filter(Boolean)
		.join(' ');

	const className = entries.reduce((all, [key, val]) => {
		// include any margin-area/padding-area properties if the shorthand property isn't being used
		if (
			(!margin && key.includes('margin')) ||
			(!padding && key.includes('padding'))
		) {
			return `${all} ${propToClassName(key, val)}`;
		}
		return all;
	}, shorthands);

	return <div className={className}>{children}</div>;
}
