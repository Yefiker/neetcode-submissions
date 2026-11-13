class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    subsetsWithDup(nums) {
        const result = []
        nums.sort((a, b) => a - b);
        const backtrack = (startIndex, currentPath) => {
            result.push([...currentPath]);
            for (let i = startIndex; i < nums.length; i++) {
                if(i > startIndex && nums[i] === nums[i - 1]) {
                    continue;
                }
                currentPath.push(nums[i]);
                backtrack(i + 1, currentPath);
                currentPath.pop();
            }
        }
        backtrack(0, []);
        return result;
    }
}
