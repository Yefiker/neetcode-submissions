#### 2. `Valid Anagram/README.md`

````markdown
# Valid Anagram

## Complexity

- **Time Complexity:** $O(n)$ — We iterate through string `s` and string `t` once.
- **Space Complexity:** $O(1)$ — Hash Map stores at most 26 lowercase character keys.

## Intuition

Treat a Hash Map as a character inventory:

1. **Build:** Loop through string `s` and increment character counts (`+1`).
2. **Consume:** Loop through string `t` and decrement character counts (`-1`).
3. If a character in `t` doesn't exist in the Map or its count drops below 0, `t` cannot be an anagram.

## Common Pitfall

Make sure to decrement (`-1`) in the second loop rather than incrementing. You are matching and removing characters from your inventory.

## Solution

```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const myMap = new Map();
  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    myMap.set(char, (myMap.get(char) || 0) + 1);
  }

  for (let j = 0; j < t.length; j++) {
    let char = t[j];
    let count = myMap.get(char) || 0;
    if (!myMap.has(char) || count === 0) return false;
    myMap.set(char, count - 1);
  }

  return true;
}
```
````
