//webpack.production.config.js
var webpack = require('webpack'); //引入Webpack模块供我们调用，这里只能使用ES5语法，使用ES6语法会报错

module.exports = {
    entry:{
        app:__dirname + '/app/main.js',
        vendors:['react','react-dom','react-redux','redux','react-router','redux-logger','redux-thunk']
    } ,
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel?presets[]=react,presets[]=es2015'
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
    plugins: [
        //压缩代码
        new webpack.optimize.UglifyJsPlugin({minimize:true}),  
        //把入口文件vendors数组指定的第三方包打包成verdors.js
        new webpack.optimize.CommonsChunkPlugin('vendors','vendors.js'),
        new webpack.DefinePlugin({
            "process.env":{
              NODE_ENV:JSON.stringify('production')
             }
          })
    ],
     
};