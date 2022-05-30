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
