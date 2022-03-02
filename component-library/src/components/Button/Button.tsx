import React from 'react';
import './Button.css';

export interface ButtonProps {
	label: string;
	primary?: boolean;
	size?: string;
}

export default function Button({
	label,
	primary,
	size = 'small',
}: ButtonProps): JSX.Element {
	return (
		<button
			className={[
				'Button',
				`Button--${primary ? 'primary' : 'secondary'}`,
				`Button--${size}`,
			].join(' ')}
			type="button"
		>
			{label}
		</button>
	);
}
