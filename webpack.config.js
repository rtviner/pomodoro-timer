var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
	devtool: 'inline-source-map',
	entry: './src/pomodoro.jsx',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, './dist')	
	},
	devServer: {
		contentBase: './dist',
	},
	module: {
		rules: [
		{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: ['babel-loader', 'eslint-loader']
		}, 
		{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		},
		{
			test: /\.(ttf|mp3)$/,
			use: ['file-loader']
		}
		]
	},
	mode: 'development',
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html'
		})
	]
};