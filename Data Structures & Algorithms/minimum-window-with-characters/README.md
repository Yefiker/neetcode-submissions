# Minimum Window Substring

## Complexity

- **Time Complexity:** $O(n + m)$ — Where $n$ is the length of string `s` and $m$ is the length of string `t`. Each character in `s` is visited at most twice (once by `right` and once by `left`).
- **Space Complexity:** $O(m + k)$ — Where $m$ is the unique character count of `t` and $k$ is the unique character count of `s` stored in the frequency maps.

## Intuition

We use a dynamic sliding window `[left ... right]` optimized with a **Have vs. Need** frequency tracking mechanism:

1. Build a frequency map `countT` for string `t` and set `need = Object.keys(countT).length`.
2. Expand `right` across string `s`, adding characters to a `window` map. When a character's frequency in `window` matches its required frequency in `countT`, increment `have`.
3. Whenever `have === need`, the current window is valid:
   - Check if `right - left + 1` is smaller than `minLength` and save `result = [left, right]`.
   - Shrink the window from `left` by decrementing `window[s[left]]`.
   - If `window[s[left]]` drops below `countT[s[left]]`, decrement `have` to make the window invalid again, resuming the `right` expansion.

## Common Pitfalls

- Placing `window[s[left]]--` inside the `if (currentWindow < minLength)` condition. The left character count must decrement on **every** shrink step regardless of whether a new minimum length was recorded.
- Checking character equality inefficiently (e.g., comparing entire hash maps on every iteration instead of using `have` vs `need`).
- Slicing errors when returning the result (remember `slice(start, end)` excludes `end`, so use `s.slice(result[0], result[1] + 1)`).

## Solution

```javascript
class Solution {
  minWindow(s, t) {
    let countT = {};
    for (let char of t) {
      countT[char] = (countT[char] || 0) + 1;
    }

    let need = Object.keys(countT).length;
    let window = {};
    let have = 0;
    let left = 0;
    let result = [-1, -1];
    let minLength = Infinity;

    for (let right = 0; right < s.length; right++) {
      const char = s[right];
      window[char] = (window[char] || 0) + 1;

      if (countT[char] !== undefined && window[char] === countT[char]) {
        have++;
      }

      while (have === need) {
        const currentWindow = right - left + 1;

        if (currentWindow < minLength) {
          minLength = currentWindow;
          result = [left, right];
        }

        const leftChar = s[left];
        window[leftChar]--;

        if (
          countT[leftChar] !== undefined &&
          window[leftChar] < countT[leftChar]
        ) {
          have--;
        }

        left++;
      }
    }

    return minLength === Infinity ? "" : s.slice(result[0], result[1] + 1);
  }
}
```
