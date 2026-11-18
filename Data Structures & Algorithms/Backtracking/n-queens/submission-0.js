class Solution {
    /**
     * @param {number} n
     * @return {string[][]}
     */
    solveNQueens(n) {
        const result = [];
        const board = Array.from({ length: n }, () => Array(n).fill('.'));

        const cols = new Set();
        const posDiag = new Set();
        const negDiag = new Set();

        const backtrack = (row) => {
            if (row === n) {
                result.push(board.map(r => r.join('')));
                return;
            }

            for(let col = 0; col < n; col++) {
                if(
                    cols.has(col) ||
                    posDiag.has(row + col) ||
                    negDiag.has(row - col)
                ) {
                    continue;
                }

                cols.add(col);
                posDiag.add(row + col);
                negDiag.add(row - col);
                board[row][col] = 'Q';

                backtrack(row + 1);

                cols.delete(col);
                posDiag.delete(row + col);
                negDiag.delete(row - col);
                board[row][col] = '.';
            }
        }

        backtrack(0);
        return result;

    }
}
