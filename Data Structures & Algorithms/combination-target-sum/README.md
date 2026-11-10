# Combination Sum

## Complexity

- **Time Complexity:** $O(2^{T/M})$ where $T$ is the target value and $M$ is the minimum value among the candidates. The height of the decision tree can be up to $T/M$ in the worst case.
- **Space Complexity:** $O(T/M)$ for the recursion call stack and current path storage.

## Intuition

To find all unique combinations where candidate numbers can be used an unlimited number of times to sum up to a target:

- **The "Choose-Explore-Unchoose" Pattern:** At every step, we add a candidate to our path, recurse deeper, and pop it out afterward.
- **Allowing Reuse (`i` instead of `i + 1`):** By passing `i` into the recursive call rather than `i + 1`, we allow the algorithm to pick the exact same element again on the next level down.
- **Pruning / Early Stopping:** Since all numbers are positive, if our running `currentSum` exceeds the `target`, we immediately stop exploring that branch (`return`), saving precious computational time.

## Solution

```javascript
class Solution {
  /**
   * @param {number[]} nums
   * @param {number} target
   * @returns {number[][]}
   */
  combinationSum(nums, target) {
    const result = [];

    const backtrack = (startIndex, currentPath, currentSum) => {
      // Prune if we exceed the target
      if (currentSum > target) {
        return;
      }

      // Base case: exact match found
      if (currentSum === target) {
        result.push([...currentPath]);
        return;
      }

      for (let i = startIndex; i < nums.length; i++) {
        // CHOOSE
        currentPath.push(nums[i]);
        // EXPLORE (pass i to allow reuse of nums[i])
        backtrack(i, currentPath, currentSum + nums[i]);
        // UNCHOOSE
        currentPath.pop();
      }
    };

    backtrack(0, [], 0);
    return result;
  }
}
```
