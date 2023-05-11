const mix = require('laravel-mix');
const config = require('./webpack.config');

mix.options({
	uglify: {
		uglifyOptions: {
			compress: {
				drop_console: true,
				dead_code: true,
				pure_funcs: ['console.warn'],
			},
		},
	},
});

mix.webpackConfig(config);

mix
	.js('./assets/js/site.js', 'public/assets/js/site-all.js')
	.sass('./assets/scss/site.scss', 'public/assets/css/site.css')
	.options({
		processCssUrls: false,
	})
	.version()
	.setPublicPath('./')
	.sourceMaps(true, 'source-map');
