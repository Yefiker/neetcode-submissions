# Pacific Atlantic Water Flow

## Complexity

- **Time Complexity:** $O(M \cdot N)$ — Where $M$ is the number of rows and $N$ is the number of columns. Each cell in the grid is visited at most once during the Pacific DFS and at most once during the Atlantic DFS, followed by a single $O(M \cdot N)$ pass to find the intersection.
- **Space Complexity:** $O(M \cdot N)$ — In the worst-case scenario (e.g., a flat grid where water can flow everywhere), both `pacific` and `atlantic` `Set`s and the recursion call stack can hold up to $O(M \cdot N)$ coordinates.

## Intuition

To find all grid coordinates from which rainwater can flow downhill (`neighborHeight <= currentHeight`) to both the Pacific Ocean (top and left edges) and the Atlantic Ocean (bottom and right edges) without running redundant searches from every interior cell:

- **Reverse Flow (Uphill Border DFS):** Instead of simulating water flowing downhill from every cell, we start directly from the **ocean borders** and traverse **uphill** (`heights[r][c] >= prevHeight`). Every cell reachable uphill from an ocean border is guaranteed to have a valid downhill path back to that ocean.
- **Two Independent Reachability Sets:** Run uphill DFS from the top row (`r = 0`) and left column (`c = 0`) into a `pacific` `Set`, and from the bottom row (`r = rows - 1`) and right column (`c = cols - 1`) into an `atlantic` `Set`.
- **Set Intersection:** Scan the grid once and collect every `[r, c]` coordinate present in both `pacific` and `atlantic`.

## Common Pitfalls

- **Storing Arrays Directly in a JavaScript `Set`:** JavaScript `Set` objects compare object/array references rather than values (`set.has([0, 0])` always returns `false`). Always serialize coordinates into a primitive string key (`` `${r},${c}` ``) or flattened integer (`r * cols + c`).
- **Inverting the Uphill Comparison:** When climbing _uphill_ from the ocean borders, stop recursion when `heights[r][c] < prevHeight` (not `>`), since equal-height adjacent cells allow water to flow between them.

## Solution

```javascript
class Solution {
  /**
   * @param {number[][]} heights
   * @return {number[][]}
   */
  pacificAtlantic(heights) {
    const rows = heights.length;
    const cols = heights[0].length;
    const pacific = new Set();
    const atlantic = new Set();

    function dfs(r, c, visitedSet, prevHeight) {
      const key = `${r},${c}`;
      if (
        r < 0 ||
        r >= rows ||
        c < 0 ||
        c >= cols ||
        visitedSet.has(key) ||
        heights[r][c] < prevHeight
      ) {
        return;
      }

      visitedSet.add(key);

      dfs(r + 1, c, visitedSet, heights[r][c]);
      dfs(r - 1, c, visitedSet, heights[r][c]);
      dfs(r, c + 1, visitedSet, heights[r][c]);
      dfs(r, c - 1, visitedSet, heights[r][c]);
    }

    // Launch uphill DFS from top (Pacific) and bottom (Atlantic) borders
    for (let c = 0; c < cols; c++) {
      dfs(0, c, pacific, heights[0][c]);
      dfs(rows - 1, c, atlantic, heights[rows - 1][c]);
    }

    // Launch uphill DFS from left (Pacific) and right (Atlantic) borders
    for (let r = 0; r < rows; r++) {
      dfs(r, 0, pacific, heights[r][0]);
      dfs(r, cols - 1, atlantic, heights[r][cols - 1]);
    }

    // Collect all cells reachable from both oceans
    const result = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const key = `${r},${c}`;
        if (pacific.has(key) && atlantic.has(key)) {
          result.push([r, c]);
        }
      }
    }

    return result;
  }
}
```
