# Permutation in String

## Complexity

- **Time Complexity:** $O(26 \cdot (n_2 - n_1)) \rightarrow O(n_2)$ — We iterate through string $s2$ once, comparing fixed 26-element frequency arrays at each step.
- **Space Complexity:** $O(1)$ — Two fixed-size frequency arrays of length 26 are used regardless of string sizes.

## Intuition

A permutation of $s1$ must have the exact same length and character frequencies as $s1$. We use a fixed-size sliding window of length `s1.length`:

1. If `s1.length > s2.length`, it's impossible for $s2$ to contain a permutation of $s1$, so return `false`.
2. Compute character frequencies for $s1$ and the first window of $s2$ using 26-element arrays.
3. Slide the window across $s2$:
   - Check if frequencies match. If yes, return `true`.
   - Decrement the count for the outgoing left character `s2[i]`.
   - Increment the count for the incoming right character `s2[i + s1.length]`.
4. Perform one final comparison after the loop ends for the last window position.

## Common Pitfalls

- Defining helper functions inside loop bodies or re-declaring array variables improperly.
- Forgetting the final `matches()` check after the sliding loop finishes.
- Off-by-one errors on the window boundary `s2.length - s1.length`.

## Solution

```javascript
class Solution {
  checkInclusion(s1, s2) {
    if (s1.length > s2.length) return false;

    let s1Count = new Array(26).fill(0);
    let s2Count = new Array(26).fill(0);

    for (let i = 0; i < s1.length; i++) {
      let alpha = s1[i].charCodeAt(0) - "a".charCodeAt(0);
      s1Count[alpha]++;

      let beta = s2[i].charCodeAt(0) - "a".charCodeAt(0);
      s2Count[beta]++;
    }

    const matches = (s1Count, s2Count) => {
      for (let i = 0; i < 26; i++) {
        if (s1Count[i] !== s2Count[i]) return false;
      }
      return true;
    };

    for (let i = 0; i < s2.length - s1.length; i++) {
      if (matches(s1Count, s2Count)) return true;
      s2Count[s2[i].charCodeAt(0) - "a".charCodeAt(0)]--;
      s2Count[s2[i + s1.length].charCodeAt(0) - "a".charCodeAt(0)]++;
    }

    return matches(s1Count, s2Count);
  }
}
```
