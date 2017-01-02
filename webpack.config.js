var webpack = require('webpack')
var path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: './static',
        publicPath: '/static/',
        filename: '[name]-[hash].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    module: {
        // avoid webpack trying to shim process
        noParse: /es6-promise\.js$/,
        rules: [{
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                // excluding some local linked packages.
                // for normal use cases only node_modules is needed.
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: ['style', 'css']
            }
        ]
    },
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/)
    ]
} else {
    module.exports.output.filename = "build.js";
    //module.exports.devtool = '#source-map';
}
