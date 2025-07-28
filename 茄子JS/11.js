/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let ans = 0, left = 0, right = height.length -1;
    while (left < right){
        const area = (right - left)* Math.min (height[left],height[right]);
        ans = Math.max(ans,area);
        if(height[left] < height[right]){
            left++;
        }else{
            right--;
        }

    }
    return ans;

};