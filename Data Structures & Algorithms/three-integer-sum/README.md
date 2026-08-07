# 3Sum

## Complexity

- **Time Complexity:** $O(n^2)$ — Sorting takes $O(n \log n)$. The outer loop runs $n$ times, and the inner two-pointer traversal takes $O(n)$, giving $O(n^2)$ overall.
- **Space Complexity:** $O(1)$ or $O(n)$ — Memory used depends on the sorting implementation in memory; no additional space beyond the result array is required.

## Intuition

3Sum reduces to running **Two Sum II** for each element in the array:

1. Sort the input array so we can use two pointers (`left` and `right`) to adjust sums efficiently.
2. Iterate through `nums` with index `i` to fix the first number `nums[i]`.
3. Set `left = i + 1` and `right = nums.length - 1`.
4. If `nums[i] + nums[left] + nums[right] === 0`, record the triplet `[nums[i], nums[left], nums[right]]` and step inward while skipping duplicate values to prevent duplicate triplets.
5. If the sum is less than `0`, increment `left`. If greater than `0`, decrement `right`.

## Common Pitfalls

- Pushing raw values (`result.push(a, b, c)`) instead of a triplet array (`result.push([a, b, c])`).
- Forgetting to skip duplicate elements for both the outer fixed element `i` and the inner pointer `left`.
- Calling `.sort()` directly on non-array input objects—always ensure array type safety via `Array.from(nums)`.

## Solution

```javascript
class Solution {
  threeSum(nums) {
    let result = [];
    nums = Array.from(nums).sort((a, b) => a - b);

    for (let i = 0; i < nums.length; i++) {
      if (nums[i] > 0) break;
      if (i > 0 && nums[i] === nums[i - 1]) continue;

      let left = i + 1;
      let right = nums.length - 1;

      while (left < right) {
        let sum = nums[i] + nums[left] + nums[right];

        if (sum === 0) {
          result.push([nums[i], nums[left], nums[right]]);
          left++;
          right--;

          while (left < right && nums[left] === nums[left - 1]) {
            left++;
          }
        } else if (sum < 0) {
          left++;
        } else {
          right--;
        }
      }
    }

    return result;
  }
}
```
