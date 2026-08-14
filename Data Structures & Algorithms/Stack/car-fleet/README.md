# Car Fleet

## Complexity

- **Time Complexity:** $O(n \log n)$ — Driven by sorting the $n$ cars by starting position. The subsequent iteration through cars with stack operations runs in $O(n)$ time.
- **Space Complexity:** $O(n)$ — Required to store the mapped `pair` array and the `stack` of fleet times.

## Intuition

1. **Reduce to Arrival Time:** Calculate the time required for each car to reach the target independently: $\text{time} = \frac{\text{target} - \text{position}}{\text{speed}}$.
2. **Sort by Position (Descending):** Since cars cannot pass each other, process cars starting closest to the target down to the furthest away.
3. **Monotonic Stack Decision:**
   - Push the arrival time of each car onto the stack.
   - If `stack[top]` (car further back) takes **less or equal time** than `stack[top - 1]` (car ahead), it catches up to the fleet ahead and is constrained by its speed.
   - Pop the top time off the stack to merge it into the existing fleet.
4. The total remaining elements in the stack equal the total distinct car fleets.

## Common Pitfalls

- **Using `for...in` instead of `for...of`:** In JS, `for...in` iterates over array index keys (strings `"0"`, `"1"`), breaking array destructuring. Use `for...of` to iterate over values.
- **Sorting Ascending instead of Descending:** Processing from back-to-front prevents knowing if a car ahead will block the current car.
- **Strictly Less Than vs. Less Than or Equal (`<=`):** Cars that reach the target at the exact same moment are considered part of the same fleet per problem statement.

## Solution

```javascript
class Solution {
  carFleet(target, position, speed) {
    let pair = position.map((p, i) => [p, speed[i]]);
    pair.sort((a, b) => b[0] - a[0]);
    let stack = [];

    for (let [p, s] of pair) {
      let time = (target - p) / s;
      stack.push(time);

      if (
        stack.length >= 2 &&
        stack[stack.length - 1] <= stack[stack.length - 2]
      ) {
        stack.pop();
      }
    }

    return stack.length;
  }
}
```
