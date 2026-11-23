class Solution {
    /**
     * @param {number[][]} grid
     * @return {number}
     */
    orangesRotting(grid) {
        let row = grid.length;
        let col = grid[0].length;
        let queue = [];
        let freshCount = 0;
        let minutes = 0;
        const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

        for (let r = 0; r < row; r++) {
            for (let c = 0; c < col; c++) {
                if(grid[r][c] === 2) {
                    queue.push([r, c])
                } else if (grid[r][c] === 1) {
                    freshCount++;
                }
            }
        }

        while(queue.length > 0 && freshCount > 0) {
            const levelSize = queue.length;
            for (let i = 0; i < levelSize; i++) {
                const [r, c] = queue.shift();
                for (let [dr, dc] of dirs) {
                    let newRow = r + dr;
                    let newCol = c + dc;

                    if(
                        newRow >= 0 && newRow < row &&
                        newCol >= 0 && newCol < col &&      grid[newRow][newCol] === 1) {
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
