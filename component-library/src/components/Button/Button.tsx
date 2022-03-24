import React from 'react';

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
				size ? `Button--${size}` : '',
			].join(' ')}
			type="button"
		>
			{label}
		</button>
	);
}
