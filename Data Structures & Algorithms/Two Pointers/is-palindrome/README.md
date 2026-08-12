# Valid Palindrome

## Complexity

- **Time Complexity:** $O(N)$ — We iterate through the string characters.
- **Space Complexity:** $O(N)$ — When using string cleaning/regex ($O(1)$ if using in-place pointer skipping).

## Intuition

A palindrome reads the same forward and backward when ignoring spaces, punctuation, and casing.

1. **Clean String:** Use Regex `/[^a-zA-Z0-9]/g` to strip non-alphanumeric characters and convert to lowercase.
2. **Two Pointers:** Place `left` at index `0` and `right` at index `cleanStr.length - 1`.
3. Compare `cleanStr[left]` and `cleanStr[right]`. If they match, step inward (`left++`, `right--`). If they don't match, return `false`.

## Common Pitfalls

- Setting `right = s.length - 1` instead of `cleanStr.length - 1` after cleaning the string.
- Forgetting that JavaScript string comparison is case-sensitive (`'W' !== 'w'`).

## Solution

```javascript
function isPalindrome(s) {
  let cleanStr = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

  let left = 0;
  let right = cleanStr.length - 1;

  while (left < right) {
    if (cleanStr[left] !== cleanStr[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}
```
