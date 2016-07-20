const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./lib/webpack.parts');

const PKG = require('./package.json');
const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = __dirname;

const config = {
	paths: {
		src: path.resolve(ROOT_PATH, PKG.build.src),
		dest: path.resolve(ROOT_PATH, PKG.build.dest)
	},
	files: {
		styles: [
			path.resolve(ROOT_PATH, PKG.build.src, PKG.build.style),
			path.resolve(ROOT_PATH, 'node_modules', 'purecss')
		]
	},
	bundle: '[name].bundle.'+PKG.version+'.js',
	entryId: 'app'
};

const common = {
	entry: {
		style: config.files.styles,
		app: config.paths.src,
		vendor: Object.keys(PKG.dependencies)
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		alias: {
			'react': 'react-lite',
			'react-dom': 'react-lite'
		}
	},
	stats: {
		children: false
	}
};

var webpackConfig;

// Detect how npm is run and branch based on that
switch(TARGET) {

	case 'build':
	case 'stats':
		process.env.NODE_ENV = 'production';

		webpackConfig = merge(
			common,
			{
				devtool: 'source-map',
				output: {
					path: config.paths.dest,
					filename: '[name].[chunkhash].js',
					chunkFilename: '[chunkhash].js'
				}
			},
			parts.setVariable('process.env.NODE_ENV', process.env.NODE_ENV),
			parts.clean(config.paths.dest),
			parts.babel(config.paths.src),
			parts.extractBundle(),
			parts.minify(),
			parts.extractCSS(config.files.styles),
			parts.purifyCSS([config.paths.src]),
			parts.stylelint(config.paths.src),
			parts.html({
				name: PKG.name,
				appId: config.entryId
			}),
			parts.eslint(config.paths.src)
		);
		break;

	default: // Development
		process.env.NODE_ENV = 'development';

		webpackConfig = merge(
			common,
			{
				devtool: 'eval-source-map',
				output: {
					path: config.paths.dest,
					filename: config.bundle
				}
			},
			parts.setVariable('process.env.NODE_ENV', process.env.NODE_ENV),
			parts.babel(config.paths.src),
			parts.extractBundle(),
			parts.setupCSS(config.files.styles),
			parts.html({
				name: PKG.name,
				appId: config.entryId,
				server: process.env.PORT
			}),
			parts.devServer({
				// Customize host/port here if needed
				host: process.env.HOST,
				port: process.env.PORT
			}),
			parts.stylelint(config.paths.src),
			parts.eslint(config.paths.src)
		);
}

module.exports = validate(webpackConfig, {
	quiet: true
});