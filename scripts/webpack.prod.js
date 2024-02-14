const { merge } = require('webpack-merge');
const path = require('path');
const base = require('./webpack.base.js');

module.exports = merge(base, {
  mode: 'production', // 生产模式
  entry: path.resolve(__dirname, '../template/activity/index'),
  output: {
    path: path.resolve(__dirname, '../dist'), // 打包后的代码放在dist目录下
    filename: '[name].[hash:8].js', // 打包的文件名
    clean: true, // 自动将上次打包目录资源清空
  },
});
