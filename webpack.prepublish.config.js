var path = require('path');
var webpack = require('webpack');

var config = {
    entry: path.resolve(__dirname, './app/app.js'),
    output: {
        path: path.resolve(__dirname, './lib'),
        library: 'videoplugin',
        libraryTarget: 'umd',
        filename: 'app.js'
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new webpack.DefinePlugin({
            // 消除警告
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        noParse: [],
        loaders: [
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.js$|\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react','stage-2']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(swf|svg|ttf|eot|woff|woff2)$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
        ]
    },
    externals: {
        'react'       : 'umd react',
        'react-dom'   : 'umd react-dom',
        'react-portal': 'umd react-portal',
        'tween.js'    : 'umd tween.js'
    }
};

module.exports = config;