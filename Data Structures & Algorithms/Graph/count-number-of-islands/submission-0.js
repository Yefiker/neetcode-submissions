class Solution {
    /**
     * @param {character[][]} grid
     * @return {number}
     */
    numIslands(grid) {
        if (!grid || grid.length === 0) return 0;

    let islandCount = 0;
    const rows = grid.length;
    const cols = grid[0].length;

    // Helper function to sink connected land cells
    function dfs(r, c) {
        // Base case: out of bounds or water ('0')
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') {
            return;
        }

        // Mark current land cell as visited by turning it into water
        grid[r][c] = '0';

        // Explore all 4 adjacent directions (down, up, right, left)
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }

    // Iterate through every cell in the grid
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                islandCount++;
                dfs(r, c); // Sink the entire island
            }
        }
    }

    return islandCount;
    }
}
