var webpack = require('webpack');

module.exports = {

	plugins: [
		new webpack.ProvidePlugin({
			  $: 'jquery',
			  jQuery: 'jquery'
			})
	],

	entry: "./scripts/App.js",
	output: {
		path: "temp/",
		filename: "Compiled.js"
	}
}