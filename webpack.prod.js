const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
	mode: 'production',
	optimization: {
		splitChunks: {
	      chunks: 'all'
	    },
    	minimizer: [
	      new UglifyJsPlugin({}),
	      new OptimizeCSSAssetsPlugin({})
	    ]
	  },
	  plugins: [
	    new MiniCssExtractPlugin({
	      filename: "[name].css",
	      chunkFilename: "[id].css"
	    })
	  ],
	  module: {
	    rules: [
	      {
			test: /\.(scss|css)$/,
			resolve: {extensions: [".scss", ".css"]},
		    use: [
				    {
				    	loader:'style-loader'
				    },
				    {
				    	loader:'sass-loader'
				    },
				    MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							modules: true,
							sourceMap: true,
							importLoader: 2
						}
				    }
	        ]
	      }
	    ]
	}
});