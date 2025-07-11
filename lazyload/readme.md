# 图片懒加载

- <img src=""/>
  - 浏览器的下载线程
  - src http 应用层协议
  - https://img.36krcdn.com
    ip 地址
  - 发送 网路带宽有限 公路
    并发 同时下载多个css,img 支持的比较好
    tcp/ip
  - 网页(电商) 太多了 50+
  - 滚动页面 加载
  - 一开始就src 全部加载,页面会打不开

## 懒加载
  - 只加载需要加载的
    - 可视区
    - 滚动区域 scroll
  - 不加载
    src 不能直接给，data-original?
    src 是什么? img 功能函数? 占位图
  - 占位图
    - src 应该设置 但不能请求原来图片的地址(并发太多，图片太大)
    - 给个占位的图片 比较小
      缓存 请求一次
- 等页面加载完毕后
  img 太多会严重影响页面的打开速度，第一重要的
  data-original 中
  自定义属性 data-数据属性
  图片的原地址是img 数据
  original 原来



- Intersection Observer
  - observer 观察 异步的,不是同步的 浏览器的后台
  - Intersection rect 和可视区域交叉
  - 不需要onscroll 不需要节流
