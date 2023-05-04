const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
	plugins: [
		new StyleLintPlugin({
			files: 'assets/**/*.scss',
		}),
		new ESLintPlugin({
			extensions: ['js', 'jsx'],
		}),
		new Dotenv(),
	],
	resolve: {
		modules: [
			path.resolve(__dirname, 'node_modules'),
		],
		alias: {
			local: path.resolve(__dirname, 'assets/js'),
		},
	},
	output: { chunkFilename: 'assets/js/chunks/[name].chunk.js?id=[chunkhash]', publicPath: '/app/themes/goto10/' },
};
