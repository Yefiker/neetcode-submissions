# Generate Parentheses

## Complexity

- **Time Complexity:** $O\left(\frac{4^n}{\sqrt{n}}\right)$ — The number of valid combinations corresponds to the $n$-th Catalan number, and constructing each valid string of length $2n$ takes $O(n)$ time.
- **Space Complexity:** $O(n)$ — The recursion call stack reaches a maximum depth of $2n$ (excluding the space required to store the output array).

## Intuition

To generate all well-formed parentheses combinations for $n$ pairs without generating invalid sequences and filtering afterward:

- **Rule 1 (Adding Opening Brackets):** We can add an `'('` at any point as long as we have not exhausted our budget of $n$ opening parentheses (`openCount < n`).
- **Rule 2 (Adding Closing Brackets):** We can only add a `')'` if there is an unmatched opening parenthesis waiting to be closed (`closeCount < openCount`). This strictly prevents invalid prefixes like `")("` or `"())"`.
- **Base Case (`currentString.length === 2 * n`):** Once the string reaches length $2n$, all $n$ opening and $n$ closing brackets have been placed validly, so we push `currentString` to `result` and return.
- **Implicit Backtracking via String Immutability:** Because JavaScript strings are immutable, passing `currentString + '('` or `currentString + ')'` creates a fresh string frame for each recursive call—eliminating the need for manual `.push()` and `.pop()` cleanup.

## Common Pitfalls

- **Allowing `closeCount < n` Instead of `closeCount < openCount`:** Checking against `n` instead of `openCount` allows closing parentheses to be placed before their matching opening parentheses (e.g., `")()("`).
- **Missing Early Base Case `return`:** Forgetting to `return` after pushing `currentString` at length $2n$ (though guarded by `openCount < n` here, keeping an explicit `return` prevents unnecessary condition checks at leaf nodes).

## Solution

```javascript
class Solution {
  /**
   * @param {number} n
   * @return {string[]}
   */
  generateParenthesis(n) {
    const result = [];

    const backtrack = (currentString, openCount, closeCount) => {
      // Base case: built a complete valid string of length 2n
      if (currentString.length === 2 * n) {
        result.push(currentString);
        return;
      }

      // Choice 1: Add '(' if we haven't used all n opening brackets
      if (openCount < n) {
        backtrack(currentString + "(", openCount + 1, closeCount);
      }

      // Choice 2: Add ')' only if there is an unclosed '('
      if (closeCount < openCount) {
        backtrack(currentString + ")", openCount, closeCount + 1);
      }
    };

    backtrack("", 0, 0);
    return result;
  }
}
```
