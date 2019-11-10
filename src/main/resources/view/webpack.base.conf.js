'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, './src'),
    build: path.join(__dirname, './build'),
    public: path.join(__dirname, '../public'),
    js: path.join(__dirname, './src/entry'),
    vendor: [
        'babel-polyfill',
    ]
};

module.exports = {
    externals: {
        paths: PATHS,
    },
    entry: {
        index: `${PATHS.js}/index.js`,
    },
    output: {
        library: 'bundle',
        filename: 'js/[name].js',
        path: PATHS.build,
        publicPath: '/',
    },
    optimization: {
        minimizer: [ new UglifyJsPlugin({
            include: /\.js$/,
        })],
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/node_modules/',
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            exclude: '/node_modules/',
            options: {
                name: '[name].[ext]'
            }
        }, {
            test: /\.scss$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                    }
                }, {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true,
                    }
                }
            ]
        }, {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true,
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
                    }
                }
            ]
        },]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: './index.html',
            inject: false,
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/img`, to: `${PATHS.build}/img` },
            // { from: `${PATHS.build}`, to: `${PATHS.public}` },
            // { from: `${PATHS.src}/js/util`, to: `${PATHS.build}/js/util`},
        ])
    ]
};