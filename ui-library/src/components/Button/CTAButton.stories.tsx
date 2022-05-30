import React from 'react';
import { Meta, Story } from '@storybook/react';
import CTAButton from './CTAButton';

export default {
	title: 'Example/Buttons',
	component: CTAButton,
	argTypes: {
		// backgroundColor: { control: 'color' },
		children: { table: { disable: true } },
		classNameBase: { table: { disable: true } },
		font: { table: { disable: true } },
		form: { table: { disable: true } },
	},
	parameters: {
		backgrounds: { default: 'light' },
		layout: 'fullscreen',
	},
} as Meta<typeof CTAButton>;

const Template: Story<CTAButtonProps> = (args) => <CTAButton {...args} />;

const TemplateTheme: Story<CTAButtonProps> = (args) => {
	return (
		<div
			className={args.theme ? `Theme--${args.theme}` : ''}
			style={{ minHeight: 'calc(100vh - 2rem)', padding: '1rem' }}
		>
			<CTAButton {...args} />
			{/* <CTAButton {...args} theme={undefined} /> */}
		</div>
	);
};

export const PrimaryCTA = TemplateTheme.bind({});
PrimaryCTA.args = {
	text: 'Primary CTA',
	theme: 'light',
	variant: 'primary',
};
PrimaryCTA.argTypes = {
	variant: { table: { disable: true } },
};

export const SecondaryCTA = TemplateTheme.bind({});
SecondaryCTA.args = {
	text: 'Secondary CTA',
	theme: 'light',
	variant: 'secondary',
};
SecondaryCTA.argTypes = {
	variant: { table: { disable: true } },
};

// THEMES //

export const ThemeDefaultLight = TemplateTheme.bind({});
ThemeDefaultLight.args = {
	text: 'Button',
	theme: 'light',
	variant: 'primary',
};
ThemeDefaultLight.argTypes = {
	theme: { table: { disable: true } },
};

export const ThemeDark = TemplateTheme.bind({});
ThemeDark.args = {
	text: 'Button',
	theme: 'dark',
	variant: 'primary',
};
ThemeDark.argTypes = {
	theme: { table: { disable: true } },
};

// export const Small = Template.bind({});
// Small.args = {
// 	// size: 'small',
// 	text: 'Button',
// };
