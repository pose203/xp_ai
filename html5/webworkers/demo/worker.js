// 不是JS 单线程
// Woker 线程 复杂或耗能的计算
// 这个能力来自浏览器
// js还是单线程，只不过在复杂计算时候用worker 线程
// 不可以使用document,也没有this
// 线程间的通信，消息机制
//console.log(this,'////');
//console.log(document.getElementById('box'));
self.onmessage = function(event){
    console.log(event.data,'////');
    self.postMessage('hello worker');
}







