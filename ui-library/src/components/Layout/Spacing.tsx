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
