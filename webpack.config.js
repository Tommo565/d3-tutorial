var webpack = require('webpack');

module.exports = {

	plugins: [
     new webpack.ProvidePlugin({
            d3: "d3"
        }),

	new webpack.ProvidePlugin({
		  $: 'jquery',
		  jQuery: 'jquery',
		})
	],

	entry: "./scripts/App.js",
	output: {
		path: "temp/",
		filename: "Compiled.js"
	}
}