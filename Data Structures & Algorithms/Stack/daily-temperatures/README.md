# Daily Temperatures

## Complexity

- **Time Complexity:** $O(n)$ — Even though there is a nested `while` loop, every index is pushed onto the stack exactly once and popped at most once.
- **Space Complexity:** $O(n)$ — The stack stores up to $n$ indices in the worst case (e.g., strictly decreasing temperatures like `[80, 70, 60]`).

## Intuition

This problem is solved using a **Monotonic Decreasing Stack** (storing indices whose values decrease from bottom to top):

1. Traverse through `temperatures` with index `i`.
2. Compare `temperatures[i]` against the temperature represented by the index at top of `stack`.
3. While `temperatures[i]` is warmer than `temperatures[top_of_stack]`:
   - Pop `prevIndex` off the stack.
   - Calculate distance: `result[prevIndex] = i - prevIndex`.
4. Push `i` onto `stack`.
5. Any day that never finds a warmer day remains `0` as initialized.

## Common Pitfalls

- Pushing the **temperature values** instead of **indices** onto the stack. Pushing indices allows us to calculate both the temperature value (`temperatures[index]`) and the day difference (`i - index`).
- Thinking the nested `while` loop makes this $O(n^2)$. Because each element is popped at most once across the entire runtime, it is strictly $O(n)$ amortized time.

## Solution

```javascript
class Solution {
  dailyTemperatures(temperatures) {
    let result = new Array(temperatures.length).fill(0);
    let stack = [];

    for (let i = 0; i < temperatures.length; i++) {
      while (
        stack.length > 0 &&
        temperatures[i] > temperatures[stack[stack.length - 1]]
      ) {
        let prevIndex = stack.pop();
        result[prevIndex] = i - prevIndex;
      }
      stack.push(i);
    }

    return result;
  }
}
```
