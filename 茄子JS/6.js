/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    // 特殊情况处理：单行或空字符串直接返回
    if (numRows <= 1 || s.length <= numRows) {
        return s;
    }

    const n = s.length;
    // 计算一个完整的Z字形周期所包含的字符数
    const cycleLen = 2 * numRows - 2;
    
    // 预分配结果字符串的长度，避免动态扩容
    const result = new Array(n);
    let resultIndex = 0;

    // 优化：直接计算每个字符在结果中的位置，减少循环次数
    for (let i = 0; i < numRows; i++) {
        // 计算该行在每个周期中出现的位置
        for (let j = 0; j + i < n; j += cycleLen) {
            // 添加向下部分的字符
            result[resultIndex++] = s[j + i];
            
            // 中间行有两个字符（向下和向上）
            if (i > 0 && i < numRows - 1) {
                const secondIndex = j + cycleLen - i;
                if (secondIndex < n) {
                    result[resultIndex++] = s[secondIndex];
                }
            }
        }
    }

    // 直接连接数组元素，比push然后join更高效
    return result.slice(0, resultIndex).join('');
};
