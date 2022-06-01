import React from 'react';
import { propsToClassName } from 'utils/classNames';

export interface MarginProps {
	margin?: SpacingSize;
	marginTop?: SpacingSize;
	marginRight?: SpacingSize;
	marginBottom?: SpacingSize;
	marginLeft?: SpacingSize;
}
export interface PaddingProps {
	padding?: SpacingSize;
	paddingTop?: SpacingSize;
	paddingRight?: SpacingSize;
	paddingBottom?: SpacingSize;
	paddingLeft?: SpacingSize;
}
export interface MarginPaddingProps extends MarginProps, PaddingProps {}
export type SpacingProps = React.PropsWithChildren<MarginPaddingProps>;

export function spacingPropsToClassName(props: MarginPaddingProps) {
	return propsToClassName(props);
}

/**
 * container with margin and/or padding
 */
export default function Spacing({
	children,
	margin,
	marginTop,
	marginRight,
	marginBottom,
	marginLeft,
	padding,
	paddingTop,
	paddingRight,
	paddingBottom,
	paddingLeft,
}: SpacingProps): JSX.Element {
	const className = spacingPropsToClassName({
		margin,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		padding,
		paddingTop,
		paddingRight,
		paddingBottom,
		paddingLeft,
	});

	return <div className={className}>{children}</div>;
}
