# 掘金搜索页面 React 项目

这是一个基于 React 的掘金移动端搜索页面仿站项目。

## 技术栈

- React 19
- React Vant UI 组件库
- CSS Modules
- PostCSS 和 PostCSS pxtorem 进行移动端适配
- lib-flexible 进行移动端适配

## 功能特性

- 响应式设计，适配各种移动设备
- 搜索历史展示
- 分类搜索（综合、文章、课程、标签、用户）
- 搜索历史删除功能

## 项目结构

```
src/
├── assets/         # 静态资源
├── pages/          # 页面组件
│   └── SearchPage/      # 搜索页面
├── App.jsx         # 应用入口组件
├── App.css         # 应用全局样式
├── main.jsx        # 应用入口文件
└── index.css       # 全局样式
```

## 开发说明

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
pnpm dev
```

### 构建生产版本

```bash
npm run build
# 或
pnpm build
```

## 移动端适配方案

项目使用了 lib-flexible 和 postcss-pxtorem 来实现移动端适配：

- lib-flexible 会根据设备屏幕动态设置 rem 基准值
- postcss-pxtorem 会自动将 px 转换为 rem
- 设计稿基准为 375px 宽度
