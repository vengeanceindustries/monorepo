import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Button, Spacing, spacingSize } from 'ui-library';
import { SpacingProps } from './Spacing';

const control = { type: 'select', options: spacingSize };

export default {
	title: 'Design Tokens/Spacing',
	component: Spacing,
	argTypes: {
		margin: { control },
		marginBottom: { control },
		marginLeft: { control },
		marginRight: { control },
		marginTop: { control },
		padding: { control },
		paddingBottom: { control },
		paddingLeft: { control },
		paddingRight: { control },
		paddingTop: { control },
		children: { table: { disable: true } },
		// children: { control: 'none' },
	},
	args: {},
} as Meta<typeof Spacing>;

const Template: Story<SpacingProps> = (args) => <Spacing {...args} />;

export const SpacingAroundButton = Template.bind({});
SpacingAroundButton.args = {
	children: <Button text="button with spacing around" />,
	padding: 1,
};

export const Padding1 = Template.bind({});
Padding1.args = {
	children: 'Padding1',
	padding: 1,
};

export const Padding2 = Template.bind({});
Padding2.args = {
	children: <div>Padding2</div>,
	padding: 2,
};

export const PaddingLeft = Template.bind({});
Padding2.args = {
	children: <div>PaddingLeft</div>,
	paddingLeft: 2,
};

export const Margin1 = Template.bind({});
Margin1.args = {
	children: <div>Margin1</div>,
	margin: 1,
};

export const Margin2 = Template.bind({});
Margin2.args = {
	children: <div>Margin2</div>,
	margin: 2,
};
