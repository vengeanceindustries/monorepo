import React from 'react';
import Heading from './Heading';
import { Button, Spacing } from 'ui-library';

export default function App({}): JSX.Element {
	return (
		<div className="App">
			<header className="App-header">
				<Heading text="This is an h1 heading" />
				<button>regular button</button>
				<Spacing margin={2}>
					<Button label="component button!" />
				</Spacing>
			</header>
		</div>
	);
}
