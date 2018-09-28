var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './js/main.js',
    output: {
        path: path.resolve(__dirname, './dist/js'),
        filename: 'main.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.ProvidePlugin({
           $: "jquery",
           jQuery: "jquery"
         })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    resolve: {
        modules: ["includes", "node_modules"]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
