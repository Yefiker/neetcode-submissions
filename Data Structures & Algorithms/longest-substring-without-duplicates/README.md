# Longest Substring Without Repeating Characters

## Complexity

- **Time Complexity:** $O(n)$ — Each character is visited at most twice (once by `right` and once by `left`).
- **Space Complexity:** $O(m)$ — Where $m$ is the size of the unique character set ($O(1)$ if bounded by standard ASCII / 26 alphabet characters).

## Intuition

We use a sliding window (`left` and `right`) maintained with a `Set`:

1. Expand the window by advancing `right`.
2. If `s[right]` is already in `mySet`, contract the window from `left` by deleting `s[left]` and incrementing `left++` until `s[right]` is removed from the set.
3. Add `s[right]` to `mySet` and update `maxLength = Math.max(maxLength, right - left + 1)`.

## Common Pitfalls

- Using `right < s.length - 1` in the outer loop, which skips the final character.
- Checking `while (mySet.has(s[left]))` instead of `while (mySet.has(s[right]))`, which deletes non-duplicate valid characters from the set.

## Solution

```javascript
class Solution {
  lengthOfLongestSubstring(s) {
    let left = 0;
    let maxLength = 0;
    let mySet = new Set();

    for (let right = 0; right < s.length; right++) {
      while (mySet.has(s[right])) {
        mySet.delete(s[left]);
        left++;
      }

      mySet.add(s[right]);
      maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
  }
}
```
