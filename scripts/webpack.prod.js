const { merge } = require('webpack-merge');
const path = require('path');
const base = require('./webpack.base.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const routerConfig = require('../routerConfig');

const projectName = process.env.WEBPACK_EXTRA_PROJECT_NAME;
const pageConfig = routerConfig.find((item) => item?.pageName === projectName) || {};

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
  output: {
    path: path.resolve(__dirname, `../dist/${projectName}`),
    // publicPath: `http://localhost:3000${pageConfig.routePath || ''}`,
    publicPath: `CDN_PUBLICK_PATH_${pageConfig.pageName || ''}/`, // 打包后的代码放在dist目录下 指定资源请求路径，(不设置该选项时 默认为该路由下的./路径)
    filename: '[name].[hash:8].js', // 打包的文件名
    clean: true, // 自动将上次打包目录资源清空
  },
  module: {
    rules: [],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    // 这些包通过cdn链接方式导入，不打到包中
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  plugins: [
    // 配置包分析器
    ...analyzePlugins,
    // new MiniCssExtractPlugin(),
  ],
});
