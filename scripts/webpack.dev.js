const { merge } = require('webpack-merge');
const path = require('path');
const base = require('./webpack.base.js');

module.exports = merge(base, {
  mode: 'development', // 开发模式
  devServer: {
    static: {
      directory: path.join(__dirname, '../public/assets')
    },
    open: true, // 编译完自动打开浏览器
    port: 8080,
    hot: true, // 热更新
    compress: true // gzip压缩
  }
});
