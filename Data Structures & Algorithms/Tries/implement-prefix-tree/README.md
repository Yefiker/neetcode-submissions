# Implement Trie (Prefix Tree)

## Complexity

- **Time Complexity:**
  - `insert(word)`: $O(m)$ — Where $m$ is the length of the word.
  - `search(word)`: $O(m)$ — Where $m$ is the length of the word.
  - `startsWith(prefix)`: $O(p)$ — Where $p$ is the length of the prefix.
- **Space Complexity:** $O(T)$ — Where $T$ is the total number of characters across all inserted words, representing node allocations.

## Intuition

By breaking words down into their sequential characters along tree branches, common prefixes share identical path nodes. Storing character maps in nodes and flagging completion states allows prefix-based lookups to run in linear time relative to word length rather than total dataset size.

## Common Pitfalls

- **Missing Termination Flags:** Treating a prefix node as a valid complete word in `search()` because `isEndOfWord` wasn't verified.
- **Uninitialized Pointers:** Failing to handle missing child keys dynamically during insertion or search traversal.

## Solution

```javascript
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class PrefixTree {
  constructor() {
    this.root = new TrieNode();
  }

  /**
   * @param {string} word
   * @return {void}
   */
  insert(word) {
    let curr = this.root;
    for (let char of word) {
      if (!curr.children[char]) {
        curr.children[char] = new TrieNode();
      }
      curr = curr.children[char];
    }
    curr.isEndOfWord = true;
  }

  /**
   * @param {string} word
   * @return {boolean}
   */
  search(word) {
    let curr = this.root;
    for (let char of word) {
      if (!curr.children[char]) return false;
      curr = curr.children[char];
    }
    return curr.isEndOfWord;
  }

  /**
   * @param {string} prefix
   * @return {boolean}
   */
  startsWith(prefix) {
    let curr = this.root;
    for (let char of prefix) {
      if (!curr.children[char]) return false;
      curr = curr.children[char];
    }
    return true;
  }
}
```
