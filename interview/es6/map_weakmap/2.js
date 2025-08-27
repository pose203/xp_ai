global.gc();
console.log(process.memoryUsage());

const map = new WeakMap();

let key = new Array(5*1024*1024);
vm.set(key,1)
global.gc();
console.log(process.memoryUsage());

key = null;
global.gc();
console.log(process.memoryUsage());

for(let [k,v] of vm.entries()){
    console.log('///' )
    console.log(k,v)
    console.log(k.byteLength)
}