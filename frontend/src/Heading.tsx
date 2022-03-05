import React from 'react';

interface Props {
	text: string;
}

export default function Heading({ text }: Props): JSX.Element {
	return <h1>{text}</h1>;
}
