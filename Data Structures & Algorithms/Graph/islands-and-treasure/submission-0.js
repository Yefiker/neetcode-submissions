class Solution {
    /**
     * @param {number[][]} grid
     */
    islandsAndTreasure(grid) {
        let rows = grid.length;
        let cols = grid[0].length;
        const queue = [];
        const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === 0) {
                    queue.push([r, c]);
                }
            }
        }
        while(queue.length > 0) {
                    const [r, c] = queue.shift();
                    for (let [dr, dc] of dirs) {
                        let newRow = r + dr;
                        let newCol = c + dc;

                        if(
                            newRow < 0 || newRow >= rows ||
                            newCol < 0 || newCol >= cols ||
                            grid[newRow][newCol] !== 2147483647) {
                            continue;
                        } else {
                            grid[newRow][newCol] = grid[r][c] + 1;
                            queue.push([newRow, newCol]);
                        }
                    }
                }
    }
}
