import React from 'react';
import { Meta, Story } from '@storybook/react';

import Spacing, { SpacingProps } from './Spacing';
import Button from '../Button';

export default {
	title: 'Example/Spacing',
	component: Spacing,
	argTypes: {
		children: { control: 'none' },
	},
} as Meta<typeof Spacing>;

const Template: Story<SpacingProps> = (args) => <Spacing {...args} />;

export const SpacingAroundButton = Template.bind({});
SpacingAroundButton.args = {
	children: <Button label="button with spacing around" />,
	padding: 1,
};

export const Padding1 = Template.bind({});
Padding1.args = {
	children: 'Foo bar',
	padding: 1,
};

export const Padding2 = Template.bind({});
Padding2.args = {
	children: <div>Foo bar</div>,
	padding: 2,
};

export const Margin1 = Template.bind({});
Margin1.args = {
	children: <div>Foobar</div>,
	margin: 1,
};

export const Margin2 = Template.bind({});
Margin2.args = {
	children: <div>Fooobarr</div>,
	margin: 2,
};
