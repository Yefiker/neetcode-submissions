# Islands and Treasure

## Complexity

- **Time Complexity:** $O(M \cdot N)$ — Where $M$ is the number of rows and $N$ is the number of columns. Scanning the grid to find all treasure chests takes $O(M \cdot N)$, and each reachable empty land cell (`INF`) is visited and updated at most once during the BFS traversal.
- **Space Complexity:** $O(M \cdot N)$ — In the worst-case scenario (e.g., a grid filled almost entirely with treasure chests or open land), the BFS queue can hold up to $O(M \cdot N)$ cell coordinates simultaneously.

## Intuition

To fill every empty land cell (`2147483647`) with the shortest distance to its nearest treasure chest (`0`) without running redundant searches from every land cell:

- **Multi-Source BFS:** Instead of searching outward from every empty land cell, we reverse the perspective and enqueue **all treasure chests (`0`s)** simultaneously before starting the traversal.
- **Layer-by-Layer Expansion:** Because BFS explores nodes in increasing order of distance (like ripples expanding outward), the very first time a wave reaches an `INF` cell is guaranteed to be the shortest path from the nearest treasure chest.
- **In-Place Visited Tracking:** Updating `grid[newRow][newCol] = grid[r][c] + 1` immediately when enqueuing a neighbor prevents other branches from revisiting or overwriting it, eliminating the need for a separate `visited` matrix.

## Common Pitfalls

- **Running `while (queue.length > 0)` Inside the Nested `for` Loops:** Always finish scanning the entire grid to collect _all_ `0`s into the queue before starting the `while` loop; otherwise, the first treasure found will prematurely flood the grid with suboptimal distances.
- **Accessing `grid[newRow][newCol]` Before Bounds Checking:** Always verify `newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols` before reading `grid[newRow][newCol]` to avoid `TypeError: Cannot read properties of undefined`.

## Solution

```javascript
class Solution {
  /**
   * @param {number[][]} grid
   */
  islandsAndTreasure(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const queue = [];
    const dirs = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    // 1. Seed the queue with all treasure chests (0s)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 0) {
          queue.push([r, c]);
        }
      }
    }

    // 2. Expand outward layer by layer using Multi-Source BFS
    while (queue.length > 0) {
      const [r, c] = queue.shift();

      for (const [dr, dc] of dirs) {
        const newRow = r + dr;
        const newCol = c + dc;

        // Skip out-of-bounds cells, walls (-1), treasures (0), or already visited cells
        if (
          newRow < 0 ||
          newRow >= rows ||
          newCol < 0 ||
          newCol >= cols ||
          grid[newRow][newCol] !== 2147483647
        ) {
          continue;
        }

        // Update shortest distance in-place and enqueue neighbor
        grid[newRow][newCol] = grid[r][c] + 1;
        queue.push([newRow, newCol]);
      }
    }
  }
}
```
