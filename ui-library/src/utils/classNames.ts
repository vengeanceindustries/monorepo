export interface BemClasses {
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

export function bemClassNames({
	className,
	classNameBase,
	font,
	theme,
	variant,
}: BemClasses): string {
	return [
		classNameBase,
		classNameBase && variant && `${classNameBase}--${variant}`,
		theme && `${classNameBase}--Theme-${theme}`,
		font && `font-${font}`,
		className,
	]
		.filter(Boolean)
		.join(' ');
}
