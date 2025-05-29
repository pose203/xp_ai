/**
 * 实现公平的红包算法
 * @param {Number} total 总金额
 * @param {Number} num 人数
 * @returns {number[]} 红包金额数组
 */
function hongbao(total, num) {
    const arr = [];
    let restAmount = total; // 剩余金额
    let restNum = num; // 剩余人数
    
    // 计算平均值
    const avg = total / num;
    
    for (let i = 0; i < num - 1; i++) {
        // 设置最小值和最大值
        // 最小值是平均值的20%，但不少于0.01
        let min = Math.max(0.01, avg * 0.2);
        // 最大值是平均值的1.8倍，且要确保剩余的人每人至少能分到最小值
        let max = Math.min(avg * 1.8, restAmount - min * (restNum - 1));
        
        // 在合理范围内随机生成金额
        let amount = parseFloat((Math.random() * (max - min) + min).toFixed(2));
        
        restAmount = parseFloat((restAmount - amount).toFixed(2));
        restNum--;
        arr.push(amount);
    }
    
    // 最后一个人拿剩下的钱
    arr.push(parseFloat(restAmount.toFixed(2)));

    return arr;
} 

// 测试代码
console.log(hongbao(10000, 30));