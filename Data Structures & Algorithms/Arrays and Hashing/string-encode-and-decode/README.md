# Encode and Decode Strings

## Complexity

- **Time Complexity:** $O(N)$ — Where $N$ is the total number of characters across all strings. We process each character during encoding and decoding.
- **Space Complexity:** $O(N)$ — For the output strings/arrays.

## Intuition

Simple delimiters like `,` or `#` fail because strings themselves can contain those characters.

To solve this, we use **Length-Prefix Encoding**:

1. **Encode:** Prepend each string with its length followed by a delimiter (e.g., `"hello"` $\rightarrow$ `"5#hello"`).
2. **Decode:** Maintain a pointer `i`. Find the next `#` to read the integer length, then extract that exact number of characters directly following `#`. Advance `i` past the extracted word.

## Common Pitfalls

- Initialize `result` in `encode` as an empty string `""`, not an empty array `[]`.
- Keep the loop bound as `i < str.length` so `decode` terminates as soon as all encoded chunks are processed.

## Solution

```javascript
class Solution {
  encode(strs) {
    let result = "";
    for (let str of strs) {
      result += `${str.length}#${str}`;
    }
    return result;
  }

  decode(str) {
    let result = [];
    let i = 0;

    while (i < str.length) {
      let currentPosition = str.indexOf("#", i);
      let length = Number(str.slice(i, currentPosition));
      let target = str.slice(currentPosition + 1, currentPosition + 1 + length);

      result.push(target);
      i = currentPosition + 1 + length;
    }
    return result;
  }
}
```
