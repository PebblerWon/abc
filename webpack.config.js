const path = require('path');
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.js',
  mode:"development",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
 	module: {
   	rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
     	{
       	test: /\.css$/,
       	use:[
          MiniCssExtractPlugin.loader,
          "css-loader"
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
 	plugins:[
    
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      'window.$':'jquery',
      'window.jQuery':'jquery'
  	}),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ]
};