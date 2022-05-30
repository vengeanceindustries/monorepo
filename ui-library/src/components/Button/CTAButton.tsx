import React from 'react';
import { bemClassNames } from 'utils/classNames';

export default function CTAButton({
	children,
	className,
	classNameBase = 'Button',
	// handleClick,
	// handleRef,
	text,
	theme,
	type: ownType,
	variant = 'primary',
	...rest
}: CTAButtonProps): JSX.Element {
	// const i18n = useTranslation();

	if (!children && !text) {
		console.warn(
			'CTAButton component requires `text` or `children` in order to be visible'
		);
		return null;
	}
	// const type = ownType || (rest.form || !handleClick ? 'submit' : 'button');
	const type = ownType || (rest.form || !rest.onClick ? 'submit' : 'button');

	return (
		<button
			{...rest} // can take any native browser attribute
			// aria-label={rest['aria-label'] ? i18n(rest['aria-label']) : undefined}
			className={bemClassNames({
				classNameBase,
				className,
				theme,
				variant,
			})}
			// onClick={handleClick}
			// ref={handleRef}
			type={type}
		>
			{children || text}
		</button>
	);
}
