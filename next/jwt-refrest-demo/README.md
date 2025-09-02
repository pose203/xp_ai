# next.js 全栈项目

- users & posts
- jwt 双token 鉴权
- 虚拟列表
    AI 爬虫 掘金100条数据
- 大文件上传
- ai 工程化
    流式输出
    function Tool
    mcp
- ai 搜索


## 开发流程
- .env
    mysql url
    create database demo; 创建知识库

- prisma 初始化
    orm 工具
    object relational mapping 
    User(表) => User类
    一行  => new User() 实例
    底层数据库操作 映射成 高级的面向对象操作

- Prisma Schema 是定义数据库模型、关系和数据类型的配置文件，用于生成类型安全的数据库客户端。
    数据库的设计图
    navicat 好的地方，schema + git 留下数据库设计和修改的历史
    文档型的，可以追踪。留底

- Model 表的映射模型
    @@map("users") 指定模型对应的名
    posts        Post[]  一对多关系
    createdAt    updatedAt   primasa 自动维护
    @id 主键 @unique 唯一索引
    Model User {
        columns  name  type   @default
        索引
        relation
    }

    - migration 迁移
        记录 

- restful API
- lib/ 复用的js模块
- regexp 正则表达式
   前端，后端都要会正则
   /^.+?[]{} $/ test 
   ^ 开始 $ 结束 ^$ 严格匹配整个字符
   .都匹配，一个字符
   ? 0次或一次
   + 一次或多次
   [] 范围
   {} 长度
- bcryptjs 加密js 模块 单向的加密算法(不能被加密)
  register 加密一次
  login  password 加密一次
  比较的是加密后的串是否一样

- 状态码
  - 200 ok
  - 201 created
  - 400 bad request
  - 409 conflict
  - 500 internal server error