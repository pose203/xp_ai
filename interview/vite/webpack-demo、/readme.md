# Webpack Demo

这是一个基本的 webpack 项目示例。

## 安装依赖

```bash
pnpm install
```

## 开发模式

```bash
pnpm run dev
```

这将启动开发服务器，通常在 http://localhost:8080

## 构建项目

```bash
pnpm run build
```

构建后的文件将输出到 `dist` 目录。

## 项目结构

```
webpack-demo/
├── src/
│   ├── index.js    # 入口文件
│   └── style.css   # 样式文件
├── dist/
│   └── index.html  # HTML 模板
├── webpack.config.js  # webpack 配置
└── package.json    # 项目配置
```

## 已安装的依赖

- webpack: 模块打包工具
- webpack-cli: webpack 命令行工具
- webpack-dev-server: 开发服务器
- style-loader: 样式加载器
- css-loader: CSS 加载器
