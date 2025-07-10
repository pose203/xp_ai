function CreateCounter(num) {
    this.num = num; // public
    // 私有变量  private
    let count = 0;
    return {
        num:num,
      
        innremrnt:()=>{
            count++;
           
        },
        decrement:()=>{

            count--;
        },
        getCount:()=>{
            console.log('count 被访问了');
            return count;
        }


    }


}

// let obj = new CreateCounter(10);
// console.log(obj.num);

const counter = CreateCounter(1);
console.log(counter.num);
//console.log(counter.count);
// 闭包延长了变量的生命周期
// 不直接操作它
counter.innremrnt();
console.log(counter.getCount());







