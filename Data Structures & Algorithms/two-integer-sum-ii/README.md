# Two Sum II - Input Array Is Sorted

## Complexity

- **Time Complexity:** $O(n)$ — Single pass through the array with two pointers moving inward.
- **Space Complexity:** $O(1)$ — Only requires two index pointers (`left` and `right`), satisfying the strict space constraint.

## Intuition

Because the input array is already sorted in non-decreasing order:

- The smallest numbers are on the left; the largest numbers are on the right.
- If the current sum is **too large**, we must decrease it by moving the right pointer inward (`right--`).
- If the current sum is **too small**, we must increase it by moving the left pointer inward (`left++`).

## Common Pitfalls

- Forgetting that the problem requires **1-indexed** output (returning `[left + 1, right + 1]` instead of 0-indexed indices).
- Using a Hash Map, which takes $O(n)$ space and violates the $O(1)$ additional space constraint.

## Solution

```javascript
class Solution {
  twoSum(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;

    while (left < right) {
      let currentSum = numbers[left] + numbers[right];

      if (currentSum === target) {
        return [left + 1, right + 1];
      } else if (currentSum > target) {
        right--;
      } else {
        left++;
      }
    }
  }
}
```
