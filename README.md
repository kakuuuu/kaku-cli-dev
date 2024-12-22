正在收集工作区信息

# 项目介绍

## 项目名称

H5 营销活动多页面生成脚手架

## 项目描述

该项目是一个用于生成 H5 营销活动多页面的脚手架工具。通过命令行交互，用户可以快速创建、开发和构建多个 H5 页面，并且支持自定义模板和路由配置。项目基于 React 框架，使用 Webpack 进行打包和构建，Koa 作为开发服务器。

## 主要功能

1. **创建新项目页面**：通过命令行交互创建新的 H5 页面，支持自定义项目名称、路由地址和模板类型。
2. **开发环境调试**：启动开发服务器，支持热更新和自动打开浏览器，方便开发调试。
3. **生产环境打包**：使用 Webpack 进行生产环境打包，支持打包分析和 Gzip 压缩。
4. **静态资源托管**：使用 Koa 服务器托管静态资源，支持自定义路由配置。
5. **代码规范**：集成 ESLint 和 Prettier，保证代码风格一致性和质量。
6. **Git 提交规范**：使用 Husky 和 Commitlint，确保提交信息符合规范。

## 使用说明

### 安装依赖

```sh
npm install
```

### 创建新页面

```sh
npm run create <project>
```

根据命令行提示创建新页面。

### 启动开发服务器

```sh
npm run dev
```

启动开发服务器，默认调试 devConfig.json 中配置的页面。

### 生产环境打包

```sh
npm run build
```

进行生产环境打包，默认打包 devConfig.json 中配置的页面。

### 启动服务器

```sh
npm run server
```

启动 Koa 服务器，托管静态资源。

### 代码格式化

```sh
npm run prettierwrite
```

格式化代码。

### 代码检查

```sh
npm run eslint
```

检查代码规范。

## 配置文件

- devConfig.json ：开发和打包项目名称配置。
- routerConfig.json ：页面路由配置。
- .eslintrc.js ：ESLint 配置文件。
- .prettierrc ：Prettier 配置文件。
- tsconfig.json ：TypeScript 配置文件。

## 依赖

- React
- Webpack
- Koa
- ESLint
- Prettier
- Husky
- Commitlint

## 贡献

欢迎提交 Issue 和 Pull Request 来贡献代码。
