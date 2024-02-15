const { merge } = require('webpack-merge');
const path = require('path');
const base = require('./webpack.base.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isAnalyseMode = process.env.WEBPACK_EXTRA_ANALYZE == '1';
const analyzePlugins = isAnalyseMode
  ? [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'report.html',
        defaultSizes: 'gzip',
        generateStatsFile: true, // 如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
        openAnalyzer: true, // 默认在浏览器中自动打开报告
        statsFilename: 'stats.json', // 如果generateStatsFile为true，将会生成Webpack Stats JSON文件的名字
        statsOptions: { source: false },
      }),
    ]
  : [];

module.exports = merge(base, {
  mode: 'production', // 生产模式
  plugins: [
    // 配置包分析器
    ...analyzePlugins,
  ],
});
