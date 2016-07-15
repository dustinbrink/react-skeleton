const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');


const CONFIG = require("./package.json");
const ENV_DEV =  process.env.DEV || true;


const PATHS = {
	build: path.resolve(__dirname, CONFIG.build.dest),
	src: path.resolve(__dirname, CONFIG.build.src),
	app: path.resolve(__dirname, CONFIG.build.src, CONFIG.build.app)
};

const FILES = {
	entry: path.resolve(PATHS.app, CONFIG.build.entry),
	template: path.resolve(PATHS.src, CONFIG.build.template),
	bundle: CONFIG.name+'-bundle.'+CONFIG.version+'.js'
};


console.log(PATHS.build);
console.log(PATHS.src);
console.log(PATHS.app);

const common = {
	entry: {
		app: FILES.entry
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
					presets: ['es2015', 'react']
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			__DEV__: ENV_DEV,
		}),
		new HtmlWebpackPlugin({
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
    webpackConfig = merge(common, {});
    break;
  default:
    webpackConfig = merge(common, {});
}

module.exports = validate(webpackConfig);