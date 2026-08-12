# Container With Most Water

## Complexity

- **Time Complexity:** $O(n)$ — Single pass through the `heights` array using two pointers moving inward.
- **Space Complexity:** $O(1)$ — Only requires pointers and scalar variables for tracking max area.

## Intuition

The water volume is bottlenecked by the shorter wall:
$$\text{Area} = (\text{right} - \text{left}) \times \min(\text{height}[left], \text{height}[right])$$

1. Start with the maximum possible width (`left = 0`, `right = heights.length - 1`).
2. Calculate the current area and update `maxArea`.
3. To maximize area while width decreases, we must seek a taller wall. Shift the pointer corresponding to the **shorter bar** inward (`left++` if `heights[left] < heights[right]`, else `right--`).

## Common Pitfalls

- Moving `right--` unconditionally without an `else` block, which increments `left` and decrements `right` simultaneously.
- Trying to move the taller wall's pointer, which cannot increase the container height and only reduces the width.

## Solution

```javascript
class Solution {
  maxArea(heights) {
    let left = 0;
    let right = heights.length - 1;
    let maxArea = 0;

    while (left < right) {
      let currentWidth = right - left;
      let currentHeight = Math.min(heights[left], heights[right]);

      maxArea = Math.max(maxArea, currentWidth * currentHeight);

      if (heights[left] < heights[right]) {
        left++;
      } else {
        right--;
      }
    }

    return maxArea;
  }
}
```
