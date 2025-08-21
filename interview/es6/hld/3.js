// thenable

function light(color, ms) {
    console.log(color);
    return new Promise(resolve => setTimeout(resolve, ms));
}

function loop() {
    
    light('red', 1000)
    // 控制流程 异步变同步
    .then(() => light('yellow', 2000))
    //当返回值也是promise的时候，继续thenable
    .then(() => light('green', 3000))
    .then(loop)
}

loop();

