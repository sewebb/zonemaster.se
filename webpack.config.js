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
			extensions: ['js'],
		}),
		new Dotenv(),
	]
};
