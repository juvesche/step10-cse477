const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    plugins: [
        new CopyWebpackPlugin({
            patterns:[
                {from: 'src/img/*',to: "img/[name][ext]",},
            ]
        }),
        new HtmlWebpackPlugin({
            title: 'Step 10',
            filename: 'index.html',
            template: 'src/html/index.html',
            inject: 'head'
        }),
        new CopyWebpackPlugin({
                patterns:[
                    {from: 'src/audio/*',to: "audio/[name][ext]",},
                ]

            })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "resolve-url-loader",
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        }
                    }
                ]
            }
        ]
    }
};