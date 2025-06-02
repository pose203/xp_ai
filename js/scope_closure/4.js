//枚举类型
const STATUS = {
    //常量
    READY:Symbol('ready'),
    RUNNINGS:Symbol('runnings'),
    DONE:Symbol('done')
}

let statu = STATUS.READY;
if (statu === STATUS.READY) {
    console.log('ready');
}
