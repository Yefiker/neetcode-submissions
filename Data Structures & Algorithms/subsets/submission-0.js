class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    subsets(nums) {
        const result = [];

        const backtrack = (startIndex, currentPath) => {
            result.push([...currentPath]);
            
            for (let i = startIndex; i < nums.length; i++) {
                currentPath.push(nums[i]);
                backtrack(i + 1, currentPath);
                currentPath.pop();
            }
        }
        backtrack(0, []); 
        return result;
    }
}
