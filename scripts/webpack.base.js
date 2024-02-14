const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, '../template/activity/index'),
  output: {
    path: path.resolve(__dirname, '../dist'), // 打包后的代码放在dist目录下
    filename: '[name].[hash:8].js', // 打包的文件名
  },
  resolve: {
    // 配置 extensions 来告诉 webpack 在没有书写后缀时，以什么样的顺序去寻找文件
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'], // 如果项目中只有 tsx 或 ts 可以将其写在最前面
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
      {},
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env', {}]],
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
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env', {}]],
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
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../template/activity/index.html'), // 使用自定义模板
    }),
  ],
};
