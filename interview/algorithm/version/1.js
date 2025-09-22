// 比较版本号
function compareVersion(v1, v2) {
    const v1Arr = v1.split('.').map(Number);
    const v2Arr = v2.split('.').map(Number);
    const len = Math.max(v1Arr.length, v2Arr.length);
    for (let i = 0; i < len; i++) {
        const num1 = v1Arr[i] || 0;
        const num2 = v2Arr[i] || 0;
        if (num1 > num2) {
            return 1;
        }
        if (num1 < num2) {
            return -1;
        }
       
    }
    return 0;
}
console.log(compareVersion('1.0.0', '2.0.0'));