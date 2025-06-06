# deepseek
- 大模型在哪？
   远程
   HTTP api 请求
- LLM 服务
  api 一样
  fetch 赋予了js 新生命

# webLLM
智能前端的战场
如何把deepseek 引入前端

## 运行项目 
直接在浏览器中打开 'index.html'文件即可

## 服务器端返回
- 输入url 或者点击一个链接(死板)
- 向服务端发送请求
- node/java 请求，去数据库取数据，生成html 字符串
- 返回html字符串

## fetch 请求
- 滚动到底部后，加载更多数据 web 2.0 富应用体验
  看到新的内容
- fetch url
  - 不需要刷新页面，主动去服务端取一次，DOM 更新页面
- 点赞的时候
  js fetch api like

- LLM AI 时代
  fetch 取来大模型的能力 智能前端时代

## http 请求
   - 请求行 GET http://www.baidu.com
   post https://api.deepseek.com/chat/completions
   - 请求头
   设置各种头部信息
   {
    content-Type:application/json
    Autherization:Bearer 1234567890 凭证
   }
   - 请求体