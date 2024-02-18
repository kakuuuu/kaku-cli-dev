const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const px2rem = require('postcss-plugin-px2rem');

const projectName = process.env.WEBPACK_EXTRA_PROJECT_NAME;

module.exports = {
  entry: path.resolve(__dirname, `../src/pages/${projectName}/index`),
  output: {
    path: path.resolve(__dirname, `../dist/${projectName}`), // 打包后的代码放在dist目录下
    filename: '[name].[hash:8].js', // 打包的文件名
    clean: true, // 自动将上次打包目录资源清空
  },
  resolve: {
    // 配置 extensions 来告诉 webpack 在没有书写后缀时，以什么样的顺序去寻找文件
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'], // 如果项目中只有 tsx 或 ts 可以将其写在最前面
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /.(jsx?)|(tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    chrome: '58',
                    ie: '11',
                  }, // 根据项目去配置
                  useBuiltIns: 'usage', // 会根据配置的目标环境找出需要的polyfill进行部分引入
                  // corejs: 3, // 使用 core-js@3 版本
                },
              ],
              ['@babel/preset-typescript'],
              ['@babel/preset-react'],
            ],
          },
        },
      },
      {
        test: /\.less$/,
        use: [
          'style-loader', //style-loader 将 <style> 元素附加到样式目标(style target)的末尾，即页面的 <head> 标签
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env',
                  px2rem({
                    rootValue: 75, // 根元素的字体大小，一般为设计稿宽度/10，比如设计稿宽度为750px，则 rootValue 为 75
                    unitPrecision: 5, // 转换后的 rem 值精度
                    propList: ['*'], // 需要转换的 CSS 属性，* 表示所有
                    exclude: /(node_module)/, // 排除转换的文件路径，一般排除 node_modules 目录
                  }),
                ], // 自动添加浏览器前缀
              },
            },
          },
          'less-loader',
        ],
        // 排除 node_modules 目录
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          // MiniCssExtractPlugin.loader, // 将相同的css部分提取出来，然后使用link去引入页面
          'style-loader', // style-loader 将 <style> 元素附加到样式目标(style target)的末尾，即页面的 <head> 标签
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env',
                  px2rem({
                    rootValue: 75, // 根元素的字体大小，一般为设计稿宽度/10，比如设计稿宽度为750px，则 rootValue 为 75
                    unitPrecision: 5, // 转换后的 rem 值精度
                    propList: ['*'], // 需要转换的 CSS 属性，* 表示所有
                    exclude: /(node_module)/, // 排除转换的文件路径，一般排除 node_modules 目录
                  }),
                ], // 自动添加浏览器前缀
              },
            },
          },
        ],
        // 排除 node_modules 目录
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, //data转成url的条件，也就是转成bas64的条件,maxSize相当于limit
          },
        },
        generator: {
          //geneator中是个对象，配置下filename，和output中设置assetModuleFilename一样，将资源打包至imgs文件夹
          filename: 'imgs/[name].[hash:6][ext]', //[name]指原来的名字，[hash:6]取哈希的前六位，[ext]指原来的扩展名
        },
      },
    ],
  },
  plugins: [
    new WebpackManifestPlugin({}),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `../src/pages/${projectName}/index.html`), // 使用自定义模板
    }),
  ],
};
