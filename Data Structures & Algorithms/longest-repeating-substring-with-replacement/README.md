# Longest Repeating Character Replacement

## Complexity

- **Time Complexity:** $O(n)$ — Each character is processed at most twice (once by `right` and once by `left`).
- **Space Complexity:** $O(m)$ — Where $m$ is the number of distinct characters in the string (at most 26 for uppercase English letters, effectively $O(1)$ space).

## Intuition

A sliding window `[left ... right]` is valid if the number of characters we need to replace does not exceed $k$:
$$\text{Replacements Needed} = \text{Window Length} - \text{Frequency of Most Frequent Character} \le k$$

1. Expand the window by advancing `right` and tracking character frequencies in a hash map.
2. Maintain `maxFreq` as the maximum frequency observed for any single character in the window.
3. If `(right - left + 1) - maxFreq > k`, the window requires more than $k$ replacements. Shrink the window by decrementing `count[s[left]]` and moving `left++`.
4. Update `maxLength = Math.max(maxLength, right - left + 1)` after ensuring the window is valid.

## Common Pitfalls

- Placing the window validity check outside the `for` loop, causing it to evaluate only once at the end.
- Updating `maxLength` inside the contraction loop instead of after the window has been made valid.
- Forgetting to decrement `count[s[left]]` when shrinking the window from the left.

## Solution

```javascript
class Solution {
  characterReplacement(s, k) {
    let left = 0;
    let maxFreq = 0;
    let maxLength = 0;
    let count = {};

    for (let right = 0; right < s.length; right++) {
      count[s[right]] = (count[s[right]] || 0) + 1;
      maxFreq = Math.max(maxFreq, count[s[right]]);

      while (right - left + 1 - maxFreq > k) {
        count[s[left]]--;
        left++;
      }

      maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
  }
}
```
