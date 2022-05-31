import React from 'react';
import StoryLabel from '../StorybookHelpers/StoryLabel';

interface SwatchProps {
	children?: React.ReactNode;
	color: string;
	value: string;
}

export default function ColorSwatch({
	children,
	color,
	value,
}: SwatchProps): JSX.Element {
	// console.log('👉 color:', color);
	return (
		<div
			className="ColorSwatch"
			style={{
				backgroundColor: `var(--color-${color})`,
				position: 'relative',
				paddingTop: '95%',
				borderRadius: '5px',
				boxShadow:
					'#888 0 0 0 1px, hsla(0, 0%, 50%, 0.5) 0 1px 1px 1px',
			}}
		>
			{value && (
				<StoryLabel
					label={value}
					style={{
						position: 'absolute',
						padding: '0.3em',
						margin: 0,
						bottom: 0,
						left: 0,
						right: 0,
						borderRadius: '0 0 5px 5px',
						background: '#fff',
						backgroundColor: 'rgba(255,255,255,0.65)',
					}}
				/>
			)}
			{children}
		</div>
	);
}
