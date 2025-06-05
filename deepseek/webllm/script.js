//console.log('WebLLM项目已加载');
// js 主动的去拉取http 接口
// web 1.0时代 html/css/js 服务器端java 返回的 js 只做简单的交互
// web 2.0 时代 js主动请求 后端服务器
//fetch('https://api.github.com/users/pose203/repos')
//.then(res => res.json())
//.then(data => {
 // console.log(data);
 // document.querySelector('#reply').innerHTML += data.map(repo =>`
  //<ul>
    //<li>${repo.name}</li>
 // </ul> 
  //`).join('')
 // })
//.catch(error => console.error('Error:', error));



//document.addEventListener('DOMContentLoaded', function() {
  // 在这里添加你的JavaScript代码
  //console.log('DOM已完全加载');
//});

// 当llm API 服务
// chat 方式 AIGC 生成/完成 返回的内容
// 由openai 制定的
// 请求行
const  endpoint = "https://api.deepseek.com/chat/completions"
// 请求头
const headers = {
  // 内容类型
  'Content-Type': 'application/json',
  // 授权
  Authorization: `Bearer sk-69e882216f0e46228a116ddfbd6f9d82`
}
// 请求体
const payload = {
  model: 'deepseek-chat',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.'},
    { role:'user', content: '你好 Deepseek'}
  ]
}

fetch(endpoint, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(payload)
}).then(res => res.json())
.then(data => {
  console.log(data);
  document.querySelector('#reply').innerHTML 
    = data.choices[0].message.content
})