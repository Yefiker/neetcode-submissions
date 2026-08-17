# Largest Rectangle in Histogram

## Complexity

- **Time Complexity:** $O(n)$ — Every bar index is pushed onto the stack exactly once and popped at most once across the entire iteration.
- **Space Complexity:** $O(n)$ — In the worst-case scenario (strictly increasing bar heights), the stack stores up to $n$ elements.

## Intuition

To find the largest rectangle, we determine for each bar: **"If this bar is the shortest bar in a rectangle, how far left and right can it extend?"**

A bar's rectangle gets **blocked on the right** as soon as we encounter a strictly shorter bar. We use a **Monotonic Increasing Stack** storing pairs of `[startIndex, height]`:

1. Traverse `heights` with current index `i` and height `h`.
2. Initialize `start = i`.
3. While the stack is not empty and the bar at top of stack is **taller** than `h`:
   - Pop `[popIndex, popHeight]`.
   - Calculate width: `width = i - popIndex`.
   - Calculate area: `area = popHeight * width` and update `maxArea`.
   - **Extend Backward:** Update `start = popIndex` because the current shorter bar `h` can stretch backward into the space left by the taller popped bar.
4. Push `[start, h]` onto the stack.
5. **Cleanup Remaining Stack Items:** Any bars left in the stack were never blocked on the right, so their width extends to the end of the array (`heights.length - popIndex`).

## Common Pitfalls

- **Forgetting the Start Index Shift (`start = popIndex`):** When a shorter bar pops a taller bar, the shorter bar can extend _left_ into the taller bar's starting position. Forgetting to update `start` yields incorrect narrower widths.
- **Not Handling Leftover Elements:** Forgetting that elements remaining in the stack extend all the way to `heights.length`.

## Solution

```javascript
class Solution {
  largestRectangleArea(heights) {
    let maxArea = 0;
    let stack = []; // Stores pairs: [startIndex, height]

    for (let i = 0; i < heights.length; i++) {
      let start = i;

      while (stack.length > 0 && stack[stack.length - 1][1] > heights[i]) {
        let [popIndex, popHeight] = stack.pop();
        let width = i - popIndex;
        maxArea = Math.max(maxArea, popHeight * width);
        start = popIndex; // Extend current bar's left boundary
      }

      stack.push([start, heights[i]]);
    }

    // Cleanup remaining unblocked bars in stack
    for (let [index, height] of stack) {
      let width = heights.length - index;
      maxArea = Math.max(maxArea, height * width);
    }

    return maxArea;
  }
}
```
