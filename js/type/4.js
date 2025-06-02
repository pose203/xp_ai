//枚举类型
const Status = {
    //常量
    READY:Symbol('ready'),
    RUNNING:Symbol('running'),
    DONE:Symbol('done'),
    
   
}
let status = Status.READY;
if(status === Status.READY){
    console.log('ready');
}


