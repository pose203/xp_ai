/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    // 边界情况：空数组
    if (!strs || strs.length === 0) return "";
    
    // 找出数组中最短的字符串长度，减少不必要的比较
    let minLen = Infinity;
    for (const s of strs) {
        minLen = Math.min(minLen, s.length);
    }
    
    // 二分查找法找最长公共前缀
    let low = 0;
    let high = minLen;
    
    while (low < high) {
        let mid = Math.floor((low + high + 1) / 2); // 向上取中间值
        if (isCommonPrefix(strs, mid)) {
            low = mid; // 如果是公共前缀，尝试更长的前缀
        } else {
            high = mid - 1; // 否则，缩短前缀长度
        }
    }
    
    return strs[0].substring(0, low);
};

// 检查所有字符串是否共享相同的前缀（长度为len）
function isCommonPrefix(strs, len) {
    const prefix = strs[0].substring(0, len);
    for (let i = 1; i < strs.length; i++) {
        if (!strs[i].startsWith(prefix)) {
            return false;
        }
    }
    return true;
}

