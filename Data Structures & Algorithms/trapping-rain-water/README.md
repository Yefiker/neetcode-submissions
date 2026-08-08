# Trapping Rain Water

## Complexity

- **Time Complexity:** $O(n)$ — Single pass through the array using two pointers moving inward.
- **Space Complexity:** $O(1)$ — Only tracking scalar variables (`left`, `right`, `maxLeft`, `maxRight`, `totalWater`).

## Intuition

The amount of water stored above any bar `i` is bounded by the shorter of the highest wall to its left and right:
$$\text{Water at } i = \min(\text{maxLeft}, \text{maxRight}) - \text{height}[i]$$

Using Two Pointers (`left` and `right`):

1. Whichever side has the smaller height holds the bottleneck.
2. If `height[left] < height[right]`, we know `maxLeft` determines the trapped water on the left side regardless of what lies between `left` and `right`.
3. Process `left`: Update `maxLeft` if `height[left] >= maxLeft`, otherwise add `maxLeft - height[left]` to `totalWater`, then move `left++`.
4. Mirror the same logic for `right` when `height[right] <= height[left]`.

## Common Pitfalls

- Placing `left++` or `right--` inside the `else` block of the max check, causing infinite loops when a new max height is encountered.
- Using nested `while` loops instead of relying on the main outer `while (left < right)`.

## Solution

```javascript
class Solution {
  trap(height) {
    let left = 0;
    let right = height.length - 1;
    let maxLeft = 0;
    let maxRight = 0;
    let totalWater = 0;

    while (left < right) {
      if (height[left] < height[right]) {
        if (height[left] >= maxLeft) {
          maxLeft = height[left];
        } else {
          totalWater += maxLeft - height[left];
        }
        left++;
      } else {
        if (height[right] >= maxRight) {
          maxRight = height[right];
        } else {
          totalWater += maxRight - height[right];
        }
        right--;
      }
    }

    return totalWater;
  }
}
```
