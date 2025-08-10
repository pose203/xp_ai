# Qiezi Demo - React 移动端图片社交 App

- 移动App
- 模仿主流图片社交产品
- 核心功能全面，覆盖主流技术考点

## 技术栈
- **React全家桶**
    - React 19 + Hooks 编程
    - 组件的封装、受控与非受控组件
    - 自定义 Hooks (useDebounce, useTitle)
    - React Router DOM (SPA, 懒加载, 嵌套路由)
    - Zustand (轻量化状态管理)
- **网络与数据**
    - Axios (请求拦截、代理)
    - Vite-Plugin-Mock (接口模拟)
- **样式方案**
    - CSS Modules (模块化)
    - Stylus (CSS 预处理器)
    - PostCSS + pxtorem (移动端适配)
- **AI 能力整合**
    - 豆包多模态大模型 (图片理解、智能对话)
    - 火山引擎 Ark (AI 生图)
- **性能优化**
    - 防抖节流 (useDebounce)
    - 组件优化 (React.memo, useCallback, useMemo)
    - 懒加载 (路由、图片)
    - IntersectionObserver (瀑布流)
- **工程化**
    - Vite (构建工具)
    - ESLint (代码规范)

## 项目的架构
- **pages/** - 页面级组件
- **components/** - 通用业务组件
- **store/** - Zustand 状态管理 (按 feature 拆分)
- **hooks/** - 自定义 Hooks
- **utils/** - 工具函数 (防抖、日期、请求等)
- **api/** - API 模块封装
- **mock/** - Mock 数据
- **constants/** - 常量

## 开发前的准备
- **安装依赖**
    - `pnpm install`
    - 核心依赖: `react`, `react-router-dom`, `zustand`, `axios`
    - UI 库: `react-vant`
    - 开发依赖: `vite-plugin-mock`, `eslint`
- **Vite 配置**
    - `@` 路径别名
    - `/api` 代理配置，安全处理 AI 服务密钥
- **环境变量 (.env.local)**
    - `VITE_DOUBAO_API_KEY`: 豆包 API Key
    - `VITE_ARK_API_KEY`: 火山引擎 API Key
- **移动端适配 rem**
    - 使用 `postcss-pxtorem` 自动将 `px` 转换为 `rem`
    - 基于 750px 设计稿，1rem = 屏幕宽度 / 10 (由 flexible.js 思想演化)

## 项目亮点
- **自动化移动端适配**
    - 使用 `postcss-pxtorem` 插件，在编译阶段自动将 CSS 中的 `px` 单位转换为 `rem`。
    - 无需手动计算，即可精准还原 750px 设计稿，开发效率高，适配效果好。
    - 结合 `lib-flexible` 的核心思想，实现任何设备等比缩放的优秀体验。

## git 提交规范
- **代码规范**
    - 使用 ESLint 保证代码风格统一
    - 遵循 feature 分层，组件就近维护的目录结构
- **Git 钩子**
    - 可配置 pre-commit 钩子，在提交前自动检查代码质量

## 功能模块
- **UI 组件库**
    - 基于 `react-vant`，快速构建移动端界面，专注业务逻辑。
- **路由系统**
    - 使用 React Router DOM，配置路由懒加载，提升首屏速度。
    - 设计 `Layout` 组件和嵌套路由，实现 Tabbar 等通用页面布局。
- **发现页 (瀑布流)**
    - 双列瀑布流布局，动态计算，视觉效果好。
    - `IntersectionObserver` 实现滚动到底部加载更多，性能优异。
    - `IntersectionObserver` 复用于图片懒加载，优化体验。
    - 下拉刷新、骨架屏等增强用户体验。
- **聊天系统**
    - 实时对话界面，支持图片发送和 AI 智能回复。
    - `useDebounceCallback` 对输入事件防抖，防止不必要请求。
    - 未读消息角标、相对时间格式化等细节处理。
- **AI 创作工坊**
    - 整合豆包多模态模型，实现图片内容分析、自动生成文案。
    - 调用火山引擎接口，实现文生图功能。
    - 统一的图片上传与预览组件。

## 项目亮点和难点
- **前端智能化**
    - **多模态对话**: 集成豆包 Chat Completions API，支持文本+图片的多模态理解与对话。
    - **AI 生图**: 通过 Vite 代理安全调用火山引擎生图 API，前端无需暴露密钥。
    - **防抖保护**: 对 AI 相关调用增加防抖，避免用户重复点击造成资源浪费。
    - **统一封装**: 将 AI 调用封装为统一 Service，便于管理和切换模型。
- **极致用户体验优化**
    - **性能**: 防抖搜索、路由懒加载、图片懒加载、组件渲染优化 (`React.memo`, `useCallback`) 全方位提升应用性能。
    - **交互**: 瀑布流、下拉刷新、骨架屏、Toast 组件等，提供流畅的现代化 App 体验。
    - **细节**: 文件上传预览、相对时间显示等，提升用户感知的细节。
- **工程化与代码质量**
    - **状态管理**: Zustand 按 feature 拆分 store，结构清晰，易于维护。
    - **模块化**: 全面采用 CSS Modules，杜绝样式全局污染。
    - **Hooks 抽象**: 封装 `useDebounce`、`useTitle` 等多个自定义 Hooks，提高代码复用性。
    - **错误处理**: 在 Axios 拦截器中统一处理请求错误和 401 鉴权失效，提升应用健壮性。

## 项目遇到过什么问题， 怎么解决的
- **闭包陷阱导致状态不一致**
    - **问题**: 在事件回调中多次调用 `useState` 的 `set` 方法，由于闭包原因，后续 `set` 方法获取不到最新的 state。
    - **解决**: 使用 `useState` 的函数式更新，确保每次更新都是基于前一个状态。`setState(prevState => newState)`。
- **多处防抖逻辑重复**
    - **问题**: 搜索、输入框、按钮点击等多处都需要防抖，代码重复且不易维护。
    - **解决**: 封装 `useDebounce`、`useDebounceCallback`、`useApiDebounce` 等一系列自定义 Hooks，实现逻辑复用。
- **移动端设备适配困难**
    - **问题**: 不同手机屏幕尺寸、像素密度不一，手动编写媒体查询适配工作量大且效果不佳。
    - **解决**: 采用 `postcss-pxtorem` + `rem` 的自动化方案，一劳永逸解决适配问题，完美还原设计稿。

## 自定义Hooks
- **`useTitle`**: 便捷地修改页面标题。
- **`useDebounce`**: 对值进行防抖，常用于搜索建议。
- **`useDebounceCallback`**: 对回调函数进行防抖，常用于事件处理。
- **`useApiDebounce`**: 专门用于 API 请求的防抖 Hook。

## ES6 特性使用
- 项目全面采用 ES6+ 语法，如箭头函数、`let/const`、解构赋值、Promise、async/await 等，代码更简洁、易读。
- 使用 `Array.from`、`findIndex` 等现代 API 简化数据处理。

## 项目迭代
- **已完成**
    - [x] 基础架构：React + Vite + Zustand 搭建
    - [x] 移动端适配：postcss-pxtorem + flexible.js
    - [x] UI 组件库：React Vant 集成与定制
    - [x] 发现页：瀑布流 + 懒加载 + 下拉刷新
    - [x] 聊天系统：消息列表 + 实时对话 + AI 回复
    - [x] 个人中心：登录注册 + 头像上传 + 资料管理
    - [x] AI 能力：豆包对话 + 火山生图 + 图片分析
    - [x] 性能优化：防抖节流 + memo + callback
- **后续规划**
    - [ ] 架构升级：feature-first 重构（features/* + shared/*）
    - [ ] 测试覆盖：补充单元测试与 E2E 测试
    - [ ] PWA 改造：支持离线缓存和桌面安装

## 通用组件开发
- 封装了如下通用组件以提高复用性：
    - **`UniversalImageUpload`**: 通用的图片上传组件，支持预览、校验。
    - **`Loading`**: 居中 Loading 组件，提供一致的用户等待体验。
    - **`Toast`**: 全局提示组件。
