import React from 'react';

import { GlobalFontSize } from 'design-tokens';

export interface FontProps {
	children: React.ReactNode;
	name: GlobalFontSize;
}

export default function Font({ children, name }: FontProps): JSX.Element {
	return <p className={`font-${name}`}>{children}</p>;
}
