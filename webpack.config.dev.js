const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    },
    mode: 'development',
    resolve: {
        extensions: ['.js'],
        alias: {
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/img/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|styl$/i,
                use: [MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader'
                ],
            },
            {
                test: /\.png/,
                type: 'src/img'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'src/[name].[contenthash].css'
        }),
        new CopyPlugin ({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "img"),
                    to: "img"
                }
            ]
        }),
        new Dotenv(),
    ],
};