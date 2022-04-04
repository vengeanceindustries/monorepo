// Type definitions for component-library 1.0.0

declare global {
	// export function helloWorldMessage(): string

	interface BemClasses {
		/** any className to add to an element */
		className?: string;
		/** specify a SUIT BEM classname as the base, ie: Button, Link, IconButton */
		classNameBase?: string;
		/** change font style */
		font?: FontName;
		/** specify theme for Button context */
		theme?: Theme;
		/** specify "style" variation for visual hierarchy. Renders as `.Component--${variant}` */
		variant?: string;
	}

	type ButtonBase = BemClasses &
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

	type CTAButtonVariant = 'primary' | 'secondary' | 'tertiary';

	// type CTAButtonProps = ButtonBase & {
	interface CTAButtonProps extends ButtonBase {
		/** NEVER change font style of a CTA button */
		font?: never;
		/** ID of a form to associate with button; will become "remote" submitter of form */
		form?: string;
		// /** optionally change button size */
		// size?: '' | 'small';
		// /** theme for Hero & Footer context */
		// theme?: Theme;
		/** specify "style" variation for visual hierarchy. Renders as `.Button--${variant}` */
		variant?: CTAButtonVariant;
		// hierarchy?: CTAButtonVariant;
	}
}
export {};
