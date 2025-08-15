# vue 中的hooks  
- 你用的react 是什么的版本的？
    react 19
    react 16.8 划时代的更新 函数式组件， hooks 2019年
    之前 类组件 Component 基类  
    函数组件 子组件+父组件通过props传递数据 无状态组件
    UI 展示 Stateless 简单，性能好 
    函数组件 + useState + useEffect.. hooks 类组件就没有
    必要了

- 类组件 
    和函数组件都有， 各司其职
    - 类组件比较固守于类的格式，繁琐 
    - this 丢失问题 事件处理
    - 生命周期钩子函数 由useEffect 副作用代替
    - 开销大些 函数组件结合demo，useMemo 更好的性能优化

    - Vue 抄袭了React
      hooks 函数式编程思想