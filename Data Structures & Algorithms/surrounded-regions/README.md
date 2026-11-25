# Surrounded Regions

## Complexity

- **Time Complexity:** $O(M \cdot N)$ — Where $M$ is the number of rows and $N$ is the number of columns. Each border-connected `'O'` cell is visited once during the border DFS phase, followed by a single $O(M \cdot N)$ sweep across the entire board to capture surrounded regions and restore safe cells.
- **Space Complexity:** $O(M \cdot N)$ — In the worst-case scenario (e.g., a board filled almost entirely with `'O'`s), the recursion call stack can reach a depth of $O(M \cdot N)$. Modifying the board in place with a temporary `'T'` marker eliminates the need for an auxiliary `visited` matrix.

## Intuition

To capture all `'O'` regions completely surrounded by `'X'` while preserving any `'O'` region connected to the outer boundary of the board:

- **Reverse Thinking (Identify Uncapturable Survivors):** Instead of testing every interior `'O'` cluster to see if it reaches an edge, we start directly from the **4 outer borders** of the board. Any `'O'` on the border—or 4-directionally connected to a border `'O'`—cannot be surrounded.
- **Phase 1 — Border-Triggered DFS:** Run DFS from all cells on the top row (`r = 0`), bottom row (`r = rows - 1`), left column (`c = 0`), and right column (`c = cols - 1`). Whenever an `'O'` is encountered, mark it and all connected `'O'` cells with a temporary marker `'T'`. Checking `board[r][c] !== 'O'` automatically skips both `'X'` walls and already-visited `'T'` cells.
- **Phase 2 — In-Place Capture & Restore:** Iterate through every `(r, c)` cell once:
  - Any remaining `'O'` was unreachable from the borders and is completely surrounded—flip it to `'X'`.
  - Any `'T'` is a border-connected survivor—restore it back to `'O'`.

## Common Pitfalls

- **Trying to Iterate a 2D Grid with `for (let [r, c] of board.length)`:** `board.length` is a single integer (the row count), not an iterable of coordinate pairs. Always use nested index loops (`for (let r = 0; r < rows; r++)` and `for (let c = 0; c < cols; c++)`) when mutating grid cells in place.
- **Forgetting to Restore `'T'` Back to `'O'`:** Failing to convert temporary `'T'` markers back to `'O'` in the final sweep leaves invalid characters on the board.

## Solution

```javascript
class Solution {
  /**
   * @param {character[][]} board
   * @return {void} Do not return anything, modify board in-place instead.
   */
  solve(board) {
    const rows = board.length;
    const cols = board[0].length;

    function dfs(r, c) {
      if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== "O") {
        return;
      }

      // Temporarily mark border-connected 'O' cells as safe
      board[r][c] = "T";

      dfs(r + 1, c);
      dfs(r - 1, c);
      dfs(r, c + 1);
      dfs(r, c - 1);
    }

    // Phase 1: Launch DFS from top and bottom borders
    for (let c = 0; c < cols; c++) {
      dfs(0, c);
      dfs(rows - 1, c);
    }

    // Phase 1: Launch DFS from left and right borders
    for (let r = 0; r < rows; r++) {
      dfs(r, 0);
      dfs(r, cols - 1);
    }

    // Phase 2: Capture surrounded 'O's into 'X' and restore 'T's back to 'O'
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (board[r][c] === "O") {
          board[r][c] = "X";
        } else if (board[r][c] === "T") {
          board[r][c] = "O";
        }
      }
    }
  }
}
```
