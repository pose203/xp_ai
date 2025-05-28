/**
 * 无重复字符的最长子串 - LeetCode 第3题
 * 给定一个字符串 s，请你找出其中不含有重复字符的最长子串的长度。
 * 
 * 解题思路：使用滑动窗口算法，维护一个不包含重复字符的窗口
 * 
 * @param {string} s - 输入字符串
 * @return {number} - 无重复字符的最长子串的长度
 */
var lengthOfLongestSubstring = function(s) {
    // 使用Set作为哈希集合，记录当前窗口中的字符，保证窗口中没有重复字符
    const map = new Map();
    const n = s.length;
    
    // 定义窗口的右边界，初始为-1，表示窗口还未开始扩张
    let rk = -1;
    // 记录最长无重复字符子串的长度
    let ans = 0;
    
    // 枚举左指针的位置，左指针i表示窗口的左边界
    for (let i = 0; i < n; ++i) {
        if (i != 0) {
            // 左指针向右移动一格，需要从窗口中移除一个字符
            // 移除的是上一个窗口的最左侧字符
            map.delete(s.charAt(i - 1));
        }
        
        // 不断尝试右移右指针，直到下一个字符在窗口中已存在或者到达字符串末尾
        while (rk + 1 < n && !map.has(s.charAt(rk + 1))) {
            // 将下一个字符加入窗口
            map.add(s.charAt(rk + 1));
            // 右指针向右移动
            ++rk;
        }
        
        // 此时，从左指针i到右指针rk的子串是一个无重复字符的子串
        // 更新最大长度
        ans = Math.max(ans, rk - i + 1);
    }
    
    return ans;
};

