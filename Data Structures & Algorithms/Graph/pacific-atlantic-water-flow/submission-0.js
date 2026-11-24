class Solution {
    /**
     * @param {number[][]} heights
     * @return {number[][]}
     */
    pacificAtlantic(heights) {
        let rows = heights.length;
        let cols = heights[0].length;
        const pacific = new Set();
        const atlantic = new Set();

        function dfs(r, c, visitedSet, prevHeight) {
            const key = `${r},${c}`;
            if(
                r < 0 || r >= rows || 
                c < 0 || c >= cols ||
                visitedSet.has(key) ||
                heights[r][c] < prevHeight) {
                    return;
            }
            visitedSet.add(key);

            dfs(r + 1, c, visitedSet, heights[r][c])
            dfs(r - 1, c, visitedSet, heights[r][c])
            dfs(r, c + 1, visitedSet, heights[r][c])
            dfs(r, c - 1, visitedSet, heights[r][c])
        }

        for (let c = 0; c < cols; c++) {
            dfs(0, c, pacific, heights[0][c]);
            dfs(rows - 1, c, atlantic, heights[rows - 1][c]);
        }

        for (let r = 0; r < rows; r++) {
            dfs(r, 0, pacific, heights[r][0]);
            dfs(r, cols - 1, atlantic, heights[r][cols - 1]);
        }
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
