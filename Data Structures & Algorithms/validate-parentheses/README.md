# Valid Parentheses

## Complexity

- **Time Complexity:** $O(n)$ — We iterate through string `s` exactly once, performing $O(1)$ stack operations (`push` and `pop`).
- **Space Complexity:** $O(n)$ — In the worst-case scenario (e.g., all opening brackets like `"((((("`), the stack holds $n$ elements.

## Intuition

A **Stack** follows the **Last In, First Out (LIFO)** principle, which naturally models nested structures where the most recent open bracket must be closed first:

1. Map each closing bracket to its corresponding opening bracket (`{ ')': '(', ']': '[', '}': '{' }`).
2. Iterate through each character in string `s`:
   - If it is a **closing bracket**:
     - Check if the stack is empty (meaning there is no matching opening bracket). If empty, return `false`.
     - Pop the top element from the stack. If it does not match `map[char]`, return `false`.
   - If it is an **opening bracket**, push it onto the stack.
3. After processing all characters, return `true` if the stack is completely empty (`stack.length === 0`), or `false` if unclosed brackets remain.

## Common Pitfalls

- Forgetting to check if the stack is empty before popping when encountering a closing bracket (e.g., input `"]"` or `")("`).
- Returning `true` at the end without verifying `stack.length === 0` (e.g., input `"((("`).

## Solution

```javascript
class Solution {
  isValid(s) {
    const map = {
      ")": "(",
      "]": "[",
      "}": "{",
    };
    let stack = [];

    for (let char of s) {
      if (char in map) {
        if (stack.length === 0) return false;
        let top = stack.pop();
        if (top !== map[char]) return false;
      } else {
        stack.push(char);
      }
    }

    return stack.length === 0;
  }
}
```
