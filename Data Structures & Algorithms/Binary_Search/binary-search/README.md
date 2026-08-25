# Binary Search

## Complexity

- **Time Complexity:** $O(\log N)$ — In each step, the search space is halved, reducing the total comparisons to logarithmic time.
- **Space Complexity:** $O(1)$ — The algorithm runs in iterative constant auxiliary space.

## Intuition

Binary search operates on sorted arrays by repeatedly dividing the search interval in half.

We compare the target value with the middle element of the array:

- If the target equals the middle element, the search is complete.
- If the target is smaller than the middle element, we narrow our focus to the left half.
- If the target is larger than the middle element, we narrow our focus to the right half.

This process continues until the target is found or the search space becomes empty (`left > right`).

## Common Pitfalls

- **Integer Overflow:** Calculating `(left + right) / 2` directly can cause integer overflow in languages with fixed integer sizes when `left` and `right` are large. Use `left + Math.floor((right - left) / 2)` instead.
- **Off-by-One Loop Bounds:** Using `while (left < right)` instead of `while (left <= right)` causes the search to prematurely exit without checking the single remaining element when `left === right`.
- **Infinite Loops:** Forgetting to offset the boundaries (`left = mid + 1` or `right = mid - 1`) leads to infinite loops when `left` and `right` converge.

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

      if (nums[mid] === target) {
        return mid;
      } else if (nums[mid] > target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return -1;
  }
}
```
