import React from 'react';
import { Button, Spacing } from '.';

export default function App(): JSX.Element {
	return (
		<div className="App">
			<button>regular button</button>
			<Spacing margin={2}>
				<Button label="component button!" />
			</Spacing>
		</div>
	);
}
