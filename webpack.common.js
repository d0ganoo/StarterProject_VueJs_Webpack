const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
	alias: {
		vue: 'vue/dist/vue.js'
	}
  },
  module: {
     rules: [
       {
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		use: {
				loader: 'babel-loader',
				options: {
				presets: ['env']
			}
		},
		test: /\.(scss|css)$/,
		use: [
			{
				loader: MiniCssExtractPlugin.loader
			}, 
			{
				loader: "css-loader"
			}, 
			{
				loader: "sass-loader"
			}
		]
      },
      {
		test: /\.(png|svg|jpg|gif)$/,
		use: [
		  'file-loader'
		]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
           'file-loader'
        ]
      }
    ]
  },
  plugins: [
  new CleanWebpackPlugin(['dist']),
  new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
}