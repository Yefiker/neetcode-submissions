class Solution {
    /**
     * @param {number[]} nums
     * @param {number} target
     * @returns {number[][]}
     */
    combinationSum(nums, target) {
        const result = [];

        const backtrack = (startIndex, currentPath, currentSum) => {
            if(currentSum > target) {
                return;
            }

            if(currentSum === target) {
                result.push([...currentPath]);
                return;
            }

            for(let i = startIndex; i < nums.length; i++) {
                currentPath.push(nums[i]);
                backtrack(i, currentPath, currentSum + nums[i]);
                currentPath.pop();
            }
        }
        backtrack(0, [], 0)
        return result;
    }
}
