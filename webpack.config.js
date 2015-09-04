module.exports = {
	entry: './entry.jsx',
	output: {
		path: './build',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ test: /\.jsx/, exclude: /node_modules/, loader: "babel"},
			{ test: /\.es6/, exclude: /node_modules/, loader: "babel"},
			{ test: /png|jpg|jpeg|gif|svg/, exclude: /node_modules/, loader: "url-loader"},
			{ test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }
		]
	}
};