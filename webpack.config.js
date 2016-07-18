const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./lib/parts');

const CONFIG = require('./package.json');


const PATHS = {
	build: path.resolve(__dirname, CONFIG.build.dest),
	src: path.resolve(__dirname, CONFIG.build.src),
	app: path.resolve(__dirname, CONFIG.build.src, CONFIG.build.app)
};

const FILES = {
	entry: path.resolve(PATHS.app, CONFIG.build.entry),
	template: path.resolve(PATHS.src, CONFIG.build.template),
	bundle: '[name].bundle.'+CONFIG.version+'.js',
	styles: [
		path.resolve(PATHS.app, CONFIG.build.style),
		path.resolve(__dirname, 'node_modules', 'purecss')
	]
};

const common = {
	entry: {
		style: FILES.styles,
		app: PATHS.app,
		vendor: Object.keys(CONFIG.dependencies)
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	output: {
		path: PATHS.build,
		filename: FILES.bundle
	}
};

const bundleParts = {
	name: 'vendor',
	entries: ['react']
};

var webpackConfig;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {

	case 'build':
	case 'stats':
		process.env.NODE_ENV = 'production';

		webpackConfig = merge(
			common,
			{
				devtool: 'source-map',
				output: {
					path: PATHS.build,
					filename: '[name].[chunkhash].js',
					chunkFilename: '[chunkhas].js'
				}
			},
			parts.setVariable('process.env.NODE_ENV', process.env.NODE_ENV),
			parts.clean(PATHS.build),
			parts.babel(PATHS.app),
			parts.extractBundle(bundleParts),
			parts.minify(),
			parts.extractCSS(FILES.styles),
			parts.purifyCSS([PATHS.app]),
			parts.html({
				name: CONFIG.name,
				template: FILES.template
			}),
			parts.eslint(PATHS.app)
		);
		break;

	default: // Development
		process.env.NODE_ENV = 'development';

		webpackConfig = merge(
			common,
			{
				devtool: 'eval-source-map'
			},
			parts.setVariable('process.env.NODE_ENV', process.env.NODE_ENV),
			parts.babel(PATHS.app),
			parts.extractBundle(bundleParts),
			parts.setupCSS(FILES.styles),
			parts.html({
				name: CONFIG.name,
				template: FILES.template
			}),
			parts.devServer({
				// Customize host/port here if needed
				host: process.env.HOST,
				port: process.env.PORT
			}),
			parts.eslint(PATHS.app)
		);
}

module.exports = validate(webpackConfig, {
	quiet: true
});