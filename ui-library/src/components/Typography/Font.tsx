import React from 'react';

export interface FontProps {
	children: React.ReactNode;
	name: FontSize;
}

export default function Font({ children, name }: FontProps): JSX.Element {
	return <p className={`font-${name}`}>{children}</p>;
}
