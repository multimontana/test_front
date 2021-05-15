const HtmlWebPackPlugin = require("html-webpack-plugin");
const ReactRouterPathExtractorWebpackPlugin = require('react-router-path-extractor-webpack-plugin')
module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.(jpg|ico)$/,
                exclude: /(node_modules)/,
                loader: 'file-loader'
            }
        ],

    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        })
    ],
    devServer: {
        contentBase: './dist',
        port: 8080,
        historyApiFallback: true,
    },
};
