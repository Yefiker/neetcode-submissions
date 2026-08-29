# Search in Rotated Sorted Array

## Complexity

- **Time Complexity:** $O(\log N)$ — Halves the search space in each iteration by exploiting the sorted half.
- **Space Complexity:** $O(1)$ — Operates strictly in-place with constant extra memory.

## Intuition

Splitting a rotated sorted array in half always yields at least **one fully sorted half**.

1. Compare `nums[mid]` with `target`.
2. Determine which subarray is sorted:
   - **Left sorted:** `nums[left] <= nums[mid]`
   - **Right sorted:** `nums[mid] <= nums[right]`
3. Perform range bounds checking (`target` within sorted half boundaries) to decide whether to search left or right.

## Common Pitfalls

- **Missing `else` Blocks:** Forgetting `else` on the inner range check causes `left` or `right` to be overwritten unconditionally.
- **Strict vs Non-Strict Comparisons:** Ensure using `<=` when determining the sorted half (`nums[left] <= nums[mid]`) to handle two-element subarrays correctly.

## Solution

```javascript
class Solution {
  /**
   * @param {number[]} nums
   * @param {number} target
   * @return {number}
   */
  search(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
      let mid = Math.floor(left + (right - left) / 2);

      if (nums[mid] === target) return mid;

      if (nums[left] <= nums[mid]) {
        if (nums[left] <= target && target < nums[mid]) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      } else {
        if (nums[mid] < target && target <= nums[right]) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
    }

    return -1;
  }
}
```
