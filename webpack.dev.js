let webpack           = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    { resolve }       = require('path'),
    path              = (...args) => resolve(__dirname, ...args)

module.exports = {
    entry: { 'index': path('./src/index.js') },
    output: {
        path: path('./build'),
        publicPath: '/',
        filename: '[name].js'
    },
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loader: [
                    'style-loader', 'css-loader', 'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path(__dirname, './src/global.scss')
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        alias: { '@': path('./src') }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',              // 生成文件名
            template: path('./src/index.html'),  // 目标模版
            inject: true,                        // 是否注入静态资源
            chunks: ['index']                    // 与上面的entry对应，你要注入的js，写哪几个就注入哪几个
        })
    ],
    devServer: {
        host: 'localhost',
        port: 12138,
        contentBase: path('./src'),
        hot: true,
        stats: 'errors-only'
    }
}