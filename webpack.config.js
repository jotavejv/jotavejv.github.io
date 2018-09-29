var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './js/app.js',
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'app.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
        // new webpack.ProvidePlugin({
        //    $: "jquery",
        //    jQuery: "jquery"
        //  })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    resolve: {
        modules: ["js", "node_modules"]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
