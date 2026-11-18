# N-Queens

## Complexity

- **Time Complexity:** $O(N!)$ — At row `0`, there are $N$ possible column choices; at row `1`, at most $N - 1$ choices; at row `2`, at most $N - 2$, and so on. Building each valid board snapshot at the base case takes $O(N^2)$ time.
- **Space Complexity:** $O(N^2)$ — Storing the $N \times N$ character grid requires $O(N^2)$ space, while the recursion call stack and tracking `Set`s (`cols`, `posDiag`, `negDiag`) each take $O(N)$ space (excluding output storage).

## Intuition

To place `n` queens on an `n x n` chessboard so that no two queens attack each other horizontally, vertically, or diagonally:

- **Row-by-Row Placement:** Because no two queens can occupy the same row, each level of the recursion tree corresponds directly to a single `row` (`0` through `n - 1`). At each row, we iterate through candidate columns `col`.
- **$O(1)$ Diagonal & Column Hashing:** Instead of scanning the 2D grid on every placement check, we track occupied attack lines in three `Set`s:
  - **`cols`:** Tracks occupied column indices (`col`).
  - **`posDiag` (`row + col`):** Every cell along a positive `/` diagonal shares the exact same `row + col` sum.
  - **`negDiag` (`row - col`):** Every cell along a negative `\` diagonal shares the exact same `row - col` difference.
- **Choose-Explore-Unchoose:** Place a queen (`'Q'`), register its column and diagonal signatures in the `Set`s, recurse to `row + 1`, and cleanly revert both the board cell (`'.'`) and `Set` entries upon backtracking.

## Common Pitfalls

- **Incomplete State Cleanup:** Forgetting to remove `col`, `row + col`, or `row - col` from their respective `Set`s—or forgetting to reset `board[row][col] = '.'`—during the unchoose step corrupts subsequent branches.
- **Mutating Shared Board References:** Pushing `board` directly into `result` stores references to the mutable 2D array, which ends up completely empty (`'.'`) once recursion unwinds. Always serialize each row with `board.map(r => r.join(''))` at the base case.

## Solution

```javascript
class Solution {
  /**
   * @param {number} n
   * @return {string[][]}
   */
  solveNQueens(n) {
    const result = [];
    const board = Array.from({ length: n }, () => Array(n).fill("."));

    const cols = new Set();
    const posDiag = new Set(); // (row + col)
    const negDiag = new Set(); // (row - col)

    const backtrack = (row) => {
      // Base case: placed queens on all n rows
      if (row === n) {
        result.push(board.map((r) => r.join("")));
        return;
      }

      for (let col = 0; col < n; col++) {
        // Skip if column or either diagonal is under attack
        if (cols.has(col) || posDiag.has(row + col) || negDiag.has(row - col)) {
          continue;
        }

        // CHOOSE
        cols.add(col);
        posDiag.add(row + col);
        negDiag.add(row - col);
        board[row][col] = "Q";

        // EXPLORE
        backtrack(row + 1);

        // UNCHOOSE
        cols.delete(col);
        posDiag.delete(row + col);
        negDiag.delete(row - col);
        board[row][col] = ".";
      }
    };

    backtrack(0);
    return result;
  }
}
```
