const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackConfig = {
	mode: 'production',
	entry: {
		app: './examples/main.js'
	},
	output: {
		path: path.join(__dirname, './dist'),
		publicPath: '/',
		chunkFilename: 'async_[name]-[hash].js'
	},
	stats: {
		modules: false,
		children: false
	},
	serve: {
		open: true,
		host: '0.0.0.0',
		devMiddleware: {
			logLevel: 'warn'
		},
		hotClient: {
			logLevel: 'warn'
		}
	},
	resolve: {
		extensions: ['.js', '.vue', '.css'],
		alias: {
			packages: path.join(__dirname, '../packages'),
			examples: path.resolve(__dirname, '../examples'),
		}
	},
	module: {
		rules: [{
				test: /\.vue$/,
				use: [{
					loader: 'vue-loader',
					options: {
						compilerOptions: {
							preserveWhitespace: false
						}
					}
				}]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.(scss|css|less)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
					'less-loader'
				]
			},
			{
				test: /\.md$/,
				use: [{
						loader: 'vue-loader',
						options: {
							compilerOptions: {
								preserveWhitespace: false
							}
						}
					},
					{
						loader: path.resolve(__dirname, './md-loader/index.js')
					}
				]
			},
			{
				test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
				loader: 'url-loader',
				query: {
					limit: 10000,
					name: path.posix.join('static', '[name].[hash:7].[ext]')
				}
			}
		]
	},
	plugins: [
		new VueLoaderPlugin(),
		new ProgressBarPlugin(),
		new HtmlWebpackPlugin({
			template: './examples/index.tpl',
			filename: './index.html',
			inject: true
		}),
		new webpack.LoaderOptionsPlugin({
		  vue: {
		    compilerOptions: {
		      preserveWhitespace: false
		    }
		  }
		})
	],
	optimization: {
		minimizer: []
	},
};

webpackConfig.externals = {
	vue: 'Vue',
	'vue-router': 'VueRouter',
	'highlight.js': 'hljs'
};
 webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:7].css'
    })
  );
// https://webpack.js.org/configuration/optimization/#optimizationsplitchunks
webpackConfig.optimization.splitChunks = {
	cacheGroups: {
		vendor: {
			test: /\/src\//,
			name: 'ciel-ui',
			chunks: 'all'
		}
	}
};
webpackConfig.devtool = false;

module.exports = webpackConfig;
