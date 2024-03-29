'use strict';

const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');

const buildWebpackConfig = merge(baseWebpackConfig, {
	mode: 'production',
	plugins: [],
});

module.exports = new Promise(resolve => {
	resolve(buildWebpackConfig);
});
