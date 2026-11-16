# Palindrome Partitioning

## Complexity

- **Time Complexity:** $O(N \cdot 2^N)$ — In the worst-case scenario (e.g., `"aaaa"`), every possible partition is valid, yielding $2^{N-1}$ partitions, and slicing/checking palindromes takes $O(N)$ per node.
- **Space Complexity:** $O(N)$ — The recursion call stack and `currentPath` array grow up to a maximum depth of $N$ (the length of the string), excluding output storage.

## Intuition

To partition a string `s` into all possible combinations of palindrome substrings:

- **Decision Tree of Cuts:** At any `startIndex`, we iterate through all possible ending indices `endIndex` (`startIndex <= endIndex < s.length`) to form candidate substrings `s[startIndex ... endIndex]`.
- **Early Pruning via Two-Pointer Check:** We only recurse deeper if the chosen substring is a valid palindrome. If `s[startIndex ... endIndex]` is not a palindrome, we immediately skip that branch.
- **Base Case (`startIndex === s.length`):** Once our starting index reaches the exact end of the string, every slice along our current path is guaranteed to be a palindrome, so we record a copy of `currentPath`.

## Common Pitfalls

- **JavaScript `.slice()` Off-by-One:** `String.prototype.slice(start, end)` is exclusive of the `end` index. Always use `s.slice(startIndex, endIndex + 1)` to capture the character at `endIndex`.
- **Inefficient Palindrome Checks:** Creating reversed string copies (`sub.split('').reverse().join('')`) inside the inner loop adds unnecessary memory allocations; using two pointers (`left` and `right`) keeps checks clean and $O(1)$ space.

## Solution

```javascript
class Solution {
  /**
   * @param {string} s
   * @return {string[][]}
   */
  partition(s) {
    const result = [];

    // Helper: Two-pointer palindrome check
    const isPalindrome = (left, right) => {
      while (left < right) {
        if (s[left] !== s[right]) {
          return false;
        }
        left++;
        right--;
      }
      return true;
    };

    const backtrack = (startIndex, currentPath) => {
      // Base case: Reached the end of the string with valid palindromes
      if (startIndex === s.length) {
        result.push([...currentPath]);
        return;
      }

      // Try every possible cut from startIndex to the end of the string
      for (let endIndex = startIndex; endIndex < s.length; endIndex++) {
        // Only branch if the current substring is a palindrome
        if (isPalindrome(startIndex, endIndex)) {
          // CHOOSE
          currentPath.push(s.slice(startIndex, endIndex + 1));
          // EXPLORE
          backtrack(endIndex + 1, currentPath);
          // UNCHOOSE
          currentPath.pop();
        }
      }
    };

    backtrack(0, []);
    return result;
  }
}
```
