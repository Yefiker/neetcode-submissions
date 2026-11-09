# Subsets

## Complexity

- **Time Complexity:** $O(N \cdot 2^N)$ — There are $2^N$ total possible subsets for an array of length $N$, and constructing/pushing each subset takes $O(N)$ time.
- **Space Complexity:** $O(N)$ — The maximum depth of the recursion stack and the working space for the `currentPath` array equals the length of the array.

## Intuition

To generate all possible subsets (the power set) without duplicates, we treat the problem as a **decision tree traversal** using Backtracking:

- **The "Choose-Explore-Unchoose" Pattern:** At every step, we choose to include a number in our current path, explore further down the tree with an updated index pointer, and then unchoose (pop) the number to backtrack and try the next branch.
- **Forward-Only Indexing (`startIndex`):** By passing `i + 1` into recursive calls, we ensure we only move forward through the array, preventing duplicate combinations like `[1, 2]` and `[2, 1]`.
- **Every Node is Valid:** Unlike problems where only leaf nodes are solutions, every single node visited in the subset decision tree (including the root and intermediate paths) represents a valid subset.

## Common Pitfalls

- **Reference Mutation (Missing Spread Operator):** Pushing `currentPath` directly into the results array (`result.push(currentPath)`) stores a reference rather than a copy, causing all stored subsets to end up empty or overwritten. Always use a shallow copy: `result.push([...currentPath])`.
- **Out-of-Bounds Loop Condition:** Using `<= nums.length` instead of `< nums.length` in the loop condition, which attempts to access `undefined` at the end of the array.

## Solution

```javascript
class Solution {
  /**
   * @param {number[]} nums
   * @return {number[][]}
   */
  subsets(nums) {
    const result = [];

    const backtrack = (startIndex, currentPath) => {
      // 1. Every node in the decision tree is a valid subset
      result.push([...currentPath]);

      // 2. Iterate through choices moving forward
      for (let i = startIndex; i < nums.length; i++) {
        // CHOOSE
        currentPath.push(nums[i]);
        // EXPLORE
        backtrack(i + 1, currentPath);
        // UNCHOOSE
        currentPath.pop();
      }
    };

    // Kick off recursion from index 0 with an empty path
    backtrack(0, []);

    return result;
  }
}
```
