# type 和 interface 的区别

- 相同点
  都可以用来声明类型，自定义的类型

- 不同点
  type 可以声明基本类型，联合类型，元组等
  interface 可以声明对象，函数，类，索引类型等

- 使用场景
  type 适用于简单的类型声明
  interface 适用于复杂的类型声明

- 区别:
  当我们要编写继承类的时候，interface 只要extends就好，type 使用的是&并集

- interface 可以重复声明，合并
  type 不可以

- type 可以用于定义基础类型，联合类型，元组等
  interface 只能描述对象结构(函数)

- type支持简单类型的别名，interface 不支持

- interface 和type在申明函数类型有区别