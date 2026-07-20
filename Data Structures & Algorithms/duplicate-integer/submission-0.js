class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    hasDuplicate(nums) {
        let myset = new Set();
        
        for (let i = 0; i < nums.length; i++) {
            let item = nums[i]
            if(myset.has(item)) {
                return true;
            }
            myset.add(item);
        }
        return false;
    }
}
