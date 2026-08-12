# Min Stack

## Complexity

- **Time Complexity:** $O(1)$ for all operations (`push`, `pop`, `top`, `getMin`).
- **Space Complexity:** $O(n)$ — Additional $O(n)$ space is used by `minStack` to track historical minimums corresponding to each element in `stack`.

## Intuition

To achieve $O(1)$ time for `getMin()`, we maintain a secondary parallel stack called `minStack`.

1. `stack` behaves like a normal stack, storing raw values in push order.
2. `minStack` tracks the **minimum value present in the stack at that exact depth**.
3. When pushing `val`:
   - Compute `currentMin`: if `minStack` is empty, `val` is the new minimum. Otherwise, take `Math.min(val, top_of_minStack)`.
   - Push `val` to `stack` and `currentMin` to `minStack`.
4. When popping:
   - Pop from both `stack` and `minStack` simultaneously to maintain alignment.
5. `getMin()` simply looks at the top element of `minStack` without modifying it.

## Common Pitfalls

- Forgetting `this.` when referencing class properties in JavaScript methods (e.g., calling `minStack` instead of `this.minStack`).
- Calling `.pop()` instead of reading the last element by index when checking the top of `minStack` inside `push()`.
- Trying to track a single integer variable for `min`, which breaks when the current minimum element is popped from the stack.

## Solution

```javascript
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(val) {
    this.stack.push(val);
    let top = this.minStack[this.minStack.length - 1];
    let currentMin = this.minStack.length === 0 ? val : Math.min(val, top);
    this.minStack.push(currentMin);
  }

  pop() {
    this.stack.pop();
    this.minStack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}
```
