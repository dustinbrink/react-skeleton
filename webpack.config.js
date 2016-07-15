const webpack = require('webpack');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./lib/parts');

const CONFIG = require('./package.json');
const ENV_DEV =  process.env.DEV || true;

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
	},
	module : {
		loaders : [
			{
				test : /\.jsx$/,
				loader: 'babel-loader',
				include : PATHS.app,
				exclude: /(node_modules|bower_components)/,
				query: {
					cacheDirectory: true,
					presets: ['es2015', 'react']
				}
			}
		]
	},
	plugins: [
		new HtmlPlugin({
			title: CONFIG.name,
			template: FILES.template,
			minify: !ENV_DEV,
			showErrors: ENV_DEV
		})
	]
}

var webpackConfig;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
	
	case 'build':
		console.log('PRODUCTION BUILD!!!');
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
			parts.setVariable('process.env.NODE_ENV', 'production'),
			parts.clean(PATHS.build),
			parts.extractBundle({
				name: 'vendor',
				entries: ['react']
			}),
			parts.minify(),
			parts.extractCSS(FILES.styles),
			parts.purifyCSS([PATHS.app])
		);
		break;

	default: // Development
		console.log('DEVELOPMENT BUILD!!!')
		webpackConfig = merge(
			common,
			{
				devtool: 'eval-source-map'
				//devtool: 'source-map'
			},
			parts.setVariable('process.env.NODE_ENV', 'development'),
			parts.clean(PATHS.build),
			parts.extractBundle({
				name: 'vendor',
				entries: ['react']
			}),
			//parts.minify(),
			parts.setupCSS(FILES.styles),
			parts.devServer({
				// Customize host/port here if needed
				host: process.env.HOST,
				port: process.env.PORT
			})
		);
}

module.exports = validate(webpackConfig);