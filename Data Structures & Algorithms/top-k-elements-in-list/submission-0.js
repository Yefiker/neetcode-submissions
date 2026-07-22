class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    topKFrequent(nums, k) {
        let myMap = new Map();

        for (let i = 0; i<nums.length; i++) {
            let count = myMap.has(nums[i]) ? myMap.get(nums[i]) : 0;
            myMap.set(nums[i], count + 1);
        }
        
        let sortedArray = Array.from(myMap.entries());
        sortedArray.sort((a, b) => b[1] - a[1]);
        return sortedArray.slice(0, k).map(pair => pair[0]);
        
    }
}
