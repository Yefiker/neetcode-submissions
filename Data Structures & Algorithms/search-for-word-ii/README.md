# Word Search II

## Complexity

- **Time Complexity:** $O(M \cdot N \cdot 4^L + \sum(\text{word\_len}))$ — Where $M \times N$ is the board grid dimensions, $L$ is the maximum length of a word, and $4^L$ represents the 4-directional DFS exploration paths pruned efficiently by the Trie.
- **Space Complexity:** $O(T)$ — Where $T$ is the total number of characters across all words stored in the Trie nodes, plus recursion stack space.

## Intuition

Searching for a list of words on a grid individually results in severe time limit issues. By storing all target words in a Trie, we can traverse the 2D board using Depth-First Search (DFS) and prune invalid paths instantly if a cell's sequence does not exist in the Trie prefix tree.

## Common Pitfalls

- **Duplicate Additions:** Forgetting to clear `node.word = null` after finding a word, which causes the same word to be pushed multiple times if found via different board paths.
- **Missing Backtracking:** Failing to restore the original board character (`board[r][c] = char`) after exploring neighboring cells, which blocks valid paths for subsequent searches.

## Solution

```javascript
class TrieNode {
  constructor() {
    this.children = {};
    this.word = null;
  }
}

class Solution {
  /**
   * @param {character[][]} board
   * @param {string[]} words
   * @return {string[]}
   */
  findWords(board, words) {
    // Step 1: Build the Trie
    const root = new TrieNode();
    for (const word of words) {
      let node = root;
      for (const char of word) {
        if (!node.children[char]) {
          node.children[char] = new TrieNode();
        }
        node = node.children[char];
      }
      node.word = word;
    }

    const rows = board.length;
    const cols = board[0].length;
    const result = [];

    // Step 2: DFS Backtracking function
    const dfs = (r, c, node) => {
      const char = board[r][c];

      if (char === "#" || !node.children[char]) return;

      node = node.children[char];

      if (node.word !== null) {
        result.push(node.word);
        node.word = null; // Prevent duplicate additions
      }

      board[r][c] = "#";

      const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ];
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          dfs(nr, nc, node);
        }
      }

      board[r][c] = char; // Backtrack
    };

    // Step 3: Start DFS from every cell on the board
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dfs(r, c, root);
      }
    }

    return result;
  }
}
```
