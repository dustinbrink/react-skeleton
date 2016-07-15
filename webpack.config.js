var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = require("./package.json");

var BUILD_DIR = path.resolve(__dirname, 'public');
var SRC_DIR = path.resolve(__dirname, 'src');
var APP_DIR =  path.join(SRC_DIR, 'app');
var ENV_DEV =  process.env.DEV || true;

var webpackConfig = {
	entry: path.join(APP_DIR, config.build.entry),
	output: {
		path: BUILD_DIR,
		filename: config.name+'-bundle.'+config.version+'.js',
	},
	module : {
		loaders : [
			{
				test : /\.jsx$/,
				loader: 'babel-loader',
				include : APP_DIR,
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
			title: config.name,
			template: path.join(SRC_DIR, config.build.template),
			minify: !ENV_DEV,
			showErrors: ENV_DEV
		})
	]
};

module.exports = webpackConfig;