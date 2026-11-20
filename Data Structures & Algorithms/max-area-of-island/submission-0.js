class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    maxAreaOfIsland(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let maxArea = 0;

    function dfs(r, c) {
        // Return 0 if out of bounds or at a water/visited cell
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === 0) {
            return 0;
        }

        // Sink the land (mark as visited) to avoid recounting
        grid[r][c] = 0;

        // Count current cell (1) + all 4-directionally connected land cells
        return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 1) {
                maxArea = Math.max(maxArea, dfs(r, c));
            }
        }
    }

    return maxArea;

    }
}
