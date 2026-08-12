class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    twoSum(nums, target) {
        let myMap = new Map();
       for(let i = 0; i < nums.length; i++) {
        let difference = target - nums[i];

        if (myMap.has(difference)) {
            return [myMap.get(difference), i];
        } 

        myMap.set(nums[i], i);
       }
    }
}
