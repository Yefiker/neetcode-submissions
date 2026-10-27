# Design Add and Search Words Data Structure

## Complexity

- **Time Complexity:**
  - `addWord(word)`: $O(m)$ — Where $m$ is the length of the word.
  - `search(word)`: $O(m)$ for regular words; in the worst-case scenario with strings consisting entirely of dots (`"..."`), it may check up to $O(26^m)$ paths.
- **Space Complexity:** $O(m)$ for the recursion call stack depth, plus $O(T)$ total space for stored trie nodes.

## Intuition

Standard Trie lookups follow a single exact path per character. When introduced to wildcards (`'.'`), any single character can branch into multiple alternative paths simultaneously. A recursive Depth-First Search (DFS) allows us to dynamically fork execution across every available child node whenever a wildcard is encountered.

## Common Pitfalls

- **Missing False Return:** Failing to return `false` after checking all children in the wildcard loop.
- **Ignoring Terminal Flags:** Checking only structural existence without verifying `isEndOfWord` at the final index.

## Solution

```javascript
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class WordDictionary {
  constructor() {
    this.root = new TrieNode();
  }

  /**
   * @param {string} word
   * @return {void}
   */
  addWord(word) {
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
    const dfs = (node, index) => {
      if (index === word.length) return node.isEndOfWord;
      let char = word[index];

      if (char === ".") {
        for (let key in node.children) {
          if (dfs(node.children[key], index + 1)) {
            return true;
          }
        }
        return false;
      } else {
        if (!node.children[char]) return false;
        return dfs(node.children[char], index + 1);
      }
    };

    return dfs(this.root, 0);
  }
}
```
