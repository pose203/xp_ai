/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let ans = [];
    const len = nums.length;
    if(!nums || len < 3) return ans
    nums.sort((a,b) => a-b);
    for(let i=0;i<len;i++){
        if(nums[i]>0) break;
        if(i>0 && nums[i]==nums[i-1]) continue;
        let L = i+1;
        let R = len-1;
        while(L<R){
            const num = nums[i] + nums[L] + nums[R];
            if(num == 0){
                ans.push([nums[i],nums[L],nums[R]])
                while(L<R && nums[L]== nums[L+1]) L++;
                while(L<R && nums[R]== nums[R-1]) R--;
                L++;
                R--;
            }
            else if(num>0) 
            R--
            else if(num<0)
            L++


        }

    }
    return ans

    


    
};