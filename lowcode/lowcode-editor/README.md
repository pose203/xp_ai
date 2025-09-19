# Lowcode-editor

- npx create-vite lowcode-editor
  react + ts 
- editor 组件
  - 低代码编辑器
- tailwindcss
- pnpm i allotment
可调整大小的分栏布局
- 左侧 物料区域
- 中间 编辑区域
- 右侧 配置区域
- tailwindcss
- 模块化开发
 - components
   - Header
   - Material
   - EditArea
   - Setting

- zustand 状态管理
  - json 数据 低

## 我们要开发或维护低代码编辑器

## 第一次总结

使用了aisuda 阿里低代码编辑器，发现核心是一个json的数据结构
一个通过children 属性串联的组件对象树
alloment split pane 布局，用tailwindcss写样式，zustand来全局状态管理
数据结构就是树，并不复杂，但是是低代码编辑器的核心
- 物料区
- 编辑区
- 设置区