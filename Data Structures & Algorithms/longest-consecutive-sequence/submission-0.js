class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    longestConsecutive(nums) {
        const mySet = new Set(nums);
        let longest = 0;

        for (let i = 0; i<nums.length; i++) {
            if(mySet.has(nums[i]-1)) {
                continue;
            } 

            let currentNum = nums[i];
            let currentStreak = 1;
            while(mySet.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }

            longest = Math.max(longest, currentStreak);
        }

        return longest;
    }
}
