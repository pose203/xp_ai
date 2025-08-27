# Function Call

- LLM 调用API 有什么缺点
    - LLM 提前训练好的，新的知识或服务不知道的
        LLM 插上隐形的翅膀，调用些外部的内容或工具
        chat之外，调用函数
        今天的天气怎么样?
    - AIGC 没有足够的上下文 胡说八道
        temperature
        - 给LLM足够的上下文
          Function Call 调用外部的的天气服务
        - MCP 
          给大模型插入的USB
        - Prompt 设计
        - 工作流
          工作节点让LLM 流程化
        - 知识库
    - 我们可以将知识库(私有)交给大模型，LLM 更懂我们
    不安全。RAG

## Function Call
   让AIGC 从只会生成文本进化为能可靠的执行操作，解决了自然语言到结构化
   调用的鸿沟，是模型能安全、可控地调用外部系统(知识库、服务)、推动实用化落地

## Function call 的流程
- 传统chat api 调用，变成两步
  - 根据prompt 和tools 中的 description 语义关联性分析
  - 执行的function
  - 将函数的返回结果，再次交给LLM，正常的能回答的聊天了

- 核心
  - openai 接口能力的升级，llm 可以和外部系统、工具互动LLM 能你增强
  - chatbot 的用户体验更好
  - api 增量式的，设计的很简约，学到了接口设计
     - function tool tools 申明
       type，name，parameters
     - 返回结果 function.id
       role:'tool'
