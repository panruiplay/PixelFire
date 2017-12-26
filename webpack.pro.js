let webpack                 = require('webpack'),
    autoprefixer            = require('autoprefixer'),
    rimraf                  = require('rimraf'),
    CopyWebpackPlugin       = require('copy-webpack-plugin'),
    HtmlWebpackPlugin       = require('html-webpack-plugin'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    ExtractTextPlugin       = require('extract-text-webpack-plugin'),
    { resolve }             = require('path'),
    path                    = (...args) => resolve(__dirname, ...args)

rimraf.sync(path('build'))

module.exports = {
    entry: { 'js/index': path('./src/index.js') },
    output: {
        path: path('./build'),
        publicPath: '/',
        filename: '[name]@[hash:6].js'
    },
    devtool: false,
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.scss$/,
                        exclude: /node_modules/,
                        use: ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: [
                                { loader: 'css-loader', options: { minimize: true } },
                                {
                                    loader: 'postcss-loader',
                                    options: {
                                        ident: 'postcss',
                                        plugins: () => [
                                            autoprefixer({ browsers: ['last 2 version', '> 1%', 'ie >= 11'] })
                                        ]
                                    }
                                },
                                { loader: 'sass-loader' },
                                {
                                    loader: 'sass-resources-loader',
                                    options: {
                                        resources: path(__dirname, './src/global.scss')
                                    }
                                }
                            ]
                        })
                    },
                    {
                        test: /\.js$/,
                        exclude: /lodash/,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: ['env']
                                }
                            }
                        ]
                    },
                    {
                        test: /\.css$/,
                        exclude: /node_modules/,
                        use: ExtractTextPlugin.extract({
                            fallback: 'style-loader',
                            use: [
                                { loader: 'css-loader', options: { minimize: true } },
                                {
                                    loader: 'postcss-loader',
                                    options: {
                                        ident: 'postcss',
                                        plugins: () => [
                                            autoprefixer({ browsers: ['last 2 version', '> 1%', 'ie >= 11'] })
                                        ]
                                    }
                                }
                            ]
                        })
                    },
                    {
                        loader: 'file-loader',
                        exclude: [/\.js$/, /\.html$/, /\.json$/],
                        options: { name: 'assets/font/[name].[ext]' }
                    }
                ]
            }
        
        ]
    },
    resolve: {
        alias: { '@': path('./src') }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({
            filename: getPath => getPath('[name]@[contenthash:6].css').replace('js', 'css'),
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',              // 生成文件名
            template: path('./src/index.html'),  // 目标模版
            inject: true,                        // 是否注入静态资源
            minify: {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            }
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        new webpack.optimize.UglifyJsPlugin({}),
        new CopyWebpackPlugin([
            { from: path('src/assets'), to: './assets' }
        ])
    ]
}