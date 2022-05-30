const path = require('path');

module.exports = {
	stories: [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/preset-scss',
	],
	extensions: ['.css, .scss'],
	framework: '@storybook/react',
	core: {
		builder: 'webpack5',
	},
	webpackFinal: (config) => ({
		...config,
		resolve: {
			...config.resolve,
			alias: {
				...config.resolve?.alias,
				utils: path.resolve(__dirname, '../src/utils'),
			},
		},
	}),
};
