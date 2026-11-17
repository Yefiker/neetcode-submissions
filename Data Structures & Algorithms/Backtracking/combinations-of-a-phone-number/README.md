# Letter Combinations of a Phone Number

## Complexity

- **Time Complexity:** $O(N \cdot 4^N)$ — Where $N$ is the length of `digits`. In the worst case (when digits consist of `'7'` or `'9'`, which map to 4 letters), there are $4^N$ total combinations, and joining each combination of length $N$ takes $O(N)$ time.
- **Space Complexity:** $O(N)$ — The recursion call stack and `currentPath` array reach a maximum depth of $N$ (excluding the space required for the output list).

## Intuition

To generate all possible letter combinations from a string of phone digits:

- **Keypad Hash Map:** Map each digit (`'2'`–`'9'`) to its corresponding string of letters for $O(1)$ lookup during traversal.
- **Fixed-Depth Decision Tree:** Each level `index` of the recursion tree represents choosing one letter for `digits[index]`. Unlike subset problems where intermediate nodes are valid, only leaf nodes where `index === digits.length` represent complete combinations.
- **Choose-Explore-Unchoose:** Push a candidate character onto `currentPath`, recurse to `index + 1`, and pop the character upon returning to explore the next letter branch.

## Common Pitfalls

- **Empty String Edge Case:** If `digits === ""`, standard backtracking without a guard would hit the base case immediately and return `[""]` instead of `[]`. Always check `if (!digits.length) return [];` upfront.
- **String Immutability vs. Array Mutation:** While you can pass concatenated strings (`currentStr + char`) directly in JS without needing `.pop()`, using a `currentPath` array with `.push()`/`.pop()` and `.join('')` at the leaf maintains consistent $O(1)$ state transitions across all backtracking patterns.

## Solution

```javascript
class Solution {
  /**
   * @param {string} digits
   * @return {string[]}
   */
  letterCombinations(digits) {
    if (digits.length === 0) {
      return [];
    }

    const result = [];
    const digitToLetters = {
      2: "abc",
      3: "def",
      4: "ghi",
      5: "jkl",
      6: "mno",
      7: "pqrs",
      8: "tuv",
      9: "wxyz",
    };

    const backtrack = (index, currentPath) => {
      // Base case: built a complete combination matching digits length
      if (index === digits.length) {
        result.push(currentPath.join(""));
        return;
      }

      const letters = digitToLetters[digits[index]];

      for (const char of letters) {
        // CHOOSE
        currentPath.push(char);
        // EXPLORE
        backtrack(index + 1, currentPath);
        // UNCHOOSE
        currentPath.pop();
      }
    };

    backtrack(0, []);
    return result;
  }
}
```
