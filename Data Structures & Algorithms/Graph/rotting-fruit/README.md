# Rotting Fruit

## Complexity

- **Time Complexity:** $O(M \cdot N)$ — Where $M$ is the number of rows and $N$ is the number of columns. The initial scan visits every cell once to locate rotten and fresh fruit, and each fresh fruit cell (`1`) is rotted and enqueued at most once during the BFS traversal.
- **Space Complexity:** $O(M \cdot N)$ — In the worst-case scenario (e.g., a grid filled predominantly with rotten fruit), the BFS queue can hold up to $O(M \cdot N)$ cell coordinates simultaneously.

## Intuition

To determine the minimum number of minutes required for all fresh fruit (`1`) to rot starting from all initially rotten fruit (`2`), or `-1` if any fresh fruit is unreachable:

- **Multi-Source BFS:** Because every rotten fruit spreads rot to its 4-directional neighbors simultaneously each minute, we enqueue **all initial `2`s** before starting the traversal while counting total `freshCount` (`1`s).
- **Level-by-Level Minute Tracking:** Snapshot `const levelSize = queue.length` at the start of each wave so that processing all `levelSize` nodes corresponds to **1 elapsed minute**. Guarding the `while` loop with `freshCount > 0` prevents counting an extra minute after the final fresh fruit has already rotted.
- **In-Place Visited Marking:** Immediately setting `grid[newRow][newCol] = 2` and decrementing `freshCount--` upon enqueuing prevents duplicate queue entries without needing a separate `visited` matrix.

## Common Pitfalls

- **Using `||` Instead of `&&` in Positive Bounds Checks:** When checking that coordinates are _inside_ the grid (`newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols`), all conditions must be joined with `&&` (and include index `0` via `>= 0`). Using `||` short-circuits when `newRow === -1` and throws `TypeError: Cannot read properties of undefined`.
- **Counting an Extra Minute at the End:** Without `&& freshCount > 0` in the `while` condition, the final wave of newly rotted fruits gets popped from the queue even when no fresh neighbors remain, inflating `minutes` by `1`.

## Solution

```javascript
class Solution {
  /**
   * @param {number[][]} grid
   * @return {number}
   */
  orangesRotting(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const queue = [];
    let freshCount = 0;
    let minutes = 0;
    const dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    // 1. Seed the queue with all initially rotten fruit and count fresh fruit
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 2) {
          queue.push([r, c]);
        } else if (grid[r][c] === 1) {
          freshCount++;
        }
      }
    }

    // 2. Process wave by wave (1 wave = 1 minute) while fresh fruit remains
    while (queue.length > 0 && freshCount > 0) {
      const levelSize = queue.length;

      for (let i = 0; i < levelSize; i++) {
        const [r, c] = queue.shift();

        for (const [dr, dc] of dirs) {
          const newRow = r + dr;
          const newCol = c + dc;

          if (
            newRow >= 0 &&
            newRow < rows &&
            newCol >= 0 &&
            newCol < cols &&
            grid[newRow][newCol] === 1
          ) {
            grid[newRow][newCol] = 2;
            freshCount--;
            queue.push([newRow, newCol]);
          }
        }
      }

      minutes++;
    }

    return freshCount === 0 ? minutes : -1;
  }
}
```
