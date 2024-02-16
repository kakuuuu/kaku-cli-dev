# Getting Started with Create React App


## Available Scripts

In the project directory, you can run:

### `npm create <project>`

添加页面，根据命令行提示创建页面


### `npm dev`

开发环境调试，默认为 .\devConfig.js 配置中"devProjectName"字段的页面，或在命令行提示中输入需要调试的页面名

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Webpack生产环境打包，默认为 .\devConfig.js 配置中"buildProjectName"字段的项目，或在命令行提示中输入需要打包的页面名

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

output folder .\dist\ \<project>

### `npm run analyze`

WebPack 生产环境打包分析

LearnMore:  [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)