const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

export default () => ({
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: "shopify-express.js",
		library: "ShopifyExpress",
		libraryTarget: "umd"
	},
	externals: {},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		]
	},
	plugins: [new CleanWebpackPlugin(["dist"]), new UglifyJSPlugin()]
});
