/**
 * 求解最长无重复字符子串的长度
 * @param {string} s 输入字符串
 * @return {number} 最长无重复字符子串的长度
 */


var lengthOfLongestSubstring = function(s) {
    // 记录最长无重复子串的长度
    let number = 0;
    // 滑动窗口的左边界
    let left = 0;
    // 使用Set来存储当前窗口中的字符
    const set = new Set();
    
    // 遍历字符串，i作为滑动窗口的右边界
    for(let i = 0; i < s.length; i++){
        const a = s[i];
        // 如果窗口中已存在当前字符，不断移动左指针并删除对应字符，直到窗口中不再有重复字符
        while(set.has(a)){
            set.delete(s[left]);
            left++;
        }
        // 将当前字符添加到Set中
        set.add(a);
        // 更新最大长度，当前窗口长度为i-left+1
        number = Math.max(number, i-left+1);
    }
    console.log(set());
    return number;
};