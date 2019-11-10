'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.build,
        overlay: true,
        port: 8081,
    },
    plugins: [
        new webpack.EvalSourceMapDevToolPlugin({
            filename: '[file].map',
        })
    ]
});

module.exports = new Promise( (resolve) => { resolve(devWebpackConfig) } );



