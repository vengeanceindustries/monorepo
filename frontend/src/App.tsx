import React from 'react';
// import './App.css';
import Heading from './Heading';
import { Button } from '@ui-lib';

export default function App({}): JSX.Element {
	return (
		<div className="App">
			<header className="App-header">
				<Heading text="This is an h1 heading" />
				<button>regular button</button>
				<Button label="component button!" />
				{/* <Spacing margin={2}>
				</Spacing> */}
			</header>
		</div>
	);
}
