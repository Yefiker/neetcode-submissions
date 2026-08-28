# Find Minimum in Rotated Sorted Array

## Complexity

- **Time Complexity:** $O(\log N)$ — Reduces search space by half in each iteration using binary search.
- **Space Complexity:** $O(1)$ — Operates strictly with constant auxiliary memory.

## Intuition

Rotating a sorted array creates two monotonically increasing subarrays separated by an **inflection point** (the minimum value).

By comparing the midpoint element `nums[mid]` against `nums[right]`:

- **`nums[mid] > nums[right]`:** The midpoint belongs to the left, larger subarray. The minimum element must be strictly inside the right range $\rightarrow$ `left = mid + 1`.
- **`nums[mid] <= nums[right]`:** The midpoint belongs to the right, smaller subarray (or the array segment is fully sorted). The minimum could be `mid` itself or an element to its left $\rightarrow$ `right = mid`.

The loop condition `left < right` prevents infinite loops when `right = mid` is used.

## Common Pitfalls

- **Using `right = mid - 1`:** Excludes `mid` when `nums[mid]` is actually the minimum element.
- **Using `while (left <= right)`:** Causes an infinite loop when `right = mid` and `left === right`. Use `while (left < right)`.

## Solution

```javascript
class Solution {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  findMin(nums) {
    let left = 0;
    let right = nums.length - 1;

    while (left < right) {
      let mid = Math.floor(left + (right - left) / 2);

      if (nums[mid] > nums[right]) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return nums[left];
  }
}
```
