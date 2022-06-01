import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Content, ContentProps, contentSize } from 'ui-library';

export default {
	title: 'Design Tokens/Content',
	component: Content,
	argTypes: {
		children: { table: { disable: true } },
	},
	args: {},
	// parameters: { layout: 'fullscreen' },
} as Meta<typeof Content>;

const Template: Story<ContentProps> = (args) => <Content {...args} />;

export const ConstrainedContent = Template.bind({});
ConstrainedContent.args = {
	children: (
		<div style={{ outline: '1px dotted red' }}>constrained content</div>
	),
	size: contentSize[0],
};
