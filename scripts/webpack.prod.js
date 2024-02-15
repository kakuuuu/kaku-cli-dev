const { merge } = require('webpack-merge');
const path = require('path');
const base = require('./webpack.base.js');

const projectName = process.env.WEBPACK_EXTRA_PROJECT_NAME;

module.exports = merge(base, {
  mode: 'production', // 生产模式
});
