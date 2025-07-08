# react 事件机制

- js 事件机制
  - 异步
  - 监听一个事件
     - addEventListener()
     DOM2 事件
     - DOM 0
     <a onclick = "doSomething()"></a>
     - DOM 1？DOM 版本,没有去做事件升级

  - addEventListener(type,listener,useCapture?)
      - 回调函数 callback 是异步处理的称呼
      - promise then 
      - async await
      监听器

- 注册事件 addEventListener
- useCapture false 默认值
    页面是浏览器渲染引擎按像素点画出来 png
    先捕获 document -> 一层层去问
        先出发父元素
    event.target
        捕获阶段结束,拿到event.target
    冒泡
        event.target 冒泡到html 回去到根
        事件让他在冒泡阶段执行
        在哪个阶段执行
        true false


## 事件委托优势 delegation
- 性能优化
    - 极致将事件委托给最外层元素
    react 大型项目开发
    给我们的事件节点event.tagent 添加一个唯一的属性

- 动态节点的事件
    滚动到底部,一次新增一堆的新元素
    事件委托可以有效解决

- 统一元素统一事件注册多次
  - dom节点
  - event type 
  - 监听器(回调函数) event loop
    event
  - useCapture
  - event.preventDefault 阻止默认行为
      form submit
      a
  - event.stopPropgation

- 用户交互的便利体验问题
  - toggle 按钮
  - 点击页面任何地方可以关闭 方便 stopPropagation
  - 显示区域可以交互,stopPropagation。

- SyntheticEvent 合成事件
  - 委托 #root
       性能优化框架帮我们做
  - 事件池 Event pooling
       事件对象的回收利用
       大型密集交互的应用
  - 最近的版本中又可以安全使用了
