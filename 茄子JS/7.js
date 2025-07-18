/**
 * 判断一个整数是否是回文数
 * 回文数：正着读和倒着读都一样的整数，例如：121、1221
 * @param {number} x - 需要判断的整数
 * @return {boolean} - 是回文数返回true，否则返回false
 */
var isPalindrome = function(x) {
    // 负数不可能是回文数
    // 除了0以外，末位是0的数不可能是回文数（因为回文数首位也必须是0，而数字不能以0开头）
    if(x < 0 || (!(x % 10) && x)) return false;
    
    // x2保存原始数，res用来构建反转后的数
    let a = x, res = 0;
    
    // 循环构建反转数
    while(a){
        // 每次取x2的末位，添加到res末位
        res = res * 10 + a % 10;
        // 使用~~(双非按位取反)代替Math.floor，去掉x2的末位
        a = ~~(a / 10);
    }
    
    // 比较反转后的数与原数是否相等
    return res === x;
};

