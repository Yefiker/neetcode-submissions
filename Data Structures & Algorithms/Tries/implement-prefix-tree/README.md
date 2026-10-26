# Implement Trie (Prefix Tree)

## Problem Description

Design a **Trie** (pronounced as "try") or **Prefix Tree** data structure that supports the insertion of strings, whole-word lookups, and prefix matching queries.

Implement the `PrefixTree` class:

- `PrefixTree()` Initializes the trie object with an empty root node.
- `void insert(String word)` Inserts the string `word` into the trie.
- `boolean search(String word)` Returns `true` if the string `word` is in the trie (i.e., was inserted previously), and `false` otherwise.
- `boolean startsWith(String prefix)` Returns `true` if there is a previously inserted string `word` that has the prefix `prefix`, and `false` otherwise.

## Code Layout (JavaScript)

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
   * Time Complexity: O(L) where L is word length
   * Space Complexity: O(L) auxiliary node creation limits
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
   * Time Complexity: O(L)
   * Space Complexity: O(1)
   * @param {string} word
   * @return {boolean}
   */
  search(word) {
    let curr = this.root;
    for (let char of word) {
      if (!curr.children[char]) {
        return false;
      }
      curr = curr.children[char];
    }
    return curr.isEndOfWord;
  }

  /**
   * Time Complexity: O(P) where P is prefix length
   * Space Complexity: O(1)
   * @param {string} prefix
   * @return {boolean}
   */
  startsWith(prefix) {
    let curr = this.root;
    for (let char of prefix) {
      if (!curr.children[char]) {
        return false;
      }
      curr = curr.children[char];
    }
    return true;
  }
}
```

## Complexity Analysis

- **Time Complexity:**
  - **Insertion:** $\mathcal{O}(L)$ where $L$ is the length of the string. We look through each character sequentially.
  - **Search:** $\mathcal{O}(L)$ because we follow a straight chain down the nodes matching character codes.
  - **Prefix Matching:** $\mathcal{O}(P)$ where $P$ is the prefix length.
- **Space Complexity:** $\mathcal{O}(N \cdot L)$ worst-case space tracking where $N$ is the total number of words inserted and $L$ is the average word length. In practice, space consumption is much lower due to extensive internal node sharing across matching word prefixes.
