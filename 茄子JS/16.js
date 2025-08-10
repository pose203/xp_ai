/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    if (nums.length < 3) return null
    nums.sort((a, b) => a - b);
    let ans = nums[0] + nums[1] + nums[2];
    const n = nums.length;
    
    for (let i = 0; i < n - 2; i++) {
        // 左右指针在每次 for 循环时都必须重新初始化
        let left = i + 1;
        let right = n - 1; // right 指针应该指向数组末尾

        // while 循环必须在 for 循环内部，这样才能访问到 i, left, right
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (Math.abs(sum - target) < Math.abs(ans - target)) {
                ans = sum;
            }

            if (sum < target) {
                left++;
            } else if (sum > target) {
                right--;
            } else {
                // 找到了和 target 完全相等的值，这就是最接近的
                return target;
            }
        }
    }
           
    return ans;
};