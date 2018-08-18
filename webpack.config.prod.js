let HtmlWebpackPlugin = require('html-webpack-plugin')
let DefinePlugin = require('webpack/lib/DefinePlugin')

module.exports = {
    mode: 'production',
    output: {
        filename: 'index.js',
    },
    devtool: 'cheap-module-source-map',
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
            template: './src/index.html',
            minify: {
                caseSensitive: true,
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new DefinePlugin({
            'window.env': JSON.stringify('prod')
        })
    ],
}
