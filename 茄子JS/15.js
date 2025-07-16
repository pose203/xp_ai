/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    const result = [];
    const n = nums.length;
    
    // 特殊情况判断
    if (n < 3) return result;
    
    // 先排序数组
    nums.sort((a, b) => a - b);
    
    // 优化1: 如果最小的三个数之和都大于0，不可能有解
    if (nums[0] + nums[1] + nums[2] > 0) return result;
    
    // 优化2: 如果最大的三个数之和都小于0，不可能有解
    if (nums[n-3] + nums[n-2] + nums[n-1] < 0) return result;
    
    for (let i = 0; i < n - 2; i++) {
        // 优化3: 如果第一个数大于0，后面的数都比它大，不可能有和为0的组合
        if (nums[i] > 0) break;
        
        // 如果当前元素和前一个元素相同，跳过以避免重复
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = n - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum < 0) {
                // 和太小，左指针右移
                left++;
                // 优化4: 跳过重复元素
                while (left < right && nums[left] === nums[left - 1]) left++;
            } else if (sum > 0) {
                // 和太大，右指针左移
                right--;
                // 优化4: 跳过重复元素
                while (left < right && nums[right] === nums[right + 1]) right--;
            } else {
                // 找到一组解
                result.push([nums[i], nums[left], nums[right]]);
                
                // 移动指针继续寻找
                left++;
                right--;
                
                // 跳过重复元素
                while (left < right && nums[left] === nums[left - 1]) left++;
                while (left < right && nums[right] === nums[right + 1]) right--;
            }
        }
    }
    
    return result;
};