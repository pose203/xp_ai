# react-router-dom


- 路由是什么?
  - 后端路由
    暴露资源
  - 前端路由
    - 首页
    - 列表页
    - 登入...
    前端页面导航由前端路由负责

- react 开头
  react 生态系统的一部分
  - react
    响应式、状态管理，组件、hooks等核心功能
    - 体积大、笨重
    - 页面慢
    - 少就是多
  - react-router-dom
  - redux/mobx
  - axios

## react 开发全家桶

- react 19
- react-router-dom 7.6.3

## react 特色
- 全面组件化
  vue 更执着
  react 函数化编程

- 动态路由
  https://juejin.cn/users/123?a=1&b=2#hash
  path/user/:id params   
  # restful 国际规范
  url 定义是核心部分
  Method 资源的描述
  GET /user/:id
  GET /post/:id 显示一篇文章
  POST/post 新增文章
  PATCH /post/:id   修改文章
  DELETE/post/:id 查看资源的元信息

  PUT (替换) PATCH（局部） 修改
  上传头像 PUT /avatar/:id
  - 后端路由 暴露资源

- 前端路由

- 后端路由
  早期只有后端路由
  server-> http ->路由 -> 响应html网页 传统的后端驱动的web 开发方式

  展示下一个页面 再来一个请求
  /
  / about
  - 有点是足够简单
  - 前后端耦合 后端要写前端的页面
  - 浪费沟通时间
  - 逻辑,数据库，套页面 MVC 开发方式 Model(数据)view(视图)
  Controller(控制器)
  - 不再以返回页面为目的
  - /api/user/123 接口 返回 json数据

  
- 前后端分离 MVVM  Model() View(jsx) ViewModel(视图模型层,useState,数据绑定jsx)
  - 前后端连调 api开发文档，约定
  - 前后端分离开发，以API开发文档为约定
  - 前端当家作主
  - 前端也有了路由 reeact-router-dom
  /user/:id path 页面级别组件
  - html/css/js react 框架
    useState
    useEffect
      fetch 后端api 接口，拿到数据
      完成web应用
      PC/Mobile/APP/小程序/桌面端 大前端


    


 