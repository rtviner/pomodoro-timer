var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
	entry: './src/pomodoro.jsx',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build')	
	},
	devServer: {
		contentBase: './build',
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
			template: path.resolve('./index.html')
		})
	]
};