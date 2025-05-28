/**
 * 两数之和 - LeetCode 第1题
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，并返回它们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
 * 
 * @param {number[]} nums - 输入的整数数组
 * @param {number} target - 目标和
 * @return {number[]} - 返回两个数的下标
 */
var twoSum = function(nums, target) {
    const idx = new Map(); // 创建一个空哈希表，用于存储已遍历过的数字及其下标
    for (let j = 0; ; j++) { // 枚举数组中的每个元素，注意循环没有终止条件，因为题目保证有解
        const x = nums[j]; // 当前遍历到的数字
        
        // 在哈希表中查找是否存在一个数，使得它与当前数字的和等于目标值
        // 即查找 target - x 是否在哈希表中
        if (idx.has(target - x)) { // 如果找到了这样的数
            return [idx.get(target - x), j]; // 返回两个数的下标：之前存储的数字下标和当前数字下标
        }
        
        idx.set(x, j); // 将当前数字及其下标存入哈希表，供后续查找使用
    }
};

