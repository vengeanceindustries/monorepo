import React from 'react';

interface StoryLabelProps {
	children?: React.ReactNode;
	className?: string;
	format?: boolean;
	inline?: boolean;
	label?: string;
	prepend?: string;
	style?: React.CSSProperties;
}

export default function StoryLabel({
	children,
	inline,
	label,
	style,
}: StoryLabelProps): JSX.Element {
	return (
		<pre
			className="StoryLabel"
			style={{
				fontSize: '14px',
				lineHeight: 1.25,
				whiteSpace: 'pre-line',
				...(inline && { display: 'inline-block' }),
				...style,
			}}
		>
			{children || label}
		</pre>
	);
}
