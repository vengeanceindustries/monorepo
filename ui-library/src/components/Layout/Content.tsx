import React from 'react';
import { contentClass } from 'ui-library';

export type ContentProps = React.PropsWithChildren<{
	size: ContentSize;
}>;

export function contentPropsToClassName(size: ContentSize): ContentClassName {
	return contentClass[size];
}

/**
 * container with constrained width
 */
export default function Content({ children, size }: ContentProps): JSX.Element {
	const className = contentPropsToClassName(size);

	return <div className={className}>{children}</div>;
}
