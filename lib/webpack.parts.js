const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
//const StyleLintPlugin = require('stylelint-webpack-plugin');
const StyleLint = require('stylelint');
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');

exports.devServer = function(options) {
	return {
		devServer: {
			// Enable history API fallback so HTML5 History API based
			// routing works. This is a good default that will come
			// in handy in more complicated setups.
			historyApiFallback: true,

			// Unlike the cli flag, this doesn't set
			// HotModuleReplacementPlugin!
			hot: true,
			inline: true,

			// Display only errors to reduce the amount of output.
			stats: 'errors-only',

			// Parse host and port from env to allow customization.
			//
			// If you use Vagrant or Cloud9, set
			// host: options.host || '0.0.0.0';
			//
			// 0.0.0.0 is available to all network devices
			// unlike default `localhost`.
			host: options.host, // Defaults to `localhost`
			port: options.port // Defaults to 8080
		},
		plugins: [
			// Enable multi-pass compilation for enhanced performance
			// in larger projects. Good default.
			new webpack.HotModuleReplacementPlugin({
				multiStep: true
			})
		]
	};
}

exports.setupCSS = function(paths) {
	return {
		module: {
			loaders: [
				{
					test: /\.css$/,
					loaders: ['style', 'css?sourceMap'],
					include: paths
				}
			]
		}
	};
}

exports.extractCSS = function(paths) {
	return {
		module: {
			loaders: [
				// Extract CSS during build
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract('style', 'css'),
					include: paths
				}
			]
		},
		plugins: [
			// Output extracted CSS to a file
			new ExtractTextPlugin('[name].[chunkhash].css')
		]
	};
}

exports.minify = function() {
	return {
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				// Don't beautify output (enable for neater output)
				beautify: false,

				// Keep comments
				comments: process.env.NODE_ENV === 'development',

				// Compression specific options
				compress: {
					warnings: false, //process.env.NODE_ENV === 'development',

					// Drop `console` statements
					drop_console: process.env.NODE_ENV !== 'development'
				},

				// Mangling specific options
				mangle: {
					// Don't mangle 
					except: ['$', '$super', 'exports', 'require', 'webpackJsonp'],

					// Don't care about IE8
					screw_ie8 : true,

					// Don't mangle function names
					keep_fnames: process.env.NODE_ENV === 'development'
				}
			})
		]
	};
}

exports.setVariable = function(key, value) {
	const env = {};
	env[key] = JSON.stringify(value);

	return {
		plugins: [
			new webpack.DefinePlugin(env)
		]
	};
}

exports.extractBundle = function() {
	return {
		plugins: [
			// Extract bundle and manifest files. Manifest is
			// needed for reliable caching.
			new webpack.optimize.CommonsChunkPlugin({
				names: ['vendor', 'manifest']
			})
		]
	};
}

exports.clean = function(path) {
	return {
		plugins: [
			new CleanPlugin([path], {
				// Without `root` CleanWebpackPlugin won't point to our
				// project and will fail to work.
				root: process.cwd()
			})
		]
	};
}

exports.setupSCSS = function() {
	return {
		module: {
			loaders: [
				{
					test: /\.scss$/,
					loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
				}
			]
		}
	}
}

exports.extractSCSS = function() {
	return {
		module: {
			loaders: [
				// Extract CSS during build
				{
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap'),
				}
			]
		},
		plugins: [
			// Output extracted CSS to a file
			new ExtractTextPlugin('[name].[chunkhash].css')
		]
	};
}

exports.purifyCSS = function(paths) {
	return {
		plugins: [
			new PurifyCSSPlugin({
				basePath: process.cwd(),
				paths: paths,
				purifyOptions: {
					minify: process.env.NODE_ENV !== 'development',
					rejected: process.env.NODE_ENV === 'development',
					info: process.env.NODE_ENV === 'development',
					whitelist: []
				}
			}),
		]
	}
}

exports.babel = function(path) {
	return {
		module : {
			loaders : [
				{
					test : /\.jsx$/,
					loader: 'babel',
					include : path,
					query: {
						cacheDirectory: true,
						//presets: ['es2015', 'react']
					}
				}
			]
		}
	};
}

exports.html = function(options) {
	return {
		// module: {
		// 	loaders: [{
		// 		test: /\.ejs$/,
		// 		loader: 'ejs-loader'
		// 	}],
		// },
		plugins: [
			new HtmlPlugin({
				title: options.name,
				template: require('html-webpack-template'),
				//template: 'html?interpolate!node_modules/html-webpack-template/index.ejs',
				inject: false,
				appMountId: options.appId,
				mobile: true,
				devServer: options.server,
				minify: {
					collapseWhitespace: process.env.NODE_ENV !== 'development',
					removeComments: process.env.NODE_ENV !== 'development',
					removeRedundantAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true
				}
			})
		]
	}
}

exports.eslint = function(path) {
	return {
		module: {
			preLoaders: [
				{
					test: /\.jsx?$/,
					loaders: ['eslint'],
					include: path,
				}
			]
		},
		eslint: {
			failOnError: false,
			failOnWarning: false
		}
	}
}

exports.stylelint = function(path) {
	return {
		module: {
			preLoaders: [
				{
					test: /\.(css|sass|scss)$/,
					loaders: ['postcss'],
					include: path
				}
			]
		},
		postcss: function () {
			return [
				StyleLint({})
			];
		}
	}
}

// exports.stylelint = function(path) {
// 	return {
// 		plugins: [
// 			new StyleLintPlugin({
// 				context: path,
// 				files: "**/*.css",
// 				failOnError: false
// 			})
// 		]
// 	}
// }

exports.exposereact = function() {
	return {
		module : {
			loaders : [
				{
					test: require.resolve('react'),
					loader: 'expose?React'
				}
			]
		}
	};
}

exports.flow = function() {
	return {
		plugins: [
			new FlowStatusWebpackPlugin({
				//binaryPath: 'C:\\flow\\flow.exe',
				//restartFlow: false
			})
		]
	};
}