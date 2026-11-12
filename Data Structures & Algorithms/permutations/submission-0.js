class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    permute(nums) {
        const result = [];
        const used = new Array(nums.length).fill(false);

  const backtrack = (currentPath) => {
    if (currentPath.length === nums.length) {
      result.push([...currentPath]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      
      if (used[i]) continue;

      
      used[i] = true;
      currentPath.push(nums[i]);

      
      backtrack(currentPath);

      currentPath.pop();
      used[i] = false;
    }
  }

  backtrack([]);
  return result;
        }

}
