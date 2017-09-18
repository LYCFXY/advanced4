module.exports = {
	devtool: 'eval-source-map',
	
	entry: __dirname + "/app/index.js",
	output: {
		path: __dirname + "/public",
		filename: "bundle.js"
	},

	devServer: {
		contentBase: "./public",
		historyApiFallback: true,
		inline: true
	},
	module: {
		rules: [
		  {
		    test: /(\.jsc|\.js)$/,
		    use: {
		       loader: "babel-loader",
		       options: {
		       	   presets: [
			   	"es2015", "react"
			   ]
		       }
		    },
		    exclude: /node_modules/
		  },
		  {
		    test: /\.css$/,
		    use: [
		    	{
			  loader:"style-loader"
			},{
			  loader:"css-loader"
			},{
			  loader:"postcss-loader"
			}
		    ]
	          }
		]
	}
}
