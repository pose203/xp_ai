# 封装JSONP

- 只能解决GET 请求的跨域问题
     http://localhost:3000/say?callback=biaobaiCallback=likeyou
- 需要后端配合
     后端的输出方式更加padding
- 不太安全
  全局挂载了一个show callback 函数 容易被黑客利用