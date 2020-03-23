const HtmlWebPackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
require("babel-polyfill");
const path = require('path')

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['*', '.js', '.vue'],
        alias: {
            Utilities: path.resolve(__dirname, 'src/utilities/')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader'
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new VueLoaderPlugin()
    ]
}
