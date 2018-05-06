var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path');

module.exports = {
    entry: './src/main.js',
    mode:'development',
    output: {
        path: path.resolve(__dirname, "static"),
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
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                // excluding some local linked packages.
                // for normal use cases only node_modules is needed.
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use:[
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }
                ],
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader',
                options: {
                    limit: 50000,
                    name: "[path][name].[ext]"
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    },
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin()
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unused: true
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/)
    )
} else {
    module.exports.output.filename = "build.js";
    module.exports.devtool = '#source-map';
}
