import React from 'react';
import { Theme } from 'design-tokens';
import { BemClasses, bemClassNames } from '../../utils/classNames';

export type ButtonBase = BemClasses &
	React.HTMLAttributes<HTMLButtonElement> &
	React.PropsWithChildren<{
		// /** onClick handler function */
		// handleClick?: (...args: any[]) => any;
		// /** ref object assignment function */
		// handleRef?: React.LegacyRef<HTMLButtonElement>;
		/** button text, can be label for i18n */
		text?: string;
		/** String indicating whether the button should render as 'button', 'submit', or 'reset' */
		type?: 'button' | 'reset' | 'submit';
	}>;

export interface CTAButtonProps extends ButtonBase {
	/** NEVER change font style of a CTA button */
	font?: never;
	/** ID of a form to associate with button; will become "remote" submitter of form */
	form?: string;
	// /** optionally change button size */
	// size?: '' | 'small';
	/** theme for Hero & Footer context */
	theme?: Theme;
	/** specify "style" variation for visual hierarchy. Renders as `.Button--${variant}` */
	variant?: 'primary' | 'secondary' | 'tertiary';
	// hierarchy?: 'primary' | 'secondary' | 'tertiary';
}

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
