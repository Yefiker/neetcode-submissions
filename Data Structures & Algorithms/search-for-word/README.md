# Word Search

## Complexity

- **Time Complexity:** $O(M \cdot N \cdot 3^L)$ — Where $M \times N$ is the dimensions of the board and $L$ is the length of `word`. We may start a DFS from every cell on the board, and at each step (after the first move), there are at most 3 unvisited neighboring directions to explore.
- **Space Complexity:** $O(L)$ — The maximum depth of the recursion call stack equals the length $L$ of `word`. Modifying the board in place avoids allocating a separate `visited` matrix.

## Intuition

To determine whether `word` exists in a 2D grid of characters through sequentially adjacent (horizontal or vertical) cells without reusing the same cell:

- **Grid Entry Scan:** Iterate through every cell `(r, c)` in the `board` to find potential starting points matching `word[0]`, launching a depth-first backtracking search from each.
- **Boundary & Character Validation:** At each step `(r, c, index)`, immediately return `false` if coordinates fall out of bounds or if `board[r][c]` does not match `word[index]`.
- **In-Place Visited Marking (Choose-Explore-Unchoose):**
  - **CHOOSE:** Save the original character in `temp` and overwrite `board[r][c] = '#'` so the current recursive path cannot reuse this cell.
  - **EXPLORE:** Recursively check all 4 orthogonal directions (`down`, `up`, `right`, `left`) with `index + 1`, short-circuiting with `||` as soon as a valid path returns `true`.
  - **UNCHOOSE:** Restore `board[r][c] = temp` upon returning so other starting paths can cleanly traverse this cell.

## Common Pitfalls

- **Forgetting to Restore the Cell (`board[r][c] = temp`):** If a branch fails and returns `false` without restoring the original character, subsequent search paths starting from different cells will see `'#'` and fail to find valid words.
- **Checking Bounds After Accessing `board[r][c]`:** Always verify `r < 0 || r >= rows || c < 0 || c >= cols` _before_ evaluating `board[r][c] !== word[index]` to prevent `TypeError: Cannot read properties of undefined`.

## Solution

```javascript
class Solution {
  /**
   * @param {character[][]} board
   * @param {string} word
   * @return {boolean}
   */
  exist(board, word) {
    const rows = board.length;
    const cols = board[0].length;

    const dfs = (r, c, index) => {
      // Base case: all characters in word have been matched
      if (index === word.length) {
        return true;
      }

      // Boundary check and character mismatch guard
      if (
        r < 0 ||
        r >= rows ||
        c < 0 ||
        c >= cols ||
        board[r][c] !== word[index]
      ) {
        return false;
      }

      // CHOOSE: Mark current cell as visited in-place
      const temp = board[r][c];
      board[r][c] = "#";

      // EXPLORE: Search all 4 adjacent directions
      const found =
        dfs(r + 1, c, index + 1) ||
        dfs(r - 1, c, index + 1) ||
        dfs(r, c + 1, index + 1) ||
        dfs(r, c - 1, index + 1);

      // UNCHOOSE: Restore original character for other branches
      board[r][c] = temp;

      return found;
    };

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (dfs(r, c, 0)) {
          return true;
        }
      }
    }

    return false;
  }
}
```
