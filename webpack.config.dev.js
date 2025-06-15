let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let DefinePlugin = require('webpack/lib/DefinePlugin')

module.exports = {
    mode: 'development',
    output: {
        filename: 'index.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        stats: 'errors-only',
        open: true
    },
    devtool: 'source-map',
    module: {
        rules: [{
            oneOf: [
                {
                    test: /(\.js)$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [[
                                'env',
                                { 'targets': { 'browsers': ['last 1 versions', 'ie > 10'] } }
                            ]],
                            plugins: ['transform-class-properties', 'transform-decorators-legacy',]
                        }
                    },
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 4,
                        name: 'static/media/[name].[hash:8].[ext]',
                    },
                },
                {
                    exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
                    loader: 'file-loader',
                    options: {
                        name: 'static/media/[name].[hash:8].[ext]',
                    },
                },
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new DefinePlugin({
            'window.env': JSON.stringify('dev')
        })
    ]
}
