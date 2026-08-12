# Group Anagrams

## Complexity

- **Time Complexity:** $O(N \cdot M \log M)$ — Where $N$ is the number of strings and $M$ is the maximum length of a string (due to sorting each word).
- **Space Complexity:** $O(N \cdot M)$ — To store all strings grouped inside the Hash Map.

## Intuition

Anagrams consist of the exact same characters, just in a different order. If we sort the characters of any word alphabetically, all of its anagrams will yield the exact same string key!

1. Use a Hash Map where the **key** is the sorted word (the signature) and the **value** is an array of original words.
2. For each string in the input array, sort its characters to find its signature.
3. If the signature key doesn't exist in the Map, initialize an empty array for it.
4. Push the original word into its corresponding signature array in the Map.
5. Return all map values as a 2D array.

## Common Pitfall

- Use `for...of` instead of `for...in` when looping over array elements in JavaScript (`for...in` iterates over string index keys like `"0"`, `"1"`).
- Remember that `myMap.values()` returns an iterator of arrays, which we convert into a 2D array using `Array.from()`.

## Solution

```javascript
function groupAnagrams(strs) {
  const myMap = new Map();

  for (let str of strs) {
    let sortedWord = str.split("").sort().join("");

    if (!myMap.has(sortedWord)) {
      myMap.set(sortedWord, []);
    }
    myMap.get(sortedWord).push(str);
  }

  return Array.from(myMap.values());
}
```
